import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CitiesExplorer from '@/components/cities/CitiesExplorer';
import styles from './cities.module.css';

export const metadata = {
  title: 'Explore Indian Cities | IndiaDiscover',
  description: 'Browse, filter and discover all Indian cities across North, South, East, West, Central and Northeast regions. Uncover local cuisine, culture, languages, places, and festivals.',
};

export default function CitiesPage() {
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
              Pan-India City Encyclopedia
            </div>
            <h1 className={styles.title}>
              Explore the Soul of <span className={styles.titleAccent}>Every Indian City</span>
            </h1>
            <p className={styles.subtitle}>
              From coastal megacities to ancient spiritual riverfronts and Himalayan towns — discover authentic regional food, classical languages, sacred heritage, and vibrant traditions.
            </p>
          </header>

          {/* Interactive Cities Explorer Client Component */}
          <CitiesExplorer />
        </div>
      </main>
      <Footer />
    </>
  );
}
