import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { adminAPI } from '@/api/endpoints';
import { Trash2, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface MemberRegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const MemberRegistrationModal: React.FC<MemberRegistrationModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('personal');

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        occupation: '',
        membership_fee: 1000,
        bank_details: {
            bank_name: '',
            account_number: '',
            ifsc_code: '',
            branch_name: ''
        },
        nominee: {
            name: '',
            relationship: '',
            phone: '',
            bank_name: '',
            account_number: '',
            ifsc_code: ''
        },
        family_members: [] as any[]
    });

    const [newFamilyMember, setNewFamilyMember] = useState({ name: '', relationship: '', age: '' });

    const handleChange = (section: string, field: string, value: any) => {
        if (section === 'root') {
            setFormData(prev => ({ ...prev, [field]: value }));
        } else {
            setFormData(prev => ({
                ...prev,
                [section]: { ...prev[section as keyof typeof prev] as any, [field]: value }
            }));
        }
    };

    const addFamilyMember = () => {
        if (!newFamilyMember.name || !newFamilyMember.relationship) {
            toast.error("Name and Relationship are required");
            return;
        }
        setFormData(prev => ({
            ...prev,
            family_members: [...prev.family_members, { ...newFamilyMember, age: Number(newFamilyMember.age) }]
        }));
        setNewFamilyMember({ name: '', relationship: '', age: '' });
    };

    const removeFamilyMember = (index: number) => {
        setFormData(prev => ({
            ...prev,
            family_members: prev.family_members.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async () => {
        if (!formData.full_name || !formData.email || !formData.password) {
            toast.error("Name, Email and Password are required");
            return;
        }

        setLoading(true);
        try {
            await adminAPI.createMember(formData);
            toast.success("Member registered successfully");
            onSuccess();
            onClose();
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to register member");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Manual Member Registration</DialogTitle>
                    <DialogDescription>
                        Manually register a new member. Payment will be skipped.
                    </DialogDescription>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="personal">Personal</TabsTrigger>
                        <TabsTrigger value="bank">Bank</TabsTrigger>
                        <TabsTrigger value="nominee">Nominee</TabsTrigger>
                        <TabsTrigger value="family">Family</TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Full Name *</Label>
                                <Input value={formData.full_name} onChange={e => handleChange('root', 'full_name', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Email *</Label>
                                <Input type="email" value={formData.email} onChange={e => handleChange('root', 'email', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Password *</Label>
                                <Input type="password" value={formData.password} onChange={e => handleChange('root', 'password', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input value={formData.phone} onChange={e => handleChange('root', 'phone', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Occupation</Label>
                                <Input value={formData.occupation} onChange={e => handleChange('root', 'occupation', e.target.value)} />
                            </div>
                            <div className="col-span-2 space-y-2">
                                <Label>Address</Label>
                                <Input value={formData.address} onChange={e => handleChange('root', 'address', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Membership Fee</Label>
                                <Input type="number" value={formData.membership_fee} onChange={e => handleChange('root', 'membership_fee', Number(e.target.value))} />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="bank" className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Bank Name</Label>
                                <Input value={formData.bank_details.bank_name} onChange={e => handleChange('bank_details', 'bank_name', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Account Number</Label>
                                <Input value={formData.bank_details.account_number} onChange={e => handleChange('bank_details', 'account_number', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>IFSC Code</Label>
                                <Input value={formData.bank_details.ifsc_code} onChange={e => handleChange('bank_details', 'ifsc_code', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Branch Name</Label>
                                <Input value={formData.bank_details.branch_name} onChange={e => handleChange('bank_details', 'branch_name', e.target.value)} />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="nominee" className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Nominee Name</Label>
                                <Input value={formData.nominee.name} onChange={e => handleChange('nominee', 'name', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Relationship</Label>
                                <Input value={formData.nominee.relationship} onChange={e => handleChange('nominee', 'relationship', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input value={formData.nominee.phone} onChange={e => handleChange('nominee', 'phone', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Bank Name</Label>
                                <Input value={formData.nominee.bank_name} onChange={e => handleChange('nominee', 'bank_name', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Account Number</Label>
                                <Input value={formData.nominee.account_number} onChange={e => handleChange('nominee', 'account_number', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>IFSC Code</Label>
                                <Input value={formData.nominee.ifsc_code} onChange={e => handleChange('nominee', 'ifsc_code', e.target.value)} />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="family" className="space-y-4 py-4">
                        <div className="flex gap-2 items-end mb-4">
                            <div className="space-y-2 flex-1">
                                <Label>Name</Label>
                                <Input value={newFamilyMember.name} onChange={e => setNewFamilyMember({ ...newFamilyMember, name: e.target.value })} />
                            </div>
                            <div className="space-y-2 w-32">
                                <Label>Relation</Label>
                                <Input value={newFamilyMember.relationship} onChange={e => setNewFamilyMember({ ...newFamilyMember, relationship: e.target.value })} />
                            </div>
                            <div className="space-y-2 w-20">
                                <Label>Age</Label>
                                <Input type="number" value={newFamilyMember.age} onChange={e => setNewFamilyMember({ ...newFamilyMember, age: e.target.value })} />
                            </div>
                            <Button onClick={addFamilyMember} type="button" size="icon"><Plus className="w-4 h-4" /></Button>
                        </div>

                        <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Relation</TableHead>
                                        <TableHead>Age</TableHead>
                                        <TableHead className="w-[50px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {formData.family_members.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center text-muted-foreground">No family members added</TableCell>
                                        </TableRow>
                                    ) : (
                                        formData.family_members.map((fam, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell>{fam.name}</TableCell>
                                                <TableCell>{fam.relationship}</TableCell>
                                                <TableCell>{fam.age}</TableCell>
                                                <TableCell>
                                                    <Button variant="ghost" size="sm" onClick={() => removeFamilyMember(idx)}>
                                                        <Trash2 className="w-4 h-4 text-red-500" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                </Tabs>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Register Member
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default MemberRegistrationModal;
