'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { searchCitiesApi } from '@/lib/api';
import { CitySearchResult } from '@/types/city';
import styles from './HeroSection.module.css';

const ROTATING_WORDS = ['Culture', 'Cuisine', 'Language', 'Festivals', 'Heritage', 'Stories'];

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CitySearchResult[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Rotating word animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setWordIndex(prev => (prev + 1) % ROTATING_WORDS.length);
        setIsAnimating(false);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Search
  useEffect(() => {
    let active = true;
    if (query.length > 1) {
      searchCitiesApi(query).then((res) => {
        if (active) {
          setResults(res);
          setIsDropdownOpen(true);
        }
      });
    } else {
      setResults([]);
      setIsDropdownOpen(false);
    }
    return () => {
      active = false;
    };
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (city: CitySearchResult) => {
    setQuery('');
    setIsDropdownOpen(false);
    router.push(`/city/${city.slug}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) handleSelect(results[0]);
  };

  const POPULAR = ['Mumbai', 'Delhi', 'Jaipur', 'Varanasi', 'Kolkata', 'Chennai', 'Amritsar', 'Hyderabad'];

  return (
    <section className={styles.hero}>
      {/* Animated background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* Grid overlay */}
      <div className={styles.gridOverlay} />

      {/* Floating particles */}
      <div className={styles.particles}>
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={styles.particle} style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      <div className={styles.content}>
        {/* Badge */}
        <div className={`${styles.badge} animate-fade-in-up`}>
          <span className={styles.badgeDot} />
          <span>AI-Powered Discovery Platform</span>
          <span className={styles.badgeSeparator}>•</span>
          <span>18+ Indian Cities</span>
        </div>

        {/* Heading */}
        <h1 className={`${styles.heading} animate-fade-in-up delay-100`}>
          <span className={styles.headingLine1}>Discover</span>
          <span className={styles.headingLine2}>
            <span className={styles.headingIndia}>India's</span>
          </span>
          <span className={styles.headingLine3}>
            <span className={`${styles.rotatingWord} ${isAnimating ? styles.exit : styles.enter}`}>
              {ROTATING_WORDS[wordIndex]}
            </span>
          </span>
        </h1>

        {/* Subheading */}
        <p className={`${styles.subheading} animate-fade-in-up delay-200`}>
          Explore the soul of every Indian city — its food, art, language,
          festivals, hidden gems, and living stories. All in one place.
        </p>

        {/* Search Bar */}
        <div className={`${styles.searchContainer} animate-fade-in-up delay-300`} ref={dropdownRef}>
          <form className={styles.searchForm} onSubmit={handleSubmit}>
            <div className={`${styles.searchBar} ${isDropdownOpen ? styles.active : ''}`}>
              <span className={styles.searchIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </span>
              <input
                id="hero-city-search"
                type="text"
                className={styles.searchInput}
                placeholder="Search Mumbai, Delhi, Jaipur, Varanasi..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoComplete="off"
              />
              <button type="submit" className={styles.searchBtn}>
                <span>Explore</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            {/* Search Dropdown */}
            {isDropdownOpen && results.length > 0 && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownHeader}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  <span>Cities matching &quot;{query}&quot;</span>
                </div>
                {results.map(city => (
                  <button key={city.id} type="button" className={styles.dropdownItem} onClick={() => handleSelect(city)}>
                    <span className={styles.itemEmoji}>{city.emoji}</span>
                    <div className={styles.itemInfo}>
                      <span className={styles.itemName}>{city.name}</span>
                      <span className={styles.itemMeta}>{city.state} · Tier {city.tier}</span>
                    </div>
                    <div className={styles.itemTags}>
                      {city.tags?.slice(0, 2).map((tag: string) => (
                        <span key={tag} className={styles.itemTag}>{tag}</span>
                      ))}
                    </div>
                    <svg className={styles.itemArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                ))}
              </div>
            )}
          </form>

          {/* Popular city pills */}
          <div className={styles.popularCities}>
            <span className={styles.popularLabel}>Popular:</span>
            {POPULAR.map(name => (
              <button
                key={name}
                className={styles.popularPill}
                onClick={() => router.push(`/city/${name.toLowerCase()}`)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Chips */}
        <div className={`${styles.categoryChips} animate-fade-in-up delay-400`}>
          {[
            { label: 'Food & Cuisine', emoji: '🍛' },
            { label: 'Culture & Arts', emoji: '🎭' },
            { label: 'Language', emoji: '🗣️' },
            { label: 'Places', emoji: '📍' },
            { label: 'Festivals', emoji: '🎉' },
            { label: 'News', emoji: '📰' },
          ].map(chip => (
            <span key={chip.label} className={styles.chip}>
              {chip.emoji} {chip.label}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll to explore</span>
        <div className={`${styles.scrollDot} animate-bounce-soft`} />
      </div>

      {/* Bottom city skyline */}
      <div className={styles.skyline}>
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,200 L0,160 L30,160 L30,100 L50,100 L50,80 L70,80 L70,100 L90,100 L90,130 L120,130 L120,60 L140,60 L140,40 L160,40 L160,60 L180,60 L180,130 L210,130 L210,90 L230,90 L230,50 L250,50 L250,90 L270,90 L270,130 L300,130 L300,80 L320,80 L320,55 L340,55 L340,80 L360,80 L360,130 L380,130 L380,100 L400,100 L400,70 L420,70 L420,100 L440,100 L440,130 L470,130 L470,50 L490,50 L490,30 L510,30 L510,50 L530,50 L530,130 L560,130 L560,80 L580,80 L580,120 L600,120 L600,130 L630,130 L630,60 L650,60 L650,40 L670,40 L670,60 L690,60 L690,130 L720,130 L720,90 L740,90 L740,60 L760,60 L760,90 L780,90 L780,130 L810,130 L810,70 L830,70 L830,45 L850,45 L850,70 L870,70 L870,130 L900,130 L900,90 L920,90 L920,130 L950,130 L950,60 L970,60 L970,35 L990,35 L990,60 L1010,60 L1010,130 L1040,130 L1040,80 L1060,80 L1060,55 L1080,55 L1080,80 L1100,80 L1100,130 L1130,130 L1130,100 L1150,100 L1150,70 L1170,70 L1170,100 L1190,100 L1190,130 L1220,130 L1220,50 L1240,50 L1240,130 L1270,130 L1270,80 L1290,80 L1290,130 L1320,130 L1320,90 L1340,90 L1340,130 L1370,130 L1370,160 L1440,160 L1440,200 Z" 
                fill="rgba(74,222,128,0.06)"/>
          <path d="M0,200 L0,170 L40,170 L40,140 L70,140 L70,120 L100,120 L100,140 L140,140 L140,170 L180,170 L180,150 L220,150 L220,170 L260,170 L260,140 L300,140 L300,170 L340,170 L340,150 L380,150 L380,130 L420,130 L420,150 L460,150 L460,170 L500,170 L500,140 L540,140 L540,170 L580,170 L580,150 L620,150 L620,170 L660,170 L660,145 L700,145 L700,170 L740,170 L740,140 L780,140 L780,120 L820,120 L820,140 L860,140 L860,170 L900,170 L900,150 L940,150 L940,170 L980,170 L980,145 L1020,145 L1020,170 L1060,170 L1060,140 L1100,140 L1100,160 L1140,160 L1140,170 L1180,170 L1180,150 L1220,150 L1220,130 L1260,130 L1260,150 L1300,150 L1300,170 L1340,170 L1340,155 L1380,155 L1380,170 L1440,170 L1440,200 Z" 
                fill="rgba(34,197,94,0.04)"/>
        </svg>
      </div>
    </section>
  );
}
