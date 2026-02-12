import { useEffect, useState, useRef } from 'react';
import logo from '@/assets/nhrd-logo-transparent.png';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Share2, ShieldCheck } from 'lucide-react';
import { memberAPI } from '@/api/endpoints';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import { useAuth } from '@/contexts/AuthContext';

interface IdCardData {
  memberId: string;
  name: string;
  memberType: string;
  validFrom: string;
  validUntil: string;
  bloodGroup: string | null;
  qrCode: string;
  photo?: string | null;
}

const UserIdCard = () => {
  const { user } = useAuth();
  const [data, setData] = useState<IdCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchIdCard = async () => {
      try {
        const response = await memberAPI.getIdCard();
        setData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch ID card data', error);
        toast.error("Failed to load ID card details");
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'MEMBER') {
      fetchIdCard();
    } else {
      setLoading(false); // Valid for non-members to just show "Not Available"
    }
  }, [user]);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 4, // High resolution for print
        useCORS: true,
        backgroundColor: null,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `NHRD-Membership-ID-${data?.memberId || 'Card'}.png`;
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

  if (user?.role !== 'MEMBER') {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
          <ShieldCheck className="w-16 h-16 text-muted-foreground/50" />
          <h2 className="text-xl font-bold text-muted-foreground">Membership Required</h2>
          <p className="text-muted-foreground text-center max-w-md">
            You need to be an active member to generate an ID card. Please upgrade your membership from the Dashboard.
          </p>
        </div>
      </DashboardLayout>
    )
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="text-center p-6 text-red-500">
          <p>Unable to generate ID card data. Please contact support.</p>
        </div>
      </DashboardLayout>
    );
  }

  const validFromStr = new Date(data.validFrom).toLocaleDateString();
  const validUntilStr = new Date(data.validUntil).toLocaleDateString();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">Digital ID Card</h1>
            <p className="text-muted-foreground">Your official proof of membership.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast.info("Sharing feature coming soon!")}>
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Button variant="premium" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" /> Download PNG
            </Button>
          </div>
        </div>

        <div className="flex justify-center py-8 bg-muted/30 rounded-xl border border-dashed border-border">
          {/* ID CARD CONTAINER - Credit Card Ratio (approx 1.586) */}
          <div ref={cardRef} className="relative w-[400px] h-[252px] rounded-xl overflow-hidden shadow-2xl bg-white text-slate-800 transition-transform hover:scale-[1.02] duration-300">

            {/* Background design */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 z-0"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl translate-y-10 -translate-x-10"></div>

            {/* Header Strip */}
            <div className="absolute top-0 w-full h-16 bg-gradient-to-r from-[#00897B] to-[#004D40] flex items-center px-4 z-10">
              <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-sm overflow-hidden">
                <img src={logo} alt="NHRD Logo" className="w-8 h-8 object-contain" />
              </div>
              <div className="ml-3 text-white">
                <h3 className="text-xs font-bold uppercase tracking-wider opacity-90">National Humanity &</h3>
                <h2 className="text-sm font-extrabold tracking-wide">Rural Development</h2>
              </div>
            </div>

            {/* Content Area */}
            <div className="absolute top-20 inset-x-0 bottom-0 p-4 flex gap-4 z-10">
              {/* Photo & QR Column */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-lg bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                  {data.photo ? (
                    <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <UserIconPlaceholder />
                  )}
                </div>
                <img src={data.qrCode} alt="QR" className="w-16 h-16 border border-slate-200 rounded p-0.5 bg-white" />
              </div>

              {/* Details Column */}
              <div className="flex-1 pt-1 space-y-3">
                <div>
                  <p className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Name</p>
                  <p className="font-bold text-slate-900 leading-tight">{data.name}</p>
                </div>

                <div className="flex justify-between gap-2">
                  <div>
                    <p className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Member ID</p>
                    <p className="font-mono font-bold text-slate-800 text-sm tracking-wide">{data.memberId}</p>
                  </div>
                  {data.bloodGroup && (
                    <div>
                      <p className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Blood Group</p>
                      <p className="font-bold text-red-600 text-sm">{data.bloodGroup}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between gap-2 border-t border-slate-200 pt-2 mt-1">
                  <div>
                    <p className="text-[9px] uppercase text-slate-400 font-bold">Valid From</p>
                    <p className="text-xs font-semibold text-slate-700">{validFromStr}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] uppercase text-slate-400 font-bold">Valid Thru</p>
                    <p className="text-xs font-semibold text-slate-700">{validUntilStr}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Strip */}
            <div className="absolute bottom-0 w-full h-6 bg-[#004D40] flex items-center justify-between px-4 z-10">
              <p className="text-[9px] text-white/80 tracking-widest uppercase">Official Membership Card</p>
              <p className="text-[9px] text-white/80">www.nhrd.org.in</p>
            </div>

          </div>
        </div>

        <div className="max-w-md mx-auto text-center">
          <p className="text-xs text-muted-foreground mt-2">
            This is a computer-generated digital ID card. The QR code can be scanned to verify your active membership status.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

const UserIconPlaceholder = () => (
  <svg className="w-12 h-12 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export default UserIdCard;
