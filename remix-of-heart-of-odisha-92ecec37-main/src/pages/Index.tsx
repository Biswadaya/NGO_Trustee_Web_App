import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ImpactStats from '@/components/home/ImpactStats';
import ProgramsSection from '@/components/home/ProgramsSection';
import StoriesSection from '@/components/home/StoriesSection';
import WhySupportSection from '@/components/home/WhySupportSection';
import NewsletterSection from '@/components/home/NewsletterSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ImpactStats />
      <ProgramsSection />
      <StoriesSection />
      <WhySupportSection />
      <NewsletterSection />
    </Layout>
  );
};

export default Index;
