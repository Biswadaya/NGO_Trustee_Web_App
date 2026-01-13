import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { volunteerAPI, adminAPI } from '@/api/endpoints';
import { toast } from 'sonner';
import { Loader2, Plus, Users, Search, UserMinus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

const AdminTasks = () => {
    const [activeTab, setActiveTab] = useState('assign');
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<any[]>([]); // Renamed from volunteers to users
    const [groups, setGroups] = useState<any[]>([]);

    // Task Assignment State
    const [taskForm, setTaskForm] = useState({
        title: '',
        description: '',
        due_date: '',
        target_type: 'individual', // individual, group
        target_id: ''
    });

    // Group Management State
    const [groupForm, setGroupForm] = useState({ name: '', description: '' });
    const [isCreatingGroup, setIsCreatingGroup] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<any>(null);
    const [groupMembers, setGroupMembers] = useState<any[]>([]);
    const [memberSearch, setMemberSearch] = useState('');

    const [allTasks, setAllTasks] = useState<any[]>([]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (selectedGroup) {
            fetchGroupMembers(selectedGroup.id);
        }
    }, [selectedGroup]);

    const fetchInitialData = async () => {
        try {
            const [userRes, groupRes, taskRes] = await Promise.all([
                adminAPI.listUsers(), // Fetch all users (members)
                volunteerAPI.listGroups(),
                volunteerAPI.listAllTasks()
            ]);
            setUsers(userRes.data.data.users || []);
            setGroups(groupRes.data.data.groups || []);
            setAllTasks(taskRes.data.data.tasks || []);
        } catch (error) {
            console.error('Initial Data Error', error);
            toast.error('Failed to load initial data');
        }
    };

    const fetchGroupMembers = async (groupId: string) => {
        try {
            const res = await volunteerAPI.getGroupMembers(groupId);
            setGroupMembers(res.data.data.members || []); // API returns 'members' which are users now
        } catch (error) {
            toast.error("Failed to load group members");
        }
    }

    const handleCreateGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await volunteerAPI.createGroup(groupForm);
            toast.success('Group created successfully');
            setGroupForm({ name: '', description: '' });
            setIsCreatingGroup(false);
            fetchInitialData();
        } catch (error) {
            toast.error('Failed to create group');
        } finally {
            setLoading(false);
        }
    };

    const handleAssignTask = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (taskForm.target_type !== 'all' && !taskForm.target_id) {
                toast.error("Please select a target");
                return;
            }

            // taskForm.target_id is now a userId
            await volunteerAPI.assignTaskBulk(taskForm);
            toast.success('Task assigned successfully');
            setTaskForm({ title: '', description: '', due_date: '', target_type: 'individual', target_id: '' });
            fetchInitialData();
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to assign task');
        } finally {
            setLoading(false);
        }
    };

    const handleAddMemberToGroup = async (userId: string) => {
        if (!selectedGroup) return;
        try {
            await volunteerAPI.addMembersToGroup(selectedGroup.id, [userId]);
            toast.success("Member added");
            fetchGroupMembers(selectedGroup.id);
            fetchInitialData(); // update counts
        } catch (error) {
            toast.error("Failed to add member");
        }
    }

    const handleRemoveMemberFromGroup = async (userId: string) => {
        if (!selectedGroup) return;
        try {
            await volunteerAPI.removeMemberFromGroup(selectedGroup.id, userId);
            toast.success("Member removed");
            fetchGroupMembers(selectedGroup.id);
            fetchInitialData();
        } catch (error) {
            toast.error("Failed to remove member");
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-display font-bold">Task & Team Management</h1>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="bg-muted/50">
                        <TabsTrigger value="assign">Assign Tasks</TabsTrigger>
                        <TabsTrigger value="groups">Manage Groups</TabsTrigger>
                        <TabsTrigger value="history">All Assigned Tasks</TabsTrigger>
                    </TabsList>

                    <TabsContent value="history">
                        <Card variant="glass">
                            <CardHeader>
                                <CardTitle>Task History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border border-border/50 overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-muted/30">
                                            <tr>
                                                <th className="p-3 text-left font-semibold">Title</th>
                                                <th className="p-3 text-left font-semibold">Assigned To</th>
                                                <th className="p-3 text-left font-semibold">Status</th>
                                                <th className="p-3 text-left font-semibold">Due Date</th>
                                                <th className="p-3 text-left font-semibold">Assigned Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/30">
                                            {allTasks.map(task => (
                                                <tr key={task.id} className="hover:bg-muted/20">
                                                    <td className="p-3 font-medium">{task.title}</td>
                                                    <td className="p-3">
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{task.user?.full_name || 'Unknown'}</span>
                                                            <span className="text-xs text-muted-foreground">{task.user?.email}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-3">
                                                        <Badge variant={task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'default' : 'secondary'}>
                                                            {task.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="p-3">{task.due_date ? format(new Date(task.due_date), 'MMM d, yyyy') : '-'}</td>
                                                    <td className="p-3 text-muted-foreground">{format(new Date(task.created_at), 'MMM d, yyyy')}</td>
                                                </tr>
                                            ))}
                                            {allTasks.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} className="p-8 text-center text-muted-foreground">No tasks found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="assign">
                        <div className="grid lg:grid-cols-2 gap-8">
                            <Card variant="glass">
                                <CardHeader>
                                    <CardTitle>Create New Task</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleAssignTask} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Task Title</Label>
                                            <Input
                                                placeholder="e.g. Weekend Beach Cleanup"
                                                value={taskForm.title}
                                                onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Description</Label>
                                            <Textarea
                                                placeholder="Detailed instructions..."
                                                value={taskForm.description}
                                                onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Due Date</Label>
                                                <Input
                                                    type="date"
                                                    value={taskForm.due_date}
                                                    onChange={(e) => setTaskForm({ ...taskForm, due_date: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Assign To</Label>
                                                <Select
                                                    value={taskForm.target_type}
                                                    onValueChange={(val) => setTaskForm({ ...taskForm, target_type: val, target_id: '' })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="individual">Individual Member</SelectItem>
                                                        <SelectItem value="group">Member Group</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        {taskForm.target_type === 'individual' && (
                                            <div className="space-y-2 animate-fade-in-up">
                                                <Label>Select Member</Label>
                                                <Select
                                                    value={taskForm.target_id}
                                                    onValueChange={(val) => setTaskForm({ ...taskForm, target_id: val })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Search member..." />
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-60 overflow-y-auto">
                                                        {users.map(u => (
                                                            <SelectItem key={u.id} value={u.id}>
                                                                {u.full_name} ({u.email}) - <span className="text-xs uppercase text-muted-foreground">{u.role}</span>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}

                                        {taskForm.target_type === 'group' && (
                                            <div className="space-y-2 animate-fade-in-up">
                                                <Label>Select Group</Label>
                                                <Select
                                                    value={taskForm.target_id}
                                                    onValueChange={(val) => setTaskForm({ ...taskForm, target_id: val })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select group..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {groups.map(g => (
                                                            <SelectItem key={g.id} value={g.id}>
                                                                {g.name} ({g._count?.users || 0} members)
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}

                                        <Button type="submit" className="w-full" variant="premium" disabled={loading}>
                                            {loading ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2 h-4 w-4" />}
                                            Assign Task
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            <div className="space-y-6">
                                <Card variant="glass" className="bg-primary/5 border-primary/10">
                                    <CardContent className="p-6">
                                        <h3 className="font-bold text-lg mb-2">Assignment Tips</h3>
                                        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                            <li>Members will receive notification upon assignment.</li>
                                            <li>Groups help organize members (e.g., 'Volunteers', 'Board Members').</li>
                                            <li>Tasks are now visible in the Member Dashboard.</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="groups">
                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Create Group Card */}
                            <Card className="md:col-span-1 h-fit">
                                <CardHeader>
                                    <CardTitle>Create Group</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Dialog open={isCreatingGroup} onOpenChange={setIsCreatingGroup}>
                                        <DialogTrigger asChild>
                                            <Button className="w-full" variant="outline"><Plus className="mr-2 h-4 w-4" /> New Group</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Create Member Group</DialogTitle>
                                                <DialogDescription>Group members for easier management and task assignment.</DialogDescription>
                                            </DialogHeader>
                                            <form onSubmit={handleCreateGroup}>
                                                <div className="space-y-4 py-4">
                                                    <div className="space-y-2">
                                                        <Label>Group Name</Label>
                                                        <Input
                                                            value={groupForm.name}
                                                            onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Description</Label>
                                                        <Textarea
                                                            value={groupForm.description}
                                                            onChange={(e) => setGroupForm({ ...groupForm, description: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit" disabled={loading}>Create</Button>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </CardContent>
                            </Card>

                            {/* Groups List */}
                            <div className="md:col-span-2 space-y-4">
                                {groups.map(group => (
                                    <Card key={group.id} variant="glass" className={`cursor-pointer transition-all ${selectedGroup?.id === group.id ? 'border-primary ring-1 ring-primary' : 'hover:border-primary/50'}`} onClick={() => setSelectedGroup(group)}>
                                        <CardContent className="p-6 flex items-center justify-between">
                                            <div>
                                                <h3 className="font-bold text-lg">{group.name}</h3>
                                                <p className="text-sm text-muted-foreground">{group.description}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Badge variant="secondary" className="flex items-center gap-1">
                                                    <Users className="w-3 h-3" />
                                                    {group._count?.users || 0}
                                                </Badge>
                                                <Button variant="ghost" size="sm">Manage</Button>
                                            </div>
                                        </CardContent>

                                        {selectedGroup?.id === group.id && (
                                            <div className="border-t border-border/50 p-6 bg-muted/20 animate-fade-in-down">
                                                <h4 className="font-semibold text-sm mb-4">Group Members</h4>

                                                {/* Add Member */}
                                                <div className="flex gap-2 mb-4">
                                                    <div className="relative flex-1">
                                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            placeholder="Search to add member..."
                                                            className="pl-8"
                                                            value={memberSearch}
                                                            onChange={(e) => setMemberSearch(e.target.value)}
                                                        />
                                                        {memberSearch && (
                                                            <div className="absolute top-10 w-full bg-popover border rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                                                                {users
                                                                    .filter(u =>
                                                                        u.full_name.toLowerCase().includes(memberSearch.toLowerCase()) &&
                                                                        !groupMembers.find(m => m.id === u.id)
                                                                    )
                                                                    .map(u => (
                                                                        <div
                                                                            key={u.id}
                                                                            className="p-2 hover:bg-accent cursor-pointer text-sm"
                                                                            onClick={() => {
                                                                                handleAddMemberToGroup(u.id);
                                                                                setMemberSearch('');
                                                                            }}
                                                                        >
                                                                            {u.full_name} ({u.email})
                                                                        </div>
                                                                    ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                                    {groupMembers.map(member => (
                                                        <div key={member.id} className="flex items-center justify-between p-2 rounded-lg bg-background border border-border/50">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                                                    {member.full_name.charAt(0)}
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium">{member.full_name}</p>
                                                                    <p className="text-[10px] text-muted-foreground">{member.email}</p>
                                                                </div>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleRemoveMemberFromGroup(member.id);
                                                                }}
                                                            >
                                                                <UserMinus className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    {groupMembers.length === 0 && (
                                                        <p className="text-center text-sm text-muted-foreground py-4">No members in this group yet.</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default AdminTasks;
