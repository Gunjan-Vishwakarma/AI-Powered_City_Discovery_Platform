import os
from dotenv import load_dotenv
from pymongo import MongoClient

# Load environment variables
load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://127.0.0.1:27017/city_discovery_india")
DB_NAME = os.getenv("DB_NAME", "city_discovery_india")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

# Request headers for web scraping
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
}

_mongo_client = None

def get_db():
    """Returns a connected MongoDB database instance."""
    global _mongo_client
    if _mongo_client is None:
        _mongo_client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=4000)
    return _mongo_client[DB_NAME]

def test_db_connection() -> bool:
    """Verifies that MongoDB is reachable."""
    try:
        db = get_db()
        db.command("ping")
        return True
    except Exception as e:
        print(f"[Config] Warning: MongoDB ping failed ({e}).")
        return False
