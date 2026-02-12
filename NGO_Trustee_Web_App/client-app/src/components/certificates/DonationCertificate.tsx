import { useRef, useState } from 'react';
import nhrdLogo from '@/assets/nhrd-logo.png';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Loader2 } from 'lucide-react';

// Design constants
const COLORS = {
    bgGradient: 'bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2]',
    footerBg: 'bg-[#004D40]', // Dark Teal
    accentText: 'text-[#006064]',
    textPrimary: 'text-gray-800',
    textSecondary: 'text-gray-600',
    borderColor: 'border-[#004D40]',
};

export const DonationCertificate = () => {
    const certRef = useRef<HTMLDivElement>(null);
    const [donorName, setDonorName] = useState("John Doe");
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [gratitudeText, setGratitudeText] = useState("In grateful recognition of your generous contribution towards empowering rural communities and transforming lives.");
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        if (!certRef.current) return;
        setDownloading(true);
        try {
            // Ensure fonts are loaded
            await document.fonts.ready;

            // Wait for a brief moment to ensure re-renders are complete
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await html2canvas(certRef.current, {
                scale: 3, // Higher quality
                useCORS: true,
                backgroundColor: '#ffffff', // Ensure white background if transparent
                logging: true, // Help debug if it fails again
                allowTaint: true,
                onclone: (clonedDoc) => {
                    // Fix for some styles not being captured
                    const clonedElement = clonedDoc.querySelector('[data-cert-container]') as HTMLElement;
                    if (clonedElement) {
                        clonedElement.style.display = 'flex';
                    }
                }
            });

            const link = document.createElement('a');
            link.download = `NHRD_Certificate_${donorName.replace(/\s+/g, '_')}.png`;
            link.href = canvas.toDataURL('image/png', 1.0);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Failed to generate certificate", error);
            alert("Failed to generate certificate image. Please try again.");
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 p-8">
            {/* Controls */}
            <div className="flex flex-wrap gap-4 items-end bg-white p-6 rounded-xl shadow-sm border border-border w-full max-w-[600px]">
                <div className="space-y-2 flex-1 min-w-[200px]">
                    <label className="text-sm font-medium">Donor Name</label>
                    <Input
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="Enter donor name"
                    />
                </div>
                <div className="space-y-2 flex-1 min-w-[200px]">
                    <label className="text-sm font-medium">Gratitude Message</label>
                    <Input
                        value={gratitudeText}
                        onChange={(e) => setGratitudeText(e.target.value)}
                        placeholder="Enter message"
                    />
                </div>
                <div className="space-y-2 w-[150px]">
                    <label className="text-sm font-medium">Date</label>
                    <Input
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="Date"
                    />
                </div>
                <Button onClick={handleDownload} disabled={downloading} className="bg-[#004D40] hover:bg-[#006064] w-full sm:w-auto">
                    {downloading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                    Download PNG
                </Button>
            </div>

            {/* Certificate Preview */}
            <div ref={certRef} data-cert-container className={`relative w-[600px] h-[400px] ${COLORS.bgGradient} rounded-xl shadow-2xl overflow-hidden flex flex-col font-sans border-2 ${COLORS.borderColor} shrink-0`}>

                {/* Background Watermark/Pattern (Simulated with CSS) */}
                <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
                    <img src={nhrdLogo} alt="" className="w-64 h-64 object-contain grayscale" />
                </div>

                {/* Header */}
                <div className="relative pt-8 px-8 text-center flex-1 z-10 flex flex-col">
                    <div className="flex flex-col items-center justify-center mb-2">
                        {/* Laurel Wreath Simulation (SVG or similar) - Simplifying for now */}
                        <div className="relative">
                            <img src={nhrdLogo} alt="NHRD" className="h-14 w-auto object-contain" />
                        </div>
                        <h1 className="text-2xl font-extrabold text-[#000000] mt-1 tracking-wide">NHRD</h1>
                        <p className="text-[9px] uppercase font-bold text-[#000000] tracking-widest mt-0.5">National Human Resource Development</p>
                    </div>

                    <div className="mt-3 mb-2">
                        <p className="text-xs font-medium text-[#000000]/50 uppercase tracking-widest mb-1">Presented to</p>
                        <h2 className="text-2xl font-serif font-bold text-[#004D40] italic">
                            {donorName}
                        </h2>
                    </div>

                    <p className="text-sm text-[#000000]/80 font-medium italic px-8 leading-relaxed max-w-md mx-auto">
                        "{gratitudeText}"
                    </p>

                    <h3 className="text-xs font-bold text-[#000000]/60 mt-3 uppercase tracking-wide">
                        Transforming Rural Odisha
                    </h3>

                    <div className="w-full h-0.5 bg-[#000000]/10 my-3 max-w-sm mx-auto"></div>

                    <p className="text-xs font-medium text-[#000000]/70 mb-2">
                        nhrdodisha@gmail.com
                    </p>

                    <div className="flex justify-between items-end px-4 mt-auto mb-6">
                        {/* Signature Box */}
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-16 bg-[#ffffff] border border-[#d1d5db] shadow-sm mb-1 flex items-center justify-center">
                                {/* Placeholder for actual signature if available */}
                            </div>
                            <div className="w-32 h-px bg-[#000000] mb-1"></div>
                            <p className="text-xs font-bold text-[#000000]">Authorized Signatory</p>
                            <p className="text-[10px] text-[#000000]/60 mt-0.5">{date}</p>
                        </div>

                        {/* QR Code */}
                        <div className="flex flex-col items-center">
                            <div className="bg-[#ffffff] p-1 rounded shadow-sm mb-1">
                                <QRCodeSVG value={`verify:${donorName}`} size={64} />
                            </div>
                            <p className="text-[10px] text-[#000000] font-medium">Scan to verify member</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10">
                    <p className="text-[8px] text-center text-[#000000]/60 mb-1.5 px-4">
                        This card remains the property of NHRD and must be surrendered on request. Use is a punishable offense.
                    </p>
                    <div className={`${COLORS.footerBg} py-2 text-center`}>
                        <p className="text-white text-[10px] font-bold tracking-wider uppercase">
                            NHRD • National Humanity & Development • Official ID
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
