import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import StatsBar from '@/components/landing/StatsBar';
import FeaturedCities from '@/components/landing/FeaturedCities';
import CategoryShowcase from '@/components/landing/CategoryShowcase';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <FeaturedCities />
        <CategoryShowcase />
      </main>
      <Footer />
    </>
  );
}
