import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import nhrdLogoTransparent from '@/assets/nhrd-logo-transparent.png';

const Footer = () => {
    const { t } = useTranslation();

    const quickLinks = [
        { path: '/about', label: t('nav.about', 'About Us') },
        { path: '/what-we-do', label: t('nav.programs', 'Programs') },
        { path: '/impact', label: t('nav.impact', 'Impact') },
        { path: '/stories', label: t('nav.stories', 'Stories') },
        { path: '/donate', label: t('nav.donate', 'Donate') },
        { path: '/contact', label: t('nav.contact', 'Contact') },
    ];

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Youtube, href: '#', label: 'YouTube' },
    ];

    return (
        <footer className="bg-accent text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* About Column */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src={nhrdLogoTransparent}
                                alt="NHRD Logo"
                                className="w-14 h-14 object-contain"
                            />
                            <div>
                                <span className="text-xl font-bold">NHRD</span>
                            </div>
                        </div>
                        <p className="text-white font-medium text-sm leading-relaxed mb-4">
                            {t('footer.aboutText', 'Empowering communities through sustainable development and social change since 2010. Join us in making a difference.')}
                        </p>
                        <div className="flex items-center gap-2">
                            <LanguageSwitcher />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">{t('footer.quickLinks', 'Quick Links')}</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-white hover:text-white transition-colors text-sm font-medium link-animated"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">{t('footer.contact', 'Contact')}</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-white" />
                                <span className="text-sm text-accent-foreground font-medium">{t('footer.address', 'National Human Resource Development')}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 flex-shrink-0 text-white" />
                                <a
                                    href="tel:09439888888"
                                    className="text-sm text-white hover:text-white transition-colors font-medium"
                                >
                                    09439-888888
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 flex-shrink-0 text-white" />
                                <a
                                    href="mailto:bhagirathius@gmail.com"
                                    className="text-sm text-white hover:text-white transition-colors font-medium"
                                >
                                    nhrdodisha@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">{t('footer.followUs', 'Follow Us')}</h3>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors touch-target"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-6 p-4 bg-accent-foreground/10 rounded-lg">
                            <p className="text-xs text-accent-foreground font-medium mb-2">{t('footer.registered', 'Registered Under:')}</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs px-2 py-1 bg-accent-foreground/10 rounded">80G</span>
                                <span className="text-xs px-2 py-1 bg-accent-foreground/10 rounded">12A</span>
                                <span className="text-xs px-2 py-1 bg-accent-foreground/10 rounded">FCRA</span>
                                <span className="text-xs px-2 py-1 bg-accent-foreground/10 rounded">NITI Aayog</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white font-medium">
                        <p className="flex items-center gap-1">
                            {t('footer.copyright', '© 2026 NHRD. All rights reserved.')}
                            <Heart className="w-4 h-4 text-white inline-block" />
                        </p>
                        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                            <Link to="/terms-of-use" className="hover:text-white transition-colors">
                                {t('footer.terms', 'Terms of Use')}
                            </Link>
                            <Link to="/privacy-policy" className="hover:text-white transition-colors">
                                {t('footer.privacy', 'Privacy Policy')}
                            </Link>
                            <Link to="/copyright-policy" className="hover:text-white transition-colors">
                                {t('footer.copyrightPolicy', 'Copyright Policy')}
                            </Link>
                            <Link to="/linking-policy" className="hover:text-white transition-colors">
                                {t('footer.linkingPolicy', 'Linking Policy')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
