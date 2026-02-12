import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Heart, Users, Building2, Briefcase, Mail, ArrowRight,
    CheckCircle, Clock, Award, HandHeart, Coins, Handshake
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import womenMeetingImage from '@/assets/women empowerment.jpeg';
import FundingFormModal from '@/components/forms/FundingFormModal';
import InvestmentFormModal from '@/components/forms/InvestmentFormModal';

const GetInvolved = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [activeModal, setActiveModal] = useState<'CSR' | 'GRANT' | 'INVESTMENT' | null>(null);

    const handleAction = (type: string, href?: string) => {
        if (href) {
            navigate(href);
            return;
        }
        if (type === 'CSR') setActiveModal('CSR');
        if (type === 'GRANT') setActiveModal('GRANT');
        if (type === 'INVESTMENT') setActiveModal('INVESTMENT');
    };

    const involvementOptions = [
        {
            icon: Users,
            titleKey: 'Become a Member',
            descKey: 'Join our community as an official member.',
            points: [
                'Access to exclusive events',
                'Voting rights',
                'Networking opportunities',
                'Direct impact'
            ],
            buttonKey: 'Join Now',
            buttonVariant: 'default' as const,
            color: 'bg-primary/10 text-primary',
            href: '/register' // Redirects to registration
        },
        {
            icon: Heart,
            titleKey: 'Make a Donation',
            descKey: 'Support our causes with a financial contribution.',
            points: [
                'One-time donation',
                'Monthly giving',
                'Sponsor a child',
                'Tax benefits'
            ],
            buttonKey: 'Donate Now',
            buttonVariant: 'cta' as const,
            href: '/donate',
            color: 'bg-accent/10 text-accent',
        },
        {
            icon: Building2,
            titleKey: 'CSR Contribution',
            descKey: 'Collaborate with us for Corporate Social Responsibility.',
            points: [
                'Corporate partnerships',
                'Employee engagement',
                'Project sponsorship',
                'Sustainability goals'
            ],
            buttonKey: 'Contribute',
            buttonVariant: 'outline' as const,
            color: 'bg-secondary/10 text-secondary',
            actionType: null,
            href: '/donate?type=CSR'
        },
        {
            icon: Handshake,
            titleKey: 'Provide a Grant',
            descKey: 'Support specific projects through grants.',
            points: [
                'Targeted impact',
                'Project-specific funding',
                'Regular reporting',
                'Transparency'
            ],
            buttonKey: 'Apply Grant',
            buttonVariant: 'outline' as const,
            color: 'bg-indigo-500/10 text-indigo-500',
            actionType: null,
            href: '/donate?type=GRANT'
        },
        {
            icon: Coins,
            titleKey: 'Investment',
            descKey: 'Invest in sustainable development projects.',
            points: [
                'Social Return on Investment',
                'Sustainable growth',
                'Long-term partnership',
                'Financial & Social Impact'
            ],
            buttonKey: 'Invest Now',
            buttonVariant: 'outline' as const,
            color: 'bg-emerald-500/10 text-emerald-500',
            actionType: null,
            href: '/donate?type=INVESTMENT'
        },
        {
            icon: Briefcase,
            titleKey: 'Careers',
            descKey: 'Work with us and build a career with purpose.',
            points: [
                'Work with purpose',
                'Professional growth',
                'Field experience',
                'Competitive benefits'
            ],
            buttonKey: 'View Openings',
            buttonVariant: 'outline' as const,
            color: 'bg-earth/10 text-earth',
        },
    ];

    const volunteerBenefits = [
        { icon: Award, titleKey: 'getInvolved.benefits.certificates.title', descKey: 'getInvolved.benefits.certificates.description' },
        { icon: Clock, titleKey: 'getInvolved.benefits.flexible.title', descKey: 'getInvolved.benefits.flexible.description' },
        { icon: HandHeart, titleKey: 'getInvolved.benefits.impact.title', descKey: 'getInvolved.benefits.impact.description' },
    ];

    return (
        <>
            <FundingFormModal
                isOpen={activeModal === 'GRANT'}
                onClose={() => setActiveModal(null)}
                type={'GRANT'}
            />
            <InvestmentFormModal
                isOpen={activeModal === 'INVESTMENT'}
                onClose={() => setActiveModal(null)}
            />

            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={womenMeetingImage}
                        alt="Community involvement in Odisha"
                        className="w-full h-full object-cover object-[50%_20%]"
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
                            {t('getInvolved.heroTitle', 'Get Involved')}
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
                            {t('getInvolved.heroSubtitle', 'Join us in making a difference in the lives of thousands')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Involvement Options */}
            <section className="py-16 md:py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {involvementOptions.map((option: any, index) => (
                            <motion.div
                                key={option.titleKey}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-card rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col"
                            >
                                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${option.color} mb-5`}>
                                    <option.icon className="w-7 h-7" />
                                </div>

                                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                                    {t(option.titleKey, option.titleKey) as string}
                                </h3>
                                <p className="text-muted-foreground mb-5 flex-grow">
                                    {t(option.descKey, option.descKey) as string}
                                </p>

                                <ul className="space-y-2 mb-6">
                                    {option.points.map((point: string, idx: number) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant={option.buttonVariant}
                                    className="w-full gap-2 mt-auto"
                                    onClick={() => handleAction(option.actionType, option.href)}
                                >
                                    {t(option.buttonKey, option.buttonKey) as string}
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
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
                            {t('getInvolved.whyVolunteer', 'Why Join Us?')}
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            {t('getInvolved.whyVolunteerSubtitle', 'Experience the joy of giving back while growing personally and professionally')}
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
                                <h3 className="text-xl font-bold text-foreground mb-2">{t(benefit.titleKey, benefit.titleKey.split('.')[2]) as string}</h3>
                                <p className="text-muted-foreground">{t(benefit.descKey, 'Benefit description') as string}</p>
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
                            {t('getInvolved.stayUpdatedSubtitle', 'Sign up for our newsletter to receive updates on our impact and opportunities.')}
                        </p>

                        <form className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder={t('newsletter.placeholder', 'Enter your email')}
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
        </>
    );
};

export default GetInvolved;
