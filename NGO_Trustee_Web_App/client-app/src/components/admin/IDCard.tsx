import React from 'react';
import { User, QrCode } from 'lucide-react';

interface IDCardProps {
    user: any;
    role?: string;
}

const IDCard = React.forwardRef<HTMLDivElement, IDCardProps>(({ user, role }, ref) => {
    // Basic branding colors
    const roleKey = role || user.role || 'MEMBER';

    // Corporate colors
    const isVolunteer = roleKey === 'VOLUNTEER';
    const headerColor = isVolunteer ? 'bg-[#1e3a8a]' : 'bg-[#064e3b]'; // Deep Blue or Deep Green

    const name = user.full_name || user.name || 'Unknown Name';
    const id = user.unique_id || user.id?.slice(0, 8).toUpperCase() || 'N/A';
    const joinDate = user.created_at || user.join_date ? new Date(user.created_at || user.join_date).toLocaleDateString() : 'N/A';
    const profileImage = user.profile?.avatar_url || user.avatar_url;

    return (
        <div
            ref={ref}
            className="w-[320px] h-[520px] bg-white rounded-lg overflow-hidden shadow-2xl relative flex flex-col font-sans"
            style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
        >
            {/* Header / Brand Section */}
            <div className={`h-32 ${headerColor} relative flex flex-col items-center justify-start pt-6`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}
                />

                {/* Logo Area */}
                <div className="text-white text-center z-10">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-xs font-bold text-gray-800 border-2 border-white/50">
                            NHRD
                        </div>
                        <h1 className="text-lg font-bold tracking-wide">BISWADAYA</h1>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest opacity-80">NGO Trustee Web App</p>
                </div>
            </div>

            {/* Profile Picture - Overlapping Header */}
            <div className="relative -mt-16 flex justify-center z-20">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-100 shadow-lg overflow-hidden flex items-center justify-center shrink-0">
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <User className="w-16 h-16 text-gray-300" />
                    )}
                </div>
            </div>

            {/* User Details */}
            <div className="flex-1 flex flex-col items-center pt-4 px-6 text-center">
                <h2 className="text-xl font-bold text-gray-800 uppercase leading-snug">{name}</h2>

                <span className={`mt-2 px-4 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider ${headerColor}`}>
                    {roleKey}
                </span>

                <div className="w-full mt-6 space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-xs text-gray-500 uppercase font-semibold">ID No.</span>
                        <span className="text-sm font-medium text-gray-800 font-mono">{id}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-xs text-gray-500 uppercase font-semibold">Joined</span>
                        <span className="text-sm font-medium text-gray-800">{joinDate}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-xs text-gray-500 uppercase font-semibold">Phone</span>
                        <span className="text-sm font-medium text-gray-800">{user.phone || user.profile?.phone || 'N/A'}</span>
                    </div>
                </div>

                {/* Footer / QR */}
                <div className="mt-auto mb-6 w-full flex items-center justify-between pt-4">
                    <div className="text-left">
                        <p className="text-[10px] text-gray-400 uppercase">Authorization</p>
                        <div className="h-8 w-24 mt-1 bg-no-repeat bg-contain opacity-70"
                            style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/f/f8/Signature_sample.svg")' }} // Mock signature
                        ></div>
                        <p className="text-[10px] text-gray-600 font-semibold">Director</p>
                    </div>

                    <div className="w-16 h-16 bg-white border border-gray-200 p-1 rounded-md shadow-sm">
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white">
                            <QrCode className="w-10 h-10" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Color Bar */}
            <div className={`h-2 w-full ${headerColor}`}></div>
        </div>
    );
});

IDCard.displayName = 'IDCard';

export default IDCard;
