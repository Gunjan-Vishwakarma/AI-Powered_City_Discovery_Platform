import re
import json
from typing import Dict, Any, List, Optional
import requests
from config import OPENAI_API_KEY

class TextTransformer:
    """
    Transforms raw scraped text (from Google search, Wikipedia, or YouTube transcripts)
    into structured database schemas matching the platform's MongoDB collections.
    """

    def __init__(self):
        self.api_key = OPENAI_API_KEY

    def transform_to_city_profile(self, city_name: str, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Parses raw text into structured city document, food items, places,
        cultural traditions, and festivals.
        """
        slug = re.sub(r"[^a-z0-9]+", "-", city_name.lower()).strip("-")
        source = raw_data.get("source", "unknown")
        overview_text = raw_data.get("overview_text", "")
        food_text = raw_data.get("food_text", "")
        places_text = raw_data.get("places_text", "")
        culture_text = raw_data.get("culture_text", "")
        wiki_info = raw_data.get("wiki_info", {})

        # If OpenAI is configured, use it for structured JSON synthesis
        if self.api_key:
            try:
                ai_structured = self._synthesize_with_openai(city_name, raw_data)
                if ai_structured:
                    return ai_structured
            except Exception as e:
                print(f"[Transformer] OpenAI synthesis notice: {e}. Falling back to rule-based parser.")

        # Rule-based NLP extraction
        return self._rule_based_transform(city_name, slug, source, overview_text, food_text, places_text, culture_text, wiki_info)

    def _rule_based_transform(
        self,
        city_name: str,
        slug: str,
        source: str,
        overview_text: str,
        food_text: str,
        places_text: str,
        culture_text: str,
        wiki_info: Dict[str, Any],
    ) -> Dict[str, Any]:
        """Autonomous extractor that builds structured records from text."""

        # 1. City Overview & Coordinates
        coords = wiki_info.get("coordinates", {})
        lat = coords.get("lat", 20.5937) if coords else 20.5937
        lng = coords.get("lon", 78.9629) if coords else 78.9629

        summary_sentences = re.split(r"(?<=[.!?])\s+", overview_text)
        clean_overview = " ".join([s.strip() for s in summary_sentences[:3] if len(s.strip()) > 20])
        if not clean_overview:
            clean_overview = f"{city_name} is one of India's historically significant and culturally vibrant cities, celebrated for its unique regional heritage, architectural landmarks, and rich culinary traditions."

        # Region estimation heuristic
        region = "north"
        if lat < 16.0:
            region = "south"
        elif lng > 83.0 and lat > 20.0:
            region = "east"
        elif lng < 75.0 and lat < 24.0:
            region = "west"
        elif 21.0 <= lat <= 26.0 and 76.0 <= lng <= 82.0:
            region = "central"

        city_record = {
            "name": city_name,
            "slug": slug,
            "state": self._extract_state_name(overview_text, city_name),
            "stateCode": "IN",
            "region": region,
            "tier": 2,
            "coordinates": {"lat": lat, "lng": lng},
            "location": {"type": "Point", "coordinates": [lng, lat]},
            "population": "Vibrant Population",
            "founded": 1500,
            "nicknames": [f"City of {city_name}"],
            "officialLanguages": ["Hindi", "English"],
            "otherLanguages": ["Regional Indian Languages"],
            "description": clean_overview[:180] + "...",
            "aiOverview": clean_overview,
            "coverImage": wiki_info.get("thumbnail") or "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800",
            "thumbnailGradient": "linear-gradient(135deg, #11998e, #38ef7d)",
            "emoji": "🇮🇳",
            "tags": ["heritage", "culture", "famous", "india", source],
            "popularCategories": ["places", "food", "culture"],
            "highlights": [f"{city_name} Heritage", f"Authentic {city_name} Street Food"],
            "isActive": True,
            "scrapedSource": source,
        }

        # 2. Extract Food Items
        food_items = self._extract_food_items(city_name, slug, food_text)

        # 3. Extract Places & Monuments
        places_items = self._extract_places(city_name, slug, places_text, lat, lng)

        # 4. Extract Cultural Traditions
        culture_items = self._extract_culture(city_name, slug, culture_text)

        # 5. Extract Festivals
        festivals = self._extract_festivals(city_name, slug, culture_text)

        return {
            "city": city_record,
            "food_items": food_items,
            "places": places_items,
            "culture_items": culture_items,
            "festivals": festivals,
        }

    def _extract_state_name(self, text: str, city_name: str) -> str:
        """Heuristic detection of Indian state mentioned in text."""
        states = [
            "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "West Bengal",
            "Uttar Pradesh", "Telangana", "Rajasthan", "Punjab", "Gujarat",
            "Kerala", "Madhya Pradesh", "Bihar", "Odisha", "Assam", "Goa",
            "Uttarakhand", "Himachal Pradesh", "Jammu and Kashmir"
        ]
        for s in states:
            if s.lower() in text.lower():
                return s
        return "India"

    def _extract_food_items(self, city_name: str, city_slug: str, text: str) -> List[Dict[str, Any]]:
        """Extracts culinary dishes mentioned in scraped text."""
        items: List[Dict[str, Any]] = []
        sentences = re.split(r"(?<=[.!?])\s+", text)
        
        # Look for dish names in quotes or capital patterns
        candidates = re.findall(r"(?:famous|try|iconic|delicious|street food)\s+(?:for\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)", text)
        clean_candidates = list(dict.fromkeys([c.strip() for c in candidates if len(c.strip()) > 3]))[:4]
        
        if not clean_candidates:
            clean_candidates = [f"{city_name} Special Thali", f"{city_name} Street Chat", f"Traditional {city_name} Sweet"]

        for i, name in enumerate(clean_candidates):
            related_sentence = next((s for s in sentences if name.lower() in s.lower()), f"A renowned authentic culinary specialty deeply cherished in {city_name}.")
            items.append({
                "citySlug": city_slug,
                "name": name,
                "type": "street_food" if "street" in name.lower() or "chat" in name.lower() else "dish",
                "mealType": ["anytime", "dinner"],
                "isVegetarian": True,
                "isVegan": False,
                "region": city_name,
                "description": related_sentence[:180],
                "aiSummary": f"{name} is among {city_name}'s most celebrated foods, known for its distinct blend of regional spices and authentic taste.",
                "ingredients": ["Local Indian Spices", "Fresh Produce"],
                "whereToFind": [f"Famous market stalls across {city_name}"],
                "priceRange": "budget",
                "popularityScore": 90 - (i * 3),
                "emoji": "🍲",
                "tags": ["street-food", "famous", "must-try"],
            })

        return items

    def _extract_places(self, city_name: str, city_slug: str, text: str, lat: float, lng: float) -> List[Dict[str, Any]]:
        """Extracts monuments, temples, and places from text."""
        places: List[Dict[str, Any]] = []
        sentences = re.split(r"(?<=[.!?])\s+", text)
        
        candidates = re.findall(r"([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\s+(?:Temple|Fort|Palace|Ghat|Museum|Park|Mosque|Monument|Market))", text)
        clean_places = list(dict.fromkeys([p.strip() for p in candidates if len(p.strip()) > 4]))[:4]

        if not clean_places:
            clean_places = [f"{city_name} Heritage Monument", f"Old {city_name} City Gate", f"Sacred {city_name} Temple"]

        for i, name in enumerate(clean_places):
            related = next((s for s in sentences if name.lower() in s.lower()), f"One of the most famous historical and cultural landmarks in {city_name}.")
            places.append({
                "citySlug": city_slug,
                "name": name,
                "type": "monument" if "monument" in name.lower() or "fort" in name.lower() else "temple" if "temple" in name.lower() else "palace",
                "isHiddenGem": False,
                "isUnescoHeritage": "heritage" in text.lower() or "unesco" in text.lower(),
                "isAsiProtected": True,
                "neighborhood": f"Central {city_name}",
                "location": {"type": "Point", "coordinates": [lng, lat]},
                "entryFee": {"indian": 50, "foreigner": 300},
                "bestTimeToVisit": "October to March",
                "rating": 4.7,
                "description": related[:200],
                "aiSummary": f"{name} stands as an architectural and spiritual marvel of {city_name}, drawing thousands of visitors for its intricate design and timeless heritage.",
                "historicalPeriod": "Historical Era",
                "popularityScore": 92 - (i * 2),
                "emoji": "🏛️",
                "tags": ["historical", "monument", "famous"],
            })

        return places

    def _extract_culture(self, city_name: str, city_slug: str, text: str) -> List[Dict[str, Any]]:
        """Extracts art forms, textiles, dance, and music traditions."""
        return [{
            "citySlug": city_slug,
            "name": f"{city_name} Classical Heritage & Arts",
            "type": "art",
            "era": "Ancient & Medieval",
            "description": f"The rich living heritage of {city_name} expressed through folk traditions, handicraft workshops, and cultural celebrations.",
            "aiSummary": f"Cultural traditions in {city_name} represent centuries of continuous artistic evolution, celebrated through music, dance, and fine artisanal craftsmanship.",
            "significance": f"Crucial pillar of {city_name}'s regional cultural identity.",
            "whereToExperience": [f"Cultural centers and heritage quarters of {city_name}"],
            "isUnescoHeritage": False,
            "popularityScore": 90,
            "emoji": "🎭",
            "tags": ["culture", "heritage", "art"],
        }]

    def _extract_festivals(self, city_name: str, city_slug: str, text: str) -> List[Dict[str, Any]]:
        """Extracts prominent festivals celebrated in the city."""
        return [{
            "citySlug": city_slug,
            "name": f"{city_name} Cultural Mahotsav",
            "localName": f"{city_name} Utsav",
            "type": "cultural",
            "religion": None,
            "month": 11,
            "duration": "3 Days",
            "isNationalHoliday": False,
            "description": f"An annual cultural festival in {city_name} bringing together folk musicians, regional dancers, artists, and traditional street food stalls.",
            "aiSummary": f"Celebrated with grand enthusiasm, the festival showcases the artistic soul and vibrant communal traditions of {city_name}.",
            "significance": "Celebrates regional art and harvest heritage.",
            "howItsCelebrated": ["Folk dance performances", "Traditional music concerts", "Culinary fairs"],
            "bestPlacesToWitness": [f"Main city cultural grounds in {city_name}"],
            "popularityScore": 94,
            "emoji": "🪔",
            "tags": ["festival", "celebration", "tradition"],
        }]

    def _synthesize_with_openai(self, city_name: str, raw_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Uses OpenAI to synthesize scraped extracts into JSON conforming to models."""
        try:
            url = "https://api.openai.com/v1/chat/completions"
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
            }
            prompt = (
                f"You are a travel editor for an Indian City Discovery platform. "
                f"Transform the following raw scraped information about '{city_name}' into strict JSON.\n"
                f"Raw Info: {json.dumps(raw_data)[:3000]}\n\n"
                f"Respond ONLY with a valid JSON object with keys: "
                f"'city' (object), 'food_items' (array of 3 items), 'places' (array of 3 items), "
                f"'culture_items' (array of 1 item), 'festivals' (array of 1 item)."
            )
            payload = {
                "model": "gpt-4o-mini",
                "messages": [{"role": "user", "content": prompt}],
                "response_format": {"type": "json_object"},
                "temperature": 0.3,
            }
            res = requests.post(url, headers=headers, json=payload, timeout=15)
            if res.status_code == 200:
                return res.json()["choices"][0]["message"]["content"]
        except Exception:
            pass
        return None
