import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const API_URL = 'http://localhost:5000/api/v1/members';

export const useMember = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const registerMember = async (data: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_URL}/register`, data);
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
            const token = localStorage.getItem('token');
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data.data.members;
        } catch (err: any) {
            toast.error('Failed to fetch members');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const promoteMember = async (id: string, token: string) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/${id}/promote`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
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
