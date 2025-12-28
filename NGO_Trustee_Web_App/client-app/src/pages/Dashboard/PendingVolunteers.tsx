import { usePendingVolunteers, useApproveVolunteer, useRejectVolunteer } from '../../hooks/useVolunteers';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Users, CheckCircle, XCircle, Mail, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';

export default function PendingVolunteers() {
    const { user } = useAuth();
    const { data: volunteers, isLoading, error } = usePendingVolunteers();
    const approveMutation = useApproveVolunteer();
    const rejectMutation = useRejectVolunteer();
    const [actioningId, setActioningId] = useState<string | null>(null);

    const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' || user?.role === 'MANAGER';

    if (!isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleApprove = async (volunteerId: string) => {
        setActioningId(volunteerId);
        try {
            await approveMutation.mutateAsync(volunteerId);
        } finally {
            setActioningId(null);
        }
    };

    const handleReject = async (volunteerId: string) => {
        setActioningId(volunteerId);
        try {
            await rejectMutation.mutateAsync(volunteerId);
        } finally {
            setActioningId(null);
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p>Failed to load pending volunteers. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Pending Volunteers</h1>
                    <p className="text-gray-500">Review and approve volunteer applications</p>
                </div>
                <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <span className="text-yellow-700 font-medium">{volunteers?.length || 0} Pending</span>
                </div>
            </div>

            {volunteers && volunteers.length > 0 ? (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Volunteer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Applied On
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {volunteers.map((volunteer) => (
                                <tr key={volunteer.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <Users className="h-5 w-5 text-indigo-600" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {volunteer.full_name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {volunteer.user.role}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                            {volunteer.email}
                                        </div>
                                        {volunteer.phone && (
                                            <div className="text-sm text-gray-500 mt-1">
                                                {volunteer.phone}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                            {formatDate(volunteer.created_at)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => handleApprove(volunteer.id)}
                                                disabled={actioningId === volunteer.id}
                                                className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleReject(volunteer.id)}
                                                disabled={actioningId === volunteer.id}
                                                className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <XCircle className="w-4 h-4 mr-1" />
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700">No pending volunteers</h3>
                    <p className="text-gray-500 mt-1">All volunteer applications have been processed</p>
                </div>
            )}
        </div>
    );
}
