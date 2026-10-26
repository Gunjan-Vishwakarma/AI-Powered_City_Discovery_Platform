'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { searchCitiesApi } from '@/lib/api';
import { City, CitySearchResult } from '@/types/city';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CitySearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    let active = true;
    if (query.length > 1) {
      searchCitiesApi(query).then((res) => {
        if (active) {
          setResults(res);
          setIsOpen(true);
        }
      });
    } else {
      setResults([]);
      setIsOpen(false);
    }
    return () => {
      active = false;
    };
  }, [query]);

  const handleSelect = (city: CitySearchResult) => {
    setQuery('');
    setIsOpen(false);
    router.push(`/city/${city.slug}`);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🇮🇳</span>
          <span className={styles.logoText}>
            India<span className={styles.logoAccent}>Discover</span>
          </span>
        </Link>

        {/* Desktop Search */}
        <div className={styles.searchWrapper}>
          <div className={`${styles.searchBar} ${isOpen ? styles.searchActive : ''}`}>
            <span className={styles.searchIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search any Indian city..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className={styles.searchInput}
              id="navbar-city-search"
            />
            {query && (
              <button className={styles.clearBtn} onClick={() => { setQuery(''); setResults([]); setIsOpen(false); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>
          {isOpen && results.length > 0 && (
            <div className={styles.dropdown}>
              {results.map(city => (
                <button key={city.id} className={styles.dropdownItem} onClick={() => handleSelect(city)}>
                  <span className={styles.dropdownEmoji}>{city.emoji}</span>
                  <div className={styles.dropdownInfo}>
                    <span className={styles.dropdownName}>{city.name}</span>
                    <span className={styles.dropdownState}>{city.state}</span>
                  </div>
                  <span className={styles.dropdownTier}>Tier {city.tier}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Nav Links */}
        <div className={styles.navLinks}>
          <Link href="/cities" className={styles.navLink}>All Cities</Link>
          <Link href="/states" className={styles.navLink}>States & Cities</Link>
          <Link href="/cities?region=north" className={styles.navLink}>North</Link>
          <Link href="/cities?region=south" className={styles.navLink}>South</Link>
          <Link href="/cities?region=east" className={styles.navLink}>East</Link>
          <Link href="/cities?region=west" className={styles.navLink}>West</Link>
        </div>

        {/* Mobile menu button */}
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileSearchWrapper}>
            <div className={styles.searchBar}>
              <span className={styles.searchIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search any Indian city..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            {isOpen && results.length > 0 && (
              <div className={styles.dropdown}>
                {results.map(city => (
                  <button key={city.id} className={styles.dropdownItem} onClick={() => { handleSelect(city); setMobileMenuOpen(false); }}>
                    <span className={styles.dropdownEmoji}>{city.emoji}</span>
                    <div className={styles.dropdownInfo}>
                      <span className={styles.dropdownName}>{city.name}</span>
                      <span className={styles.dropdownState}>{city.state}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className={styles.mobileLinks}>
            <Link href="/cities" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>All Cities</Link>
            <Link href="/states" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>States & Cities Directory</Link>
            <Link href="/cities?region=north" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>North India</Link>
            <Link href="/cities?region=south" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>South India</Link>
            <Link href="/cities?region=east" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>East India</Link>
            <Link href="/cities?region=west" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>West India</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
