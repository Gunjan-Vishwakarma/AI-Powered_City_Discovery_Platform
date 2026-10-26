import styles from './StatsBar.module.css';

const STATS = [
  { value: '18+', label: 'Indian Cities', icon: '🏙️' },
  { value: '6', label: 'Discovery Categories', icon: '🗂️' },
  { value: '100+', label: 'Local Dishes Covered', icon: '🍛' },
  { value: '50+', label: 'Cultural Art Forms', icon: '🎭' },
  { value: '22+', label: 'Languages Profiled', icon: '🗣️' },
  { value: 'AI', label: 'Powered Summaries', icon: '✨' },
];

export default function StatsBar() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {STATS.map((stat, i) => (
          <div key={i} className={styles.stat}>
            <span className={styles.icon}>{stat.icon}</span>
            <span className={styles.value}>{stat.value}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
