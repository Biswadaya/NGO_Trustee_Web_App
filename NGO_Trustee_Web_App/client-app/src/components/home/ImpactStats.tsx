import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { Award, Users, MapPin, HandHeart } from 'lucide-react';

interface StatItem {
    icon: typeof Award;
    value: number;
    suffix: string;
    labelKey: string;
    color: string;
}

const stats: StatItem[] = [
    { icon: Award, value: 24, suffix: '', labelKey: 'impact.years', color: 'text-primary' },
    { icon: Users, value: 100000, suffix: '+', labelKey: 'impact.lives', color: 'text-accent' },
    { icon: MapPin, value: 500, suffix: '+', labelKey: 'impact.villages', color: 'text-secondary' },
    { icon: HandHeart, value: 4481, suffix: '', labelKey: 'impact.shgs', color: 'text-primary' },
];

interface CounterProps {
    end: number;
    suffix: string;
    isInView: boolean;
}

const AnimatedCounter = ({ end, suffix, isInView }: CounterProps) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        const duration = 2000;
        const steps = 60;
        const increment = end / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [end, isInView]);

    const formatNumber = (num: number) => {
        if (num >= 100000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toLocaleString();
    };

    return (
        <span>
            {formatNumber(count)}{suffix}
        </span>
    );
};

const ImpactStats = () => {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

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
                        {t('impact.title')}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t('impact.subtitle')}
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.labelKey}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="stat-card text-center group"
                        >
                            <div className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-muted mb-4 group-hover:scale-110 transition-transform ${stat.color}`}>
                                <stat.icon className="w-7 h-7 md:w-8 md:h-8" />
                            </div>
                            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                                <AnimatedCounter end={stat.value} suffix={stat.suffix} isInView={isInView} />
                            </div>
                            <p className="text-sm md:text-base text-muted-foreground font-medium">
                                {t(stat.labelKey)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactStats;
