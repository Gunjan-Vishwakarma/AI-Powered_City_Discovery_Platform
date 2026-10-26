'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { CITIES } from '@/data/cities';
import { fetchCities } from '@/lib/api';
import { City } from '@/types/city';
import styles from './FeaturedCities.module.css';

const REGION_COLORS: Record<string, string> = {
  north: 'linear-gradient(135deg, #f46b45, #eea849)',
  south: 'linear-gradient(135deg, #134e5e, #71b280)',
  east: 'linear-gradient(135deg, #4568dc, #b06ab3)',
  west: 'linear-gradient(135deg, #f7971e, #ffd200)',
  central: 'linear-gradient(135deg, #fc4a1a, #f7b733)',
  northeast: 'linear-gradient(135deg, #134e5e, #71b280)',
};

export default function FeaturedCities() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [citiesList, setCitiesList] = useState<City[]>(CITIES);

  useEffect(() => {
    fetchCities().then((res) => {
      if (res && res.length > 0) {
        setCitiesList(res);
      }
    });
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'right' ? 400 : -400, behavior: 'smooth' });
    }
  };

  const featured = citiesList.slice(0, 14);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <div className={styles.sectionLabel}>
              <span className={styles.labelDot} />
              Explore Cities
            </div>
            <h2 className={styles.title}>
              India&apos;s Most Vibrant<br />
              <span className={styles.titleAccent}>Cities to Discover</span>
            </h2>
            <p className={styles.subtitle}>
              From metro megacities to ancient heritage towns — every city tells a unique story.
            </p>
          </div>
          <div className={styles.controls}>
            <button className={styles.controlBtn} onClick={() => scroll('left')} aria-label="Scroll left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button className={styles.controlBtn} onClick={() => scroll('right')} aria-label="Scroll right">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
            <Link href="/cities" className={styles.viewAllBtn}>
              View All Cities
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div className={styles.track} ref={scrollRef}>
          {featured.map((city, idx) => (
            <Link
              key={city.id}
              href={`/city/${city.slug}`}
              className={styles.card}
              style={{ '--delay': `${idx * 0.06}s` } as React.CSSProperties}
            >
              {/* Card gradient banner */}
              <div
                className={styles.cardBanner}
                style={{ background: REGION_COLORS[city.region] || REGION_COLORS.north }}
              >
                <span className={styles.cardEmoji}>{city.emoji}</span>
                <div className={styles.cardOverlay} />
                <div className={styles.cardTier}>Tier {city.tier}</div>
              </div>

              {/* Card body */}
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <h3 className={styles.cardName}>{city.name}</h3>
                  <span className={styles.cardState}>{city.stateCode}</span>
                </div>
                <p className={styles.cardState2}>{city.state}</p>

                {/* Highlights */}
                <div className={styles.cardHighlights}>
                  {city.highlights.slice(0, 2).map(h => (
                    <span key={h} className={styles.highlight}>{h}</span>
                  ))}
                </div>

                {/* Categories */}
                <div className={styles.cardCategories}>
                  {city.popularCategories.map(cat => (
                    <span key={cat} className={styles.categoryDot}>
                      {cat === 'food' ? '🍛' : cat === 'culture' ? '🎭' : cat === 'language' ? '🗣️' : cat === 'places' ? '📍' : cat === 'festivals' ? '🎉' : '📰'}
                    </span>
                  ))}
                  <span className={styles.exploreText}>Explore →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all link bottom */}
        <div className={styles.viewAllBottom}>
          <Link href="/cities" className={styles.viewAllFullBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Browse All Indian Cities
          </Link>
        </div>
      </div>
    </section>
  );
}
