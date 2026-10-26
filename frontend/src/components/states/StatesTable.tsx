'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { State } from '@/types/state';
import { fetchStates } from '@/lib/api';
import { STATES_DATA } from '@/data/states';
import styles from './StatesTable.module.css';

const REGIONS = [
  { id: 'all', label: 'All India' },
  { id: 'north', label: 'North' },
  { id: 'south', label: 'South' },
  { id: 'west', label: 'West' },
  { id: 'east', label: 'East' },
  { id: 'central', label: 'Central' },
  { id: 'northeast', label: 'Northeast' },
];

const TYPES = [
  { id: 'all', label: 'All Types' },
  { id: 'State', label: '28 States' },
  { id: 'Union Territory', label: '8 UTs' },
];

export default function StatesTable() {
  const [statesList, setStatesList] = useState<State[]>(STATES_DATA);
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [expandedStates, setExpandedStates] = useState<Set<string>>(new Set(['madhya-pradesh']));

  useEffect(() => {
    fetchStates().then((res) => {
      if (res && res.length > 0) {
        setStatesList(res);
      }
    });
  }, []);

  const toggleExpand = (slug: string) => {
    setExpandedStates((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (expandedStates.size > 0) {
      setExpandedStates(new Set());
    } else {
      setExpandedStates(new Set(statesList.map((s) => s.slug)));
    }
  };

  const filteredStates = useMemo(() => {
    let list = [...statesList];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.stateCode.toLowerCase().includes(q) ||
          (s.capital && s.capital.toLowerCase().includes(q)) ||
          s.cities.some((c) => c.toLowerCase().includes(q))
      );
    }

    if (selectedRegion !== 'all') {
      list = list.filter((s) => s.region.toLowerCase() === selectedRegion.toLowerCase());
    }

    if (selectedType !== 'all') {
      list = list.filter((s) => s.type.toLowerCase() === selectedType.toLowerCase());
    }

    return list;
  }, [statesList, search, selectedRegion, selectedType]);

  const totalFilteredCities = useMemo(() => {
    return filteredStates.reduce((acc, s) => acc + s.cities.length, 0);
  }, [filteredStates]);

  return (
    <div className={styles.container}>
      {/* Search and Expand Controls */}
      <div className={styles.controlsBar}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search state name, capital, state code, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.clearBtn} onClick={() => setSearch('')}>
              ✕
            </button>
          )}
        </div>

        <button className={styles.toggleExpandBtn} onClick={toggleAll}>
          {expandedStates.size > 0 ? 'Collapse All States' : 'Expand All States'}
        </button>
      </div>

      {/* Filter Row */}
      <div className={styles.filterRow}>
        <div className={styles.regionTabs}>
          {REGIONS.map((r) => (
            <button
              key={r.id}
              className={`${styles.regionTab} ${selectedRegion === r.id ? styles.regionTabActive : ''}`}
              onClick={() => setSelectedRegion(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className={styles.regionTabs}>
          {TYPES.map((t) => (
            <button
              key={t.id}
              className={`${styles.regionTab} ${selectedType === t.id ? styles.regionTabActive : ''}`}
              onClick={() => setSelectedType(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className={styles.statsBar}>
          Showing <span className={styles.statsCount}>{filteredStates.length}</span> States & UTs (
          <span className={styles.statsCount}>{totalFilteredCities}</span> Cities)
        </div>
      </div>

      {/* Main Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '30%' }}>State / Territory</th>
              <th style={{ width: '10%' }}>Code</th>
              <th style={{ width: '15%' }}>Region</th>
              <th style={{ width: '15%' }}>Type</th>
              <th style={{ width: '20%' }}>Total Cities</th>
              <th style={{ width: '10%', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStates.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.noResults}>
                  No states or cities found matching &quot;{search}&quot;.
                </td>
              </tr>
            ) : (
              filteredStates.map((state) => {
                const isExpanded = expandedStates.has(state.slug);
                const hasSearch = search.trim().length > 0;
                const searchLower = search.trim().toLowerCase();

                return (
                  <tr key={state.slug} style={{ display: 'contents' }}>
                    <tr
                      className={`${styles.tableRow} ${isExpanded ? styles.tableRowExpanded : ''}`}
                      onClick={() => toggleExpand(state.slug)}
                    >
                      <td>
                        <div className={styles.stateNameCol}>
                          <span className={styles.stateName}>{state.name}</span>
                          {state.capital && (
                            <span className={styles.stateCapital}>Capital: {state.capital}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={styles.codeBadge}>{state.stateCode}</span>
                      </td>
                      <td>
                        <span className={styles.regionBadge}>{state.region}</span>
                      </td>
                      <td>
                        <span className={styles.typeBadge}>{state.type}</span>
                      </td>
                      <td>
                        <span className={styles.citiesCountBadge}>
                          🏙️ {state.cities.length} Cities
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span
                          className={`${styles.expandIcon} ${
                            isExpanded ? styles.expandIconRotated : ''
                          }`}
                        >
                          ▼
                        </span>
                      </td>
                    </tr>

                    {/* Expandable Cities View */}
                    {isExpanded && (
                      <tr className={styles.expandedRow}>
                        <td colSpan={6}>
                          <div className={styles.expandedContent}>
                            {state.description && (
                              <p className={styles.stateDesc}>{state.description}</p>
                            )}

                            <div className={styles.expandedHeader}>
                              <span className={styles.expandedTitle}>
                                Cities under {state.name} ({state.cities.length}):
                              </span>
                            </div>

                            <div className={styles.citiesGrid}>
                              {state.cities.map((city) => {
                                const citySlug = city
                                  .toLowerCase()
                                  .replace(/[^a-z0-9]+/g, '-')
                                  .replace(/^-|-$/g, '');
                                const isMatch =
                                  hasSearch && city.toLowerCase().includes(searchLower);

                                return (
                                  <Link
                                    key={city}
                                    href={`/city/${citySlug}`}
                                    className={`${styles.cityTag} ${
                                      isMatch ? styles.cityTagHighlighted : ''
                                    }`}
                                  >
                                    {city}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
