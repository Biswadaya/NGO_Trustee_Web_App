import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { volunteerAPI, adminAPI } from '@/api/endpoints';
import { Plus, IdCard, CheckCircle, XCircle, Loader2, Search, Users, Download, Printer } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const AdminVolunteers = () => {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);
  const [showIdCard, setShowIdCard] = useState(false);
  const [newVolunteer, setNewVolunteer] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    skills: '',
    bio: ''
  });

  const fetchVolunteers = async () => {
    try {
      const response = await volunteerAPI.list();
      setVolunteers(response.data.data.volunteers || []);
    } catch (error) {
      toast.error('Failed to load volunteers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await volunteerAPI.updateStatus(id, status);
      toast.success(`Volunteer status updated to ${status}`);
      fetchVolunteers();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleAddVolunteer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsAdding(true);
      await adminAPI.addVolunteer(newVolunteer);
      toast.success('Volunteer added and activated successfully');
      setNewVolunteer({ full_name: '', email: '', password: '', phone: '', skills: '', bio: '' });
      setIsAdding(false);
      fetchVolunteers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add volunteer');
      setIsAdding(false);
    }
  };

  const handleGenerateId = async (id: string, volunteer: any) => {
    try {
      toast.loading('Generating ID Card...', { id: 'gen-id' });
      await volunteerAPI.generateId(id);
      const res = await volunteerAPI.getIdCard(id);

      setSelectedVolunteer({ ...volunteer, ...res.data.data });
      setShowIdCard(true);
      toast.success('ID Card ready!', { id: 'gen-id' });
      fetchVolunteers();
    } catch (error) {
      toast.error('Failed to generate ID card', { id: 'gen-id' });
    }
  };

  const handlePrintId = () => {
    const printContent = document.getElementById('id-card-print-area');
    const windowUrl = 'about:blank';
    const uniqueName = new Date();
    const windowName = 'Print' + uniqueName.getTime();
    const printWindow = window.open(windowUrl, windowName, 'left=50000,top=50000,width=0,height=0');

    if (printWindow && printContent) {
      printWindow.document.write(`
        <html>
          <head>
            <style>
              body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
              .id-card { width: 350px; border: 1px solid #ccc; border-radius: 10px; overflow: hidden; position: relative; }
              .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; text-align: center; }
              .photo { width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 15px; display: block; object-fit: cover; }
              .qr { width: 120px; height: 120px; margin: 15px auto; display: block; }
              .label { font-size: 10px; color: #666; text-transform: uppercase; margin-top: 10px; }
              .value { font-weight: bold; font-size: 14px; }
              .footer { background: #f3f4f6; padding: 10px; text-align: center; font-size: 10px; color: #666; }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  const filteredVolunteers = volunteers.filter(v =>
    (v.full_name || v.user?.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.unique_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-display font-bold">Volunteer Management</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search volunteers..."
                className="pl-9 h-10 w-64 glass-card"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="premium"><Plus className="w-4 h-4 mr-2" />Add New</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] glass-card">
                <form onSubmit={handleAddVolunteer}>
                  <DialogHeader>
                    <DialogTitle>Add New Volunteer</DialogTitle>
                    <DialogDescription>
                      Manually create a volunteer account. They will be marked as ACTIVE immediately.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="full_name" className="text-right text-xs">Full Name</Label>
                      <Input id="full_name" className="col-span-3 h-9" value={newVolunteer.full_name} onChange={(e) => setNewVolunteer({ ...newVolunteer, full_name: e.target.value })} required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right text-xs">Email</Label>
                      <Input id="email" type="email" className="col-span-3 h-9" value={newVolunteer.email} onChange={(e) => setNewVolunteer({ ...newVolunteer, email: e.target.value })} required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right text-xs">Password</Label>
                      <Input id="password" type="password" className="col-span-3 h-9" placeholder="Leave blank for default" value={newVolunteer.password} onChange={(e) => setNewVolunteer({ ...newVolunteer, password: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right text-xs">Phone</Label>
                      <Input id="phone" className="col-span-3 h-9" value={newVolunteer.phone} onChange={(e) => setNewVolunteer({ ...newVolunteer, phone: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="skills" className="text-right text-xs">Skills</Label>
                      <Input id="skills" className="col-span-3 h-9" placeholder="Comma separated" value={newVolunteer.skills} onChange={(e) => setNewVolunteer({ ...newVolunteer, skills: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="bio" className="text-right text-xs">Bio</Label>
                      <Textarea id="bio" className="col-span-3 min-h-[80px]" value={newVolunteer.bio} onChange={(e) => setNewVolunteer({ ...newVolunteer, bio: e.target.value })} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" variant="premium" disabled={isAdding}>
                      {isAdding ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                      Create Volunteer
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVolunteers.map((v) => (
              <Card key={v.id} variant="glass" className="hover:shadow-lg transition-all group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${v.user?.email}`}
                      className="w-14 h-14 rounded-2xl bg-primary/10 p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{v.full_name || v.user?.username || 'Anonymous'}</h3>
                      <p className="text-[10px] text-muted-foreground truncate">{v.email}</p>
                    </div>
                    <Badge variant={v.status === 'ACTIVE' ? 'success' : 'warning'}>
                      {v.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 p-3 rounded-lg bg-muted/30 border border-border/50">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Tasks Assigned</p>
                      <p className="text-xs font-semibold">{v.tasks?.length || 0}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Join Date</p>
                      <p className="text-xs font-semibold">{new Date(v.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      {v.status !== 'ACTIVE' ? (
                        <Button
                          size="sm"
                          className="flex-1 bg-success/10 text-success hover:bg-success/20 border-success/20"
                          onClick={() => handleStatusUpdate(v.id, 'ACTIVE')}
                        >
                          <CheckCircle className="w-3.5 h-3.5 mr-1" /> Activate
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex-1 text-destructive hover:bg-destructive/10"
                          onClick={() => handleStatusUpdate(v.id, 'INACTIVE')}
                        >
                          <XCircle className="w-3.5 h-3.5 mr-1" /> Deactivate
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="premium"
                        className="flex-1"
                        onClick={() => handleGenerateId(v.id, v)}
                        disabled={v.status !== 'ACTIVE'}
                      >
                        <IdCard className="w-3.5 h-3.5 mr-1" /> ID Card
                      </Button>
                    </div>

                    {v.id_card_url && (
                      <Button variant="link" size="sm" className="text-[10px] h-4" asChild>
                        <a href={v.id_card_url} target="_blank" rel="noreferrer">View Current ID Card</a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredVolunteers.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground border-2 border-dashed border-border rounded-2xl">
                No volunteers found matching your search.
              </div>
            )}
          </div>
        )}

        <Dialog open={showIdCard} onOpenChange={setShowIdCard}>
          <DialogContent className="sm:max-w-md glass-card border-none">
            <DialogHeader>
              <DialogTitle>Volunteer ID Card</DialogTitle>
              <DialogDescription>
                Official Digital Identity Card
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center" id="id-card-print-area">
              <div className="id-card w-full max-w-[320px] bg-white rounded-xl shadow-lg overflow-hidden border border-border/50">
                <div className="header bg-primary h-24 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90"></div>
                  <div className="relative z-10 text-white text-center">
                    <h3 className="font-bold text-lg tracking-wider">BISWADAYA NGO</h3>
                    <p className="text-[10px] opacity-80 uppercase tracking-widest">Trustee Volunteer</p>
                  </div>
                </div>

                <div className="content p-6 pt-0 relative">
                  <div className="flex justify-center -mt-10 mb-4">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedVolunteer?.user?.email}`}
                      className="photo w-24 h-24 rounded-full border-4 border-white bg-white shadow-md"
                    />
                  </div>

                  <div className="text-center space-y-1 mb-6">
                    <h2 className="value text-xl font-bold text-gray-800">{selectedVolunteer?.full_name}</h2>
                    <p className="text-sm text-gray-500 font-medium">{selectedVolunteer?.email}</p>
                    <Badge variant="outline" className="mt-2 bg-primary/5 text-primary border-primary/20">
                      {selectedVolunteer?.unique_id || 'ID PENDING'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center border-t border-gray-100 pt-4">
                    <div>
                      <p className="label text-[10px] text-gray-400 uppercase font-bold tracking-wider">Status</p>
                      <p className="value font-semibold text-gray-700">{selectedVolunteer?.status}</p>
                    </div>
                    <div>
                      <p className="label text-[10px] text-gray-400 uppercase font-bold tracking-wider">Issued</p>
                      <p className="value font-semibold text-gray-700">{new Date().getFullYear()}</p>
                    </div>
                  </div>

                  {selectedVolunteer?.id_card_qr_code && (
                    <div className="mt-6 flex justify-center">
                      <img src={selectedVolunteer.id_card_qr_code} className="qr w-28 h-28 mix-blend-multiply opacity-90" />
                    </div>
                  )}
                </div>

                <div className="footer bg-gray-50 p-3 text-center border-t border-gray-100">
                  <p className="text-[10px] text-gray-400">Authorized Signature • Valid Indefinitely</p>
                </div>
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
              <Button variant="outline" className="w-full" onClick={handlePrintId}>
                <Printer className="w-4 h-4 mr-2" /> Print Card
              </Button>
              <Button variant="premium" className="w-full" onClick={() => window.print()}>
                <Download className="w-4 h-4 mr-2" /> Download PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminVolunteers;
