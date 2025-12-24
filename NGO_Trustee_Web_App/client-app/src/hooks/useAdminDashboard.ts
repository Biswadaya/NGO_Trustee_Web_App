import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

interface DashboardStats {
    volunteers: {
        active: number;
        pending: number;
    };
    funds: {
        total: number;
        donations: number;
    };
    certificates: {
        total: number;
    };
    recentActivity: unknown[];
}

export function useAdminDashboard(enabled: boolean = true) {
    return useQuery<DashboardStats>({
        queryKey: ['adminDashboard'],
        queryFn: async () => {
            const res = await api.get('/admin/dashboard');
            return res.data.data.stats;
        },
        enabled, // Only fetch if user is admin/manager
    });
}

