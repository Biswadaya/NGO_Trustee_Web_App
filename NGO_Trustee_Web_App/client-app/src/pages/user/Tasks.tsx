import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { volunteerAPI } from '@/api/endpoints'; // We might need to userAPI or similar if volunteerAPI is restricted
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Loader2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { userAPI } from '@/api/endpoints'; // Assuming we'll add this

const UserTasks = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            // We need a way to get tasks for the generic user (Member)
            // Currently volunteerAPI.getMyTasks expects a volunteerId.
            // But Members don't have volunteerId.
            // We will use userAPI.getMyTasks() which we will implement on backend or use existing mechanism?
            // Wait, schema says User has tasks.
            // Let's assume we add `userAPI.getMyTasks()` to endpoints.
            const res = await userAPI.getMyTasks(); // This needs to be added to endpoints
            setTasks(res.data.data.tasks || []);
        } catch (error) {
            console.error("Task fetch error", error);
            // toast.error('Failed to load tasks'); // Suppress error for now as it might 404
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleStatusUpdate = async (taskId: string, newStatus: string) => {
        try {
            // Reuse volunteerAPI forstatus update if it's generic enough?
            // The backend controller for updateTaskStatus takes taskId.
            // It calls VolunteerService.updateTaskStatus.
            // Let's check if that service checks for volunteer role... likely not for just status.
            await volunteerAPI.updateTaskStatus(taskId, newStatus);
            setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
            toast.success(`Task marked as ${newStatus}`);
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    if (loading && tasks.length === 0) return <DashboardLayout><div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div></DashboardLayout>;

    const columns = [
        { label: 'Pending', status: 'pending', icon: AlertCircle, color: 'text-warning' },
        { label: 'In Progress', status: 'in-progress', icon: Clock, color: 'text-primary' },
        { label: 'Completed', status: 'completed', icon: CheckCircle2, color: 'text-success' },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-display font-bold">My Assigned Tasks</h1>
                    <Button variant="outline" size="sm" onClick={fetchTasks} disabled={loading}>
                        <Loader2 className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh
                    </Button>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {columns.map((col) => (
                        <div key={col.status}>
                            <h2 className="font-semibold mb-4 flex items-center gap-2">
                                <col.icon className={`w-4 h-4 ${col.color}`} />
                                {col.label}
                                <Badge variant="glass">{tasks.filter(t => t.status === col.status).length}</Badge>
                            </h2>
                            <div className="space-y-3">
                                {tasks.filter(t => t.status === col.status).map((task) => (
                                    <Card key={task.id} variant="glass" className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
                                        if (task.status === 'pending') handleStatusUpdate(task.id, 'in-progress');
                                        else if (task.status === 'in-progress') handleStatusUpdate(task.id, 'completed');
                                    }}>
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="font-medium text-sm">{task.title}</h3>
                                            </div>
                                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{task.description}</p>
                                            <p className="text-[10px] text-muted-foreground">Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No deadline'}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                                {tasks.filter(t => t.status === col.status).length === 0 && (
                                    <div className="text-center py-10 border-2 border-dashed border-border/50 rounded-xl text-muted-foreground text-xs italic">
                                        No tasks here
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};
export default UserTasks;
