import { useEffect, useState, useRef } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Download, Loader2, ShieldCheck, Printer } from 'lucide-react';
import { memberAPI } from '@/api/endpoints';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import { useAuth } from '@/contexts/AuthContext';
import logo from '@/assets/nhrd-logo-transparent.png';

interface AppointmentData {
  refNo: string;
  date: string;
  name: string;
  address: string;
  role: string;
  joinDate: string;
  status: string;
}

const UserAppointment = () => {
  const { user } = useAuth();
  const [data, setData] = useState<AppointmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLetter = async () => {
      try {
        const response = await memberAPI.getAppointmentLetter();
        setData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch appointment letter', error);
        toast.error("Failed to load appointment details");
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'MEMBER') {
      fetchLetter();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleDownload = async () => {
    if (!letterRef.current) return;

    try {
      const canvas = await html2canvas(letterRef.current, {
        scale: 3, // High quality for print
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `NHRD-Appointment-Letter-${data?.name || 'Member'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Appointment Letter downloaded successfully!");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download letter. Please try again.");
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
            You need to be an active member to view/download your appointment letter. Please upgrade your membership from the Dashboard.
          </p>
        </div>
      </DashboardLayout>
    )
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="text-center p-6 text-red-500">
          <p>Unable to generate appointment letter. Please contact support.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-display font-bold">Appointment Letter</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.print()} className="hidden md:flex">
              <Printer className="w-4 h-4 mr-2" /> Print
            </Button>
            <Button variant="premium" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
          </div>
        </div>

        <div className="flex justify-center bg-gray-100 py-10 rounded-xl overflow-auto">
          {/* A4 Scale Letter Container */}
          <div ref={letterRef} className="w-[794px] min-h-[1123px] bg-white text-slate-900 p-12 md:p-16 shadow-2xl relative flex flex-col">

            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-primary/20 pb-6 mb-8">
              <div className="flex items-center gap-4">
                <img src={logo} alt="NHRD Logo" className="w-20 h-20 object-contain" />
                <div>
                  <h2 className="text-xl font-bold text-primary uppercase tracking-wide">National Humanity & Rural Development</h2>
                  <p className="text-xs text-muted-foreground">Registered under Trust Act | Reg. No: 41022207328</p>
                  <p className="text-xs text-muted-foreground">Bhubaneswar, Odisha, India - 751002</p>
                </div>
              </div>
            </div>

            {/* Reference & Date */}
            <div className="flex justify-between text-sm font-semibold mb-8">
              <p>Ref No: <span className="font-mono text-slate-700">{data.refNo}</span></p>
              <p>Date: {data.date}</p>
            </div>

            {/* Salutation */}
            <div className="mb-6">
              <p className="font-bold mb-1">To,</p>
              <p className="font-bold text-lg">{data.name}</p>
              <p className="max-w-xs text-sm text-slate-600 uppercase">{data.address}</p>
            </div>

            <div className="mb-8">
              <p className="font-bold underline mb-4">Subject: Appointment as Official Member of NHRD</p>
            </div>

            {/* Body */}
            <div className="space-y-4 text-justify text-[15px] leading-relaxed text-slate-800">
              <p>Dear <span className="font-bold">{data.name}</span>,</p>

              <p>
                We are pleased to inform you that the Board of Trustees of the <strong>National Humanity & Rural Development (NHRD)</strong>
                has officially approved your membership application. It is with great honor that we appoint you as an
                <strong> Official Member</strong> of our organization, effective from <strong>{data.joinDate}</strong>.
              </p>

              <p>
                As a member of NHRD, provided with the rights and privileges as per our constitution, you are expected to:
              </p>

              <ul className="list-disc pl-8 space-y-2">
                <li>Uphold the values and mission of rural development and social welfare.</li>
                <li>Participate in decision-making processes and general body meetings.</li>
                <li>Support our various initiatives towards education, healthcare, and women empowerment.</li>
                <li>Act as an ambassador of NHRD in your community.</li>
              </ul>

              <p>
                Your membership is valid indefinitely subject to the adherence to the organization's code of conduct and
                renewal policies. We look forward to your active contribution in making a significant impact on society.
              </p>

              <p>
                Congratulations on joining the NHRD family. Together, let us build a better future.
              </p>
            </div>

            {/* Signature - Push to bottom */}
            <div className="mt-auto pt-16 flex justify-between items-end">
              <div className="text-center">
                {/* Placeholder for Dig. Signature */}
                <div className="h-12"></div>
                <p className="font-bold border-t border-slate-400 pt-2 px-4 inline-block">Authorized Signatory</p>
                <p className="text-xs">Chairman / Secretary</p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 border-2 border-slate-200 flex items-center justify-center text-xs text-slate-400 rounded-full mb-2">
                  SEAL
                </div>
                <p className="font-bold">NHRD Trust</p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-primary/20 pt-4 mt-8 text-center text-[10px] text-slate-500">
              <p>This is a computer-generated document and does not require a physical signature.</p>
              <p>National Humanity & Rural Development | www.nhrd.org.in | contact@nhrd.org.in</p>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default UserAppointment;
