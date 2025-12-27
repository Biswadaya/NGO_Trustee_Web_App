import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { donationAPI } from '@/api/endpoints';
import { Loader2, Search, Filter, IndianRupee } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

const AdminDonations = () => {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDonations = async () => {
    try {
      const response = await donationAPI.list();
      setDonations(response.data.data.donations || []);
    } catch (error) {
      toast.error('Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const filteredDonations = donations.filter(d =>
    d.donor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-display font-bold">Donations History</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by donor or TxID..."
                className="pl-9 h-10 w-64 glass-card"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Card variant="glass" className="overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Financial Contributions</CardTitle>
              <div className="flex items-center gap-2 text-sm text-primary font-bold">
                <IndianRupee className="w-4 h-4" />
                Total: ₹{filteredDonations.reduce((acc, d) => acc + d.amount, 0).toLocaleString()}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="premium-table w-full">
                  <thead>
                    <tr className="bg-muted/20">
                      <th className="px-6 py-4 text-left font-display uppercase tracking-wider text-xs">Donor</th>
                      <th className="px-6 py-4 text-left font-display uppercase tracking-wider text-xs">Amount</th>
                      <th className="px-6 py-4 text-left font-display uppercase tracking-wider text-xs">Campaign</th>
                      <th className="px-6 py-4 text-left font-display uppercase tracking-wider text-xs">Tx ID / Bank</th>
                      <th className="px-6 py-4 text-left font-display uppercase tracking-wider text-xs">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {filteredDonations.map((d) => (
                      <tr key={d.id} className="hover:bg-muted/30 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-sm group-hover:text-primary transition-colors">{d.donor_name || 'Anonymous'}</p>
                          <p className="text-[10px] text-muted-foreground">{d.email || d.donor_email || '-'}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-success text-sm">₹{d.amount.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="text-[10px]">{d.campaign?.title || 'General Fund'}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs font-mono text-muted-foreground uppercase">{d.transaction_id?.slice(0, 12)}...</p>
                          <p className="text-[10px] text-muted-foreground">{d.payment_method}</p>
                        </td>
                        <td className="px-6 py-4 text-xs">
                          {new Date(d.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                    {filteredDonations.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-20 text-center text-muted-foreground italic">
                          No donation records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDonations;
