import re
import urllib.parse
import sys
import io

if sys.stdout.encoding != 'utf-8':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

from typing import Dict, Any, List
import requests
from bs4 import BeautifulSoup
from youtube_transcript_api import YouTubeTranscriptApi
from config import HEADERS

class YouTubeScraper:
    """
    Fallback scraper: When Google / web search data is missing or sparse,
    searches YouTube for travel guides, food walks, and cultural documentaries
    about the Indian city, then extracts transcripts and video descriptions.
    """

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update(HEADERS)
        self.api = YouTubeTranscriptApi()

    def scrape_city_videos(self, city_name: str, max_videos: int = 3) -> Dict[str, Any]:
        """
        Searches YouTube for city travel and culture videos, fetches transcripts,
        and aggregates spoken travel guide text.
        """
        print(f"[YouTubeScraper] 🎥 Fallback engaged: Searching YouTube videos for '{city_name}, India'...")

        queries = [
            f"{city_name} India travel guide culture and food",
            f"{city_name} famous places to visit street food walk",
        ]

        video_ids = self._search_youtube_video_ids(queries[0], limit=max_videos)
        if not video_ids:
            video_ids = self._search_youtube_video_ids(queries[1], limit=max_videos)

        result: Dict[str, Any] = {
            "source": "youtube_videos",
            "city_name": city_name,
            "success": False,
            "videos_scraped": [],
            "overview_text": "",
            "food_text": "",
            "places_text": "",
            "culture_text": "",
            "festivals_text": "",
            "combined_transcript": "",
            "source_links": [],
        }

        all_transcripts: List[str] = []

        for vid in video_ids:
            video_url = f"https://www.youtube.com/watch?v={vid}"
            video_info = self._get_video_transcript(vid, city_name)
            
            result["videos_scraped"].append({
                "video_id": vid,
                "url": video_url,
                "title": video_info.get("title", f"{city_name} Travel Guide"),
                "has_transcript": video_info.get("has_transcript", False),
                "transcript_length": len(video_info.get("text", "")),
            })
            result["source_links"].append(video_url)

            text_content = video_info.get("text", "")
            if text_content:
                all_transcripts.append(text_content)

        combined = "\n\n".join(all_transcripts)
        result["combined_transcript"] = combined

        if len(combined) > 100:
            result["success"] = True
            # Segment the combined transcript text into thematic blocks
            result["overview_text"] = combined[:1000]
            result["food_text"] = self._extract_matching_sentences(combined, ["food", "dish", "eat", "taste", "street", "sweet", "masala", "breakfast"])
            result["places_text"] = self._extract_matching_sentences(combined, ["place", "temple", "fort", "monument", "palace", "ghat", "visit", "build", "historical"])
            result["culture_text"] = self._extract_matching_sentences(combined, ["culture", "tradition", "dance", "art", "festival", "music", "ritual", "people", "history"])
            print(f"[YouTubeScraper] ✓ Extracted {len(combined)} chars of spoken travel guide text from YouTube.")
        else:
            print(f"[YouTubeScraper] ⚠️ Could not extract sufficient transcript text from YouTube videos.")

        return result

    def _search_youtube_video_ids(self, query: str, limit: int = 3) -> List[str]:
        """Scrapes YouTube search page to extract video IDs without requiring an API key."""
        try:
            encoded = urllib.parse.quote(query)
            url = f"https://www.youtube.com/results?search_query={encoded}"
            res = self.session.get(url, timeout=10)
            
            if res.status_code == 200:
                # Video IDs regex pattern in initial data JSON
                raw_ids = re.findall(r'"videoId":"([a-zA-Z0-9_-]{11})"', res.text)
                unique_ids: List[str] = []
                for vid in raw_ids:
                    if vid not in unique_ids:
                        unique_ids.append(vid)
                    if len(unique_ids) >= limit:
                        break
                return unique_ids
        except Exception as e:
            print(f"[YouTubeScraper] Search error: {e}")
        return []

    def _get_video_transcript(self, video_id: str, city_name: str) -> Dict[str, Any]:
        """Attempts to fetch captions/transcripts using youtube-transcript-api."""
        try:
            transcript_list_obj = self.api.list(video_id)
            
            # Look for English, then Hindi, or any available transcript
            transcript = None
            try:
                transcript = transcript_list_obj.find_transcript(["en", "en-US", "en-IN"])
            except Exception:
                try:
                    transcript = transcript_list_obj.find_transcript(["hi"])
                except Exception:
                    # Grab any transcript from the iterable
                    transcript = next(iter(transcript_list_obj), None)

            if transcript:
                snippets = transcript.fetch()
                full_text = " ".join([getattr(s, "text", "") for s in snippets])
                cleaned_text = re.sub(r"\[.*?\]", "", full_text).strip()
                if len(cleaned_text) > 40:
                    return {
                        "title": f"{city_name} Video Walk",
                        "text": cleaned_text,
                        "has_transcript": True,
                    }
        except Exception as e:
            pass

        # Fallback to fetching basic metadata from video page if captions unavailable
        description_text = self._scrape_video_description(video_id)
        return {
            "title": f"{city_name} Travel Feature",
            "text": description_text,
            "has_transcript": False,
        }

    def _scrape_video_description(self, video_id: str) -> str:
        """Fallback to extract video title and description text from watch page."""
        try:
            url = f"https://www.youtube.com/watch?v={video_id}"
            res = self.session.get(url, timeout=8)
            if res.status_code == 200:
                soup = BeautifulSoup(res.text, "html.parser")
                title_tag = soup.find("meta", {"name": "title"}) or soup.find("title")
                desc_tag = soup.find("meta", {"name": "description"})
                
                title = title_tag.get("content", "") if title_tag else ""
                desc = desc_tag.get("content", "") if desc_tag else ""
                return f"{title}. {desc}".strip()
        except Exception:
            pass
        return ""

    def _extract_matching_sentences(self, full_text: str, keywords: List[str], max_sentences: int = 5) -> str:
        """Extracts key sentences from the transcript matching thematic topic keywords."""
        sentences = re.split(r"(?<=[.!?])\s+", full_text)
        matched: List[str] = []
        
        for s in sentences:
            s_clean = s.strip()
            if len(s_clean) > 30 and any(k.lower() in s_clean.lower() for k in keywords):
                if s_clean not in matched:
                    matched.append(s_clean)
                if len(matched) >= max_sentences:
                    break
        
        return " ".join(matched)
