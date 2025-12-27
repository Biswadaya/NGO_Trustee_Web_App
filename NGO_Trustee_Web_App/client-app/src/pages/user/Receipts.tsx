import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { donationAPI } from '@/api/endpoints';
import { Download, Receipt, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const UserReceipts = () => {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await donationAPI.getMyDonations();
        setDonations(res.data.data.donations || []);
      } catch (error) {
        toast.error('Failed to load receipts');
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  if (loading) return <DashboardLayout><div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Receipt className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-display font-bold">My Donation Receipts</h1>
        </div>
        <Card variant="glass">
          <CardHeader><CardTitle className="text-sm font-bold uppercase text-muted-foreground">Transaction History</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="premium-table">
                <thead><tr><th>Transaction ID</th><th>Date</th><th>Campaign</th><th>Amount</th><th>Action</th></tr></thead>
                <tbody>
                  {donations.map((d) => (
                    <tr key={d.id}>
                      <td className="font-mono text-xs">{d.transaction_id || d.id.slice(0, 8)}</td>
                      <td>{new Date(d.created_at).toLocaleDateString()}</td>
                      <td><Badge variant="glass">{d.campaign?.title || 'General Donation'}</Badge></td>
                      <td className="font-bold text-primary">₹{parseFloat(d.amount).toLocaleString()}</td>
                      <td>
                        <Button variant="ghost" size="sm" className="hover:text-primary transition-colors">
                          <Download className="w-4 h-4 mr-1" />Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {donations.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-muted-foreground italic">No donation records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};
export default UserReceipts;
