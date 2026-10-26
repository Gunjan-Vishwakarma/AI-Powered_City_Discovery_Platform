import argparse
import sys
import os
import io

SCRAPER_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(SCRAPER_DIR, "data")
for p in [SCRAPER_DIR, DATA_DIR]:
    if p not in sys.path:
        sys.path.insert(0, p)

if sys.stdout.encoding != 'utf-8':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

from pipeline import CityScrapingPipeline
from config import test_db_connection

FAMOUS_INDIAN_CITIES = [
    "Varanasi",
    "Jaipur",
    "Amritsar",
    "Udaipur",
    "Kochi",
    "Mysuru",
    "Agra",
    "Hampi",
    "Rishikesh",
    "Madurai",
]

def main():
    parser = argparse.ArgumentParser(
        description="Scrape Indian City Information (Google Web with YouTube Video Fallback) and store in MongoDB"
    )
    parser.add_argument(
        "--city",
        type=str,
        help="Name of the Indian city to scrape (e.g., 'Varanasi', 'Rishikesh')",
    )
    parser.add_argument(
        "--all",
        action="store_true",
        help="Scrape a curated list of famous heritage and cultural Indian cities",
    )
    parser.add_argument(
        "--source",
        choices=["auto", "google", "youtube"],
        default="auto",
        help="Force specific scraping source: 'auto' (Google first, fallback to YouTube), 'google', or 'youtube'",
    )

    args = parser.parse_args()

    print("\n=======================================================")
    print("  🇮🇳 AI City Discovery Platform: Python Scraper & DB Ingestion")
    print("=======================================================")

    # Test DB Connection
    if test_db_connection():
        print("[Status] ✓ Connected to MongoDB Atlas / Local MongoDB successfully.")
    else:
        print("[Status] ⚠️ MongoDB connection check failed. Ensure MongoDB is running at MONGODB_URI.")

    force_source = None if args.source == "auto" else args.source
    pipeline = CityScrapingPipeline(force_source=force_source)

    if args.city:
        pipeline.process_city(args.city)
    elif args.all:
        print(f"\n[Batch] Starting ingestion for {len(FAMOUS_INDIAN_CITIES)} famous Indian cities...")
        for city in FAMOUS_INDIAN_CITIES:
            try:
                pipeline.process_city(city)
            except Exception as e:
                print(f"[Batch] Error processing {city}: {e}")
    else:
        # Interactive mode
        try:
            city_input = input("\nEnter Indian city name to scrape (or 'all' for batch): ").strip()
            if not city_input:
                city_input = "Varanasi"
            
            if city_input.lower() == "all":
                for city in FAMOUS_INDIAN_CITIES:
                    pipeline.process_city(city)
            else:
                pipeline.process_city(city_input)
        except (KeyboardInterrupt, EOFError):
            print("\nExiting.")
            sys.exit(0)

if __name__ == "__main__":
    main()
