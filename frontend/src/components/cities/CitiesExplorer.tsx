'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { CITIES } from '@/data/cities';
import { fetchCities } from '@/lib/api';
import { City, CityRegion, CityTier } from '@/types/city';
import StatesTable from '@/components/states/StatesTable';
import styles from './CitiesExplorer.module.css';

const REGIONS: { id: CityRegion | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'All India', icon: '🇮🇳' },
  { id: 'north', label: 'North India', icon: '🏔️' },
  { id: 'south', label: 'South India', icon: '🌴' },
  { id: 'west', label: 'West India', icon: '🌊' },
  { id: 'east', label: 'East India', icon: '🪷' },
  { id: 'central', label: 'Central India', icon: '🐅' },
];

const TIERS: { id: CityTier | 'all'; label: string }[] = [
  { id: 'all', label: 'All Tiers' },
  { id: 1, label: 'Tier 1 Metro' },
  { id: 2, label: 'Tier 2 Major' },
  { id: 3, label: 'Tier 3 Heritage' },
];

export default function CitiesExplorer() {
  const [citiesList, setCitiesList] = useState<City[]>(CITIES);
  const [viewMode, setViewMode] = useState<'cards' | 'states'>('cards');
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<CityRegion | 'all'>('all');
  const [selectedTier, setSelectedTier] = useState<CityTier | 'all'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'founded'>('default');

  useEffect(() => {
    fetchCities().then((res) => {
      if (res && res.length > 0) {
        setCitiesList(res);
      }
    });
  }, []);

  const filteredCities = useMemo(() => {
    let list = [...citiesList];

    // Filter by Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.state.toLowerCase().includes(q) ||
          c.nicknames.some(n => n.toLowerCase().includes(q)) ||
          c.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Filter by Region
    if (selectedRegion !== 'all') {
      list = list.filter(c => c.region === selectedRegion);
    }

    // Filter by Tier
    if (selectedTier !== 'all') {
      list = list.filter(c => c.tier === selectedTier);
    }

    // Sort
    if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'founded') {
      list.sort((a, b) => a.founded - b.founded);
    }

    return list;
  }, [search, selectedRegion, selectedTier, sortBy]);

  return (
    <div className={styles.explorer}>
      {/* View Switcher: City Cards vs States & Cities Table */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '8px' }}>
        <button
          onClick={() => setViewMode('cards')}
          style={{
            padding: '10px 22px',
            borderRadius: '12px',
            border: viewMode === 'cards' ? '1px solid #16a34a' : '1px solid rgba(255,255,255,0.1)',
            background: viewMode === 'cards' ? 'rgba(22, 163, 74, 0.18)' : 'rgba(255,255,255,0.03)',
            color: viewMode === 'cards' ? '#4ade80' : 'rgba(255,255,255,0.7)',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>🏙️</span> City Cards
        </button>
        <button
          onClick={() => setViewMode('states')}
          style={{
            padding: '10px 22px',
            borderRadius: '12px',
            border: viewMode === 'states' ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
            background: viewMode === 'states' ? 'rgba(245, 158, 11, 0.18)' : 'rgba(255,255,255,0.03)',
            color: viewMode === 'states' ? '#fbbf24' : 'rgba(255,255,255,0.7)',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>🗺️</span> States & Cities Table
        </button>
      </div>

      {viewMode === 'states' ? (
        <StatesTable />
      ) : (
        <>
          {/* Control Panel Bar */}
          <div className={styles.controlsBar}>
        {/* Search Input */}
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by city, state, nickname, or tags (e.g. street-food, heritage)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          {search && (
            <button onClick={() => setSearch('')} className={styles.clearBtn} aria-label="Clear search">
              ✕
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className={styles.sortWrapper}>
          <label htmlFor="citySort" className={styles.sortLabel}>Sort by:</label>
          <select
            id="citySort"
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className={styles.sortSelect}
          >
            <option value="default">Featured Ranking</option>
            <option value="name">City Name (A-Z)</option>
            <option value="founded">Oldest Founded Year</option>
          </select>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className={styles.filtersSection}>
        {/* Region Pills */}
        <div className={styles.pillGroup}>
          <span className={styles.filterTitle}>Region:</span>
          <div className={styles.pills}>
            {REGIONS.map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`${styles.filterPill} ${selectedRegion === r.id ? styles.activePill : ''}`}
              >
                <span>{r.icon}</span>
                <span>{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tier Pills */}
        <div className={styles.pillGroup}>
          <span className={styles.filterTitle}>Tier:</span>
          <div className={styles.pills}>
            {TIERS.map(t => (
              <button
                key={String(t.id)}
                onClick={() => setSelectedTier(t.id)}
                className={`${styles.filterPill} ${selectedTier === t.id ? styles.activePill : ''}`}
              >
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count & Active Tags */}
      <div className={styles.resultsInfo}>
        <div className={styles.countText}>
          Showing <span className={styles.highlightCount}>{filteredCities.length}</span> Indian cities
          {selectedRegion !== 'all' && ` in ${REGIONS.find(r => r.id === selectedRegion)?.label}`}
          {selectedTier !== 'all' && ` (${TIERS.find(t => t.id === selectedTier)?.label})`}
        </div>
        {(search || selectedRegion !== 'all' || selectedTier !== 'all') && (
          <button
            onClick={() => {
              setSearch('');
              setSelectedRegion('all');
              setSelectedTier('all');
            }}
            className={styles.resetFiltersBtn}
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Cities Grid */}
      {filteredCities.length > 0 ? (
        <div className={styles.grid}>
          {filteredCities.map((city: City) => (
            <div key={city.slug} className={styles.card}>
              {/* Card Banner Image / Gradient */}
              <div
                className={styles.cardHeader}
                style={{
                  background: city.thumbnailGradient || 'linear-gradient(135deg, #112218, #1a3325)',
                }}
              >
                <div className={styles.headerOverlay} />
                <div className={styles.headerContent}>
                  <div className={styles.cityIdentity}>
                    <span className={styles.cityEmoji}>{city.emoji}</span>
                    <div>
                      <h2 className={styles.cityName}>{city.name}</h2>
                      <span className={styles.cityState}>
                        {city.state} • <span className={styles.regionTag}>{city.region.toUpperCase()}</span>
                      </span>
                    </div>
                  </div>
                  <span className={styles.tierBadge}>Tier {city.tier}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className={styles.cardBody}>
                {/* Nicknames */}
                {city.nicknames.length > 0 && (
                  <div className={styles.nicknamesRow}>
                    <span className={styles.nicknamesText}>
                      "{city.nicknames.slice(0, 2).join(' • ')}"
                    </span>
                  </div>
                )}

                {/* Key Metrics */}
                <div className={styles.metricsRow}>
                  <div className={styles.metric}>
                    <span className={styles.metricLbl}>Population</span>
                    <span className={styles.metricVal}>{city.population}</span>
                  </div>
                  <div className={styles.metric}>
                    <span className={styles.metricLbl}>Founded</span>
                    <span className={styles.metricVal}>{city.founded} CE</span>
                  </div>
                  <div className={styles.metric}>
                    <span className={styles.metricLbl}>Primary Language</span>
                    <span className={styles.metricVal}>{city.officialLanguages[0] || 'Hindi'}</span>
                  </div>
                </div>

                {/* AI Overview Snippet */}
                <p className={styles.aiSnippet}>
                  {city.aiOverview.slice(0, 160)}...
                </p>

                {/* Highlights tags */}
                <div className={styles.highlightsWrap}>
                  {city.highlights.slice(0, 3).map((h, i) => (
                    <span key={i} className={styles.highlightPill}>
                      {h}
                    </span>
                  ))}
                </div>

                {/* Category Quick Links */}
                <div className={styles.quickLinks}>
                  <Link
                    href={`/city/${city.slug}?tab=food`}
                    className={styles.quickLink}
                    title={`Explore ${city.name} Food`}
                  >
                    <span>🍛</span> Food
                  </Link>
                  <Link
                    href={`/city/${city.slug}?tab=culture`}
                    className={styles.quickLink}
                    title={`Explore ${city.name} Culture`}
                  >
                    <span>🎭</span> Culture
                  </Link>
                  <Link
                    href={`/city/${city.slug}?tab=language`}
                    className={styles.quickLink}
                    title={`Explore ${city.name} Language`}
                  >
                    <span>📜</span> Language
                  </Link>
                  <Link
                    href={`/city/${city.slug}?tab=places`}
                    className={styles.quickLink}
                    title={`Explore ${city.name} Places`}
                  >
                    <span>🏛️</span> Places
                  </Link>
                </div>

                {/* Main Action CTA Button */}
                <Link href={`/city/${city.slug}`} className={styles.hubBtn}>
                  <span>Explore Full City Hub</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>🔍</span>
          <h3 className={styles.emptyTitle}>No Indian cities match your search</h3>
          <p className={styles.emptyDesc}>
            Try clearing filters or searching for another city, state, or regional specialty.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedRegion('all');
              setSelectedTier('all');
            }}
            className={styles.resetBtn}
          >
            Show All Cities
          </button>
        </div>
      )}
        </>
      )}
    </div>
  );
}
