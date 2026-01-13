import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Heart, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ProgramData {
  id: string;
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  stats: { label: string; value: string }[];
  features: string[];
  color: string;
  image: string;
}

interface ProgramDetailModalProps {
  program: ProgramData | null;
  onClose: () => void;
}

const ProgramDetailModal = ({ program, onClose }: ProgramDetailModalProps) => {
  const { t } = useTranslation();

  if (!program) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
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
              src={program.image} 
              alt={t(program.titleKey)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-6 left-6 right-6">
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${program.color} bg-opacity-90 mb-3`}>
                <program.icon className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {t(program.titleKey)}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-foreground mb-3">
                {t('programs.aboutProgram', 'About This Program')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t(program.descKey)}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {program.stats.map((stat) => (
                <div key={stat.label} className="bg-primary/5 rounded-xl p-4 text-center">
                  <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-foreground mb-3">
                {t('programs.keyFeatures', 'Key Features')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {program.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/donate" className="flex-1">
                <Button variant="cta" size="xl" className="w-full gap-2">
                  <Heart className="w-5 h-5" />
                  {t('programs.supportProgram', 'Support This Program')}
                </Button>
              </Link>
              <Link to="/get-involved" className="flex-1">
                <Button variant="outline" size="xl" className="w-full gap-2">
                  <Users className="w-5 h-5" />
                  {t('cta.volunteer')}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProgramDetailModal;
