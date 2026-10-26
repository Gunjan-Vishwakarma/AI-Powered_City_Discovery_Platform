"""
Cron Scraper & State-by-State Automated Ingestion Pipeline
Scrapes 1,000+ Indian cities state-by-state, skipping already scraped cities.
Starting with Madhya Pradesh, then proceeding through all 36 Indian States and UTs.
"""

import sys
import os
import io
import time
import re
import argparse
from datetime import datetime, timezone
from typing import Dict, Set, List, Any

# Ensure current scraper directory and data directory are in sys.path
SCRAPER_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(SCRAPER_DIR, "data")
for p in [SCRAPER_DIR, DATA_DIR]:
    if p not in sys.path:
        sys.path.insert(0, p)

# Ensure UTF-8 output on Windows consoles
if sys.stdout.encoding != 'utf-8':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

try:
    from data.indian_cities_by_state import (
        INDIAN_CITIES_BY_STATE,
        get_all_states,
        get_cities_in_state,
        get_total_city_count,
    )
except ImportError:
    from indian_cities_by_state import (
        INDIAN_CITIES_BY_STATE,
        get_all_states,
        get_cities_in_state,
        get_total_city_count,
    )
from config import get_db, test_db_connection
from pipeline import CityScrapingPipeline

class CronCityScraper:
    """
    Automated State-by-State Scraper with Resume & Skip Capabilities.
    """

    def __init__(self, delay_seconds: float = 2.0):
        self.delay_seconds = delay_seconds
        self.pipeline = CityScrapingPipeline()
        self.db = get_db() if test_db_connection() else None

    def get_already_scraped_keys(self) -> Set[str]:
        """
        Retrieves all already scraped city slugs and names from MongoDB
        so they are never re-scraped.
        """
        scraped_keys: Set[str] = set()
        if self.db is None:
            return scraped_keys

        try:
            # Check cities collection
            cursor = self.db["cities"].find({}, {"name": 1, "slug": 1})
            for doc in cursor:
                if "slug" in doc and doc["slug"]:
                    scraped_keys.add(doc["slug"].lower())
                if "name" in doc and doc["name"]:
                    scraped_keys.add(doc["name"].lower())
                    # Normalized slug version of name
                    norm_slug = re.sub(r"[^a-z0-9]+", "-", doc["name"].lower()).strip("-")
                    scraped_keys.add(norm_slug)
        except Exception as e:
            print(f"[Cron] Warning reading existing cities from DB: {e}")

        return scraped_keys

    def get_progress_status(self) -> Dict[str, Any]:
        """Calculates total progress state-by-state."""
        scraped_keys = self.get_already_scraped_keys()
        total_cities = get_total_city_count()

        state_stats: Dict[str, Dict[str, int]] = {}
        total_scraped = 0

        for state, cities in INDIAN_CITIES_BY_STATE.items():
            scraped_in_state = 0
            for city in cities:
                city_slug = re.sub(r"[^a-z0-9]+", "-", city.lower()).strip("-")
                if city.lower() in scraped_keys or city_slug in scraped_keys:
                    scraped_in_state += 1
            
            state_stats[state] = {
                "total": len(cities),
                "scraped": scraped_in_state,
                "remaining": len(cities) - scraped_in_state,
                "percent": round((scraped_in_state / len(cities)) * 100, 1) if cities else 0,
            }
            total_scraped += scraped_in_state

        return {
            "total_cities": total_cities,
            "total_scraped": total_scraped,
            "total_remaining": total_cities - total_scraped,
            "overall_percent": round((total_scraped / total_cities) * 100, 1) if total_cities else 0,
            "state_stats": state_stats,
        }

    def print_status(self):
        """Prints a detailed progress dashboard across Indian states."""
        stats = self.get_progress_status()
        print("\n=======================================================")
        print("  🇮🇳 PAN-INDIA CITY SCRAPING PROGRESS DASHBOARD")
        print("=======================================================")
        print(f"  Total Master Cities:   {stats['total_cities']}")
        print(f"  Successfully Ingested: {stats['total_scraped']} ({stats['overall_percent']}%)")
        print(f"  Remaining to Scrape:   {stats['total_remaining']}")
        print("-------------------------------------------------------")
        print(f"{'State / Territory':<30} {'Scraped':<10} {'Total':<8} {'Progress'}")
        print("-------------------------------------------------------")

        for state, data in stats["state_stats"].items():
            bar_len = int(data["percent"] / 10)
            bar = "█" * bar_len + "░" * (10 - bar_len)
            print(f"{state:<30} {data['scraped']:<10} {data['total']:<8} [{bar}] {data['percent']}%")
        print("=======================================================\n")

    def run_cron_batch(
        self,
        target_state: str = None,
        max_cities: int = 50,
    ) -> Dict[str, Any]:
        """
        Executes a cron batch:
        - If target_state is specified, processes only that state.
        - Otherwise, iterates through states in order starting with Madhya Pradesh.
        - Skips already scraped cities.
        - Stops after max_cities have been processed in this cron run.
        """
        print("\n=======================================================")
        print(f"  ⏱️ CRON SCRAPER TRIGGERED: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=======================================================")

        scraped_keys = self.get_already_scraped_keys()
        print(f"[Cron] Loaded {len(scraped_keys)} existing city records from MongoDB to SKIP.")

        states_to_process = [target_state] if target_state else get_all_states()

        processed_count = 0
        skipped_count = 0
        failed_count = 0

        for state in states_to_process:
            cities_in_state = get_cities_in_state(state)
            if not cities_in_state:
                print(f"[Cron] Warning: No cities registered for '{state}'.")
                continue

            print(f"\n-------------------------------------------------------")
            print(f"  📍 Processing State: {state.upper()} ({len(cities_in_state)} cities registered)")
            print(f"-------------------------------------------------------")

            for city in cities_in_state:
                city_slug = re.sub(r"[^a-z0-9]+", "-", city.lower()).strip("-")

                # Check if already scraped
                if city.lower() in scraped_keys or city_slug in scraped_keys:
                    print(f"[Cron] ⏭️ Skipping '{city}' ({state}): Already scraped.")
                    skipped_count += 1
                    continue

                # City needs to be scraped!
                print(f"\n[Cron] 🎯 Target #{processed_count + 1}/{max_cities}: Scraping '{city}' ({state})...")

                try:
                    res = self.pipeline.process_city(city)
                    if res.get("success", False):
                        processed_count += 1
                        scraped_keys.add(city.lower())
                        scraped_keys.add(city_slug)
                        self._update_progress_log(state, city, "success")
                    else:
                        print(f"[Cron] ⚠️ Scraper could not retrieve enough data for '{city}'.")
                        failed_count += 1
                        self._update_progress_log(state, city, "failed")
                except Exception as e:
                    print(f"[Cron] ❌ Error processing '{city}': {e}")
                    failed_count += 1
                    self._update_progress_log(state, city, f"error: {str(e)}")

                # Check if batch limit reached for this cron tick
                if max_cities and processed_count >= max_cities:
                    print(f"\n[Cron] 🛑 Batch limit of {max_cities} cities reached for this cron tick.")
                    print(f"[Cron] Exiting cleanly. Next cron execution will resume seamlessly.")
                    return {
                        "processed": processed_count,
                        "skipped": skipped_count,
                        "failed": failed_count,
                        "current_state": state,
                    }

                # Polite delay between scraping calls
                time.sleep(self.delay_seconds)

        print(f"\n=======================================================")
        print(f"  🎉 CRON BATCH COMPLETED!")
        print(f"  - Newly Ingested: {processed_count}")
        print(f"  - Already Existed (Skipped): {skipped_count}")
        print(f"  - Failed / Insufficient: {failed_count}")
        print("=======================================================")

        self.sync_states_table()

        return {
            "processed": processed_count,
            "skipped": skipped_count,
            "failed": failed_count,
        }

    def sync_states_table(self):
        """
        Synchronizes the 'states' collection in MongoDB:
        Ensures all 36 Indian states and their cities are populated,
        and updates scrapedCitiesCount and cityDetails isScraped statuses.
        """
        if self.db is None:
            print("[Cron] ⚠️ Cannot sync states table: MongoDB connection unavailable.")
            return

        scraped_keys = self.get_already_scraped_keys()
        states_col = self.db["states"]

        synced = 0
        for state_name, cities in INDIAN_CITIES_BY_STATE.items():
            slug = re.sub(r"[^a-z0-9]+", "-", state_name.lower()).strip("-")
            scraped_count = 0
            city_details = []

            for c in cities:
                c_slug = re.sub(r"[^a-z0-9]+", "-", c.lower()).strip("-")
                is_scraped = (c.lower() in scraped_keys or c_slug in scraped_keys)
                if is_scraped:
                    scraped_count += 1
                city_details.append({
                    "name": c,
                    "slug": c_slug,
                    "tier": 3,
                    "isScraped": is_scraped,
                })

            update_data = {
                "name": state_name,
                "slug": slug,
                "totalCities": len(cities),
                "scrapedCitiesCount": scraped_count,
                "cities": cities,
                "cityDetails": city_details,
                "isActive": True,
            }

            states_col.update_one(
                {"slug": slug},
                {"$set": update_data},
                upsert=True
            )
            synced += 1

        print(f"[Cron] ✓ Synchronized 'states' table in MongoDB ({synced} states updated).")

    def _update_progress_log(self, state: str, city: str, status: str):
        """Records progress log in MongoDB scrape_progress collection."""
        if self.db is None:
            return
        try:
            self.db["scrape_progress"].update_one(
                {"state": state},
                {
                    "$set": {
                        "state": state,
                        "lastCityScraped": city,
                        "lastScrapedAt": datetime.now(timezone.utc),
                    },
                    "$addToSet": {"completedCities": city} if status == "success" else {},
                },
                upsert=True
            )
        except Exception:
            pass

