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
import childrenImage from '@/assets/children-classroom.jpg';
import womenImage from '@/assets/women-shg-meeting.jpg';
import healthImage from '@/assets/campaign-health.jpg';
import waterImage from '@/assets/campaign-water.jpg';
import villageImage from '@/assets/hero-odisha-village.jpg';
import shgImage from '@/assets/campaign-women-shg.jpg';
import eventsImage from '@/assets/events-cultural.jpg';

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
                { label: t('programs.stats.childrenEducated', 'Children Educated'), value: '1,000+' },
                { label: t('programs.stats.freeServices', 'Free Services'), value: '5' },
            ],
            features: [t('programs.features.uniforms', 'Free uniforms'), t('programs.features.meals', 'Free meals'), t('programs.features.transport', 'Free transport'), t('programs.features.healthCheckups', 'Health checkups'), t('programs.features.teachers', 'Quality teachers')],
            color: 'bg-secondary',
            image: childrenImage,
        },
        {
            id: 'women-empowerment',
            icon: Heart,
            titleKey: 'programs.women.title',
            descKey: 'programs.women.description',
            stats: [
                { label: t('programs.stats.shgsFormed', 'SHGs Formed'), value: '4,481' },
                { label: t('programs.stats.microfinanceLinked', 'Microfinance Linked'), value: '₹80M' },
            ],
            features: [t('programs.features.shgFormation', 'SHG formation'), t('programs.features.capacityBuilding', 'Capacity building'), t('programs.features.microfinanceAccess', 'Microfinance access'), t('programs.features.entrepreneurship', 'Entrepreneurship'), t('programs.features.leadershipTraining', 'Leadership training')],
            color: 'bg-accent',
            image: womenImage,
        },
        {
            id: 'health',
            icon: Droplets,
            titleKey: 'programs.health.title',
            descKey: 'programs.health.description',
            stats: [
                { label: t('programs.stats.villagesOdf', 'Villages ODF'), value: '472' },
                { label: t('programs.stats.healthCamps', 'Health Camps'), value: '200+' },
            ],
            features: [t('programs.features.odfCertification', 'ODF certification'), t('programs.features.cleanWater', 'Clean water access'), t('programs.features.hygieneEducation', 'Hygiene education'), t('programs.features.sanitation', 'Sanitation facilities'), t('programs.features.healthAwareness', 'Health awareness')],
            color: 'bg-primary',
            image: healthImage,
        },
        {
            id: 'livelihood',
            icon: Briefcase,
            titleKey: 'programs.livelihood.title',
            descKey: 'programs.livelihood.description',
            stats: [
                { label: t('programs.stats.masonsTrained', 'Masons Trained'), value: '1,660' },
                { label: t('programs.stats.dairyUnits', 'Dairy Units'), value: '500+' },
            ],
            features: [t('programs.features.dairyFarming', 'Dairy farming'), t('programs.features.fishFarming', 'Fish farming'), t('programs.features.masonryTraining', 'Masonry training'), t('programs.features.skillsDev', 'Skills development'), t('programs.features.marketLinkage', 'Market linkage')],
            color: 'bg-earth',
            image: waterImage,
        },
        {
            id: 'agriculture',
            icon: Wheat,
            titleKey: 'programs.agriculture.title',
            descKey: 'programs.agriculture.description',
            stats: [
                { label: t('programs.stats.farmerGroups', 'Farmer Groups'), value: '500+' },
                { label: t('programs.stats.farmersTrained', 'Farmers Trained'), value: '10,000+' },
            ],
            features: [t('programs.features.farmerGroups', 'Farmer groups'), t('programs.features.organicPractices', 'Organic practices'), t('programs.features.cropSupport', 'Crop support'), t('programs.features.trainingPrograms', 'Training programs'), t('programs.features.marketAccess', 'Market access')],
            color: 'bg-primary',
            image: villageImage,
        },
        {
            id: 'microfinance',
            icon: Banknote,
            titleKey: 'programs.microfinance.title',
            descKey: 'programs.microfinance.description',
            stats: [
                { label: t('programs.stats.creditLinked', 'Credit Linked'), value: '₹80M' },
                { label: t('programs.stats.beneficiaries', 'Beneficiaries'), value: '45,000+' },
            ],
            features: [t('programs.features.bankLinkages', 'Bank linkages'), t('programs.features.creditFacilitation', 'Credit facilitation'), t('programs.features.financialLiteracy', 'Financial literacy'), t('programs.features.entrepreneurship', 'Entrepreneurship'), t('programs.features.savingsGroups', 'Savings groups')],
            color: 'bg-secondary',
            image: shgImage,
        },
        {
            id: 'disaster-response',
            icon: ShieldAlert,
            titleKey: 'programs.disaster.title',
            descKey: 'programs.disaster.description',
            stats: [
                { label: t('programs.stats.cycloneFaniRelief', 'Cyclone Fani Relief'), value: '4,500 families' },
                { label: t('programs.stats.covidResponse', 'COVID Response'), value: '10,000+' },
            ],
            features: [t('programs.features.emergencyRelief', 'Emergency relief'), t('programs.features.food distribution', 'Food distribution'), t('programs.features.shelterSupport', 'Shelter support'), t('programs.features.covidResponse', 'COVID response'), t('programs.features.communityResilience', 'Community resilience')],
            color: 'bg-destructive',
            image: eventsImage,
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
                                        <div className={`w-14 h-14 rounded-xl ${program.color} bg-opacity-10 flex items-center justify-center`}>
                                            <program.icon className={`w-7 h-7 ${program.color.replace('bg-', 'text-')}`} />
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
                                        className="rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer group"
                                        onClick={() => setSelectedProgram(program)}
                                    >
                                        <img
                                            src={program.image}
                                            alt={t(program.titleKey)}
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
