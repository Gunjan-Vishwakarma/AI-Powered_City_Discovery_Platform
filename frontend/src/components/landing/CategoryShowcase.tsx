import Link from 'next/link';
import styles from './CategoryShowcase.module.css';

const CATEGORIES = [
  {
    id: 'food',
    emoji: '🍛',
    title: 'Food & Cuisine',
    description: 'From Mumbai\'s Vada Pav to Hyderabad\'s Biryani — explore India\'s extraordinary regional cuisine, street food trails, and culinary heritage.',
    highlights: ['Street Food', 'Regional Dishes', 'Sweet Traditions', 'Food Trails'],
    color: 'rgba(251, 146, 60, 0.15)',
    borderColor: 'rgba(251, 146, 60, 0.25)',
    accentColor: '#fb923c',
    exampleCities: ['Mumbai', 'Hyderabad', 'Amritsar', 'Lucknow'],
  },
  {
    id: 'culture',
    emoji: '🎭',
    title: 'Culture & Arts',
    description: 'Discover Bharatanatyam, Warli paintings, Carnatic music, Kathakali, and hundreds of art forms that define India\'s living cultural soul.',
    highlights: ['Classical Dance', 'Handicrafts', 'Folk Theatre', 'Textile Arts'],
    color: 'rgba(167, 139, 250, 0.15)',
    borderColor: 'rgba(167, 139, 250, 0.25)',
    accentColor: '#a78bfa',
    exampleCities: ['Chennai', 'Varanasi', 'Kolkata', 'Kochi'],
  },
  {
    id: 'language',
    emoji: '🗣️',
    title: 'Language & Script',
    description: 'Explore India\'s 22 scheduled languages — their scripts, literary histories, unique features, and common phrases with transliterations.',
    highlights: ['Native Scripts', 'Common Phrases', 'Classical Languages', 'Dialects'],
    color: 'rgba(52, 211, 153, 0.15)',
    borderColor: 'rgba(52, 211, 153, 0.25)',
    accentColor: '#34d399',
    exampleCities: ['Delhi', 'Chennai', 'Kolkata', 'Mumbai'],
  },
  {
    id: 'places',
    emoji: '📍',
    title: 'Places & Attractions',
    description: 'Navigate monuments, temples, UNESCO sites, hidden gems, and viewpoints — from the Taj Mahal to Kolkata\'s hidden bookshops.',
    highlights: ['UNESCO Sites', 'Hidden Gems', 'Temples & Forts', 'Natural Wonders'],
    color: 'rgba(56, 189, 248, 0.15)',
    borderColor: 'rgba(56, 189, 248, 0.25)',
    accentColor: '#38bdf8',
    exampleCities: ['Agra', 'Jaipur', 'Hampi', 'Mumbai'],
  },
  {
    id: 'festivals',
    emoji: '🎉',
    title: 'Festivals & Events',
    description: 'Experience Durga Puja, Ganesh Chaturthi, Bihu, Navratri, and hundreds of unique city festivals that celebrate India\'s diversity.',
    highlights: ['Religious Festivals', 'Harvest Celebrations', 'Music Festivals', 'Cultural Melas'],
    color: 'rgba(251, 191, 36, 0.15)',
    borderColor: 'rgba(251, 191, 36, 0.25)',
    accentColor: '#fbbf24',
    exampleCities: ['Kolkata', 'Mumbai', 'Amritsar', 'Ahmedabad'],
  },
  {
    id: 'news',
    emoji: '📰',
    title: 'News & Trending',
    description: 'Stay updated with AI-curated local news, civic developments, cultural events, and trending stories from every Indian city.',
    highlights: ['Civic Updates', 'Cultural Events', 'City Development', 'Community News'],
    color: 'rgba(248, 113, 113, 0.15)',
    borderColor: 'rgba(248, 113, 113, 0.25)',
    accentColor: '#f87171',
    exampleCities: ['Delhi', 'Bengaluru', 'Mumbai', 'Hyderabad'],
  },
];

export default function CategoryShowcase() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.sectionLabel}>
            <span className={styles.labelDot} />
            Discovery Categories
          </div>
          <h2 className={styles.title}>
            Six Ways to Explore<br />
            <span className={styles.titleAccent}>Every Indian City</span>
          </h2>
          <p className={styles.subtitle}>
            Each city is a universe. Dive deep into every dimension of its identity.
          </p>
        </div>

        {/* Categories grid */}
        <div className={styles.grid}>
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.id}
              className={styles.card}
              style={{
                '--cat-color': cat.color,
                '--cat-border': cat.borderColor,
                '--cat-accent': cat.accentColor,
                '--delay': `${i * 0.08}s`,
              } as React.CSSProperties}
            >
              {/* Card glow */}
              <div className={styles.cardGlow} />

              {/* Header */}
              <div className={styles.cardHeader}>
                <span className={styles.cardEmoji}>{cat.emoji}</span>
                <h3 className={styles.cardTitle}>{cat.title}</h3>
              </div>

              {/* Description */}
              <p className={styles.cardDesc}>{cat.description}</p>

              {/* Highlights */}
              <div className={styles.highlights}>
                {cat.highlights.map(h => (
                  <span key={h} className={styles.highlightTag}>{h}</span>
                ))}
              </div>

              {/* Example cities */}
              <div className={styles.exampleCities}>
                <span className={styles.exampleLabel}>Example cities:</span>
                <div className={styles.cityPills}>
                  {cat.exampleCities.map(city => (
                    <Link
                      key={city}
                      href={`/city/${city.toLowerCase()}?tab=${cat.id}`}
                      className={styles.cityPill}
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link href={`/cities?category=${cat.id}`} className={styles.cardCta}>
                <span>Explore {cat.title}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
