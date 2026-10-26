import time
import sys
import io

if sys.stdout.encoding != 'utf-8':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

from typing import Dict, Any, Optional
from config import get_db, test_db_connection
from scrapers.google_scraper import GoogleWebScraper
from scrapers.youtube_scraper import YouTubeScraper
from transformers.text_processor import TextTransformer

class CityScrapingPipeline:
    """
    End-to-end scraper & database pipeline:
    1. Scrapes Google & authoritative web pages.
    2. Falls back to YouTube travel documentary transcripts if web data is missing.
    3. Transforms and structures the extracted knowledge into clean text schemas.
    4. Upserts records directly into the MongoDB database.
    """

    def __init__(self, force_source: Optional[str] = None):
        self.google_scraper = GoogleWebScraper()
        self.youtube_scraper = YouTubeScraper()
        self.transformer = TextTransformer()
        self.force_source = force_source

    def process_city(self, city_name: str) -> Dict[str, Any]:
        """
        Executes the scraping and ingestion workflow for a given Indian city.
        """
        print(f"\n=======================================================")
        print(f"  🇮🇳 INGESTION PIPELINE: Scrape & Ingest '{city_name}'")
        print(f"=======================================================")

        raw_data: Optional[Dict[str, Any]] = None

        # Step 1: Google Web Scraping (Primary)
        if self.force_source == "youtube":
            print(f"[Pipeline] ℹ️ Force source configured to YouTube.")
            raw_data = self.youtube_scraper.scrape_city_videos(city_name)
        else:
            raw_data = self.google_scraper.scrape_city_info(city_name)

            # Step 2: Fallback to YouTube if no data or insufficient data
            if not raw_data.get("success", False):
                print(f"[Pipeline] ⚠️ Google scraping yielded insufficient data for '{city_name}'.")
                print(f"[Pipeline] 🔄 Falling back to YouTube travel video transcripts...")
                raw_data = self.youtube_scraper.scrape_city_videos(city_name)

        if not raw_data or not raw_data.get("success", False):
            print(f"[Pipeline] ❌ Failed to retrieve sufficient data for '{city_name}' from both Google and YouTube.")
            return {"success": False, "city": city_name, "error": "No data found across web or YouTube sources."}

        # Step 3: Text Transformation & Structuring
        print(f"[Pipeline] ⚙️ Transforming scraped raw text into structured city knowledge...")
        structured = self.transformer.transform_to_city_profile(city_name, raw_data)

        # Step 4: Database Storage (MongoDB)
        saved_counts = self._save_to_mongodb(structured)

        print(f"[Pipeline] ✅ Successfully processed and stored '{city_name}' in MongoDB!")
        print(f"  - Source Used: {raw_data.get('source')}")
        print(f"  - Database Updates: {saved_counts}")

        return {
            "success": True,
            "city": city_name,
            "source": raw_data.get("source"),
            "data_summary": saved_counts,
        }

    def _save_to_mongodb(self, structured: Dict[str, Any]) -> Dict[str, int]:
        """Upserts structured documents into MongoDB collections."""
        counts = {"city": 0, "food": 0, "places": 0, "culture": 0, "festivals": 0}

        if not test_db_connection():
            print("[Pipeline] ⚠️ MongoDB connection not available. Data was transformed but not persisted to DB.")
            return counts

        db = get_db()

        # 1. Save City
        city_doc = structured.get("city")
        if city_doc:
            db["cities"].update_one(
                {"slug": city_doc["slug"]},
                {"$set": city_doc},
                upsert=True
            )
            counts["city"] += 1

        # 2. Save Food Items
        for food in structured.get("food_items", []):
            db["fooditems"].update_one(
                {"citySlug": food["citySlug"], "name": food["name"]},
                {"$set": food},
                upsert=True
            )
            counts["food"] += 1

        # 3. Save Places
        for place in structured.get("places", []):
            db["places"].update_one(
                {"citySlug": place["citySlug"], "name": place["name"]},
                {"$set": place},
                upsert=True
            )
            counts["places"] += 1

        # 4. Save Culture Items
        for cult in structured.get("culture_items", []):
            db["cultureitems"].update_one(
                {"citySlug": cult["citySlug"], "name": cult["name"]},
                {"$set": cult},
                upsert=True
            )
            counts["culture"] += 1

        # 5. Save Festivals
        for fest in structured.get("festivals", []):
            db["festivals"].update_one(
                {"citySlug": fest["citySlug"], "name": fest["name"]},
                {"$set": fest},
                upsert=True
            )
            counts["festivals"] += 1

        return counts
