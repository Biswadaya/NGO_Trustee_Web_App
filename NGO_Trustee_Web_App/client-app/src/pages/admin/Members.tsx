import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { adminAPI, volunteerAPI } from '@/api/endpoints';
import { Search, Plus, MoreHorizontal, UserX, UserCheck, ShieldAlert, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AdminMembers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'DONOR'
  });

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.listUsers();
      setUsers(response.data.data.users || []);
    } catch (error) {
      toast.error('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsActionLoading(true);
      await volunteerAPI.register(newUser);
      toast.success('User account created successfully');
      setNewUser({ full_name: '', email: '', password: '', role: 'DONOR' });
      fetchUsers();
    } catch (error) {
      toast.error('Failed to create user');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleUpdateRole = async (id: string, role: string) => {
    try {
      await adminAPI.updateUserRole(id, role);
      toast.success(`Role updated to ${role}`);
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  const handleBlockUser = async (id: string) => {
    try {
      await adminAPI.blockUser(id, { reason: 'Policy violation' });
      toast.success('User blocked successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to block user');
    }
  };

  const handleUnblockUser = async (id: string) => {
    try {
      await adminAPI.unblockUser(id);
      toast.success('User unblocked');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to unblock user');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">Member Directory</h1>
            <p className="text-muted-foreground">Manage organizational user accounts and access levels.</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="premium" className="gap-2">
                <Plus className="w-4 h-4" /> Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] glass-card">
              <form onSubmit={handleAddUser}>
                <DialogHeader>
                  <DialogTitle>Add Organizational User</DialogTitle>
                  <DialogDescription>
                    Create a new system user with specific access permissions.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fname" className="text-right text-xs">Full Name</Label>
                    <Input id="fname" className="col-span-3 h-9" value={newUser.full_name} onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })} required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="uemail" className="text-right text-xs">Email</Label>
                    <Input id="uemail" type="email" className="col-span-3 h-9" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="upass" className="text-right text-xs">Password</Label>
                    <Input id="upass" type="password" className="col-span-3 h-9" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="urole" className="text-right text-xs">Role</Label>
                    <Select onValueChange={(v) => setNewUser({ ...newUser, role: v })} defaultValue={newUser.role}>
                      <SelectTrigger className="col-span-3 h-9">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        <SelectItem value="DONOR">Donor / Member</SelectItem>
                        <SelectItem value="VOLUNTEER">Volunteer</SelectItem>
                        <SelectItem value="MANAGER">Manager</SelectItem>
                        <SelectItem value="ADMIN">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" variant="premium" disabled={isActionLoading}>
                    {isActionLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                    Create Account
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card variant="glass">
          <CardHeader className="pb-4 border-b border-border/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-lg">Database Records</CardTitle>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Filter by name/email..."
                  className="pl-9 glass-card h-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="premium-table w-full">
                  <thead>
                    <tr className="bg-muted/30">
                      <th className="px-6 py-4 text-left text-[10px] uppercase font-bold text-muted-foreground">User</th>
                      <th className="px-6 py-4 text-left text-[10px] uppercase font-bold text-muted-foreground">Contact</th>
                      <th className="px-6 py-4 text-left text-[10px] uppercase font-bold text-muted-foreground">Role</th>
                      <th className="px-6 py-4 text-left text-[10px] uppercase font-bold text-muted-foreground">Account Status</th>
                      <th className="px-6 py-4 text-left text-[10px] uppercase font-bold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.email}`}
                            className="w-10 h-10 rounded-full border border-border/50"
                          />
                          <span className="font-semibold text-sm">{u.username || 'User'}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{u.email}</td>
                        <td className="px-6 py-4">
                          <Badge variant="glass" className="text-[10px]">{u.role}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={u.is_blocked ? 'inactive' : 'success'}>
                            {u.is_blocked ? 'BLOCKED' : 'ACTIVE'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="glass-card border-border/50">
                              <DropdownMenuLabel>User Management</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => handleUpdateRole(u.id, 'MANAGER')}>
                                <ShieldAlert className="w-4 h-4 text-primary" /> Promote to Manager
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => handleUpdateRole(u.id, 'DONOR')}>
                                <UserCheck className="w-4 h-4 text-success" /> Demote to Donor
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {u.is_blocked ? (
                                <DropdownMenuItem className="gap-2 cursor-pointer text-success" onClick={() => handleUnblockUser(u.id)}>
                                  <UserCheck className="w-4 h-4" /> Unblock User
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="gap-2 cursor-pointer text-destructive" onClick={() => handleBlockUser(u.id)}>
                                  <UserX className="w-4 h-4" /> Block User
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-20 text-center text-muted-foreground italic">
                          No members found.
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

export default AdminMembers;
