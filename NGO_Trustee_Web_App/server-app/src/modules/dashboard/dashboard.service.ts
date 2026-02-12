import { prisma } from '../../utils/db';

export const getDashboardOverview = async () => {
  /*
  const [
    totalDonors,
    totalMembers,
    donationSum
  ] = await Promise.all([
    prisma.user.count({ where: { role: 'DONOR' } }),
    prisma.memberProfile.count(),
    prisma.donation.aggregate({
      _sum: { amount: true },
    }),
  ]);
  */

  // Sequential execution to save connections
  const totalDonors = await prisma.user.count({ where: { role: 'DONOR' } });
  const totalMembers = await prisma.memberProfile.count();
  const donationSum = await prisma.donation.aggregate({
    _sum: { amount: true },
  });

  return {
    totalDonors,
    totalMembers,
    totalDonationAmount: donationSum._sum.amount || 0,
    // Return zeros/empty for others to avoid breaking frontend immediately before I update it
    totalCampaigns: 0,
    totalVolunteers: 0,
    totalActiveVolunteers: 0,
    totalCertificates: 0,
    totalMessages: 0,
    totalNotices: 0,
    users: [],
    activeCampaigns: [],
  };
};

export const getDashboardAnalytics = async (period: string = '30d') => {
  const daysAgo = period === '7d' ? 7 : period === '30d' ? 30 : 90;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - daysAgo);

  const donationsByDay = await prisma.donation.groupBy({
    by: ['created_at'],
    where: {
      created_at: { gte: startDate },
    },
    _sum: { amount: true },
    _count: true,
  });

  const volunteersByDay = await prisma.volunteer.groupBy({
    by: ['created_at'],
    where: {
      created_at: { gte: startDate },
    },
    _count: true,
  });

  const campaignProgress = await prisma.campaign.findMany({
    where: { status: 'active' },
    select: {
      id: true,
      title: true,
      goal_amount: true,
      raised_amount: true,
    },
  });

  return {
    period,
    donationsTrend: donationsByDay.map((d) => ({
      date: d.created_at,
      amount: d._sum.amount || 0,
      count: d._count,
    })),
    volunteersTrend: volunteersByDay.map((v) => ({
      date: v.created_at,
      count: v._count,
    })),
    campaignProgress: campaignProgress.map((c) => ({
      id: c.id,
      title: c.title,
      goalAmount: c.goal_amount,
      raisedAmount: c.raised_amount,
      percentage: (Number(c.raised_amount) / Number(c.goal_amount)) * 100,
    })),
  };
};

export const getRecentActivity = async (limit: number = 20) => {
  const activities = await prisma.auditLog.findMany({
    take: limit,
    orderBy: { timestamp: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
  });

  return activities.map((activity) => ({
    id: activity.id,
    action: activity.action,
    entityType: activity.entity_type,
    entityId: activity.entity_id,
    timestamp: activity.timestamp,
    user: activity.user,
    details: activity.action_details,
  }));
};
