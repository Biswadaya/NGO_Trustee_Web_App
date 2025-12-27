import { ExternalLink, Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm py-6 px-6 mt-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-xs text-muted-foreground order-2 md:order-1">
                    <p>© {currentYear} Trust Flow Foundation. All rights reserved.</p>
                    <p className="mt-1">Empowering communities through transparent giving.</p>
                </div>

                <div className="flex items-center gap-6 text-xs font-medium text-muted-foreground order-1 md:order-2">
                    <div className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                        <ExternalLink className="w-3 h-3" />
                        <span>Privacy Policy</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                        <ExternalLink className="w-3 h-3" />
                        <span>Terms of Service</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-destructive transition-colors cursor-pointer">
                        <Heart className="w-3 h-3 text-destructive" />
                        <span>Donate</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