def main():
    parser = argparse.ArgumentParser(
        description="State-by-State Cron City Scraper for 1000+ Indian Cities (Madhya Pradesh first)"
    )
    parser.add_argument(
        "--state",
        type=str,
        default=None,
        help="Target specific state (e.g., 'Madhya Pradesh', 'Rajasthan', 'Uttar Pradesh')",
    )
    parser.add_argument(
        "--batch-size",
        type=int,
        default=30,
        help="Max number of unscraped cities to process per cron run (default: 30)",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=2.0,
        help="Delay in seconds between city scrapes to avoid rate limits (default: 2.0)",
    )
    parser.add_argument(
        "--status",
        action="store_true",
        help="Display Pan-India scraping progress dashboard and exit",
    )
    parser.add_argument(
        "--daemon",
        action="store_true",
        help="Run continuously in background with scheduled intervals",
    )
    parser.add_argument(
        "--interval-minutes",
        type=int,
        default=15,
        help="Interval in minutes between batch runs in daemon mode (default: 15)",
    )

    parser.add_argument(
        "--sync-states",
        action="store_true",
        help="Synchronize states and their cities collection in MongoDB and exit",
    )

    args = parser.parse_args()

    scraper = CronCityScraper(delay_seconds=args.delay)

    if args.sync_states:
        scraper.sync_states_table()
        sys.exit(0)

    if args.status:
        scraper.print_status()
        sys.exit(0)

    if args.daemon:
        print(f"[Daemon] Starting Cron Daemon: processing batches of {args.batch_size} every {args.interval_minutes} minutes...")
        while True:
            try:
                scraper.run_cron_batch(target_state=args.state, max_cities=args.batch_size)
            except Exception as e:
                print(f"[Daemon] Error in cron cycle: {e}")
            print(f"[Daemon] Sleeping for {args.interval_minutes} minutes until next scheduled run...")
            time.sleep(args.interval_minutes * 60)
    else:
        scraper.run_cron_batch(target_state=args.state, max_cities=args.batch_size)

if __name__ == "__main__":
    main()
