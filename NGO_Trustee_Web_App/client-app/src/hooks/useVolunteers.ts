import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

interface Volunteer {
    id: string;
    full_name: string;
    email: string;
    phone: string | null;
    status: string;
    created_at: string;
    user: {
        id: string;
        email: string;
        role: string;
        created_at: string;
    };
}

export function usePendingVolunteers() {
    return useQuery<Volunteer[]>({
        queryKey: ['pendingVolunteers'],
        queryFn: async () => {
            const res = await api.get('/admin/volunteers/pending');
            return res.data.data.volunteers;
        },
    });
}

export function useApproveVolunteer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (volunteerId: string) => {
            const res = await api.put(`/admin/volunteers/${volunteerId}/approve`);
            return res.data.data.volunteer;
        },
        onSuccess: () => {
            // Invalidate and refetch pending volunteers list
            queryClient.invalidateQueries({ queryKey: ['pendingVolunteers'] });
            queryClient.invalidateQueries({ queryKey: ['adminDashboard'] });
        },
    });
}

export function useRejectVolunteer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (volunteerId: string) => {
            const res = await api.put(`/admin/volunteers/${volunteerId}/reject`);
            return res.data.data.volunteer;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pendingVolunteers'] });
            queryClient.invalidateQueries({ queryKey: ['adminDashboard'] });
        },
    });
}
