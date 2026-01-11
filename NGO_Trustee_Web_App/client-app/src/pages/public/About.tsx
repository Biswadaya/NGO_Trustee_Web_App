import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target, Lightbulb, Shield, Scale, Leaf, Heart, CheckCircle, Users,
  GraduationCap, Droplets, Briefcase, Wheat, ShieldAlert, Banknote, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import womenMeetingImage from '@/assets/women-shg-meeting.jpg';
import childrenImage from '@/assets/children-classroom.jpg';
import campaignHealthImage from '@/assets/campaign-health.jpg';

const About = () => {
  const { t } = useTranslation();

  const values = [
    { icon: Users, titleKey: 'about.values.inclusion.title', descKey: 'about.values.inclusion.description' },
    { icon: Scale, titleKey: 'about.values.equity.title', descKey: 'about.values.equity.description' },
    { icon: Heart, titleKey: 'about.values.gender.title', descKey: 'about.values.gender.description' },
    { icon: Leaf, titleKey: 'about.values.sustainability.title', descKey: 'about.values.sustainability.description' },
    { icon: Shield, titleKey: 'about.values.accountability.title', descKey: 'about.values.accountability.description' },
    { icon: Lightbulb, titleKey: 'about.values.empowerment.title', descKey: 'about.values.empowerment.description' },
  ];

  const certifications = [
    { name: 'Societies Registration Act', code: '2054/193 of 2000' },
    { name: 'FCRA Registration', code: '104830223' },
    { name: 'Income Tax 12A', code: 'Registered' },
    { name: 'Income Tax 80G', code: 'FY2023-2027' },
    { name: 'NITI AAYOG', code: 'Registered' },
    { name: 'CSR Registration', code: 'Active' },
  ];

  const timelineYears = ['2000', '2008', '2015', '2019', '2024'];

  const programs = [
    { icon: GraduationCap, name: t('programs.education.title', 'Education'), color: 'bg-secondary text-secondary-foreground' },
    { icon: Heart, name: t('programs.women.title', 'Women Empowerment'), color: 'bg-accent text-accent-foreground' },
    { icon: Droplets, name: t('programs.health.title', 'Health & Sanitation'), color: 'bg-primary text-primary-foreground' },
    { icon: Briefcase, name: t('programs.livelihood.title', 'Livelihood'), color: 'bg-muted text-foreground' },
    { icon: Wheat, name: t('programs.agriculture.title', 'Agriculture'), color: 'bg-primary text-primary-foreground' },
    { icon: Banknote, name: t('programs.microfinance.title', 'Microfinance'), color: 'bg-secondary text-secondary-foreground' },
    { icon: ShieldAlert, name: t('programs.disaster.title', 'Disaster Response'), color: 'bg-destructive text-destructive-foreground' },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section with Image */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={womenMeetingImage}
            alt="Women SHG meeting in Odisha village"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-primary-foreground"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('about.heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
              {t('about.heroSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 md:p-10 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t('about.visionTitle')}</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed italic">
                "{t('about.visionText')}"
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 md:p-10 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Lightbulb className="w-7 h-7 text-accent" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t('about.missionTitle')}</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed italic">
                "{t('about.missionText')}"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('about.whatWeDo', 'What We Do')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('about.whatWeDoSubtitle', 'Our comprehensive programs address the multifaceted needs of rural communities in Odisha')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {programs.map((program, index) => (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${program.color} mb-4`}>
                  <program.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{program.name}</h3>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/what-we-do">
              <Button variant="default" size="lg" className="gap-2">
                {t('about.viewAllPrograms', 'View All Programs')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Highlights */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t('about.impactTitle', 'Creating Lasting Impact')}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {t('about.impactDescription', 'Over two decades of dedicated work has transformed thousands of lives across rural Odisha. Our community-driven approach ensures sustainable development that empowers people to take charge of their own futures.')}
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-primary/5 rounded-xl">
                  <p className="text-3xl font-bold text-primary">50,000+</p>
                  <p className="text-sm text-muted-foreground">{t('about.livesImpacted', 'Lives Impacted')}</p>
                </div>
                <div className="text-center p-4 bg-accent/5 rounded-xl">
                  <p className="text-3xl font-bold text-accent">472</p>
                  <p className="text-sm text-muted-foreground">{t('about.villagesCovered', 'Villages Covered')}</p>
                </div>
                <div className="text-center p-4 bg-secondary/5 rounded-xl">
                  <p className="text-3xl font-bold text-secondary">4,481</p>
                  <p className="text-sm text-muted-foreground">{t('about.shgsFormed', 'SHGs Formed')}</p>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-xl">
                  <p className="text-3xl font-bold text-primary">24+</p>
                  <p className="text-sm text-muted-foreground">{t('about.yearsOfService', 'Years of Service')}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src={childrenImage}
                alt="Children in classroom"
                className="rounded-2xl shadow-lg w-full h-48 object-cover"
              />
              <img
                src={campaignHealthImage}
                alt="Health camp"
                className="rounded-2xl shadow-lg w-full h-48 object-cover mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('about.journeyTitle')}</h2>
            <p className="text-muted-foreground text-lg">{t('about.journeySubtitle')}</p>
          </motion.div>

          <div className="space-y-8">
            {timelineYears.map((year, index) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 md:gap-8"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    {year}
                  </div>
                  {index < timelineYears.length - 1 && (
                    <div className="w-0.5 flex-1 bg-primary/20 mt-4" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-bold text-foreground mb-2">{t(`about.timeline.${year}.title`)}</h3>
                  <p className="text-muted-foreground">{t(`about.timeline.${year}.description`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('about.valuesTitle')}</h2>
            <p className="text-muted-foreground text-lg">{t('about.valuesSubtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{t(value.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(value.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">{t('about.certTitle')}</h2>
            <p className="text-primary-foreground/80 text-lg">{t('about.certSubtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-primary-foreground/10 backdrop-blur-sm p-4 rounded-xl text-center"
              >
                <CheckCircle className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-primary-foreground font-semibold text-sm">{cert.name}</p>
                <p className="text-primary-foreground/60 text-xs mt-1">{cert.code}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-6">
              {t('about.joinUs', 'Join Our Mission')}
            </h2>
            <p className="text-accent-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              {t('about.joinUsSubtitle', 'Whether through donations, volunteering, or spreading awareness, your support helps us create lasting change in rural Odisha.')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/donate">
                <Button variant="heroSecondary" size="xl" className="gap-2">
                  <Heart className="w-5 h-5" />
                  {t('cta.donateNow', 'Donate Now')}
                </Button>
              </Link>
              <Link to="/get-involved">
                <Button variant="heroOutline" size="xl" className="gap-2 border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent">
                  <Users className="w-5 h-5" />
                  {t('cta.volunteer', 'Volunteer')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
