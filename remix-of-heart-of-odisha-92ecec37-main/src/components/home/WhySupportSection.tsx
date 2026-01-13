import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, BarChart3, Eye } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    titleKey: 'support.trust.title',
    descKey: 'support.trust.description',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: BarChart3,
    titleKey: 'support.impact.title',
    descKey: 'support.impact.description',
    color: 'bg-accent/10 text-accent',
  },
  {
    icon: Eye,
    titleKey: 'support.transparency.title',
    descKey: 'support.transparency.description',
    color: 'bg-secondary/10 text-secondary',
  },
];

const WhySupportSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-background">
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
            {t('support.title')}
          </h2>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${reason.color} mb-5`}>
                <reason.icon className="w-8 h-8" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {t(reason.titleKey)}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t(reason.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySupportSection;
