import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Shield, CheckCircle } from 'lucide-react';

export default function Profile() {
    const { user } = useAuth();

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'SUPER_ADMIN': return 'bg-red-100 text-red-700';
            case 'ADMIN': return 'bg-purple-100 text-purple-700';
            case 'MANAGER': return 'bg-blue-100 text-blue-700';
            case 'VOLUNTEER': return 'bg-green-100 text-green-700';
            case 'DONOR': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
                <p className="text-gray-500">Your account information</p>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32"></div>
                <div className="px-6 pb-6">
                    <div className="flex items-center -mt-12">
                        <div className="bg-white p-2 rounded-full shadow-lg">
                            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                                <User className="w-10 h-10 text-indigo-600" />
                            </div>
                        </div>
                        <div className="ml-4 mt-12">
                            <h2 className="text-xl font-bold text-gray-800">
                                {user?.email?.split('@')[0] || 'User'}
                            </h2>
                            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user?.role || '')}`}>
                                {user?.role}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-800">Email Address</h3>
                    </div>
                    <p className="text-gray-600">{user?.email}</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Shield className="w-5 h-5 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-800">Account Role</h3>
                    </div>
                    <p className="text-gray-600">{user?.role}</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-800">Account Status</h3>
                    </div>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Active
                    </span>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <User className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="font-semibold text-gray-800">User ID</h3>
                    </div>
                    <p className="text-gray-600 text-sm font-mono truncate">{user?.id}</p>
                </div>
            </div>
        </div>
    );
}
