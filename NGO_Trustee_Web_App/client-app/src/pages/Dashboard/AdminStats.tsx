import { useAdminDashboard } from '../../hooks/useAdminDashboard';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Users, UserCheck, DollarSign, Award, Activity } from 'lucide-react';

function BigStatCard({ title, value, subtitle, icon: Icon, color }: {
    title: string;
    value: number | string;
    subtitle?: string;
    icon: React.ElementType;
    color: string
}) {
    return (
        <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">{title}</p>
                    <p className="text-4xl font-bold text-gray-800 mt-2">{value}</p>
                    {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
                </div>
                <div className={`p-4 rounded-xl ${color}`}>
                    <Icon className="w-8 h-8 text-white" />
                </div>
            </div>
        </div>
    );
}

export default function AdminStats() {
    const { user } = useAuth();
    const { data: stats, isLoading, error } = useAdminDashboard();

    // Guard: Only Admin/Super Admin/Manager can access
    const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' || user?.role === 'MANAGER';

    if (!isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

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
                <p>Failed to load admin statistics. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Statistics</h1>
                <p className="text-gray-500">Detailed overview of platform metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BigStatCard
                    title="Active Volunteers"
                    value={stats?.volunteers.active || 0}
                    subtitle="Currently active members"
                    icon={UserCheck}
                    color="bg-gradient-to-br from-green-400 to-green-600"
                />
                <BigStatCard
                    title="Pending Approvals"
                    value={stats?.volunteers.pending || 0}
                    subtitle="Awaiting review"
                    icon={Users}
                    color="bg-gradient-to-br from-yellow-400 to-orange-500"
                />
                <BigStatCard
                    title="Total Funds Raised"
                    value={`$${Number(stats?.funds.total || 0).toLocaleString()}`}
                    subtitle={`From ${stats?.funds.donations || 0} donations`}
                    icon={DollarSign}
                    color="bg-gradient-to-br from-blue-400 to-blue-600"
                />
                <BigStatCard
                    title="Certificates Issued"
                    value={stats?.certificates.total || 0}
                    subtitle="Recognition awarded"
                    icon={Award}
                    color="bg-gradient-to-br from-purple-400 to-purple-600"
                />
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center space-x-3 mb-4">
                    <Activity className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
                </div>
                {stats?.recentActivity && stats.recentActivity.length > 0 ? (
                    <div className="space-y-3">
                        {/* Activity items would go here */}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-8">No recent activity to display</p>
                )}
            </div>
        </div>
    );
}
