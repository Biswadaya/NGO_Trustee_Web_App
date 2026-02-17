
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, X, Target, Calendar, Users, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { campaignAPI } from '@/api/endpoints';

// Images
import campaignWomenImage from '@/assets/campaign-women-shg.jpg';
import campaignEducationImage from '@/assets/campaign-education.jpg';
import campaignWaterImage from '@/assets/campaign-water.jpg';
import campaignHealthImage from '@/assets/campaign-health.jpg';

interface Campaign {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    goal: number;
    raised: number;
    image: string;
    startDate: string;
    endDate: string;
    beneficiaries: string;
    location: string;
    updates: { date: string; text: string }[];
}

const Campaigns = () => {
    const { t } = useTranslation();
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await campaignAPI.list();
                const apiCampaigns = response.data.data.campaigns || [];

                // Map API data to UI model
                const mappedCampaigns: Campaign[] = apiCampaigns.map((c: any, index: number) => ({
                    id: c.id,
                    name: c.title,
                    description: c.description || 'Join us in making a difference.',
                    longDescription: c.description || 'This campaign focuses on bringing sustainable change to the community. Your support ensures that we can provide necessary resources and aid to those who need it most.', // API might not have long description yet
                    goal: Number(c.goal_amount),
                    raised: Number(c.raised_amount) || 0,
                    image: c.banner_image || [campaignEducationImage, campaignWomenImage, campaignWaterImage, campaignHealthImage][index % 4], // Fallback to random demo image if no banner
                    startDate: c.start_date || new Date().toISOString(),
                    endDate: c.end_date || new Date().toISOString(),
                    beneficiaries: 'Community', // Default since API might not have it
                    location: 'Odisha, India', // Default
                    updates: [] // API might not have updates public endpoint yet
                }));

                setCampaigns(mappedCampaigns);
            } catch (error) {
                console.error("Failed to load campaigns", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    const getProgressPercentage = (raised: number, goal: number) => {
        if (goal <= 0) return 0;
        return Math.min((raised / goal) * 100, 100);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="bg-background min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden bg-primary">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center text-primary-foreground"
                    >
                        <Target className="w-16 h-16 mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            {t('campaigns.title', 'Our Campaigns')}
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
                            {t('campaigns.subtitle', 'Support specific causes that create lasting change in rural Odisha communities')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Campaigns Grid */}
            <section className="py-16 md:py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : campaigns.length === 0 ? (
                        <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-muted">
                            <Target className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-xl font-bold text-foreground mb-2">{t('campaigns.noActive', 'No Active Campaigns')}</h3>
                            <p className="text-muted-foreground">{t('campaigns.checkBack', 'Check back soon for new initiatives.')}</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-8">
                            {campaigns.map((campaign, index) => (
                                <motion.div
                                    key={campaign.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="bg-card rounded-2xl shadow-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow"
                                    onClick={() => setSelectedCampaign(campaign)}
                                >
                                    {/* Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={campaign.image}
                                            alt={campaign.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => { e.currentTarget.src = campaignEducationImage; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                                                {campaign.location}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                            {campaign.name}
                                        </h3>
                                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                            {campaign.description}
                                        </p>

                                        {/* Progress */}
                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="font-semibold text-primary">{formatCurrency(campaign.raised)}</span>
                                                <span className="text-muted-foreground">{t('campaigns.of', 'of')} {formatCurrency(campaign.goal)}</span>
                                            </div>
                                            <Progress value={getProgressPercentage(campaign.raised, campaign.goal)} className="h-2" />
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {getProgressPercentage(campaign.raised, campaign.goal).toFixed(0)}% {t('campaigns.funded', 'funded')}
                                            </p>
                                        </div>

                                        {/* Meta */}
                                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                            <span className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                {campaign.beneficiaries}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {t('campaigns.ends', 'Ends')} {new Date(campaign.endDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                                            </span>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-3">
                                            <Link to={`/donate?campaign=${campaign.id}`} className="flex-1" onClick={(e) => e.stopPropagation()}>
                                                <Button variant="cta" className="w-full gap-2">
                                                    <Heart className="w-4 h-4" />
                                                    {t('common.donateNow', 'Donate Now')}
                                                </Button>
                                            </Link>
                                            <Button variant="outline" className="gap-2" onClick={() => setSelectedCampaign(campaign)}>
                                                {t('campaigns.details', 'Details')}
                                                <ArrowRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Campaign Detail Modal */}
            <AnimatePresence>
                {selectedCampaign && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedCampaign(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-card rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header Image */}
                            <div className="relative h-64 md:h-80">
                                <img
                                    src={selectedCampaign.image}
                                    alt={selectedCampaign.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.currentTarget.src = campaignEducationImage; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                <button
                                    onClick={() => setSelectedCampaign(null)}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full mb-3">
                                        {selectedCampaign.location}
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                                        {selectedCampaign.name}
                                    </h2>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8">
                                {/* Progress Section */}
                                <div className="bg-muted/50 rounded-xl p-6 mb-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <div>
                                            <p className="text-3xl font-bold text-primary">{formatCurrency(selectedCampaign.raised)}</p>
                                            <p className="text-muted-foreground">{t('campaigns.raised', 'raised')} {t('campaigns.of', 'of')} {formatCurrency(selectedCampaign.goal)} {t('campaigns.goal', 'goal')}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-foreground">
                                                {getProgressPercentage(selectedCampaign.raised, selectedCampaign.goal).toFixed(0)}%
                                            </p>
                                            <p className="text-muted-foreground">{t('campaigns.funded', 'funded')}</p>
                                        </div>
                                    </div>
                                    <Progress value={getProgressPercentage(selectedCampaign.raised, selectedCampaign.goal)} className="h-3" />
                                </div>

                                {/* Details Grid */}
                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    <div className="bg-primary/5 rounded-xl p-4 text-center">
                                        <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                                        <p className="font-semibold text-foreground">{selectedCampaign.beneficiaries}</p>
                                        <p className="text-sm text-muted-foreground">{t('campaigns.beneficiaries', 'Beneficiaries')}</p>
                                    </div>
                                    <div className="bg-primary/5 rounded-xl p-4 text-center">
                                        <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                                        <p className="font-semibold text-foreground">
                                            {new Date(selectedCampaign.startDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{t('campaigns.started', 'Started')}</p>
                                    </div>
                                    <div className="bg-primary/5 rounded-xl p-4 text-center">
                                        <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                                        <p className="font-semibold text-foreground">
                                            {new Date(selectedCampaign.endDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{t('campaigns.ends', 'Ends')}</p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-foreground mb-3">{t('campaigns.about', 'About This Campaign')}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {selectedCampaign.longDescription}
                                    </p>
                                </div>

                                {/* Updates - If API supports it in future, we can map it. Currently empty unless customized */}
                                {selectedCampaign.updates.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="text-lg font-bold text-foreground mb-3">{t('campaigns.updates', 'Recent Updates')}</h3>
                                        <div className="space-y-3">
                                            {selectedCampaign.updates.map((update, idx) => (
                                                <div key={idx} className="flex gap-4 p-3 bg-muted/30 rounded-lg">
                                                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                                                        {new Date(update.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                                    </div>
                                                    <p className="text-sm text-foreground">{update.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* CTA */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link to={`/donate?campaign=${selectedCampaign.id}`} className="flex-1">
                                        <Button variant="cta" size="xl" className="w-full gap-2">
                                            <Heart className="w-5 h-5" />
                                            {t('campaigns.donateToCampaign', 'Donate to This Campaign')}
                                        </Button>
                                    </Link>
                                    <Button variant="outline" size="xl" onClick={() => setSelectedCampaign(null)}>
                                        {t('campaigns.close', 'Close')}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Campaigns;
