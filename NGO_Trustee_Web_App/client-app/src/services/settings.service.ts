import axios from '@/api/axios';

export interface OrganizationSettings {
    id: string;
    org_name: string;
    contact_email: string;
    phone: string;
    address?: string;
    website?: string;
    logo_url?: string;
}

export const getOrganizationSettings = async (): Promise<OrganizationSettings> => {
    const response = await axios.get('/admin/settings/organization');
    return response.data.data.settings;
};

export const updateOrganizationSettings = async (data: Partial<OrganizationSettings>): Promise<OrganizationSettings> => {
    const response = await axios.put('/admin/settings/organization', data);
    return response.data.data.settings;
};
