import { useAdminDashboard } from '../../hooks/useAdminDashboard';
import { useAuth } from '../../context/AuthContext';
import { Users, UserCheck, DollarSign, Award, TrendingUp } from 'lucide-react';

function StatCard({ title, value, icon: Icon, color }: { title: string; value: number | string; icon: React.ElementType; color: string }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );
}

export default function Overview() {
    const { user } = useAuth();
    const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' || user?.role === 'MANAGER';
    const { data: stats, isLoading, error } = useAdminDashboard(isAdmin);

    // Only show loading for admins who are fetching data
    if (isAdmin && isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    // Only show error for admins who had a fetch error
    if (isAdmin && error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p>Failed to load dashboard data. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back, {user?.email?.split('@')[0] || 'User'}!</p>
            </div>

            {isAdmin && stats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Active Volunteers"
                        value={stats.volunteers.active}
                        icon={UserCheck}
                        color="bg-green-500"
                    />
                    <StatCard
                        title="Pending Volunteers"
                        value={stats.volunteers.pending}
                        icon={Users}
                        color="bg-yellow-500"
                    />
                    <StatCard
                        title="Total Funds Raised"
                        value={`$${Number(stats.funds.total).toLocaleString()}`}
                        icon={DollarSign}
                        color="bg-blue-500"
                    />
                    <StatCard
                        title="Certificates Issued"
                        value={stats.certificates.total}
                        icon={Award}
                        color="bg-purple-500"
                    />
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-lg bg-indigo-500">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Your Dashboard</p>
                            <p className="text-lg font-semibold text-gray-800">
                                Welcome to the NGO Portal
                            </p>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-600">
                        Use the sidebar to navigate to different sections of the portal.
                    </p>
                </div>
            )}

            {isAdmin && (
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                            Add Volunteer
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            Create Notice
                        </button>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                            Issue Certificate
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
