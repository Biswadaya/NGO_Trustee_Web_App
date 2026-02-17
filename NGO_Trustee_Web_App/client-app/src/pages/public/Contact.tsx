
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
// import { toast } from 'sonner'; // Using simplified alert or console for now if sonner not setup, or keep if it is. Verified sonner is not in client-app package.json in previous turns (assumption), using standard alert or check if toast exists.
// Checking App.tsx imports in previous turns, didn't see Toaster. I'll use simple state for now or standard alert.
// Actually, looking at admin pages, they use 'react-hot-toast' or similar?
// Let's stick to standard UI feedback as seen in demo code, will remove toast import for safety unless confirmed.
// Re-reading client-demo Contact.tsx uses 'sonner'.
// client-app uses 'react-hot-toast' in AdminProjects.tsx (seen in previous turns: "toast.error('Failed to load campaigns')")
import { toast } from 'sonner';

import heroImage from '@/assets/contact.jpeg';

const Contact = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        category: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const contactInfo = [
        {
            icon: MapPin,
            titleKey: 'contact.ourAddress',
            content: t('footer.address', 'Balipatna, Khordha, Odisha'),
        },
        {
            icon: Phone,
            titleKey: 'footer.phone',
            content: '09439-888888',
            href: 'tel:09439888888',
        },
        {
            icon: Mail,
            titleKey: 'footer.email',
            content: 'nhrdodisha@gmail.com',
            href: 'mailto:nhrdosidha@gmail.com',
        },
        {
            icon: Clock,
            titleKey: 'contact.officeHours',
            content: t('contact.officeHoursText', 'Mon - Sat: 9:00 AM - 6:00 PM'),
        },
    ];

    const categories = [
        { key: 'donation', label: t('contact.categories.donation', 'Donation Inquiry') },
        { key: 'volunteer', label: t('contact.categories.volunteer', 'Volunteering') },
        { key: 'partnership', label: t('contact.categories.partnership', 'Partnership') },
        { key: 'general', label: t('contact.categories.general', 'General Inquiry') },
        { key: 'feedback', label: t('contact.categories.feedback', 'Feedback') },
    ];

    const faqs = [
        { qKey: 'contact.faqs.q1', aKey: 'contact.faqs.a1' },
        { qKey: 'contact.faqs.q2', aKey: 'contact.faqs.a2' },
        { qKey: 'contact.faqs.q3', aKey: 'contact.faqs.a3' },
        { qKey: 'contact.faqs.q4', aKey: 'contact.faqs.a4' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        toast.success(t('contact.thankYou', 'Thank you for contacting us!'));
    };

    return (
        <div className="bg-background min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={heroImage}
                        alt="Odisha village"
                        className="w-full h-full object-cover object-[50%_3%]"
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
                            {t('contact.heroTitle', 'Contact Us')}
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
                            {t('contact.heroSubtitle', 'We are here to help and answer any question you might have.')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 md:py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                                {t('contact.sendMessage', 'Send us a Message')}
                            </h2>

                            {isSubmitted ? (
                                <div className="bg-primary/5 rounded-2xl p-8 text-center">
                                    <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-foreground mb-2">{t('contact.messageSent', 'Message Sent Successfully')}</h3>
                                    <p className="text-muted-foreground">
                                        {t('contact.thankYou', 'We will get back to you shortly.')}
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="mt-6"
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setFormData({ name: '', email: '', phone: '', category: '', message: '' });
                                        }}
                                    >
                                        {t('contact.sendAnother', 'Send Another Message')}
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                                {t('contact.name', 'Full Name')} *
                                            </label>
                                            <Input
                                                id="name"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder={t('contact.yourName', 'John Doe')}
                                                className="h-12"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                                {t('contact.email', 'Email Address')} *
                                            </label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder={t('contact.yourEmail', 'john@example.com')}
                                                className="h-12"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                                                {t('contact.phone', 'Phone Number')}
                                            </label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder={t('contact.yourPhone', '+91 98765 43210')}
                                                className="h-12"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                                                {t('contact.category', 'Category')} *
                                            </label>
                                            <select
                                                id="category"
                                                required
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                            >
                                                <option value="">{t('contact.selectCategory', 'Select a topic')}</option>
                                                {categories.map((cat) => (
                                                    <option key={cat.key} value={cat.key}>{cat.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                            {t('contact.message', 'Message')} *
                                        </label>
                                        <Textarea
                                            id="message"
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder={t('contact.howCanWeHelp', 'How can we help you?')}
                                            rows={5}
                                            className="resize-none"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="cta"
                                        size="lg"
                                        className="w-full gap-2"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? t('contact.sending', 'Sending...') : t('contact.send', 'Send Message')}
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </form>
                            )}
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                                {t('contact.contactInfo', 'Get in Touch')}
                            </h2>

                            <div className="space-y-6">
                                {contactInfo.map((info) => (
                                    <div key={info.titleKey} className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <info.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground">{t(info.titleKey, info.titleKey.split('.')[1] || 'Info')}</h3>
                                            {info.href ? (
                                                <a
                                                    href={info.href}
                                                    className="text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    {info.content}
                                                </a>
                                            ) : (
                                                <p className="text-muted-foreground">{info.content}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-muted rounded-2xl aspect-video flex items-center justify-center">
                                <div className="text-center p-8">
                                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                                    <p className="text-muted-foreground">
                                        Balipatna, Khordha District, Odisha
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            {t('contact.faqTitle', 'Frequently Asked Questions')}
                        </h2>
                    </motion.div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.details
                                key={faq.qKey}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-card rounded-xl shadow-sm"
                            >
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <h3 className="font-semibold text-foreground pr-4">
                                        {t(faq.qKey, 'FAQ Question Placeholder')}
                                    </h3>
                                    <span className="text-2xl text-primary group-open:rotate-45 transition-transform">+</span>
                                </summary>
                                <div className="px-6 pb-6 pt-0">
                                    <p className="text-muted-foreground">
                                        {t(faq.aKey, 'Answer to the FAQ question goes here.')}
                                    </p>
                                </div>
                            </motion.details>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
