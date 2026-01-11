
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    GraduationCap, Heart, Droplets, Briefcase, Wheat, ShieldAlert, Banknote,
    ArrowRight, Users, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import childrenImage from '@/assets/children-classroom.jpg';

const WhatWeDo = () => {
    const { t } = useTranslation();

    // Ideally these translations would exist in local files, keeping keys for now. 
    // If keys are missing, fallback text is provided via defaults in t() or ensuring en.json has them.
    // For now, assuming keys might exist or we rely on the keys themselves if strict mode is off, 
    // but better to provide defaults or use the existing structure if copied from demo.

    const programs = [
        {
            id: 'education',
            icon: GraduationCap,
            titleKey: 'programs.education.title',
            titleDefault: 'Education',
            descKey: 'programs.education.description',
            descDefault: 'Providing quality education to underprivileged children through our village schools and scholarship programs.',
            stats: [
                { label: 'Children Educated', value: '1,000+' },
                { label: 'Free Services', value: '5' },
            ],
            features: ['Free uniforms', 'Free meals', 'Free transport', 'Health checkups', 'Quality teachers'],
            color: 'bg-secondary',
        },
        {
            id: 'women-empowerment',
            icon: Heart,
            titleKey: 'programs.women.title',
            titleDefault: 'Women Empowerment',
            descKey: 'programs.women.description',
            descDefault: 'Empowering women through Self-Help Groups (SHGs) and microfinance initiatives to foster financial independence.',
            stats: [
                { label: 'SHGs Formed', value: '4,481' },
                { label: 'Microfinance Linked', value: '₹80M' },
            ],
            features: ['SHG formation', 'Capacity building', 'Microfinance access', 'Entrepreneurship', 'Leadership training'],
            color: 'bg-accent',
        },
        {
            id: 'health',
            icon: Droplets,
            titleKey: 'programs.health.title',
            titleDefault: 'Health & Sanitation',
            descKey: 'programs.health.description',
            descDefault: 'Improving community health through sanitation drives, clean water access, and regular health camps.',
            stats: [
                { label: 'Villages ODF', value: '472' },
                { label: 'Health Camps', value: '200+' },
            ],
            features: ['ODF certification', 'Clean water access', 'Hygiene education', 'Sanitation facilities', 'Health awareness'],
            color: 'bg-primary',
        },
        {
            id: 'livelihood',
            icon: Briefcase,
            titleKey: 'programs.livelihood.title',
            titleDefault: 'Livelihood Support',
            descKey: 'programs.livelihood.description',
            descDefault: 'Creating sustainable livelihood opportunities through vocational training and skill development programs.',
            stats: [
                { label: 'Masons Trained', value: '1,660' },
                { label: 'Dairy Units', value: '500+' },
            ],
            features: ['Dairy farming', 'Fish farming', 'Masonry training', 'Skills development', 'Market linkage'],
            color: 'bg-orange-500', // customized from 'bg-earth' which might not exist in client-app config
        },
        {
            id: 'agriculture',
            icon: Wheat,
            titleKey: 'programs.agriculture.title',
            titleDefault: 'Agriculture',
            descKey: 'programs.agriculture.description',
            descDefault: 'Supporting farmers with organic farming techniques, crop management, and market access.',
            stats: [
                { label: 'Farmer Groups', value: '500+' },
                { label: 'Farmers Trained', value: '10,000+' },
            ],
            features: ['Farmer groups', 'Organic practices', 'Crop support', 'Training programs', 'Market access'],
            color: 'bg-green-600',
        },
        {
            id: 'microfinance',
            icon: Banknote,
            titleKey: 'programs.microfinance.title',
            titleDefault: 'Microfinance',
            descKey: 'programs.microfinance.description',
            descDefault: 'Facilitating financial inclusion by linking community groups with formal banking systems.',
            stats: [
                { label: 'Credit Linked', value: '₹80M' },
                { label: 'Beneficiaries', value: '45,000+' },
            ],
            features: ['Bank linkages', 'Credit facilitation', 'Financial literacy', 'Entrepreneurship', 'Savings groups'],
            color: 'bg-blue-500',
        },
        {
            id: 'disaster-response',
            icon: ShieldAlert,
            titleKey: 'programs.disaster.title',
            titleDefault: 'Disaster Response',
            descKey: 'programs.disaster.description',
            descDefault: 'Providing immediate relief and long-term rehabilitation support during natural disasters.',
            stats: [
                { label: 'Cyclone Fani Relief', value: '4,500 families' },
                { label: 'COVID Response', value: '10,000+' },
            ],
            features: ['Emergency relief', 'Food distribution', 'Shelter support', 'COVID response', 'Community resilience'],
            color: 'bg-destructive',
        },
    ];

    return (
        <div className="bg-background min-h-screen">
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
                            {t('programs.title', 'Our Impact Areas')}
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
                            {t('programs.subtitle', 'Comprehensive development through education, health, and livelihood support.')}
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
                                            <program.icon className={`w-7 h-7 text-foreground`} />
                                            {/* Note: In demo, text color was dynamic. Simplified here for reliability or use ${program.color.replace('bg-', 'text-')} if strict colors exist */}
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                            {t(program.titleKey, program.titleDefault)}
                                        </h2>
                                    </div>

                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        {t(program.descKey, program.descDefault)}
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

                                    {/* Not linking to deeper pages since we haven't migrated individual program details yet, or we can link to contact/donate */}
                                    <div className="pt-4">
                                        <Link to="/donate">
                                            <Button variant="outline" className="gap-2">
                                                Support this Cause
                                                <ArrowRight className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Visual Card */}
                                <div className="flex-1 w-full lg:w-auto">
                                    <div className={`${program.color} bg-opacity-10 rounded-2xl p-8 md:p-12 aspect-[4/3] flex items-center justify-center bg-slate-100`}>
                                        <program.icon className={`w-24 h-24 md:w-32 md:h-32 text-primary opacity-20`} />
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
                            {t('programs.supportTitle', 'Be the Change You Wish to See')}
                        </h2>
                        <p className="text-accent-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
                            {t('programs.supportSubtitle', 'Join hands with NHRD to transform lives in rural Odisha.')}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/donate">
                                <Button variant="default" size="lg" className="gap-2 bg-white text-accent hover:bg-white/90">
                                    <Heart className="w-5 h-5" />
                                    {t('cta.donateNow', 'Donate Now')}
                                </Button>
                            </Link>
                            <Link to="/get-involved">
                                <Button variant="outline" size="lg" className="gap-2 border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent">
                                    <Users className="w-5 h-5" />
                                    {t('cta.volunteer', 'Become a Volunteer')}
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default WhatWeDo;
