// Mock data for Trust Flow demo

export const dashboardStats = {
  admin: {
    totalMembers: 2847,
    activeVolunteers: 156,
    totalDonations: 1250000,
    pendingApprovals: 23,
    monthlyGrowth: 12.5,
    projectsActive: 18,
    eventsThisMonth: 7,
    newRegistrations: 89,
  },
  member: {
    membershipStatus: 'Active',
    memberSince: '2023-01-15',
    totalDonations: 25000,
    eventsAttended: 12,
    certificatesEarned: 3,
    upcomingEvents: 2,
  },
  volunteer: {
    hoursLogged: 156,
    tasksCompleted: 45,
    eventsHelped: 18,
    certificatesEarned: 2,
    currentRank: 'Senior Volunteer',
    teamMembers: 12,
  },
};

export const recentMembers = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', joinDate: '2024-01-15', status: 'Active', type: 'Premium', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul' },
  { id: 2, name: 'Priya Patel', email: 'priya@email.com', joinDate: '2024-01-14', status: 'Pending', type: 'Standard', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya' },
  { id: 3, name: 'Amit Kumar', email: 'amit@email.com', joinDate: '2024-01-13', status: 'Active', type: 'Premium', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amit' },
  { id: 4, name: 'Sneha Gupta', email: 'sneha@email.com', joinDate: '2024-01-12', status: 'Active', type: 'Standard', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@email.com', joinDate: '2024-01-11', status: 'Inactive', type: 'Premium', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram' },
];

export const recentDonations = [
  { id: 1, donor: 'Anonymous', amount: 50000, date: '2024-01-15', project: 'Education Fund', status: 'Completed' },
  { id: 2, donor: 'Rahul Sharma', amount: 25000, date: '2024-01-14', project: 'Healthcare Initiative', status: 'Completed' },
  { id: 3, donor: 'Corporate Donor', amount: 100000, date: '2024-01-13', project: 'Rural Development', status: 'Processing' },
  { id: 4, donor: 'Priya Patel', amount: 10000, date: '2024-01-12', project: 'Women Empowerment', status: 'Completed' },
  { id: 5, donor: 'Anonymous', amount: 75000, date: '2024-01-11', project: 'Clean Water Project', status: 'Completed' },
];

export const projects = [
  { id: 1, name: 'Education for All', description: 'Providing quality education to underprivileged children', raised: 450000, goal: 500000, supporters: 234, status: 'Active', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400', category: 'Education', location: 'Rural Bihar' },
  { id: 2, name: 'Healthcare Initiative', description: 'Free medical camps in rural areas', raised: 320000, goal: 400000, supporters: 189, status: 'Active', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400', category: 'Health', location: 'Uttar Pradesh' },
  { id: 3, name: 'Women Empowerment', description: 'Skill development programs for women', raised: 280000, goal: 350000, supporters: 156, status: 'Active', image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400', category: 'Community', location: 'Rajasthan' },
  { id: 4, name: 'Clean Water Project', description: 'Installing water purification systems', raised: 180000, goal: 250000, supporters: 98, status: 'Active', image: 'https://images.unsplash.com/photo-1541544181051-e46607bc22a4?w=400', category: 'Environment', location: 'Maharashtra' },
  { id: 5, name: 'Rural Development', description: 'Infrastructure development in villages', raised: 520000, goal: 600000, supporters: 312, status: 'Active', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400', category: 'Community', location: 'Odisha' },
];

export const events = [
  { id: 1, name: 'Annual Charity Gala', date: '2024-02-15', time: '18:00', location: 'Grand Ballroom, Mumbai', attendees: 250, status: 'Upcoming', type: 'Fundraiser' },
  { id: 2, name: 'Blood Donation Camp', date: '2024-02-10', time: '09:00', location: 'Community Center, Delhi', attendees: 150, status: 'Upcoming', type: 'Health' },
  { id: 3, name: 'Youth Leadership Workshop', date: '2024-02-05', time: '10:00', location: 'Training Hall, Bangalore', attendees: 80, status: 'Upcoming', type: 'Education' },
  { id: 4, name: 'Tree Plantation Drive', date: '2024-01-28', time: '07:00', location: 'City Park, Chennai', attendees: 200, status: 'Completed', type: 'Environment' },
  { id: 5, name: 'Women\'s Day Celebration', date: '2024-03-08', time: '11:00', location: 'Convention Center, Kolkata', attendees: 300, status: 'Upcoming', type: 'Social' },
];

export const volunteers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+91 98765 43210', hours: 156, tasks: 45, status: 'Active', rating: 4.8, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
  { id: 2, name: 'Mike Chen', email: 'mike@email.com', phone: '+91 98765 43211', hours: 120, tasks: 38, status: 'Active', rating: 4.6, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike' },
  { id: 3, name: 'Anita Desai', email: 'anita@email.com', phone: '+91 98765 43212', hours: 98, tasks: 32, status: 'Active', rating: 4.9, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anita' },
  { id: 4, name: 'David Wilson', email: 'david@email.com', phone: '+91 98765 43213', hours: 75, tasks: 25, status: 'Inactive', rating: 4.5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david' },
  { id: 5, name: 'Fatima Khan', email: 'fatima@email.com', phone: '+91 98765 43214', hours: 200, tasks: 58, status: 'Active', rating: 5.0, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fatima' },
];

export const tasks = [
  { id: 1, title: 'Setup Event Booth', project: 'Annual Charity Gala', dueDate: '2024-02-14', priority: 'High', status: 'In Progress', assignee: 'Sarah Johnson' },
  { id: 2, title: 'Coordinate Volunteers', project: 'Blood Donation Camp', dueDate: '2024-02-09', priority: 'High', status: 'Pending', assignee: 'Mike Chen' },
  { id: 3, title: 'Prepare Training Materials', project: 'Youth Leadership Workshop', dueDate: '2024-02-03', priority: 'Medium', status: 'Completed', assignee: 'Anita Desai' },
  { id: 4, title: 'Arrange Transportation', project: 'Tree Plantation Drive', dueDate: '2024-01-27', priority: 'Medium', status: 'Completed', assignee: 'David Wilson' },
  { id: 5, title: 'Send Invitations', project: 'Women\'s Day Celebration', dueDate: '2024-02-20', priority: 'Low', status: 'Pending', assignee: 'Fatima Khan' },
];

export const notices = [
  { id: 1, title: 'Annual General Meeting Notice', content: 'The AGM will be held on 25th February 2024 at 10:00 AM. All members are requested to attend.', date: '2024-01-15', type: 'Important', read: false },
  { id: 2, title: 'New Membership Drive', content: 'We are launching a new membership drive. Refer friends and family to join our cause.', date: '2024-01-14', type: 'Announcement', read: true },
  { id: 3, title: 'Volunteer Appreciation Day', content: 'Join us on 30th January to celebrate our amazing volunteers and their contributions.', date: '2024-01-13', type: 'Event', read: false },
  { id: 4, title: 'Policy Update', content: 'New donation policies have been updated. Please review the changes in your member portal.', date: '2024-01-12', type: 'Update', read: true },
  { id: 5, title: 'Success Story: Education Project', content: 'Our education project has successfully enrolled 500 students this year!', date: '2024-01-11', type: 'News', read: true },
];

export const certificates = [
  { id: 1, title: 'Volunteer Excellence Award', date: '2024-01-10', type: 'Achievement', downloadUrl: '#' },
  { id: 2, title: 'Leadership Training Certificate', date: '2023-12-15', type: 'Training', downloadUrl: '#' },
  { id: 3, title: 'Event Coordinator Certificate', date: '2023-11-20', type: 'Role', downloadUrl: '#' },
];

export const membershipTypes = [
  { id: 1, name: 'Standard', price: 1000, duration: '1 Year', benefits: ['Member ID Card', 'Event Access', 'Newsletter'] },
  { id: 2, name: 'Premium', price: 2500, duration: '1 Year', benefits: ['All Standard Benefits', 'Priority Event Seating', 'Exclusive Workshops', 'Certificate of Membership'] },
  { id: 3, name: 'Lifetime', price: 10000, duration: 'Lifetime', benefits: ['All Premium Benefits', 'Voting Rights', 'Special Recognition', 'Leadership Opportunities'] },
];

export const receipts = [
  { id: 'RCP-2024-001', date: '2024-01-15', amount: 5000, type: 'Donation', project: 'Education Fund', status: 'Issued' },
  { id: 'RCP-2024-002', date: '2024-01-10', amount: 2500, type: 'Membership', project: 'Premium Membership', status: 'Issued' },
  { id: 'RCP-2023-045', date: '2023-12-20', amount: 10000, type: 'Donation', project: 'Healthcare Initiative', status: 'Issued' },
];

export const auditLogs = [
  { id: 1, action: 'User Login', user: 'admin@trustflow.app', timestamp: '2024-01-15 10:30:00', ip: '192.168.1.100', status: 'Success' },
  { id: 2, action: 'Member Approved', user: 'admin@trustflow.app', timestamp: '2024-01-15 10:25:00', ip: '192.168.1.100', status: 'Success' },
  { id: 3, action: 'Donation Received', user: 'system', timestamp: '2024-01-15 10:20:00', ip: '203.0.113.50', status: 'Success' },
  { id: 4, action: 'Password Reset', user: 'member@trustflow.app', timestamp: '2024-01-15 10:15:00', ip: '192.168.1.105', status: 'Success' },
  { id: 5, action: 'Report Generated', user: 'admin@trustflow.app', timestamp: '2024-01-15 10:10:00', ip: '192.168.1.100', status: 'Success' },
];

export const financeStats = {
  totalIncome: 2500000,
  totalExpenses: 1800000,
  netBalance: 700000,
  pendingPayments: 150000,
  monthlyIncome: [
    { month: 'Jan', income: 280000, expenses: 200000 },
    { month: 'Feb', income: 250000, expenses: 180000 },
    { month: 'Mar', income: 320000, expenses: 220000 },
    { month: 'Apr', income: 290000, expenses: 190000 },
    { month: 'May', income: 350000, expenses: 250000 },
    { month: 'Jun', income: 280000, expenses: 200000 },
  ],
  expenseCategories: [
    { name: 'Programs', value: 45 },
    { name: 'Administration', value: 20 },
    { name: 'Fundraising', value: 15 },
    { name: 'Operations', value: 12 },
    { name: 'Other', value: 8 },
  ],
};

export const chatMessages = [
  { id: 1, sender: 'support', message: 'Hello! How can I help you today?', timestamp: '2024-01-15 10:00:00' },
  { id: 2, sender: 'user', message: 'I have a question about my membership status.', timestamp: '2024-01-15 10:01:00' },
  { id: 3, sender: 'support', message: 'Of course! I\'d be happy to help. Could you please provide your member ID?', timestamp: '2024-01-15 10:02:00' },
  { id: 4, sender: 'user', message: 'My member ID is TF-2024-001234', timestamp: '2024-01-15 10:03:00' },
  { id: 5, sender: 'support', message: 'Thank you! I can see your Premium membership is active until December 2024. Is there anything specific you\'d like to know?', timestamp: '2024-01-15 10:04:00' },
];

export const attendanceRecords = [
  { id: 1, date: '2024-01-15', event: 'Team Meeting', checkIn: '09:00', checkOut: '11:00', hours: 2, status: 'Present' },
  { id: 2, date: '2024-01-14', event: 'Blood Donation Camp', checkIn: '08:30', checkOut: '14:30', hours: 6, status: 'Present' },
  { id: 3, date: '2024-01-13', event: 'Training Session', checkIn: '10:00', checkOut: '13:00', hours: 3, status: 'Present' },
  { id: 4, date: '2024-01-12', event: 'Community Outreach', checkIn: '-', checkOut: '-', hours: 0, status: 'Absent' },
  { id: 5, date: '2024-01-11', event: 'Planning Meeting', checkIn: '14:00', checkOut: '16:00', hours: 2, status: 'Present' },
];

export const idCardData = {
  memberId: 'TF-2024-001234',
  name: 'John Member',
  memberType: 'Premium',
  validFrom: '2024-01-01',
  validUntil: '2024-12-31',
  bloodGroup: 'O+',
  emergencyContact: '+91 98765 43210',
  qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TF-2024-001234',
};

export const teamMembers = [
  { id: 1, name: 'Dr. Rajesh Kumar', role: 'President', bio: 'Leading the organization since 2015 with a vision for social change.', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh' },
  { id: 2, name: 'Mrs. Sunita Sharma', role: 'Vice President', bio: 'Expert in community development and women empowerment programs.', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sunita' },
  { id: 3, name: 'Mr. Anil Verma', role: 'Secretary', bio: 'Handling administrative operations with 20 years of NGO experience.', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anil' },
  { id: 4, name: 'Ms. Priya Desai', role: 'Treasurer', bio: 'Certified accountant ensuring transparent financial management.', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priyadesai' },
];

export const impactStats = [
  { label: 'Lives Impacted', value: '50,000+' },
  { label: 'Projects Completed', value: '150+' },
  { label: 'Active Volunteers', value: '500+' },
  { label: 'Communities Served', value: '100+' },
];
