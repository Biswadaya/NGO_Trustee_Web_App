import { useState } from 'react';
import { toast } from 'sonner';
import { memberAPI } from '@/api/endpoints';

export const useMember = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const registerMember = async (data: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await memberAPI.apply(data);
            toast.success('Registration successful! Welcome to the family.');
            return response.data;
        } catch (err: any) {
            const message = err.response?.data?.message || 'Failed to register';
            setError(message);
            toast.error(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getAllMembers = async () => {
        setLoading(true);
        try {
            const response = await memberAPI.getAllMembers();
            return response.data.data.members;
        } catch (err: any) {
            toast.error('Failed to fetch members');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const promoteMember = async (id: string) => {
        setLoading(true);
        try {
            const response = await memberAPI.promoteMember(id);
            toast.success('Member promoted successfully');
            return response.data;
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to promote member');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        registerMember,
        getAllMembers,
        promoteMember,
        loading,
        error
    };
};
