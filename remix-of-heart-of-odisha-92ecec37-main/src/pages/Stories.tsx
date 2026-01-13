import Layout from '@/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Quote, ArrowRight } from 'lucide-react';
import womenImage from '@/assets/women-shg-meeting.jpg';
import childrenImage from '@/assets/children-classroom.jpg';

const Stories = () => {
  const { t } = useTranslation();

  const stories = [
    { id: '1', image: womenImage, name: 'Sunita Devi', location: 'Balipatna Village', quote: 'Through the SHG program, I started a small dairy business. Now I earn ₹8,000 monthly and my children are in school.', program: 'Women Empowerment' },
    { id: '2', image: childrenImage, name: 'Rajan Kumar', location: 'Nimapara', quote: 'The masonry training gave me skills to build houses. I went from daily wages to running my own construction team.', program: 'Livelihood' },
    { id: '3', image: womenImage, name: 'Priya Mohanty', location: 'Bhubaneswar', quote: 'Free education at LSE changed my life. I was the first in my family to graduate. Now I teach other children.', program: 'Education' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={womenImage} alt="Success stories" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t('stories.title')}</h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">{t('stories.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <motion.div key={story.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card rounded-xl shadow-lg overflow-hidden group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4"><span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">{story.program}</span></div>
                </div>
                <div className="p-6">
                  <div className="relative mb-4">
                    <Quote className="absolute -top-2 -left-1 w-8 h-8 text-primary/20" />
                    <p className="text-foreground/80 text-sm leading-relaxed pl-6 italic">"{story.quote}"</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div><p className="font-semibold text-foreground">{story.name}</p><p className="text-sm text-muted-foreground">{story.location}</p></div>
                    <Link 
                      to={`/stories/${story.id}`}
                      className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      {t('stories.readMore')}<ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Stories;
