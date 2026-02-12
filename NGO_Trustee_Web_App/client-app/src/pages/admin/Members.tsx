import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { adminAPI } from '@/api/endpoints';
import { MoreHorizontal, Ban, ShieldCheck, Eye, CreditCard, UserPlus, Loader2, Search, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import IDCardModal from '@/components/admin/IDCardModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import MemberRegistrationModal from '@/components/admin/MemberRegistrationModal';

const AdminMembers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [isIdCardOpen, setIsIdCardOpen] = useState(false);
  const [idCardUser, setIdCardUser] = useState<any>(null);

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await adminAPI.getUsers();
      // Filter: Only show DONOR (presumed Member) and VOLUNTEER roles? 
      // Or ideally filter by those who have member_profile?
      // The API response might include membership details or we assume Role=DONOR is applied member.
      // Let's rely on role or if backend returns profile flag.
      // For now, assume all non-admins.
      console.log(res.data.data);
      const userList = res.data.data.users || [];
      setUsers(userList.filter((u: any) => u.role !== 'ADMIN'));
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (user: any) => {
    setActionLoading(true);
    let profileData = null;

    try {
      // Only attempt to fetch profile if they are likely to have one (or just try and catch)
      const res = await adminAPI.getMemberProfile(user.id);
      profileData = res.data.data.member;
    } catch (error) {
      console.warn("Could not fetch full member profile, showing basic info.");
    } finally {
      setSelectedMember({ ...user, profile: profileData });
      setIsDetailsOpen(true);
      setActionLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedMember) return;
    setActionLoading(true);
    try {
      await adminAPI.approveMember(selectedMember.id);
      toast.success("Member approved successfully");
      setIsDetailsOpen(false);
      fetchUsers(); // Refresh list
    } catch (error) {
      toast.error("Failed to approve");
    } finally {
      setActionLoading(false);
    }
  };

  const handleBlock = async (userId: string) => {
    const reason = prompt("Enter reason for blocking (optional):") || "Admin blocked";
    if (reason === null) return;
    try {
      await adminAPI.blockUser(userId, { reason });
      toast.success("User blocked successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to block user");
    }
  };

  const handleUnblock = async (userId: string) => {
    if (!confirm("Are you sure you want to unblock this user?")) return;
    try {
      await adminAPI.unblockUser(userId);
      toast.success("User unblocked successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to unblock user");
    }
  };

  const filteredUsers = users.filter(user =>
    user.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Member Management</h1>
          <p className="text-muted-foreground">Verify and manage NGO members.</p>
        </div>
        <Button onClick={() => setIsRegistrationOpen(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No members found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div>{user.full_name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.is_blocked ? "destructive" : "success"}>
                        {user.is_blocked ? "Inactive" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.created_at ? format(new Date(user.created_at), 'MMM d, yyyy') : '-'}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { setIdCardUser(user); setIsIdCardOpen(true); }}>
                            <CreditCard className="mr-2 h-4 w-4" /> ID Card
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.is_blocked ? (
                            <DropdownMenuItem onClick={() => handleUnblock(user.id)}>
                              <ShieldCheck className="mr-2 h-4 w-4" /> Unblock
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleBlock(user.id)} className="text-red-600 focus:text-red-600">
                              <Ban className="mr-2 h-4 w-4" /> Block
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Member Details</DialogTitle>
            <DialogDescription>Review application details.</DialogDescription>
          </DialogHeader>

          {selectedMember?.profile ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-bold">{selectedMember.full_name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedMember.email}</p>
                </div>
                <Badge variant={selectedMember.is_blocked ? "destructive" : "success"}>
                  {selectedMember.is_blocked ? "Inactive" : "Active"}
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <h5 className="font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Personal & Payment
                </h5>
                <div className="text-sm space-y-2">
                  <div className="grid grid-cols-2"><span className="text-muted-foreground">Adhar Number:</span> <span>{selectedMember.profile.adhar_number || '-'}</span></div>
                  <div className="grid grid-cols-2"><span className="text-muted-foreground">Membership Fee:</span>
                    <span className="font-bold text-green-600">₹{selectedMember.profile.membership_fee}</span>
                  </div>
                  <div className="grid grid-cols-2"><span className="text-muted-foreground">Payment Status:</span>
                    <span>{selectedMember.profile.is_paid ? 'Paid' : 'Unpaid'}</span>
                  </div>
                  <div className="grid grid-cols-2"><span className="text-muted-foreground">Paid Date:</span>
                    <span>{selectedMember.profile.payment_date ? format(new Date(selectedMember.profile.payment_date), 'PPP') : '-'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 border p-4 rounded-lg">
                <h5 className="font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Bank Details (Optional)
                </h5>
                <div className="text-sm space-y-2">
                  <div className="grid grid-cols-2"><span className="text-muted-foreground">Bank:</span> <span>{selectedMember.profile.bank_name || '-'}</span></div>
                  <div className="grid grid-cols-2"><span className="text-muted-foreground">Account:</span> <span>{selectedMember.profile.account_number || '-'}</span></div>
                  <div className="grid grid-cols-2"><span className="text-muted-foreground">IFSC:</span> <span>{selectedMember.profile.ifsc_code || '-'}</span></div>
                </div>
              </div>

              <div className="space-y-4 border p-4 rounded-lg">
                <h5 className="font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Nominee (Optional)
                </h5>
                <div className="text-sm space-y-2">
                  <div className="grid grid-cols-2"><span className="text-muted-foreground">Name:</span> <span>{selectedMember.profile.nominee_name || '-'}</span></div>
                  <div className="grid grid-cols-2"><span className="text-muted-foreground">Relation:</span> <span>{selectedMember.profile.nominee_relation || '-'}</span></div>
                </div>

                {selectedMember.profile.family_members && selectedMember.profile.family_members.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted px-4 py-2 text-sm font-semibold">Family Members</div>
                    <Table>
                      <TableBody>
                        {selectedMember.profile.family_members.map((fam: any) => (
                          <TableRow key={fam.id}>
                            <TableCell>{fam.full_name}</TableCell>
                            <TableCell>{fam.relationship}</TableCell>
                            <TableCell>{fam.is_dependent ? 'Dependent' : '-'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              No detailed profile found (Profile might check failed or user is not fully registered).
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>Close</Button>
            {!selectedMember?.is_active && (
              <>
                <Button variant="destructive" onClick={() => toast.info("Rejection not implemented yet")}>Reject</Button>
                <Button variant="default" onClick={handleApprove} disabled={actionLoading}>
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                  Approve Membership
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <IDCardModal
        isOpen={isIdCardOpen}
        onClose={() => setIsIdCardOpen(false)}
        user={idCardUser}
      />

      <MemberRegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        onSuccess={fetchUsers}
      />
    </DashboardLayout>
  );
};

export default AdminMembers;
