import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/sean-oulashin-KMn4VEeEPR8-unsplash.jpg';

const HeroSection = () => {
    const { t } = useTranslation();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={heroImage}
                    alt="Rural Odisha village landscape"
                    className="w-full h-full object-cover"
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center mt-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                    >
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-white text-sm font-medium">
                            {t('hero.badge', 'Empowering Rural Odisha')}
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                    >
                        {t('hero.title', 'Transforming Lives Through Community Action')}
                    </motion.h1>

                    {/* Subtitle Stats */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-xl sm:text-2xl text-white/90 font-medium"
                    >
                        {t('hero.subtitle', '24+ Years of Service • 100,000+ Lives Impacted')}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="max-w-2xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed"
                    >
                        {t('hero.description', 'Join us in building a sustainable future where every individual has access to education, healthcare, and livelihood opportunities.')}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                        <Link to="/donate">
                            <Button variant="hero" size="xl" className="gap-2 min-w-[200px]">
                                <Heart className="w-5 h-5" />
                                {t('hero.ctaDonate', 'Donate Now')}
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="heroSecondary" size="xl" className="gap-2 min-w-[200px]">
                                <Users className="w-5 h-5" />
                                {t('hero.ctaMember', 'Become a Member')}
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button variant="heroOutline" size="xl" className="gap-2 min-w-[200px]">
                                {t('hero.ctaLearnMore', 'Learn More')}
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
