import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CityHubClient from '@/components/city/CityHubClient';
import {
  fetchCityBySlug,
  fetchCityFood,
  fetchCityCulture,
  fetchCityLanguage,
  fetchCityPlaces,
  fetchCityFestivals,
  fetchCityNews,
} from '@/lib/api';
import { CITIES } from '@/data/cities';
import styles from './cityPage.module.css';

interface PageProps {
  params: Promise<{ citySlug: string }>;
}

export async function generateStaticParams() {
  return CITIES.map((c) => ({
    citySlug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { citySlug } = await params;
  const city = await fetchCityBySlug(citySlug);

  if (!city) {
    return {
      title: 'City Not Found | IndiaDiscover',
    };
  }

  return {
    title: `${city.name}, ${city.state} - AI City Discovery | IndiaDiscover`,
    description: `Discover ${city.name}'s rich heritage: local cuisine (${city.highlights?.slice(0, 2).join(', ') || ''}), ${city.officialLanguages?.join(', ') || ''} language profile, monuments, and festivals.`,
  };
}

export default async function CityDetailPage({ params }: PageProps) {
  const { citySlug } = await params;
  const city = await fetchCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  const [foodItems, cultureItems, languages, places, festivals, news] = await Promise.all([
    fetchCityFood(city.slug),
    fetchCityCulture(city.slug),
    fetchCityLanguage(city.slug),
    fetchCityPlaces(city.slug),
    fetchCityFestivals(city.slug),
    fetchCityNews(city.slug),
  ]);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Top ambient spotlight glow */}
        <div className={styles.ambientGlow} />

        <div className={styles.container}>
          <Suspense fallback={<div className={styles.loadingPlaceholder}>Discovering Indian City Heritage...</div>}>
            <CityHubClient
              city={city}
              foodItems={foodItems}
              cultureItems={cultureItems}
              languages={languages}
              places={places}
              festivals={festivals}
              news={news}
            />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
