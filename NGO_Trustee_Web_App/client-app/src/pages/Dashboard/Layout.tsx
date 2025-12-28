import { useAuth } from '../../contexts/AuthContext';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { LogOut, Home, User, FileText, Bell, Users } from 'lucide-react';

export default function DashboardLayout() {
    const { user, logout, isAuthenticated } = useAuth();
    const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' || user?.role === 'MANAGER';

    if (!isAuthenticated) return <Navigate to="/login" />;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold text-indigo-600">NGO Portal</h1>
                    <p className="text-sm text-gray-500">Welcome, {user?.email?.split('@')[0] || 'User'}</p>
                </div>
                <nav className="p-4 space-y-2">
                    <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                        <Home size={20} /> <span>Overview</span>
                    </Link>
                    <Link to="/dashboard/profile" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                        <User size={20} /> <span>Profile</span>
                    </Link>
                    <Link to="/dashboard/notices" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                        <Bell size={20} /> <span>Notices</span>
                    </Link>
                    {isAdmin && (
                        <>
                            <Link to="/dashboard/volunteers/pending" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                                <Users size={20} /> <span>Pending Volunteers</span>
                            </Link>
                            <Link to="/dashboard/admin" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                                <FileText size={20} /> <span>Admin Stats</span>
                            </Link>
                        </>
                    )}
                    <button onClick={logout} className="flex items-center space-x-2 text-red-600 hover:text-red-800 mt-4 w-full text-left">
                        <LogOut size={20} /> <span>Logout</span>
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-8">
                <Outlet />
            </div>
        </div>
    );
}
