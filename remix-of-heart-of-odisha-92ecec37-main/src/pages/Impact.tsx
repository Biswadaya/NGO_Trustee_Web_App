import Layout from '@/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, Users, MapPin, HandHeart, Banknote, HardHat, Droplets, Tractor } from 'lucide-react';
import odishaSunrise from '@/assets/odisha-sunrise.jpg';

const Impact = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: Award, value: '24', suffix: '', labelKey: 'impact.years', color: 'text-primary' },
    { icon: Users, value: '100,000', suffix: '+', labelKey: 'impact.lives', color: 'text-accent' },
    { icon: MapPin, value: '500', suffix: '+', labelKey: 'impact.villages', color: 'text-secondary' },
    { icon: HandHeart, value: '4,481', suffix: '', labelKey: 'impact.shgs', color: 'text-primary' },
    { icon: Banknote, value: '₹80M', suffix: '', labelKey: 'impact.microfinance', color: 'text-accent' },
    { icon: HardHat, value: '1,660', suffix: '', labelKey: 'impact.masons', color: 'text-secondary' },
    { icon: Droplets, value: '472', suffix: '', labelKey: 'impact.odf', color: 'text-primary' },
    { icon: Tractor, value: '500', suffix: '+', labelKey: 'impact.farmers', color: 'text-accent' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={odishaSunrise} alt="Odisha sunrise" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t('nav.impact')}</h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">{t('impact.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div key={stat.labelKey} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card p-6 rounded-xl shadow-lg text-center">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-muted mb-4 ${stat.color}`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}{stat.suffix}</div>
                <p className="text-sm text-muted-foreground">{t(stat.labelKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Impact;
