import { useEffect, useState } from 'react';
import { useMember } from '../../hooks/useMember';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Loader2, Shield } from "lucide-react";
import { toast } from 'sonner';

const MembersList = () => {
    const { getAllMembers, promoteMember, loading } = useMember();
    const [members, setMembers] = useState<any[]>([]);

    const fetchMembers = async () => {
        try {
            const data = await getAllMembers();
            setMembers(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handlePromote = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to promote ${name} to Volunteer?`)) return;

        try {
            const token = localStorage.getItem('token') || '';
            await promoteMember(id, token);
            toast.success(`${name} has been promoted to Volunteer`);
            fetchMembers(); // Refresh list
        } catch (error) {
            console.error(error);
        }
    };

    if (loading && members.length === 0) {
        return <div className="flex justify-center items-center h-96"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Members Management</h1>
                <Badge variant="outline" className="text-lg px-3 py-1">Total: {members.length}</Badge>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Registered Members</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Join Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Payment</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {members.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                            No members found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    members.map((member) => (
                                        <TableRow key={member.id}>
                                            <TableCell className="font-medium">{member.full_name}</TableCell>
                                            <TableCell>{member.email}</TableCell>
                                            <TableCell>{new Date(member.join_date).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                                                    MEMBER
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {member.is_paid ? (
                                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                                                        PAID
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="destructive">UNPAID</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    size="sm"
                                                    onClick={() => handlePromote(member.id, member.full_name)}
                                                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                                    title="Promote to Volunteer"
                                                >
                                                    <Shield className="w-4 h-4 mr-1" />
                                                    Promote
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MembersList;
