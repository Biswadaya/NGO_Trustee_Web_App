import HeroSection from '@/components/home/HeroSection';
import ImpactStats from '@/components/home/ImpactStats';
import ProgramsSection from '@/components/home/ProgramsSection';
import StoriesSection from '@/components/home/StoriesSection';
import WhySupportSection from '@/components/home/WhySupportSection';
import NewsletterSection from '@/components/home/NewsletterSection';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ImpactStats />
      <ProgramsSection />
      <StoriesSection />
      <WhySupportSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;
