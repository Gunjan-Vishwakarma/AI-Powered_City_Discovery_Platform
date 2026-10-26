import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StatesTable from '@/components/states/StatesTable';
import styles from './states.module.css';

export const metadata = {
  title: 'Indian States & Cities Directory | IndiaDiscover',
  description: 'Pan-India registry of all 36 States and Union Territories with over 1,400 cities mapped state-by-state.',
};

export default function StatesPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Ambient Top Glow */}
        <div className={styles.topGlow} />

        <div className={styles.container}>
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.tag}>
              <span className={styles.tagDot} />
              Pan-India State-by-State Directory
            </div>
            <h1 className={styles.title}>
              All Indian <span className={styles.titleAccent}>States & Their Cities</span>
            </h1>
            <p className={styles.subtitle}>
              Explore India across all 28 States and 8 Union Territories. Click any state to expand and discover all municipal corporations, heritage towns, and district centers under each state.
            </p>
          </header>

          {/* States & Cities Table */}
          <StatesTable />
        </div>
      </main>
      <Footer />
    </>
  );
}
