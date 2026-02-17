import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    GraduationCap, Heart, Droplets, Briefcase, Wheat, ShieldAlert, Banknote,
    ArrowRight, Users, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProgramDetailModal from '@/components/ProgramDetailModal';
import childrenImage from '@/assets/children.jpeg';
import womenImage from '@/assets/women_what_we_do.jpeg';
// Updated images as per user request
import healthImage from '@/assets/program-health-real.jpg';
import livelihoodImage from '@/assets/campaign-water.jpg';
import agricultureImage from '@/assets/1_women_in_field.jpg.webp';
import shgImage from '@/assets/program-microfinance-real.jpg';
import disasterImage from '@/assets/cyclone_NDRF.jpg';

const WhatWeDo = () => {
    const { t } = useTranslation();
    const [selectedProgram, setSelectedProgram] = useState<any>(null);

    const programs = [
        {
            id: 'education',
            icon: GraduationCap,
            titleKey: 'programs.education.title',
            descKey: 'programs.education.description',
            stats: [
                { label: t('programs.stats.children', 'Children Educated'), value: '1,000+' },
                { label: t('programs.stats.services', 'Free Services'), value: '5' },
            ],
            features: [
                t('programs.education.features.uniforms', 'Free uniforms'),
                t('programs.education.features.meals', 'Free meals'),
                t('programs.education.features.transport', 'Free transport'),
                t('programs.education.features.health', 'Health checkups'),
                t('programs.education.features.teachers', 'Quality teachers')
            ],
            color: 'bg-secondary/10 text-secondary',
            image: childrenImage,
        },
        {
            id: 'women-empowerment',
            icon: Heart,
            titleKey: 'programs.women.title',
            descKey: 'programs.women.description',
            stats: [
                { label: t('programs.stats.shgs', 'SHGs Formed'), value: '4,481' },
                { label: t('programs.stats.microfinance', 'Microfinance Linked'), value: '₹80M' },
            ],
            features: [
                t('programs.women.features.shg', 'SHG formation'),
                t('programs.women.features.capacity', 'Capacity building'),
                t('programs.women.features.microfinance', 'Microfinance access'),
                t('programs.women.features.entrepreneurship', 'Entrepreneurship'),
                t('programs.women.features.training', 'Leadership training')
            ],
            color: 'bg-accent/10 text-accent',
            image: womenImage,
        },
        {
            id: 'health',
            icon: Droplets,
            titleKey: 'programs.health.title',
            descKey: 'programs.health.description',
            stats: [
                { label: t('programs.stats.odf', 'Villages ODF'), value: '472' },
                { label: t('programs.stats.camps', 'Health Camps'), value: '200+' },
            ],
            features: [
                t('programs.health.features.odf', 'ODF certification'),
                t('programs.health.features.water', 'Clean water access'),
                t('programs.health.features.hygiene', 'Hygiene education'),
                t('programs.health.features.sanitation', 'Sanitation facilities'),
                t('programs.health.features.awareness', 'Health awareness')
            ],
            color: 'bg-primary/10 text-primary',
            image: healthImage,
        },
        {
            id: 'livelihood',
            icon: Briefcase,
            titleKey: 'programs.livelihood.title',
            descKey: 'programs.livelihood.description',
            stats: [
                { label: t('programs.stats.masons', 'Masons Trained'), value: '1,660' },
                { label: t('programs.stats.dairy', 'Dairy Units'), value: '500+' },
            ],
            features: [
                t('programs.livelihood.features.dairy', 'Dairy farming'),
                t('programs.livelihood.features.fish', 'Fish farming'),
                t('programs.livelihood.features.masonry', 'Masonry training'),
                t('programs.livelihood.features.skills', 'Skills development'),
                t('programs.livelihood.features.market', 'Market linkage')
            ],
            color: 'bg-muted text-foreground',
            image: livelihoodImage,
        },
        {
            id: 'agriculture',
            icon: Wheat,
            titleKey: 'programs.agriculture.title',
            descKey: 'programs.agriculture.description',
            stats: [
                { label: t('programs.stats.farmerGroups', 'Farmer Groups'), value: '500+' },
                { label: t('programs.stats.farmers', 'Farmers Trained'), value: '10,000+' },
            ],
            features: [
                t('programs.agriculture.features.groups', 'Farmer groups'),
                t('programs.agriculture.features.organic', 'Organic practices'),
                t('programs.agriculture.features.crop', 'Crop support'),
                t('programs.agriculture.features.training', 'Training programs'),
                t('programs.agriculture.features.market', 'Market access')
            ],
            color: 'bg-primary/10 text-primary',
            image: agricultureImage,
        },
        {
            id: 'microfinance',
            icon: Banknote,
            titleKey: 'programs.microfinance.title',
            descKey: 'programs.microfinance.description',
            stats: [
                { label: t('programs.stats.credit', 'Credit Linked'), value: '₹80M' },
                { label: t('programs.stats.beneficiaries', 'Beneficiaries'), value: '45,000+' },
            ],
            features: [
                t('programs.microfinance.features.bank', 'Bank linkages'),
                t('programs.microfinance.features.credit', 'Credit facilitation'),
                t('programs.microfinance.features.literacy', 'Financial literacy'),
                t('programs.microfinance.features.entrepreneurship', 'Entrepreneurship'),
                t('programs.microfinance.features.savings', 'Savings groups')
            ],
            color: 'bg-secondary/10 text-secondary',
            image: shgImage,
        },
        {
            id: 'disaster-response',
            icon: ShieldAlert,
            titleKey: 'programs.disaster.title',
            descKey: 'programs.disaster.description',
            stats: [
                { label: t('programs.stats.fani', 'Cyclone Fani Relief'), value: '4,500 families' },
                { label: t('programs.stats.covid', 'COVID Response'), value: '10,000+' },
            ],
            features: [
                t('programs.disaster.features.relief', 'Emergency relief'),
                t('programs.disaster.features.food', 'Food distribution'),
                t('programs.disaster.features.shelter', 'Shelter support'),
                t('programs.disaster.features.covid', 'COVID response'),
                t('programs.disaster.features.resilience', 'Community resilience')
            ],
            color: 'bg-destructive/10 text-destructive',
            image: disasterImage,
        },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={childrenImage}
                        alt="Children in classroom"
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
                            {t('programs.title', 'Our Programs')}
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
                            {t('programs.subtitle', 'Comprehensive solutions for sustainable rural development')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Programs List */}
            <section className="py-16 md:py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-12 md:space-y-16">
                        {programs.map((program, index) => (
                            <motion.div
                                key={program.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}
                            >
                                {/* Content */}
                                <div className="flex-1 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 h-14 rounded-xl ${program.color.split(' ')[0]} flex items-center justify-center`}>
                                            <program.icon className={`w-7 h-7 ${program.color.split(' ')[1]}`} />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t(program.titleKey, program.titleKey.split('.')[1])}</h2>
                                    </div>

                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        {t(program.descKey, 'Description...')}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex flex-wrap gap-6">
                                        {program.stats.map((stat) => (
                                            <div key={stat.label} className="text-center">
                                                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2">
                                        {program.features.map((feature) => (
                                            <span key={feature} className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm text-foreground">
                                                <CheckCircle className="w-3 h-3 text-primary" />
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="gap-2 mt-4"
                                        onClick={() => setSelectedProgram(program)}
                                    >
                                        {t('programs.learnMore', 'Learn More')}
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Visual Card with Image */}
                                <div className="flex-1 w-full lg:w-auto">
                                    <div
                                        className="rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer group shadow-xl"
                                        onClick={() => setSelectedProgram(program)}
                                    >
                                        <img
                                            src={program.image}
                                            alt={t(program.titleKey)}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
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
                            {t('programs.supportTitle', 'Support Our Programs')}
                        </h2>
                        <p className="text-accent-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
                            {t('programs.supportSubtitle', 'Your contribution helps us continue transforming lives across rural Odisha')}
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

            {/* Program Detail Modal */}
            {selectedProgram && (
                <ProgramDetailModal
                    program={selectedProgram}
                    onClose={() => setSelectedProgram(null)}
                />
            )}
        </>
    );
};

export default WhatWeDo;
