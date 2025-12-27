import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { campaignAPI } from '@/api/endpoints';
import { Plus, Target, Loader2, Edit3, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const AdminProjects = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return;
    try {
      await campaignAPI.remove(id);
      toast.success('Campaign deleted');
      fetchCampaigns();
    } catch (error) {
      toast.error('Failed to delete campaign');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Campaigns & Projects</h1>
          <Button variant="premium"><Plus className="w-4 h-4 mr-2" />New Campaign</Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((c) => {
              const progress = c.target_amount > 0 ? (c.raised_amount / c.target_amount) * 100 : 0;
              return (
                <Card key={c.id} variant="glass" className="overflow-hidden group hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={c.image_url || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop'}
                      alt={c.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant={c.status === 'ACTIVE' ? 'success' : 'warning'} className="backdrop-blur-md bg-black/30 border-white/20">
                        {c.status}
                      </Badge>
                      <Badge variant="glass" className="backdrop-blur-md bg-black/30 border-white/20">
                        {c.category || 'General'}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">{c.title}</h3>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(c.id)}>
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
                          <p className="font-bold text-success">₹{c.raised_amount.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-muted-foreground uppercase">Goal</p>
                          <p className="font-bold">₹{c.target_amount.toLocaleString()}</p>
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
    </DashboardLayout>
  );
};

export default AdminProjects;
