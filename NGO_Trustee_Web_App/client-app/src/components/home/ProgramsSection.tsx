import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GraduationCap, Heart, Droplets, Briefcase, Wheat, ShieldAlert, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const programs = [
    {
        icon: GraduationCap,
        titleKey: 'programs.education.title',
        descKey: 'programs.education.description',
        color: 'bg-secondary/10 text-secondary',
        href: '/programs/education',
    },
    {
        icon: Heart,
        titleKey: 'programs.women.title',
        descKey: 'programs.women.description',
        color: 'bg-accent/10 text-accent',
        href: '/programs/women-empowerment',
    },
    {
        icon: Droplets,
        titleKey: 'programs.health.title',
        descKey: 'programs.health.description',
        color: 'bg-primary/10 text-primary',
        href: '/programs/health',
    },
    {
        icon: Briefcase,
        titleKey: 'programs.livelihood.title',
        descKey: 'programs.livelihood.description',
        color: 'bg-earth/10 text-earth',
        href: '/programs/livelihood',
    },
    {
        icon: Wheat,
        titleKey: 'programs.agriculture.title',
        descKey: 'programs.agriculture.description',
        color: 'bg-primary/10 text-primary',
        href: '/programs/agriculture',
    },
    {
        icon: ShieldAlert,
        titleKey: 'programs.disaster.title',
        descKey: 'programs.disaster.description',
        color: 'bg-destructive/10 text-destructive',
        href: '/programs/disaster-response',
    },
];

const ProgramsSection = () => {
    const { t } = useTranslation();

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
                            <Link to={program.href} className="block h-full">
                                <div className="program-card h-full p-6 md:p-8 flex flex-col group bg-card border border-border/50 rounded-xl hover:shadow-lg transition-all duration-300">
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
                                        {t('programs.learnMore', 'Learn More')}
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
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
                            {t('common.viewAll', 'View All Programs')}
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ProgramsSection;
