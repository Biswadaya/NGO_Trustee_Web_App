import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { toast } from 'sonner';
import IDCard from './IDCard';

interface IDCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
}

const IDCardModal: React.FC<IDCardModalProps> = ({ isOpen, onClose, user }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        if (!cardRef.current) {
            console.error("Card ref is null");
            toast.error("Internal Error: Card reference not found");
            return;
        }

        setDownloading(true);
        console.log("Starting ID Card download...");

        try {
            // Wait a moment to ensure rendering
            await new Promise(resolve => setTimeout(resolve, 100));

            const dataUrl = await toPng(cardRef.current, {
                cacheBust: true,
                pixelRatio: 3, // High resolution
                backgroundColor: '#ffffff'
            });

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: [53.98, 85.60] // Standard ID-1 size (Credit Card)
            });

            pdf.addImage(dataUrl, 'PNG', 0, 0, 53.98, 85.60);
            pdf.save(`${(user.full_name || 'Member').replace(/\s+/g, '_')}_ID_Card.pdf`);

            toast.success("ID Card downloaded successfully");
        } catch (error: any) {
            console.error("PDF Download Error:", error);
            toast.error(`Failed to generate PDF: ${error.message || 'Unknown error'}`);
        } finally {
            setDownloading(false);
        }
    };

    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Member ID Card</DialogTitle>
                    <DialogDescription>
                        View and download the official ID card.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-center items-center py-6 bg-slate-50 rounded-lg">
                    <div className="origin-center transform scale-90 sm:scale-100">
                        <IDCard ref={cardRef} user={user} />
                    </div>
                </div>

                <DialogFooter className="sm:justify-between gap-2">
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button type="button" onClick={handleDownload} disabled={downloading}>
                        {downloading ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                            <Download className="h-4 w-4 mr-2" />
                        )}
                        Download PDF
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default IDCardModal;
