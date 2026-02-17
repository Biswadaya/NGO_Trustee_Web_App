import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GraduationCap, Heart, Droplets, Briefcase, Wheat, ShieldAlert, ArrowRight, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProgramDetailModal from '@/components/ProgramDetailModal';
import childrenImage from '@/assets/children-classroom.jpg';
import womenImage from '@/assets/women-shg-meeting.jpg';
import healthImage from '@/assets/program-health-real.jpg';
import livelihoodImage from '@/assets/campaign-water.jpg';
import agricultureImage from '@/assets/1_women_in_field.jpg.webp';
import disasterImage from '@/assets/cyclone_NDRF.jpg';
import shgImage from '@/assets/program-microfinance-real.jpg';

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
        },
        {
            id: 'women-empowerment',
            icon: Heart,
            titleKey: 'programs.women.title',
            descKey: 'programs.women.description',
            color: 'bg-accent/10 text-accent',
            image: womenImage,
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
        },
        {
            id: 'health',
            icon: Droplets,
            titleKey: 'programs.health.title',
            descKey: 'programs.health.description',
            color: 'bg-primary/10 text-primary',
            image: healthImage,
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
        },
        {
            id: 'livelihood',
            icon: Briefcase,
            titleKey: 'programs.livelihood.title',
            descKey: 'programs.livelihood.description',
            color: 'bg-earth/10 text-earth',
            image: livelihoodImage,
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
        },
        {
            id: 'agriculture',
            icon: Wheat,
            titleKey: 'programs.agriculture.title',
            descKey: 'programs.agriculture.description',
            color: 'bg-primary/10 text-primary',
            image: agricultureImage,
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
        },
        {
            id: 'microfinance',
            icon: Banknote,
            titleKey: 'programs.microfinance.title',
            descKey: 'programs.microfinance.description',
            color: 'bg-secondary/10 text-secondary',
            image: shgImage,
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
        },
        {
            id: 'disaster-response',
            icon: ShieldAlert,
            titleKey: 'programs.disaster.title',
            descKey: 'programs.disaster.description',
            color: 'bg-destructive/10 text-destructive',
            image: disasterImage,
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
                        {t('programs.title', 'Our Programs')}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t('programs.subtitle', 'Holistic development initiatives transforming rural communities')}
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
                                        {t(program.titleKey, program.titleKey.split('.')[1])}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed flex-grow text-sm md:text-base">
                                        {t(program.descKey, 'Description of program...')}
                                    </p>

                                    {/* Link */}
                                    <div className="mt-5 flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                                        {t('programs.learnMore', 'Learn More')}
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
                    <Link to="/what-we-do">
                        <Button variant="outline" size="lg" className="gap-2">
                            {t('common.viewAll', 'View All Programs')}
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
