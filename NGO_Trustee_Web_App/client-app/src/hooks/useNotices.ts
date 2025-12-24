import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

interface Notice {
    id: string;
    title: string;
    content: string;
    notice_type: string;
    target_audience: string;
    published_at: string;
    expiry_date: string | null;
    is_active: boolean;
}

export function useNotices() {
    return useQuery<Notice[]>({
        queryKey: ['myNotices'],
        queryFn: async () => {
            const res = await api.get('/notices/my-notices');
            return res.data.data.notices;
        },
    });
}

export function usePublicNotices() {
    return useQuery<Notice[]>({
        queryKey: ['publicNotices'],
        queryFn: async () => {
            const res = await api.get('/notices/public');
            return res.data.data.notices;
        },
    });
}
