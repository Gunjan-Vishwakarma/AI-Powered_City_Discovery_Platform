import Link from 'next/link';
import styles from './Footer.module.css';

const POPULAR_CITIES = [
  { name: 'Mumbai', slug: 'mumbai', state: 'Maharashtra' },
  { name: 'Delhi', slug: 'delhi', state: 'NCT of Delhi' },
  { name: 'Bengaluru', slug: 'bengaluru', state: 'Karnataka' },
  { name: 'Chennai', slug: 'chennai', state: 'Tamil Nadu' },
  { name: 'Kolkata', slug: 'kolkata', state: 'West Bengal' },
  { name: 'Hyderabad', slug: 'hyderabad', state: 'Telangana' },
  { name: 'Varanasi', slug: 'varanasi', state: 'Uttar Pradesh' },
  { name: 'Jaipur', slug: 'jaipur', state: 'Rajasthan' },
  { name: 'Amritsar', slug: 'amritsar', state: 'Punjab' },
  { name: 'Kochi', slug: 'kochi', state: 'Kerala' },
  { name: 'Mysuru', slug: 'mysuru', state: 'Karnataka' },
  { name: 'Ahmedabad', slug: 'ahmedabad', state: 'Gujarat' },
];

const PILLARS = [
  { name: 'Food & Cuisine', icon: '🍛', desc: 'Street food, regional thalis & authentic recipes' },
  { name: 'Culture & Arts', icon: '🎭', desc: 'Classical dances, folk arts & weaving heritage' },
  { name: 'Languages & Dialects', icon: '📜', desc: 'Native scripts, phrases & linguistic history' },
  { name: 'Places & Heritage', icon: '🏛️', desc: 'UNESCO sites, ancient forts & hidden viewpoints' },
  { name: 'Festivals & Celebrations', icon: '🪅', desc: 'Durga Puja, Ganesh Chaturthi & regional fairs' },
  { name: 'Local News & Updates', icon: '📰', desc: 'Real-time civic updates & cultural happenings' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top ambient glow */}
      <div className={styles.glow} />

      <div className={styles.container}>
        {/* Main Footer Grid */}
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brandLogo}>
              <span className={styles.flagEmoji}>🇮🇳</span>
              <span className={styles.brandText}>
                India<span className={styles.brandAccent}>Discover</span>
              </span>
            </Link>
            <p className={styles.brandTagline}>
              An AI-powered exploratory encyclopedia dedicated exclusively to the cultural heritage, cuisine, classical languages, sacred architecture, and vibrant urban life across India.
            </p>
            <div className={styles.badgeRow}>
              <span className={styles.badge}>
                <span className={styles.badgeDot}></span> 100% Scoped to India
              </span>
              <span className={styles.badge}>
                <span className={styles.badgeDot}></span> AI Enriched
              </span>
            </div>
          </div>

          {/* Discovery Pillars */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Discovery Pillars</h4>
            <ul className={styles.linkList}>
              {PILLARS.map((p) => (
                <li key={p.name}>
                  <Link href={`/cities`} className={styles.pillarLink}>
                    <span className={styles.pillarIcon}>{p.icon}</span>
                    <span>{p.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Cities */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Iconic Cities</h4>
            <div className={styles.cityGridLinks}>
              {POPULAR_CITIES.map((c) => (
                <Link key={c.slug} href={`/city/${c.slug}`} className={styles.cityLink}>
                  <span className={styles.cityName}>{c.name}</span>
                  <span className={styles.cityState}>{c.state}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* AI Platform & Community */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Platform Vision</h4>
            <p className={styles.aboutText}>
              Built with an off-green glassmorphism aesthetic inspired by the lush landscapes, monsoon rains, and emerald hills of the Indian subcontinent.
            </p>
            <div className={styles.statsCard}>
              <div className={styles.statMini}>
                <span className={styles.statMiniVal}>18+</span>
                <span className={styles.statMiniLbl}>Cities</span>
              </div>
              <div className={styles.statMini}>
                <span className={styles.statMiniVal}>22+</span>
                <span className={styles.statMiniLbl}>Languages</span>
              </div>
              <div className={styles.statMini}>
                <span className={styles.statMiniVal}>6</span>
                <span className={styles.statMiniLbl}>Pillars</span>
              </div>
            </div>
            <Link href="/cities" className={styles.exploreAllBtn}>
              Explore All Indian Cities →
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            © 2026 IndiaDiscover. Scoped exclusively to the Republic of India (Bharat).
          </div>
          <div className={styles.bottomLinks}>
            <span className={styles.madeWithLove}>
              Crafted with <span className={styles.heart}>♥</span> for Indian Heritage
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
