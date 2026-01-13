import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GraduationCap, Heart, Droplets, Briefcase, Wheat, ShieldAlert, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProgramDetailModal from '@/components/ProgramDetailModal';
import childrenImage from '@/assets/children-classroom.jpg';
import womenImage from '@/assets/women-shg-meeting.jpg';
import healthImage from '@/assets/campaign-health.jpg';
import waterImage from '@/assets/campaign-water.jpg';
import villageImage from '@/assets/hero-odisha-village.jpg';
import eventsImage from '@/assets/events-cultural.jpg';

const ProgramsSection = () => {
  const { t } = useTranslation();
  const [selectedProgram, setSelectedProgram] = useState<typeof programs[0] | null>(null);

  const programs = [
    {
      id: 'education',
      icon: GraduationCap,
      titleKey: 'programs.education.title',
      descKey: 'programs.education.description',
      color: 'bg-secondary/10 text-secondary',
      image: childrenImage,
      stats: [
        { label: 'Children Educated', value: '1,000+' },
        { label: 'Free Services', value: '5' },
      ],
      features: ['Free uniforms', 'Free meals', 'Free transport', 'Health checkups', 'Quality teachers'],
    },
    {
      id: 'women-empowerment',
      icon: Heart,
      titleKey: 'programs.women.title',
      descKey: 'programs.women.description',
      color: 'bg-accent/10 text-accent',
      image: womenImage,
      stats: [
        { label: 'SHGs Formed', value: '4,481' },
        { label: 'Microfinance Linked', value: '₹80M' },
      ],
      features: ['SHG formation', 'Capacity building', 'Microfinance access', 'Entrepreneurship', 'Leadership training'],
    },
    {
      id: 'health',
      icon: Droplets,
      titleKey: 'programs.health.title',
      descKey: 'programs.health.description',
      color: 'bg-primary/10 text-primary',
      image: healthImage,
      stats: [
        { label: 'Villages ODF', value: '472' },
        { label: 'Health Camps', value: '200+' },
      ],
      features: ['ODF certification', 'Clean water access', 'Hygiene education', 'Sanitation facilities', 'Health awareness'],
    },
    {
      id: 'livelihood',
      icon: Briefcase,
      titleKey: 'programs.livelihood.title',
      descKey: 'programs.livelihood.description',
      color: 'bg-earth/10 text-earth',
      image: waterImage,
      stats: [
        { label: 'Masons Trained', value: '1,660' },
        { label: 'Dairy Units', value: '500+' },
      ],
      features: ['Dairy farming', 'Fish farming', 'Masonry training', 'Skills development', 'Market linkage'],
    },
    {
      id: 'agriculture',
      icon: Wheat,
      titleKey: 'programs.agriculture.title',
      descKey: 'programs.agriculture.description',
      color: 'bg-primary/10 text-primary',
      image: villageImage,
      stats: [
        { label: 'Farmer Groups', value: '500+' },
        { label: 'Farmers Trained', value: '10,000+' },
      ],
      features: ['Farmer groups', 'Organic practices', 'Crop support', 'Training programs', 'Market access'],
    },
    {
      id: 'disaster-response',
      icon: ShieldAlert,
      titleKey: 'programs.disaster.title',
      descKey: 'programs.disaster.description',
      color: 'bg-destructive/10 text-destructive',
      image: eventsImage,
      stats: [
        { label: 'Cyclone Fani Relief', value: '4,500 families' },
        { label: 'COVID Response', value: '10,000+' },
      ],
      features: ['Emergency relief', 'Food distribution', 'Shelter support', 'COVID response', 'Community resilience'],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/50">
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
            {t('programs.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('programs.subtitle')}
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div 
                className="block h-full cursor-pointer"
                onClick={() => setSelectedProgram(program)}
              >
                <div className="program-card h-full p-6 md:p-8 flex flex-col group">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${program.color} mb-5 group-hover:scale-110 transition-transform`}>
                    <program.icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {t(program.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow text-sm md:text-base">
                    {t(program.descKey)}
                  </p>

                  {/* Link */}
                  <div className="mt-5 flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    {t('programs.learnMore')}
                    <ArrowRight className="w-4 h-4" />
                  </div>
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
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link to="/programs">
            <Button variant="outline" size="lg" className="gap-2">
              {t('common.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <ProgramDetailModal 
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </section>
  );
};

export default ProgramsSection;
