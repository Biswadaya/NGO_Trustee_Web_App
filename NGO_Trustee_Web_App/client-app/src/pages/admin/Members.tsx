import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { adminAPI, volunteerAPI } from '@/api/endpoints';
import { Search, Plus, MoreHorizontal, UserX, UserCheck, ShieldAlert, Loader2, History, Heart, IdCard, Download, Printer, CheckCircle, XCircle } from 'lucide-react';
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
  const [showIdCard, setShowIdCard] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);

  const [newUser, setNewUser] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'VOLUNTEER'
  });

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.listUsers();
      // Filter out ADMIN users as per requirement
      const allUsers = response.data.data.users || [];
      const filteredUsers = allUsers.filter((u: any) => !['ADMIN', 'SUPER_ADMIN'].includes(u.role));
      setUsers(filteredUsers);
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
      // Use the new Unified Create User API which handles roles properly
      await adminAPI.createUser(newUser);

      const roleName = newUser.role.charAt(0) + newUser.role.slice(1).toLowerCase();
      toast.success(`${roleName} created successfully`);
      setNewUser({ full_name: '', email: '', password: '', role: 'VOLUNTEER' });
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

  const handleRevertRole = async (id: string) => {
    try {
      const res = await adminAPI.revertUserRole(id);
      toast.success(res.data.message || 'Role reverted successfully');
      fetchUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to revert role');
    }
  };

  const handlePromoteUser = async (id: string) => {
    try {
      await adminAPI.promoteUser(id);
      toast.success('User promoted to Volunteer');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to promote user');
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

  // --- Volunteering Specific Actions ---
  const handleGenerateId = async (user: any) => {
    if (!user.volunteer_profile?.id) {
      toast.error('Volunteer profile incomplete (missing ID)');
      return;
    }
    try {
      toast.loading('Generating ID Card...', { id: 'gen-id' });
      await volunteerAPI.generateId(user.volunteer_profile.id);
      const res = await volunteerAPI.getIdCard(user.volunteer_profile.id);

      setSelectedVolunteer({ ...user.volunteer_profile, ...res.data.data, user: { email: user.email } });
      setShowIdCard(true);
      toast.success('ID Card ready!', { id: 'gen-id' });
      fetchUsers();
    } catch (error) {
      toast.error('Failed to generate ID card', { id: 'gen-id' });
    }
  };

  const handleVolunteerStatus = async (user: any, status: string) => {
    if (!user.volunteer_profile?.id) return;
    try {
      await volunteerAPI.updateStatus(user.volunteer_profile.id, status);
      toast.success(`Volunteer status: ${status}`);
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update status');
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
            \${printContent.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };


  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage volunteers, donors, and general members.</p>
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
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new account. Volunteers will be activated automatically.
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
              <CardTitle className="text-lg">All Registered Users</CardTitle>
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
                      <th className="px-6 py-4 text-left text-[10px] uppercase font-bold text-muted-foreground">Role</th>
                      <th className="px-6 py-4 text-left text-[10px] uppercase font-bold text-muted-foreground">Status</th>
                      <th className="px-6 py-4 text-left text-[10px] uppercase font-bold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {users.map((u) => {
                      const isVolunteer = u.role === 'VOLUNTEER';
                      const volStatus = u.volunteer_profile?.status;

                      return (
                        <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                          <td className="px-6 py-4 flex items-center gap-3">
                            <img
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.email}`}
                              className="w-10 h-10 rounded-full border border-border/50"
                            />
                            <div>
                              <p className="font-semibold text-sm">{u.volunteer_profile?.full_name || u.username}</p>
                              <p className="text-xs text-muted-foreground">{u.email}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="glass" className="text-[10px]">{u.role}</Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1 items-start">
                              {/* User Account Status */}
                              <Badge variant={u.is_blocked ? 'inactive' : 'success'}>
                                {u.is_blocked ? 'BLOCKED' : 'ACTIVE'}
                              </Badge>

                              {/* Volunteer Specific Status */}
                              {isVolunteer && volStatus && (
                                <Badge variant={volStatus === 'ACTIVE' ? 'default' : 'warning'} className="text-[10px]">
                                  VOLUNTEER: {volStatus}
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="glass-card border-border/50">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                {/* Volunteer Specific Actions */}
                                {isVolunteer && (
                                  <>
                                    <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => handleGenerateId(u)}>
                                      <IdCard className="w-4 h-4 text-primary" /> Generate ID Card
                                    </DropdownMenuItem>
                                    {volStatus === 'ACTIVE' ? (
                                      <DropdownMenuItem className="gap-2 cursor-pointer text-destructive" onClick={() => handleVolunteerStatus(u, 'INACTIVE')}>
                                        <XCircle className="w-4 h-4" /> Deactivate Volunteer
                                      </DropdownMenuItem>
                                    ) : (
                                      <DropdownMenuItem className="gap-2 cursor-pointer text-success" onClick={() => handleVolunteerStatus(u, 'ACTIVE')}>
                                        <CheckCircle className="w-4 h-4" /> Activate Volunteer
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                  </>
                                )}

                                <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => handleUpdateRole(u.id, 'MANAGER')}>
                                  <ShieldAlert className="w-4 h-4 text-primary" /> Promote to Manager
                                </DropdownMenuItem>

                                {u.role === 'DONOR' && (
                                  <DropdownMenuItem className="gap-2 cursor-pointer text-indigo-600 font-medium" onClick={() => handlePromoteUser(u.id)}>
                                    <Heart className="w-4 h-4" /> Promote to Volunteer
                                  </DropdownMenuItem>
                                )}

                                <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => handleRevertRole(u.id)}>
                                  <History className="w-4 h-4 text-warning" /> Revert Role / Demote
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
                      )
                    })}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-20 text-center text-muted-foreground italic">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hidden Modal for ID Card */}
        <Dialog open={showIdCard} onOpenChange={setShowIdCard}>
          <DialogContent className="sm:max-w-md glass-card border-none">
            <DialogHeader>
              <DialogTitle>Volunteer ID Card</DialogTitle>
              <DialogDescription>Official Digital Identity Card</DialogDescription>
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
                    <p className="text-sm text-gray-500 font-medium">{selectedVolunteer?.user?.email}</p>
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

export default AdminMembers;
