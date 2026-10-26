'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { City } from '@/types/city';
import { FoodItem, CultureItem, LanguageProfile, PlaceItem, FestivalItem, NewsItem, FeedCategory } from '@/types/feed';
import { CITIES } from '@/data/cities';
import styles from './CityHub.module.css';

interface CityHubClientProps {
  city: City;
  foodItems: FoodItem[];
  cultureItems: CultureItem[];
  languages: LanguageProfile[];
  places: PlaceItem[];
  festivals: FestivalItem[];
  news: NewsItem[];
}

type TabType = 'overview' | 'food' | 'culture' | 'language' | 'places' | 'festivals' | 'news';

const TABS: { id: TabType; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: '🌟' },
  { id: 'food', label: 'Food & Cuisine', icon: '🍛' },
  { id: 'culture', label: 'Culture & Arts', icon: '🎭' },
  { id: 'language', label: 'Language & Script', icon: '📜' },
  { id: 'places', label: 'Places & Heritage', icon: '🏛️' },
  { id: 'festivals', label: 'Festivals', icon: '🪅' },
  { id: 'news', label: 'Local News', icon: '📰' },
];

export default function CityHubClient({
  city,
  foodItems,
  cultureItems,
  languages,
  places,
  festivals,
  news,
}: CityHubClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = (searchParams.get('tab') as TabType) || 'overview';
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  // Sub-filters
  const [vegOnly, setVegOnly] = useState(false);
  const [unescoOnly, setUnescoOnly] = useState(false);
  const [hiddenGemsOnly, setHiddenGemsOnly] = useState(false);
  const [speakingPhrase, setSpeakingPhrase] = useState<string | null>(null);

  // Sync tab with URL
  useEffect(() => {
    const tabParam = searchParams.get('tab') as TabType;
    if (tabParam && TABS.some(t => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    const url = tab === 'overview' ? `/city/${city.slug}` : `/city/${city.slug}?tab=${tab}`;
    router.replace(url, { scroll: false });
  };

  // Text to speech for phrasebook
  const speakPhrase = (text: string, langCode: string = 'hi-IN') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = 0.85;
      setSpeakingPhrase(text);
      utterance.onend = () => setSpeakingPhrase(null);
      utterance.onerror = () => setSpeakingPhrase(null);
      window.speechSynthesis.speak(utterance);
    } else {
      alert(`Audio pronunciation: "${text}"`);
    }
  };

  // Filtered Food
  const filteredFood = foodItems.filter(f => (!vegOnly ? true : f.isVegetarian));

  // Filtered Places
  const filteredPlaces = places.filter(p => {
    if (unescoOnly && !p.isUnescoHeritage) return false;
    if (hiddenGemsOnly && !p.isHiddenGem) return false;
    return true;
  });

  // Nearby/Related Cities
  const relatedCities = CITIES.filter(c => c.slug !== city.slug && (c.region === city.region || c.tier === city.tier)).slice(0, 4);

  return (
    <div className={styles.wrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <Link href="/cities" className={styles.breadcrumbLink}>Cities</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span className={styles.breadcrumbCurrent}>{city.name}</span>
      </nav>

      {/* Hero Header */}
      <section className={styles.heroSection}>
        <div
          className={styles.heroBackdrop}
          style={{ background: city.thumbnailGradient || 'linear-gradient(135deg, #0c1a10, #112218)' }}
        >
          <div className={styles.backdropOverlay} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroTop}>
            <div className={styles.heroEmoji}>{city.emoji}</div>
            <div className={styles.heroTitles}>
              <div className={styles.badgeStrip}>
                <span className={styles.regionBadge}>{city.region.toUpperCase()} INDIA</span>
                <span className={styles.tierBadge}>Tier {city.tier} City</span>
                <span className={styles.stateBadge}>{city.state}</span>
              </div>
              <h1 className={styles.heroCityName}>{city.name}</h1>
              {city.nicknames.length > 0 && (
                <p className={styles.heroNicknames}>
                  Known as <span className={styles.nicknameHighlight}>"{city.nicknames.join(' • ')}"</span>
                </p>
              )}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className={styles.heroMetrics}>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Population</span>
              <span className={styles.metricValue}>{city.population}</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Founded Year</span>
              <span className={styles.metricValue}>{city.founded} CE</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Official Language</span>
              <span className={styles.metricValue}>{city.officialLanguages.join(', ')}</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Coordinates</span>
              <span className={styles.metricValue}>
                {city.coordinates.lat.toFixed(2)}°N, {city.coordinates.lng.toFixed(2)}°E
              </span>
            </div>
          </div>

          {/* AI Cultural Synthesis Card */}
          <div className={styles.aiOverviewCard}>
            <div className={styles.aiHeader}>
              <div className={styles.aiTitleGroup}>
                <span className={styles.aiSparkle}>✨</span>
                <span className={styles.aiTitle}>AI Cultural Synthesis</span>
                <span className={styles.aiTag}>Verified Indian Knowledge</span>
              </div>
              <span className={styles.aiModel}>GPT-4o-mini & Indian Heritage RAG</span>
            </div>
            <p className={styles.aiText}>{city.aiOverview}</p>
          </div>
        </div>
      </section>

      {/* Navigation Tab Bar */}
      <div className={styles.tabBarContainer}>
        <div className={styles.tabBar}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTabBtn : ''}`}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Display */}
      <section className={styles.tabContentArea}>
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className={styles.overviewSection}>
            <div className={styles.overviewGrid}>
              {/* Food Spotlight */}
              <div className={styles.spotlightCard}>
                <div className={styles.spotlightHeader}>
                  <span className={styles.spotlightIcon}>🍛</span>
                  <h3 className={styles.spotlightTitle}>Culinary Signature</h3>
                  <button onClick={() => handleTabChange('food')} className={styles.viewMoreBtn}>
                    View All Dishes →
                  </button>
                </div>
                {foodItems.length > 0 ? (
                  <div className={styles.dishMiniPreview}>
                    <div className={styles.dishMiniTop}>
                      <span className={styles.dishMiniEmoji}>{foodItems[0].emoji}</span>
                      <div>
                        <h4 className={styles.dishMiniName}>{foodItems[0].name}</h4>
                        <span className={styles.dishMiniType}>
                          {foodItems[0].isVegetarian ? '🟢 Pure Vegetarian' : '🔴 Non-Vegetarian'} • {foodItems[0].type}
                        </span>
                      </div>
                    </div>
                    <p className={styles.dishMiniDesc}>{foodItems[0].aiSummary}</p>
                    <div className={styles.whereToFind}>
                      <span className={styles.whereLabel}>Famous at:</span>
                      <span className={styles.whereText}>{foodItems[0].whereToFind.join(', ')}</span>
                    </div>
                  </div>
                ) : (
                  <p className={styles.emptyNotice}>Curating culinary hotspots...</p>
                )}
              </div>

              {/* Language Spotlight */}
              <div className={styles.spotlightCard}>
                <div className={styles.spotlightHeader}>
                  <span className={styles.spotlightIcon}>📜</span>
                  <h3 className={styles.spotlightTitle}>Linguistic Soul</h3>
                  <button onClick={() => handleTabChange('language')} className={styles.viewMoreBtn}>
                    Explore Phrasebook →
                  </button>
                </div>
                {languages.length > 0 ? (
                  <div className={styles.langMiniPreview}>
                    <div className={styles.langMiniTitle}>
                      <span className={styles.langNative}>{languages[0].nativeName}</span>
                      <span className={styles.langName}>({languages[0].name})</span>
                    </div>
                    <p className={styles.langSnippet}>{languages[0].aiSummary}</p>
                    <div className={styles.samplePhrase}>
                      <span className={styles.phraseLocal}>{languages[0].commonPhrases[0]?.local}</span>
                      <span className={styles.phraseTrans}>"{languages[0].commonPhrases[0]?.transliteration}"</span>
                      <span className={styles.phraseEng}>= {languages[0].commonPhrases[0]?.english}</span>
                    </div>
                  </div>
                ) : (
                  <p className={styles.emptyNotice}>Curating linguistic profile...</p>
                )}
              </div>

              {/* Places Spotlight */}
              <div className={styles.spotlightCard}>
                <div className={styles.spotlightHeader}>
                  <span className={styles.spotlightIcon}>🏛️</span>
                  <h3 className={styles.spotlightTitle}>Heritage Landmark</h3>
                  <button onClick={() => handleTabChange('places')} className={styles.viewMoreBtn}>
                    View All Places →
                  </button>
                </div>
                {places.length > 0 ? (
                  <div className={styles.placeMiniPreview}>
                    <div className={styles.placeMiniTop}>
                      <span className={styles.placeEmoji}>{places[0].emoji}</span>
                      <div>
                        <h4 className={styles.placeName}>{places[0].name}</h4>
                        <span className={styles.placeNeighborhood}>{places[0].neighborhood}</span>
                      </div>
                    </div>
                    <p className={styles.placeDesc}>{places[0].aiSummary}</p>
                    <div className={styles.placeMeta}>
                      <span>⭐ {places[0].rating} Rating</span>
                      <span>Best time: {places[0].bestTimeToVisit}</span>
                    </div>
                  </div>
                ) : (
                  <p className={styles.emptyNotice}>Curating places...</p>
                )}
              </div>

              {/* Culture & Festival Spotlight */}
              <div className={styles.spotlightCard}>
                <div className={styles.spotlightHeader}>
                  <span className={styles.spotlightIcon}>🪅</span>
                  <h3 className={styles.spotlightTitle}>Iconic Festival</h3>
                  <button onClick={() => handleTabChange('festivals')} className={styles.viewMoreBtn}>
                    View Festivals →
                  </button>
                </div>
                {festivals.length > 0 ? (
                  <div className={styles.festMiniPreview}>
                    <div className={styles.festMiniTop}>
                      <span className={styles.festEmoji}>{festivals[0].emoji}</span>
                      <div>
                        <h4 className={styles.festName}>{festivals[0].name}</h4>
                        <span className={styles.festLocal}>{festivals[0].localName}</span>
                      </div>
                    </div>
                    <p className={styles.festDesc}>{festivals[0].aiSummary}</p>
                    <div className={styles.festRituals}>
                      <span className={styles.festRitualLabel}>Highlights:</span>
                      <span className={styles.festRitualText}>{festivals[0].howItsCelebrated.slice(0, 2).join(' • ')}</span>
                    </div>
                  </div>
                ) : (
                  <p className={styles.emptyNotice}>Curating festivals...</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* FOOD TAB */}
        {activeTab === 'food' && (
          <div className={styles.tabSection}>
            <div className={styles.sectionToolbar}>
              <div className={styles.toolbarInfo}>
                <h2 className={styles.sectionHeading}>Authentic Regional Cuisine & Street Food</h2>
                <p className={styles.sectionSub}>
                  Centuries-old recipes, bustling food streets, and local ingredients that define {city.name}'s flavor.
                </p>
              </div>
              <div className={styles.toolbarFilter}>
                <button
                  onClick={() => setVegOnly(!vegOnly)}
                  className={`${styles.filterToggle} ${vegOnly ? styles.toggleActive : ''}`}
                >
                  🟢 Pure Vegetarian Only
                </button>
              </div>
            </div>

            <div className={styles.cardsGrid}>
              {filteredFood.map(item => (
                <div key={item.id} className={styles.glassCard}>
                  <div className={styles.cardTopRow}>
                    <span className={styles.cardEmoji}>{item.emoji}</span>
                    <div className={styles.cardTitleWrap}>
                      <h3 className={styles.cardTitle}>{item.name}</h3>
                      <span className={styles.cardSubtitle}>
                        {item.isVegetarian ? (
                          <span className={styles.vegBadge}>🟢 Vegetarian</span>
                        ) : (
                          <span className={styles.nonVegBadge}>🔴 Non-Veg</span>
                        )}
                        {' • '}
                        <span className={styles.tagPill}>{item.type.replace('_', ' ')}</span>
                      </span>
                    </div>
                    <span className={styles.priceTag}>₹ {item.priceRange.toUpperCase()}</span>
                  </div>

                  <p className={styles.cardAiSummary}>{item.aiSummary}</p>

                  <div className={styles.ingredientsBox}>
                    <span className={styles.boxLabel}>Key Ingredients:</span>
                    <div className={styles.pillsList}>
                      {item.ingredients.map((ing, i) => (
                        <span key={i} className={styles.microPill}>{ing}</span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.whereBox}>
                    <span className={styles.boxLabel}>Where to Taste:</span>
                    <p className={styles.whereText}>{item.whereToFind.join(' • ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CULTURE TAB */}
        {activeTab === 'culture' && (
          <div className={styles.tabSection}>
            <div className={styles.sectionToolbar}>
              <div className={styles.toolbarInfo}>
                <h2 className={styles.sectionHeading}>Living Heritage, Classical Arts & Performing Traditions</h2>
                <p className={styles.sectionSub}>
                  From ancient temple rituals to tribal paintings and classical dance academies in {city.name}.
                </p>
              </div>
            </div>

            <div className={styles.cardsGrid}>
              {cultureItems.map(item => (
                <div key={item.id} className={styles.glassCard}>
                  <div className={styles.cardTopRow}>
                    <span className={styles.cardEmoji}>{item.emoji}</span>
                    <div className={styles.cardTitleWrap}>
                      <h3 className={styles.cardTitle}>{item.name}</h3>
                      <span className={styles.cardSubtitle}>
                        {item.era} Era • {item.type.toUpperCase()}
                      </span>
                    </div>
                    {item.isUnescoHeritage && (
                      <span className={styles.unescoBadge}>🏛️ UNESCO Recognized</span>
                    )}
                  </div>

                  <p className={styles.cardAiSummary}>{item.aiSummary}</p>

                  <div className={styles.significanceBox}>
                    <span className={styles.boxLabel}>Cultural Significance:</span>
                    <p className={styles.significanceText}>{item.significance}</p>
                  </div>

                  {item.whereToExperience && item.whereToExperience.length > 0 && (
                    <div className={styles.whereBox}>
                      <span className={styles.boxLabel}>Where to Experience:</span>
                      <p className={styles.whereText}>{item.whereToExperience.join(' • ')}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LANGUAGE TAB */}
        {activeTab === 'language' && (
          <div className={styles.tabSection}>
            <div className={styles.sectionToolbar}>
              <div className={styles.toolbarInfo}>
                <h2 className={styles.sectionHeading}>Language, Script & Interactive Phrasebook</h2>
                <p className={styles.sectionSub}>
                  Linguistic roots, classical status, native scripts, and handy conversational phrases for travellers.
                </p>
              </div>
            </div>

            {languages.map(lang => (
              <div key={lang.id} className={styles.languageContainer}>
                {/* Language Profile Overview Card */}
                <div className={styles.languageProfileCard}>
                  <div className={styles.langProfileHeader}>
                    <div className={styles.langScriptDisplay}>
                      <span className={styles.largeScript}>{lang.nativeName}</span>
                      <span className={styles.scriptLabel}>{lang.script}</span>
                    </div>
                    <div className={styles.langProfileDetails}>
                      <div className={styles.langBadgeRow}>
                        <span className={styles.langRoleBadge}>{lang.role.toUpperCase()}</span>
                        {lang.isClassicalLanguage && (
                          <span className={styles.classicalBadge}>⭐ Classical Language of India</span>
                        )}
                        <span className={styles.speakersBadge}>🗣️ {lang.nativeSpeakers} Speakers</span>
                      </div>
                      <h3 className={styles.langTitle}>{lang.name}</h3>
                      <p className={styles.langFamily}>
                        Family: <strong>{lang.family}</strong> • ISO Code: <strong>{lang.isoCode}</strong>
                      </p>
                      <p className={styles.langAiSummary}>{lang.aiSummary}</p>
                    </div>
                  </div>

                  {/* Unique Features */}
                  <div className={styles.uniqueFeaturesWrap}>
                    <h4 className={styles.subTitle}>Unique Linguistic Characteristics</h4>
                    <div className={styles.featuresList}>
                      {lang.uniqueFeatures.map((feat, i) => (
                        <div key={i} className={styles.featureItem}>
                          <span className={styles.featureDot}></span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dialects */}
                  {lang.dialects.length > 0 && (
                    <div className={styles.dialectsWrap}>
                      <span className={styles.boxLabel}>Regional Dialects:</span>
                      <div className={styles.pillsList}>
                        {lang.dialects.map((d, i) => (
                          <span key={i} className={styles.microPill}>{d}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Phrasebook Section */}
                <div className={styles.phrasebookSection}>
                  <div className={styles.phrasebookHeader}>
                    <h3 className={styles.phrasebookTitle}>Conversational Phrasebook</h3>
                    <p className={styles.phrasebookSubtitle}>
                      Click the "🔊 Listen" button on any phrase to hear the simulated spoken pronunciation.
                    </p>
                  </div>

                  <div className={styles.phraseGrid}>
                    {lang.commonPhrases.map((phrase, i) => (
                      <div key={i} className={styles.phraseCard}>
                        <div className={styles.phraseTop}>
                          <span className={styles.englishText}>{phrase.english}</span>
                          <button
                            onClick={() => speakPhrase(phrase.local, lang.isoCode === 'mr' ? 'mr-IN' : lang.isoCode === 'ta' ? 'ta-IN' : lang.isoCode === 'bn' ? 'bn-IN' : lang.isoCode === 'te' ? 'te-IN' : lang.isoCode === 'kn' ? 'kn-IN' : 'hi-IN')}
                            className={`${styles.audioBtn} ${speakingPhrase === phrase.local ? styles.speaking : ''}`}
                            title="Listen to pronunciation"
                          >
                            <span>🔊</span>
                            <span>{speakingPhrase === phrase.local ? 'Speaking...' : 'Listen'}</span>
                          </button>
                        </div>
                        <div className={styles.phraseNativeScript}>{phrase.local}</div>
                        <div className={styles.phraseTranslit}>
                          Transliteration: <em>{phrase.transliteration}</em>
                        </div>
                        <div className={styles.phrasePronounce}>
                          Pronunciation: <code>{phrase.pronunciation}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PLACES TAB */}
        {activeTab === 'places' && (
          <div className={styles.tabSection}>
            <div className={styles.sectionToolbar}>
              <div className={styles.toolbarInfo}>
                <h2 className={styles.sectionHeading}>Monuments, Sacred Temples, Ghats & Viewpoints</h2>
                <p className={styles.sectionSub}>
                  Historical marvels, architectural wonders, and secret gems across {city.name}.
                </p>
              </div>
              <div className={styles.toolbarFilter}>
                <button
                  onClick={() => setUnescoOnly(!unescoOnly)}
                  className={`${styles.filterToggle} ${unescoOnly ? styles.toggleActive : ''}`}
                >
                  🏛️ UNESCO Sites Only
                </button>
                <button
                  onClick={() => setHiddenGemsOnly(!hiddenGemsOnly)}
                  className={`${styles.filterToggle} ${hiddenGemsOnly ? styles.toggleActive : ''}`}
                >
                  💎 Hidden Gems Only
                </button>
              </div>
            </div>

            <div className={styles.cardsGrid}>
              {filteredPlaces.map(place => (
                <div key={place.id} className={styles.glassCard}>
                  <div className={styles.cardTopRow}>
                    <span className={styles.cardEmoji}>{place.emoji}</span>
                    <div className={styles.cardTitleWrap}>
                      <h3 className={styles.cardTitle}>{place.name}</h3>
                      <span className={styles.cardSubtitle}>
                        {place.neighborhood} • {place.type.toUpperCase()}
                      </span>
                    </div>
                    <span className={styles.ratingBadge}>⭐ {place.rating}</span>
                  </div>

                  <p className={styles.cardAiSummary}>{place.aiSummary}</p>

                  <div className={styles.placeDetailsGrid}>
                    <div className={styles.placeDetailCol}>
                      <span className={styles.boxLabel}>Entry Fee:</span>
                      <span className={styles.detailValue}>
                        {place.entryFee.indian === 0 ? 'Free Entry' : `₹${place.entryFee.indian} (Indians)`}
                      </span>
                    </div>
                    <div className={styles.placeDetailCol}>
                      <span className={styles.boxLabel}>Best Time:</span>
                      <span className={styles.detailValue}>{place.bestTimeToVisit}</span>
                    </div>
                    <div className={styles.placeDetailCol}>
                      <span className={styles.boxLabel}>Period:</span>
                      <span className={styles.detailValue}>{place.historicalPeriod}</span>
                    </div>
                  </div>

                  <div className={styles.tagsRow}>
                    {place.isUnescoHeritage && <span className={styles.unescoTag}>UNESCO Site</span>}
                    {place.isHiddenGem && <span className={styles.hiddenGemTag}>Hidden Gem</span>}
                    {place.isAsiProtected && <span className={styles.asiTag}>ASI Protected</span>}
                    {place.tags.slice(0, 3).map((t, i) => (
                      <span key={i} className={styles.microPill}>#{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FESTIVALS TAB */}
        {activeTab === 'festivals' && (
          <div className={styles.tabSection}>
            <div className={styles.sectionToolbar}>
              <div className={styles.toolbarInfo}>
                <h2 className={styles.sectionHeading}>Grand Celebrations, Melas & Spiritual Festivals</h2>
                <p className={styles.sectionSub}>
                  Witness the mass devotion, public art, and traditional festivities that bring {city.name} alive.
                </p>
              </div>
            </div>

            <div className={styles.cardsGrid}>
              {festivals.map(fest => (
                <div key={fest.id} className={styles.glassCard}>
                  <div className={styles.cardTopRow}>
                    <span className={styles.cardEmoji}>{fest.emoji}</span>
                    <div className={styles.cardTitleWrap}>
                      <h3 className={styles.cardTitle}>{fest.name}</h3>
                      <span className={styles.cardSubtitle}>
                        Native: <strong>{fest.localName}</strong> • {fest.duration}
                      </span>
                    </div>
                    <span className={styles.monthBadge}>Month: {fest.month}</span>
                  </div>

                  <p className={styles.cardAiSummary}>{fest.aiSummary}</p>

                  <div className={styles.significanceBox}>
                    <span className={styles.boxLabel}>Significance:</span>
                    <p className={styles.significanceText}>{fest.significance}</p>
                  </div>

                  <div className={styles.ritualsBox}>
                    <span className={styles.boxLabel}>Rituals & Celebrations:</span>
                    <div className={styles.featuresList}>
                      {fest.howItsCelebrated.map((r, i) => (
                        <div key={i} className={styles.featureItem}>
                          <span className={styles.featureDot}></span>
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {fest.bestPlacesToWitness && fest.bestPlacesToWitness.length > 0 && (
                    <div className={styles.whereBox}>
                      <span className={styles.boxLabel}>Best Places in City to Witness:</span>
                      <p className={styles.whereText}>{fest.bestPlacesToWitness.join(' • ')}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEWS TAB */}
        {activeTab === 'news' && (
          <div className={styles.tabSection}>
            <div className={styles.sectionToolbar}>
              <div className={styles.toolbarInfo}>
                <h2 className={styles.sectionHeading}>Local News, Civic Updates & Cultural Happenings</h2>
                <p className={styles.sectionSub}>
                  Latest developments, restoration initiatives, and community highlights in {city.name}.
                </p>
              </div>
            </div>

            <div className={styles.cardsGrid}>
              {news.map(n => (
                <div key={n.id} className={styles.glassCard}>
                  <div className={styles.cardTopRow}>
                    <span className={styles.cardEmoji}>{n.emoji}</span>
                    <div className={styles.cardTitleWrap}>
                      <h3 className={styles.cardTitle}>{n.title}</h3>
                      <span className={styles.cardSubtitle}>
                        {n.sourceName} • {n.publishedAt}
                      </span>
                    </div>
                    <span className={styles.tagPill}>{n.category.toUpperCase()}</span>
                  </div>

                  <p className={styles.cardAiSummary}>{n.aiSummary}</p>

                  <div className={styles.tagsRow}>
                    {n.tags.map((t, i) => (
                      <span key={i} className={styles.microPill}>#{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Related Cities Carousel */}
      <section className={styles.relatedSection}>
        <div className={styles.relatedHeader}>
          <h3 className={styles.relatedTitle}>Explore More in {city.region.toUpperCase()} India & Similar Tiers</h3>
          <Link href="/cities" className={styles.viewAllCitiesBtn}>
            View All 18+ Cities →
          </Link>
        </div>
        <div className={styles.relatedGrid}>
          {relatedCities.map(c => (
            <Link key={c.slug} href={`/city/${c.slug}`} className={styles.relatedCard}>
              <span className={styles.relatedEmoji}>{c.emoji}</span>
              <div className={styles.relatedInfo}>
                <span className={styles.relatedName}>{c.name}</span>
                <span className={styles.relatedState}>{c.state}</span>
              </div>
              <span className={styles.relatedArrow}>→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
