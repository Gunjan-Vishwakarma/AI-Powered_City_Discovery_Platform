import re
import urllib.parse
import sys
import io

if sys.stdout.encoding != 'utf-8':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

from typing import Dict, Any, List, Optional
import requests
from bs4 import BeautifulSoup
from config import HEADERS

class GoogleWebScraper:
    """
    Primary scraper: Scrapes Google search snippets, web travel pages,
    and authoritative encyclopedic sources for Indian cities.
    """

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update(HEADERS)

    def scrape_city_info(self, city_name: str) -> Dict[str, Any]:
        """
        Gathers comprehensive famous and popular details about the city
        covering overview, culture, food, places, and festivals.
        Returns a dict with extracted text and a success/completeness flag.
        """
        print(f"[GoogleScraper] 🌐 Searching Google & authoritative web for '{city_name}, India'...")
        
        result: Dict[str, Any] = {
            "source": "google_web",
            "city_name": city_name,
            "success": False,
            "overview_text": "",
            "food_text": "",
            "places_text": "",
            "culture_text": "",
            "festivals_text": "",
            "raw_snippets": [],
            "source_links": [],
        }

        # 1. Scrape Wikipedia Structured Summary & Context
        wiki_data = self._scrape_wikipedia(city_name)
        if wiki_data:
            result["overview_text"] = wiki_data.get("extract", "")
            result["wiki_info"] = wiki_data
            result["source_links"].append(wiki_data.get("url", ""))

        # 2. Scrape Google Search for Famous Food
        food_query = f"{city_name} famous street food iconic dishes cuisine India"
        food_snippets = self._scrape_search_snippets(food_query)
        result["food_text"] = "\n".join(food_snippets)
        result["raw_snippets"].extend(food_snippets)

        # 3. Scrape Google Search for Famous Places & Monuments
        places_query = f"{city_name} famous places monuments attractions to visit India"
        places_snippets = self._scrape_search_snippets(places_query)
        result["places_text"] = "\n".join(places_snippets)
        result["raw_snippets"].extend(places_snippets)

        # 4. Scrape Google Search for Culture & Festivals
        culture_query = f"{city_name} culture dance traditions festivals celebrated India"
        culture_snippets = self._scrape_search_snippets(culture_query)
        result["culture_text"] = "\n".join(culture_snippets)
        result["raw_snippets"].extend(culture_snippets)

        # Evaluate if we gathered sufficient data
        total_text_length = (
            len(result["overview_text"])
            + len(result["food_text"])
            + len(result["places_text"])
            + len(result["culture_text"])
        )

        if total_text_length > 250:
            result["success"] = True
            print(f"[GoogleScraper] ✓ Found rich web data ({total_text_length} chars) for '{city_name}'.")
        else:
            print(f"[GoogleScraper] ⚠️ Insufficient web data found ({total_text_length} chars).")
            result["success"] = False

        return result

    def _scrape_wikipedia(self, city_name: str) -> Optional[Dict[str, Any]]:
        """Queries Wikipedia REST API for clean summary and coordinates."""
        try:
            clean_city = urllib.parse.quote(city_name)
            url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{clean_city}"
            res = self.session.get(url, timeout=8)
            if res.status_code == 200:
                data = res.json()
                return {
                    "title": data.get("title", city_name),
                    "extract": data.get("extract", ""),
                    "description": data.get("description", ""),
                    "thumbnail": data.get("thumbnail", {}).get("source", ""),
                    "coordinates": data.get("coordinates", {}),
                    "url": data.get("content_urls", {}).get("desktop", {}).get("page", ""),
                }
        except Exception as e:
            print(f"[GoogleScraper] Wikipedia fetch error: {e}")
        return None

    def _scrape_search_snippets(self, query: str) -> List[str]:
        """
        Performs web search scraping for query and extracts textual snippets.
        Falls back to DuckDuckGo HTML if Google blocks.
        """
        snippets: List[str] = []
        encoded = urllib.parse.quote(query)

        # Method A: Google Search Scraping
        try:
            google_url = f"https://www.google.com/search?q={encoded}&hl=en"
            res = self.session.get(google_url, timeout=6)
            if res.status_code == 200:
                soup = BeautifulSoup(res.text, "html.parser")
                # Extract text containers
                for g in soup.find_all("div", class_=re.compile(r"(BNeawe|VwiC3b|yXK7lf)")):
                    text = g.get_text(separator=" ", strip=True)
                    if len(text) > 25 and text not in snippets:
                        snippets.append(text)
        except Exception as e:
            print(f"[GoogleScraper] Search query notice: {e}")

        # Method B: Fallback to DuckDuckGo HTML if Google returns empty
        if not snippets:
            try:
                ddg_url = f"https://html.duckduckgo.com/html/?q={encoded}"
                res = self.session.get(ddg_url, timeout=6)
                if res.status_code == 200:
                    soup = BeautifulSoup(res.text, "html.parser")
                    for a in soup.find_all("a", class_="result__snippet"):
                        text = a.get_text(strip=True)
                        if len(text) > 25 and text not in snippets:
                            snippets.append(text)
            except Exception as e:
                print(f"[GoogleScraper] DDG search notice: {e}")

        return snippets[:8]
