import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import nhrdLogo from '@/assets/nhrd-logo.png';

const Footer = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { path: '/about', label: t('nav.about') },
    { path: '/programs', label: t('nav.programs') },
    { path: '/impact', label: t('nav.impact') },
    { path: '/stories', label: t('nav.stories') },
    { path: '/donate', label: t('nav.donate') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={nhrdLogo} 
                alt="NHRD Logo" 
                className="w-14 h-14 object-contain bg-white rounded-full p-1"
              />
              <div>
                <span className="text-xl font-bold">NHRD</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
              {t('footer.aboutText')}
            </p>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm link-animated"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent" />
                <span className="text-sm text-primary-foreground/80">{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-accent" />
                <a
                  href="tel:09439888888"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  09439-888888
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-accent" />
                <a
                  href="mailto:bhagirathius@gmail.com"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  bhagirathius@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.followUs')}</h3>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors touch-target"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="mt-6 p-4 bg-primary-foreground/10 rounded-lg">
              <p className="text-xs text-primary-foreground/80 mb-2">{t('footer.registered')}</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-primary-foreground/10 rounded">80G</span>
                <span className="text-xs px-2 py-1 bg-primary-foreground/10 rounded">12A</span>
                <span className="text-xs px-2 py-1 bg-primary-foreground/10 rounded">FCRA</span>
                <span className="text-xs px-2 py-1 bg-primary-foreground/10 rounded">NITI Aayog</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/70">
            <p className="flex items-center gap-1">
              {t('footer.copyright')}
              <Heart className="w-4 h-4 text-accent inline-block" />
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-primary-foreground transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link to="/terms" className="hover:text-primary-foreground transition-colors">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
