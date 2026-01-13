import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Sparkles, Loader2 } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { donorAPI } from '@/api/endpoints';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';

interface IdCardData {
  name: string;
  memberId: string;
  memberType: string;
  validFrom: string;
  validUntil: string;
  bloodGroup: string | null;
  qrCode: string;
  profilePhoto?: string | null;
}

const UserIdCard = () => {
  const [data, setData] = useState<IdCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await donorAPI.getIdCard();
        setData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch ID card data', error);
        toast.error("Failed to load ID card details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null, // Transparent background if possible, or matches theme
        scale: 2, // Higher quality
        logging: false,
        useCORS: true // Try to handle cross-origin images like QR code
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `TrustFlow-ID-${data?.memberId || 'Card'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("ID Card downloaded successfully!");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download ID card. Please try again.");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="text-center p-6">
          <p>Unable to load ID card.</p>
        </div>
      </DashboardLayout>
    );
  }

  // Format dates
  const validFromStr = new Date(data.validFrom).toLocaleDateString();
  const validUntilStr = new Date(data.validUntil).toLocaleDateString();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display font-bold">My ID Card</h1>
        <div className="max-w-md mx-auto">
          {/* Wrap Card in a div for ref capture to include padding/margins if desired, but ref directly on Card is better for tight crop */}
          <div ref={cardRef}>
            <Card variant="premium" className="overflow-hidden">
              <div className="p-6 gradient-hero text-primary-foreground">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6" />
                  <span className="text-xl font-display font-bold">Trust Flow</span>
                </div>
                <Badge variant="glass" className="bg-primary-foreground/20 border-0">{data.memberType} Member</Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <img
                    src={data.qrCode}
                    alt="QR Code"
                    className="w-24 h-24 rounded-lg bg-white p-1"
                    crossOrigin="anonymous" // Important for html2canvas
                  />
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">ID:</span> {data.memberId}</p>
                    <p><span className="text-muted-foreground">Name:</span> {data.name}</p>
                    <p><span className="text-muted-foreground">Valid:</span> {validFromStr} - {validUntilStr}</p>
                    <p><span className="text-muted-foreground">Blood:</span> {data.bloodGroup || 'N/A'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Button variant="premium" className="w-full mt-4" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />Download ID Card
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default UserIdCard;
