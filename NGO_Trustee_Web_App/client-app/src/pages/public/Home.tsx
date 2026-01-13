import HeroSection from '@/components/home/HeroSection';
import ImpactStats from '@/components/home/ImpactStats';
import ProgramsSection from '@/components/home/ProgramsSection';
import StoriesSection from '@/components/home/StoriesSection';
import WhySupportSection from '@/components/home/WhySupportSection';
import NewsletterSection from '@/components/home/NewsletterSection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <ImpactStats />
      <ProgramsSection />
      <StoriesSection />
      <WhySupportSection />
      <NewsletterSection />
    </>
  );
};

export default Home;
