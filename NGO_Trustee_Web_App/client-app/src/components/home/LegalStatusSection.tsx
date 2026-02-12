import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, FileText, CheckCircle } from 'lucide-react';

const legalInfo = [
    {
        label: 'Societies Registration Act XXI 1860',
        value: '2054/193 of 2000 (28.09.2000)',
        detail: 'Cuttack, Orissa (Amended 24th Sept, 2024)',
        icon: FileText
    },
    {
        label: 'Foreign Contribution Regulation Act, 1976',
        value: '104830223 (18/03/2008)',
        detail: 'Ministry of Home Affairs, Govt. of India',
        icon: ShieldCheck
    },
    {
        label: 'Income Tax Act, 12A',
        value: 'AAKAN2915QE2020601',
        detail: '',
        icon: CheckCircle
    },
    {
        label: '80G (5)',
        value: 'AAKAN2915QF2023',
        detail: 'Valid AY2023 to AY2026-27',
        icon: CheckCircle
    },
    {
        label: 'NITI AAYOG',
        value: 'Unique ID - OR/2018/0187464',
        detail: '',
        icon: ShieldCheck
    },
    {
        label: 'Permanent Account Number (PAN)',
        value: 'AAKAN2915Q',
        detail: 'Govt. of India',
        icon: FileText
    },
    {
        label: 'CSR Registration',
        value: 'CSR00003048',
        detail: 'Ministry of Corporate Affairs',
        icon: CheckCircle
    },
    {
        label: 'EPF',
        value: 'OR13491',
        detail: 'PF Commissioner, Govt. of India',
        icon: ShieldCheck
    }
];

const LegalStatusSection = () => {
    const { t } = useTranslation();

    return (
        <section className="py-12 bg-primary text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-10"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                        {t('legal.title', 'Certifications & Legal Status')}
                    </h2>
                    <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                        {t('legal.subtitle', 'NHRD is a fully compliant and registered organization under the laws of India.')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {legalInfo.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-colors"
                        >
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-white/20 rounded-lg shrink-0">
                                    <item.icon className="w-5 h-5 text-black" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm text-black/90 mb-1 leading-tight">
                                        {item.label}
                                    </h3>
                                    <p className="font-mono text-xs text-black/90 font-bold mb-1 break-all">
                                        {item.value}
                                    </p>
                                    {item.detail && (
                                        <p className="text-[10px] text-black/70 uppercase tracking-wider">
                                            {item.detail}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LegalStatusSection;
