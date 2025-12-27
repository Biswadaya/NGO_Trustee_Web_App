import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { campaignAPI } from '@/api/endpoints';
import { Plus, Target, Loader2, Edit3, Trash2, Eye, Users } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AdminProjects = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Details & Donors state
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [donors, setDonors] = useState<any[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal_amount: '',
    start_date: '',
    end_date: '',
    banner_image: '',
  });

  // Delete state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    try {
      const response = await campaignAPI.list();
      setCampaigns(response.data.data.campaigns || []);
    } catch (error) {
      toast.error('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.goal_amount) {
      toast.error('Please fill in required fields');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        goal_amount: Number(formData.goal_amount),
        start_date: formData.start_date ? new Date(formData.start_date).toISOString() : undefined,
        end_date: formData.end_date ? new Date(formData.end_date).toISOString() : undefined,
      };

      if (editingId) {
        await campaignAPI.update(editingId, payload);
        toast.success('Campaign updated successfully');
      } else {
        await campaignAPI.create(payload);
        toast.success('Campaign created successfully');
      }

      setCreateOpen(false);
      resetForm();
      fetchCampaigns();
    } catch (error) {
      console.error(error);
      toast.error(editingId ? 'Failed to update campaign' : 'Failed to create campaign');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      goal_amount: '',
      start_date: '',
      end_date: '',
      banner_image: '',
    });
  };

  const handleEditClick = (campaign: any) => {
    setEditingId(campaign.id);
    setFormData({
      title: campaign.title,
      description: campaign.description || '',
      goal_amount: campaign.goal_amount,
      start_date: campaign.start_date ? new Date(campaign.start_date).toISOString().split('T')[0] : '',
      end_date: campaign.end_date ? new Date(campaign.end_date).toISOString().split('T')[0] : '',
      banner_image: campaign.banner_image || '',
    });
    setCreateOpen(true);
  };

  const handleViewDetails = async (id: string) => {
    setDetailsOpen(true);
    setLoadingDetails(true);
    try {
      const [progressRes, donorsRes] = await Promise.all([
        campaignAPI.getProgress(id),
        campaignAPI.getDonors(id)
      ]);
      setSelectedCampaign(progressRes.data.data);
      setDonors(donorsRes.data.data.donors);
    } catch (error) {
      toast.error('Failed to load campaign details');
      setDetailsOpen(false);
    } finally {
      setLoadingDetails(false);
    }
  };

  const confirmDelete = async () => {
    if (!campaignToDelete) return;
    try {
      await campaignAPI.remove(campaignToDelete);
      toast.success('Campaign deleted');
      fetchCampaigns();
    } catch (error) {
      toast.error('Failed to delete campaign');
    } finally {
      setDeleteDialogOpen(false);
      setCampaignToDelete(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setCampaignToDelete(id);
    setDeleteDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Campaigns & Projects</h1>
          <h1 className="text-2xl font-display font-bold">Campaigns & Projects</h1>
          <Dialog open={createOpen} onOpenChange={(open) => {
            setCreateOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button variant="premium"><Plus className="w-4 h-4 mr-2" />New Campaign</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Campaign' : 'Create New Campaign'}</DialogTitle>
                <DialogDescription>
                  {editingId ? 'Update campaign details.' : 'Launch a new fundraising campaign.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateCampaign}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goal">Goal Amount *</Label>
                      <Input
                        id="goal"
                        type="number"
                        value={formData.goal_amount}
                        onChange={(e) => setFormData({ ...formData, goal_amount: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start_date">Start Date</Label>
                      <Input
                        id="start_date"
                        type="date"
                        value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end_date">End Date</Label>
                      <Input
                        id="end_date"
                        type="date"
                        value={formData.end_date}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Banner Image URL</Label>
                    <Input
                      id="image"
                      value={formData.banner_image}
                      onChange={(e) => setFormData({ ...formData, banner_image: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {editingId ? 'Update Campaign' : 'Launch Campaign'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((c) => {
              const goal = Number(c.goal_amount || 0);
              const raised = Number(c.raised_amount || 0);
              const progress = goal > 0 ? (raised / goal) * 100 : 0;
              return (
                <Card key={c.id} variant="glass" className="overflow-hidden group hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={c.banner_image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop'}
                      alt={c.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant={c.status === 'active' ? 'success' : 'warning'} className="backdrop-blur-md bg-black/30 border-white/20">
                        {c.status}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">{c.title}</h3>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => handleViewDetails(c.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => handleEditClick(c)}>
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDeleteClick(c.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">{c.description}</p>

                    <div className="space-y-3">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="flex items-center gap-1 text-primary">
                          <Target className="w-3 h-3" /> Progressive
                        </span>
                        <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
                      </div>
                      <Progress value={progress} className="h-2" />

                      <div className="flex justify-between items-end pt-2">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase">Raised</p>
                          <p className="font-bold text-success">₹{raised.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-muted-foreground uppercase">Goal</p>
                          <p className="font-bold">₹{goal.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {campaigns.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground bg-muted/20 border-2 border-dashed border-border rounded-2xl">
                No active campaigns found. Create your first project to start tracking impact.
              </div>
            )}
          </div>
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Campaign?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the campaign
              and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[700px] overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Campaign Details</DialogTitle>
          </DialogHeader>
          {loadingDetails ? (
            <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>
          ) : selectedCampaign && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img src={selectedCampaign.banner_image || 'https://via.placeholder.com/150'} className="w-24 h-24 object-cover rounded-lg" />
                <div>
                  <h3 className="text-xl font-bold">{selectedCampaign.title}</h3>
                  <Badge variant="outline">{selectedCampaign.status}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Raised</div>
                  <div className="font-bold text-success text-lg">₹{Number(selectedCampaign.raised_amount).toLocaleString()}</div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Goal</div>
                  <div className="font-bold text-lg">₹{Number(selectedCampaign.goal_amount).toLocaleString()}</div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Donors</div>
                  <div className="font-bold text-primary text-lg">{donors.length}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2"><Users className="w-4 h-4" /> Recent Donors</h4>
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Donor</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {donors.length > 0 ? (
                        donors.map((d: any) => (
                          <TableRow key={d.id}>
                            <TableCell>{d.donor_name || 'Anonymous'}</TableCell>
                            <TableCell className="font-medium">₹{Number(d.amount).toLocaleString()}</TableCell>
                            <TableCell>{new Date(d.created_at).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground">No donations yet</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminProjects;
