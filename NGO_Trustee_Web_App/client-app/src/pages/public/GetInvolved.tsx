
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Heart, Users, Building2, Briefcase, Mail, ArrowRight,
    CheckCircle, Clock, Award, HandHeart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import womenMeetingImage from '@/assets/women-shg-meeting.jpg';

const GetInvolved = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');

    const involvementOptions = [
        {
            icon: Users,
            titleKey: 'getInvolved.volunteer.title',
            descKey: 'getInvolved.volunteer.description',
            points: [
                t('getInvolved.volunteer.point1', 'Join our volunteer network'),
                t('getInvolved.volunteer.point2', 'Participate in local events'),
                t('getInvolved.volunteer.point3', 'Skill-based volunteering'),
                t('getInvolved.volunteer.point4', 'Certificate of appreciation'),
            ],
            buttonKey: 'getInvolved.volunteer.button',
            buttonVariant: 'default' as const,
            color: 'bg-primary/10 text-primary',
            href: '/register', // Link to volunteer registration
        },
        {
            icon: Heart,
            titleKey: 'getInvolved.donation.title',
            descKey: 'getInvolved.donation.description',
            points: [
                t('getInvolved.donation.point1', 'Support specific campaigns'),
                t('getInvolved.donation.point2', 'Tax benefits under 80G'),
                t('getInvolved.donation.point3', 'Transparent utilization'),
                t('getInvolved.donation.point4', 'Regular impact reports'),
            ],
            buttonKey: 'getInvolved.donation.button',
            buttonVariant: 'cta' as const,
            href: '/donate',
            color: 'bg-accent/10 text-accent',
        },
        {
            icon: Building2,
            titleKey: 'getInvolved.csr.title',
            descKey: 'getInvolved.csr.description',
            points: [
                t('getInvolved.csr.point1', 'Corporate partnerships'),
                t('getInvolved.csr.point2', 'Employee engagement'),
                t('getInvolved.csr.point3', 'Sustainable impact projects'),
                t('getInvolved.csr.point4', 'Brand visibility'),
            ],
            buttonKey: 'getInvolved.csr.button',
            buttonVariant: 'outline' as const,
            color: 'bg-secondary/10 text-secondary',
            href: '/contact', // Assuming contact page or similar
        },
        {
            icon: Briefcase,
            titleKey: 'getInvolved.careers.title',
            descKey: 'getInvolved.careers.description',
            points: [
                t('getInvolved.careers.point1', 'Full-time opportunities'),
                t('getInvolved.careers.point2', 'Internship programs'),
                t('getInvolved.careers.point3', 'Fellowships'),
                t('getInvolved.careers.point4', 'Research collaborations'),
            ],
            buttonKey: 'getInvolved.careers.button',
            buttonVariant: 'outline' as const,
            color: 'bg-earth/10 text-earth',
            href: '/contact', // Assuming contact page or similar
        },
    ];

    const volunteerBenefits = [
        { icon: Award, titleKey: 'getInvolved.benefits.certificates.title', descKey: 'getInvolved.benefits.certificates.description' },
        { icon: Clock, titleKey: 'getInvolved.benefits.flexible.title', descKey: 'getInvolved.benefits.flexible.description' },
        { icon: HandHeart, titleKey: 'getInvolved.benefits.impact.title', descKey: 'getInvolved.benefits.impact.description' },
    ];

    return (
        <div className="bg-background min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={womenMeetingImage}
                        alt="Community involvement in Odisha"
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
                            {t('getInvolved.heroTitle', 'Join Our Mission')}
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
                            {t('getInvolved.heroSubtitle', 'Together we can create lasting change in rural communities')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Involvement Options */}
            <section className="py-16 md:py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {involvementOptions.map((option, index) => (
                            <motion.div
                                key={option.titleKey}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-card rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${option.color} mb-5`}>
                                    <option.icon className="w-7 h-7" />
                                </div>

                                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                                    {t(option.titleKey, option.titleKey.split('.')[1].charAt(0).toUpperCase() + option.titleKey.split('.')[1].slice(1))}
                                </h3>
                                <p className="text-muted-foreground mb-5">
                                    {t(option.descKey, 'Learn more about how you can contribute.')}
                                </p>

                                <ul className="space-y-2 mb-6">
                                    {option.points.map((point, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>

                                {option.href ? (
                                    <Link to={option.href}>
                                        <Button variant={option.buttonVariant} className="w-full gap-2">
                                            {t(option.buttonKey, 'Learn More')}
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button variant={option.buttonVariant} className="w-full gap-2">
                                        {t(option.buttonKey, 'Learn More')}
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Volunteer Benefits */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            {t('getInvolved.whyVolunteer', 'Why Volunteer With Us?')}
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            {t('getInvolved.whyVolunteerSubtitle', 'Be part of a community that cares')}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {volunteerBenefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.titleKey}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-5">
                                    <benefit.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">{t(benefit.titleKey, benefit.titleKey.split('.')[2]?.charAt(0).toUpperCase() + benefit.titleKey.split('.')[2]?.slice(1) || 'Benefit')}</h3>
                                <p className="text-muted-foreground">{t(benefit.descKey, 'Experience the joy of giving back.')}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 md:py-24 bg-primary">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Mail className="w-12 h-12 text-primary-foreground mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                            {t('getInvolved.stayUpdated', 'Stay Updated')}
                        </h2>
                        <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
                            {t('getInvolved.stayUpdatedSubtitle', 'Subscribe to our newsletter for the latest updates and stories.')}
                        </p>

                        <form className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder={t('newsletter.placeholder', 'Your Email Address')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 px-5 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                            />
                            <Button variant="hero" size="lg" className="w-full sm:w-auto">
                                {t('newsletter.button', 'Subscribe')}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default GetInvolved;
