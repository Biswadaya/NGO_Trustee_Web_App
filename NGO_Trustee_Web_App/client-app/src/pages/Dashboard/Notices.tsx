import { useNotices } from '../../hooks/useNotices';
import { useAuth } from '../../context/AuthContext';
import { Bell, Calendar, Tag, Plus } from 'lucide-react';

function NoticeCard({ notice }: { notice: { id: string; title: string; content: string; notice_type: string; published_at: string } }) {
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'urgent': return 'bg-red-100 text-red-700';
            case 'event': return 'bg-blue-100 text-blue-700';
            case 'policy': return 'bg-purple-100 text-purple-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                        <Bell className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">{notice.title}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notice.notice_type)}`}>
                    {notice.notice_type}
                </span>
            </div>
            <p className="mt-3 text-gray-600 text-sm line-clamp-2">{notice.content}</p>
            <div className="mt-4 flex items-center text-xs text-gray-400">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(notice.published_at)}
            </div>
        </div>
    );
}

export default function Notices() {
    const { user } = useAuth();
    const { data: notices, isLoading, error } = useNotices();

    const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' || user?.role === 'MANAGER';

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
                <p>Failed to load notices. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Notices</h1>
                    <p className="text-gray-500">Stay updated with the latest announcements</p>
                </div>
                {isAdmin && (
                    <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Notice
                    </button>
                )}
            </div>

            {notices && notices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {notices.map((notice) => (
                        <NoticeCard key={notice.id} notice={notice} />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <Tag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700">No notices yet</h3>
                    <p className="text-gray-500 mt-1">Check back later for updates</p>
                </div>
            )}
        </div>
    );
}
