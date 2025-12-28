import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor for auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add interceptor for 401 responses
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Redirect to login if not already there
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export const dashboardAPI = {
    getOverview: () => api.get('/dashboard/overview'),
    getAnalytics: (period: string) => api.get(`/dashboard/analytics?period=${period}`),
    getRecentActivity: (limit: number) => api.get(`/dashboard/recent-activity?limit=${limit}`),
};

export const donationAPI = {
    create: (data: any) => api.post('/donations', data),
    list: () => api.get('/donations'),
    getById: (id: string) => api.get(`/donations/${id}`),
    getByTransactionId: (txId: string) => api.get(`/donations/transaction/${txId}`),
    getStats: () => api.get('/donations/stats'),
    getMyDonations: () => api.get('/donations/my-donations'),
};

export const campaignAPI = {
    create: (data: any) => api.post('/campaigns', data),
    update: (id: string, data: any) => api.put(`/campaigns/${id}`, data),
    list: () => api.get('/campaigns'),
    getById: (id: string) => api.get(`/campaigns/${id}`),
    remove: (id: string) => api.delete(`/campaigns/${id}`),
    getProgress: (id: string) => api.get(`/campaigns/${id}/progress`),
    getDonors: (id: string) => api.get(`/campaigns/${id}/donors`),
};

export const volunteerAPI = {
    register: (data: any) => api.post('/volunteers/register', data),
    list: () => api.get('/volunteers/list'),
    payMembership: (data: any) => api.post('/volunteers/payment', data),
    getPersonalInfo: (id: string) => api.get(`/volunteers/${id}/personal-info`),
    updateStatus: (id: string, status: string) => api.put(`/volunteers/${id}/status`, { status }),
    getStats: () => api.get('/volunteers/stats'),
    generateId: (id: string) => api.post(`/volunteers/${id}/generate-id`),
    getIdCard: (id: string) => api.get(`/volunteers/${id}/id-card`),
    listIdCards: () => api.get('/volunteers/id-card/list'),
    revokeId: (id: string) => api.put(`/volunteers/${id}/revoke`),
    getUniqueId: (id: string) => api.get(`/volunteers/${id}/get-unique-id`),
    getMyTasks: (id: string) => api.get(`/volunteers/${id}/tasks`),
    updateTaskStatus: (taskId: string, status: string) => api.put(`/volunteers/tasks/${taskId}/status`, { status }),
    createGroup: (data: any) => api.post('/volunteers/groups/create', data),
    listGroups: () => api.get('/volunteers/groups/list'),
    getGroupMembers: (groupId: string) => api.get(`/volunteers/groups/${groupId}/members`),
    addMembersToGroup: (groupId: string, volunteerIds: string[]) => api.put(`/volunteers/groups/${groupId}/add-members`, { volunteerIds }),
    removeMemberFromGroup: (groupId: string, volunteerId: string) => api.put(`/volunteers/groups/${groupId}/remove-member/${volunteerId}`),
    assignTaskBulk: (data: any) => api.post('/volunteers/tasks/assign-bulk', data),
    listAllTasks: () => api.get('/volunteers/tasks/all'),
};

export const adminAPI = {
    login: (data: any) => api.post('/admin/login', data),
    getDashboard: () => api.get('/admin/dashboard'),
    createEvent: (data: any) => api.post('/admin/events/create', data),
    getEvent: (id: string) => api.get(`/admin/events/${id}`),
    updateEvent: (id: string, data: any) => api.put(`/admin/events/${id}`, data),
    deleteEvent: (id: string) => api.delete(`/admin/events/${id}`),
    getFundsSummary: () => api.get('/admin/funds/summary'),
    getExpenses: () => api.get('/admin/funds/expenses'),
    getVolunteerStats: () => api.get('/admin/volunteer/stats'),
    getUnpaidVolunteers: () => api.get('/admin/volunteer/unpaid'),
    getVolunteerPaymentStats: (id: string) => api.get(`/admin/volunteer/${id}/payment_stats`),
    activateVolunteer: (id: string) => api.put(`/admin/volunteer/${id}/active-manual`),
    updateUserRole: (id: string, role: string) => api.put(`/admin/users/${id}/role`, { role }),
    revertUserRole: (id: string) => api.put(`/admin/users/${id}/revert-role`),
    listUsers: () => api.get('/admin/users'),
    blockUser: (id: string, data: any) => api.put(`/admin/users/${id}/block`, data),
    unblockUser: (id: string) => api.put(`/admin/users/${id}/unblock`),
    getBlockedUsers: () => api.get('/admin/users'),
    getAuditLogs: (limit: number) => api.get(`/admin/audit-logs?limit=${limit}`),
    getPendingVolunteers: () => api.get('/admin/volunteers/pending'),
    addVolunteer: (data: any) => api.post('/admin/volunteers', data),
    approveVolunteer: (id: string) => api.put(`/admin/volunteers/${id}/approve`),
    rejectVolunteer: (id: string) => api.put(`/admin/volunteers/${id}/reject`),
};

export const messageAPI = {
    send: (data: any) => api.post('/messages/admin/message/send', data),
    getInbox: () => api.get('/messages/inbox'),
    getMessage: (id: string) => api.get(`/messages/messages/${id}`),
    markRead: (messageId: string) => api.put('/messages/message/mark-read', { messageId }),
    getHistory: () => api.get('/messages/admin/message/history'),
    delete: (id: string) => api.delete(`/messages/admin/message/${id}`),
    getReadStats: () => api.get('/messages/admin/message/read-stats'),
    getUnreadStats: () => api.get('/messages/admin/message/unread-stats'),
};

export const noticeAPI = {
    create: (data: any) => api.post('/notices/admin/notices/create', data),
    list: () => api.get('/notices/notices/list'),
    getMyNotices: () => api.get('/notices/my-notices'),
    getHistory: () => api.get('/notices/admin/notice/history'),
    update: (id: string, data: any) => api.put(`/notices/admin/notice/${id}/edit`, data),
    delete: (id: string) => api.delete(`/notices/admin/notice/${id}`),
};

export const certificateAPI = {
    create: (data: any) => api.post('/certificates/create', data),
    list: () => api.get('/certificates/list'),
    generate: (data: any) => api.post('/certificates/generate', data),
    getEntityCertificates: (id: string) => api.get(`/certificates/${id}/certificates`),
};

export const transparencyAPI = {
    getReports: () => api.get('/transparency/reports'),
    getCertifications: () => api.get('/transparency/certifications'),
    getFinancialBreakdown: () => api.get('/transparency/financial-breakdown'),
    upload: (data: any) => api.post('/transparency', data),
};

export const fileAPI = {
    upload: (formData: FormData) => api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    list: () => api.get('/files/list'),
    update: (id: string, data: any) => api.put(`/files/${id}`, data),
    delete: (id: string) => api.delete(`/files/${id}`),
};

export const userAPI = {
    getMe: () => api.get('/users/me'),
};

export const publicAPI = {
    getEvents: () => api.get('/admin/events/public'),
};

export default api;
