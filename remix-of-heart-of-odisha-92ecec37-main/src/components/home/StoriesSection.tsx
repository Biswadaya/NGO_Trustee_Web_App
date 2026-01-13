import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stories = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&h=400&fit=crop',
    name: 'Sunita Devi',
    location: 'Balipatna Village',
    quote: 'Through the SHG program, I started a small dairy business. Now I earn ₹8,000 monthly and my children are in school.',
    program: 'Women Empowerment',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=600&h=400&fit=crop',
    name: 'Rajan Kumar',
    location: 'Nimapara',
    quote: 'The masonry training gave me skills to build houses. I went from daily wages to running my own construction team.',
    program: 'Livelihood',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop',
    name: 'Priya Mohanty',
    location: 'Bhubaneswar',
    quote: 'Free education at LSE changed my life. I was the first in my family to graduate. Now I teach other children.',
    program: 'Education',
  },
];

const StoriesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('stories.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('stories.subtitle')}
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="story-card overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="badge-accent text-xs">
                    {story.program}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Quote */}
                <div className="relative mb-4">
                  <Quote className="absolute -top-2 -left-1 w-8 h-8 text-primary/20" />
                  <p className="text-foreground/80 text-sm leading-relaxed pl-6 italic">
                    "{story.quote}"
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{story.name}</p>
                    <p className="text-sm text-muted-foreground">{story.location}</p>
                  </div>
                  <Link 
                    to={`/stories/${story.id}`}
                    className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    {t('stories.readMore')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link to="/stories">
            <Button variant="outline" size="lg" className="gap-2">
              {t('common.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default StoriesSection;
