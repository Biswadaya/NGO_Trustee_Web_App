import React from 'react';
import { User, Shield, QrCode } from 'lucide-react';
import NHRDLogo from '@/assets/nhrd-logo.png';

interface IDCardProps {
    user: any;
    role?: string;
}

const IDCard = React.forwardRef<HTMLDivElement, IDCardProps>(({ user, role }, ref) => {
    // Determine Role Display
    const displayRole = role || user.role || 'MEMBER';

    // Determine Profile Photo
    // Check diverse paths: user.profile_photo, user.profile?.profile_photo, user.avatar_url, etc.
    const profilePhoto = user.profile_photo || user.profile?.profile_photo || user.avatar_url || user.profile?.avatar_url;

    // Determine ID
    const userIdDisplay = (user.unique_id || user.id || '0000').substring(0, 6).toUpperCase();

    // Determine Join Date
    const joinDate = user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A';

    return (
        <div
            ref={ref}
            className="relative w-[340px] h-[520px] rounded-[16px] overflow-hidden bg-white shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col items-center"
            id="id-card-element"
        >
            {/* 1. Header with Gradient & Logo - Professional Look */}
            <div className="h-[180px] w-full bg-gradient-to-br from-[#006056] to-[#008ba3] relative p-4 flex flex-col items-center justify-center text-center z-10 shrink-0">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>

                <div className="bg-white p-2 rounded-lg shadow-sm mb-2">
                    <img
                        src={NHRDLogo}
                        alt="NHRD Logo"
                        className="h-8 w-auto object-contain"
                    />
                </div>
                <h3 className="text-[12px] font-bold tracking-widest text-white uppercase leading-tight font-sans opacity-90 max-w-[90%]">
                    National Humanity And Rural Development (NHRD)
                </h3>
            </div>

            {/* 2. Content Body */}
            <div className="flex flex-col items-center relative z-20 -mt-10 px-2 w-full flex-grow">

                {/* Photo Container */}
                <div className="w-24 h-24 rounded-full bg-white p-1.5 shadow-lg mb-3">
                    <div className="w-full h-full rounded-full bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center">
                        {profilePhoto ? (
                            <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-12 h-12 text-slate-300" />
                        )}
                    </div>
                </div>

                {/* Name & Role */}
                <div className="text-center mb-6 w-full px-4">
                    <h2 className="text-lg font-bold text-slate-800 leading-tight mb-1 truncate">
                        {user.full_name || user.username || 'Member'}
                    </h2>
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        <Shield className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{displayRole}</span>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="w-full grid grid-cols-2 gap-y-4 gap-x-2 text-left bg-slate-50/50 p-4 rounded-xl border border-slate-100 mb-4">
                    <div>
                        <p className="text-[9px] uppercase text-slate-400 font-bold tracking-wider mb-0.5">Member ID</p>
                        <p className="text-xs font-mono font-semibold text-slate-700">
                            NHRD-{userIdDisplay}
                        </p>
                    </div>
                    <div>
                        <p className="text-[9px] uppercase text-slate-400 font-bold tracking-wider mb-0.5">Valid Thru</p>
                        <p className="text-xs font-mono font-semibold text-slate-700">LIFETIME</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-[9px] uppercase text-slate-400 font-bold tracking-wider mb-0.5">Department / Role</p>
                        <p className="text-xs font-semibold text-slate-700">
                            {user.bio || user.profile?.bio || 'General Membership'}
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. Footer */}
            <div className="w-full h-[60px] bg-slate-50 border-t border-slate-100 flex items-center justify-between px-6 shrink-0 mt-auto">
                <div className="flex flex-col justify-center">
                    <div className="h-4 w-20 mb-1 opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png')] bg-contain bg-no-repeat bg-left"></div>
                    <div className="h-[1px] w-24 bg-slate-300"></div>
                    <p className="text-[7px] uppercase text-slate-400 font-bold tracking-widest mt-0.5">Authorized Signatory</p>
                </div>
                <div className="bg-white p-1 rounded border border-slate-100">
                    <QrCode className="w-8 h-8 text-slate-800" />
                </div>
            </div>

            {/* Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-[0.03] pointer-events-none grayscale z-0">
                <img src={NHRDLogo} alt="" className="w-full h-full object-contain" />
            </div>
        </div>
    );
});

IDCard.displayName = 'IDCard';

export default IDCard;
