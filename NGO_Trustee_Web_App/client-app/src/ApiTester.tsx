import React, { useState } from 'react';
import * as api from './api/endpoints';

const ApiTester: React.FC = () => {
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const testEndpoint = async (apiCall: () => Promise<any>) => {
        setLoading(true);
        setError(null);
        try {
            const res = await apiCall();
            setResponse(res.data);
        } catch (err: any) {
            setError(err.message || 'An error occurred');
            setResponse(err.response?.data || null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ color: '#2563eb', marginBottom: '30px' }}>🏃 NGO API Tester</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', background: '#f9fafb' }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Test Controls</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h3 style={{ fontSize: '1rem', marginTop: '10px' }}>Dashboard</h3>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <button onClick={() => testEndpoint(api.dashboardAPI.getOverview)} style={btnStyle}>Overview</button>
                            <button onClick={() => testEndpoint(() => api.dashboardAPI.getRecentActivity(5))} style={btnStyle}>Activity (5)</button>
                        </div>

                        <h3 style={{ fontSize: '1rem', marginTop: '10px' }}>Volunteer</h3>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <button onClick={() => testEndpoint(api.volunteerAPI.list)} style={btnStyle}>List Volunteers</button>
                            <button onClick={() => testEndpoint(api.volunteerAPI.listIdCards)} style={btnStyle}>List ID Cards</button>
                        </div>

                        <h3 style={{ fontSize: '1rem', marginTop: '10px' }}>Donations & Campaigns</h3>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <button onClick={() => testEndpoint(api.donationAPI.list)} style={btnStyle}>List Donations</button>
                            <button onClick={() => testEndpoint(api.campaignAPI.list)} style={btnStyle}>List Campaigns</button>
                            <button onClick={() => testEndpoint(api.donationAPI.getStats)} style={btnStyle}>Donation Stats</button>
                        </div>

                        <h3 style={{ fontSize: '1rem', marginTop: '10px' }}>Admin & Systems</h3>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <button onClick={() => testEndpoint(api.adminAPI.getFundsSummary)} style={btnStyle}>Funds Summary</button>
                            <button onClick={() => testEndpoint(api.messageAPI.getHistory)} style={btnStyle}>Message History</button>
                            <button onClick={() => testEndpoint(api.noticeAPI.getHistory)} style={btnStyle}>Notice History</button>
                            <button onClick={() => testEndpoint(api.transparencyAPI.getFinancialBreakdown)} style={btnStyle}>Financial Breakdown</button>
                        </div>
                    </div>
                </div>

                <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', background: '#ffffff', minHeight: '400px' }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Response Output</h2>
                    {loading && <div style={{ color: '#2563eb' }}>📡 Loading...</div>}
                    {error && <div style={{ color: '#dc2626', marginBottom: '10px' }}>❌ Error: {error}</div>}
                    {!loading && response && (
                        <pre style={{
                            background: '#1e293b',
                            color: '#f8fafc',
                            padding: '15px',
                            borderRadius: '8px',
                            overflow: 'auto',
                            maxHeight: '500px',
                            fontSize: '0.85rem'
                        }}>
                            {JSON.stringify(response, null, 2)}
                        </pre>
                    )}
                    {!loading && !response && <div style={{ color: '#6b7280' }}>Click a button to test an endpoint...</div>}
                </div>
            </div>
        </div>
    );
};

const btnStyle: React.CSSProperties = {
    padding: '8px 12px',
    background: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'all 0.2s',
};

export default ApiTester;
