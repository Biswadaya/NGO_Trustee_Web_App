import { useTranslation } from 'react-i18next';
import { languages, type LanguageCode } from '@/i18n';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
    isTransparent?: boolean;
}

const LanguageSwitcher = ({ isTransparent = false }: LanguageSwitcherProps) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language as LanguageCode;

    const handleLanguageChange = (langCode: LanguageCode) => {
        i18n.changeLanguage(langCode);
        document.documentElement.lang = langCode;
    };

    const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors touch-target ${isTransparent
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                    aria-label="Select language"
                >
                    <Globe className="w-4 h-4" />
                    <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
                    <span className="sm:hidden uppercase">{currentLanguage.code}</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[140px]">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`cursor-pointer gap-2 ${currentLang === lang.code ? 'bg-primary text-primary-foreground' : ''
                            }`}
                    >
                        <span className="font-medium">{lang.nativeName}</span>
                        <span className="text-xs opacity-70 uppercase">({lang.code})</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSwitcher;
