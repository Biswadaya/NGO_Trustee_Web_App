import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import RouteGuard from "./components/RouteGuard";
import { ThemeProvider } from "./contexts/ThemeContext";
import PublicLayout from "./components/layout/PublicLayout";
import ScrollToTop from "./components/ScrollToTop";

// Public Pages
import PublicHome from "./pages/public/Home";
import About from "./pages/public/About";
import Campaigns from "./pages/public/Campaigns";
import Events from "./pages/public/Events";
import Contact from "./pages/public/Contact";
import Donate from "./pages/public/Donate";
import WhatWeDo from "./pages/public/WhatWeDo";
import GetInvolved from "./pages/public/GetInvolved";
import Auth from "./pages/Auth/Auth";
import BecomeMember from "./pages/public/BecomeMember";
import Stories from "./pages/public/Stories";
import StoryDetail from "./pages/public/StoryDetail";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProfile from "./pages/admin/Profile";
import AdminMembers from "./pages/admin/Members";
import AdminVolunteers from "./pages/admin/Volunteers";

import AdminEvents from "./pages/admin/Events";
import AdminProjects from "./pages/admin/Projects";
import AdminTasks from "./pages/admin/Tasks";
import AdminVerification from "./pages/admin/Verification";
import AdminFinance from "./pages/admin/Finance";
import AdminAuditLogs from "./pages/admin/AuditLogs";
import AdminNotices from "./pages/admin/Notices";
import AdminSettings from "./pages/admin/Settings";

// User/Member Pages (Mapped to DONOR in backend)
import UserDashboard from "./pages/user/Dashboard";
import UserProfile from "./pages/user/Profile";
import UserIdCard from "./pages/user/IdCard";
import UserTasks from "./pages/user/Tasks";
import UserCertificates from "./pages/user/Certificates";
import UserAppointment from "./pages/user/Appointment";
import UserReceipts from "./pages/user/Receipts";
import UserMembership from "./pages/user/Membership";
import UserNotices from "./pages/user/Notices";
import UserSupport from "./pages/user/Support";

// Volunteer Pages
import VolunteerDashboard from "./pages/volunteer/Dashboard";
import VolunteerProfile from "./pages/volunteer/Profile";
import VolunteerTasks from "./pages/volunteer/Tasks";
import VolunteerCertificates from "./pages/volunteer/Certificates";
import VolunteerNotices from "./pages/volunteer/Notices";
import VolunteerSupport from "./pages/volunteer/Support";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import { DonationCertificate } from "./components/certificates/DonationCertificate";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<PublicHome />} />
                <Route path="/about" element={<About />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/what-we-do" element={<WhatWeDo />} />
                <Route path="/events" element={<Events />} />
                <Route path="/get-involved" element={<GetInvolved />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/become-member" element={<BecomeMember />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/stories/:id" element={<StoryDetail />} />
                <Route path="/certificate-preview" element={<div className="flex justify-center items-center min-h-screen bg-gray-100"><DonationCertificate /></div>} />
              </Route>

              <Route path="/login" element={<Auth initialMode="login" />} />
              <Route path="/register" element={<Auth initialMode="register" />} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN', 'MANAGER']}><AdminDashboard /></RouteGuard>} />
              <Route path="/admin/profile" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN', 'MANAGER']}><AdminProfile /></RouteGuard>} />
              <Route path="/admin/members" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN']}><AdminMembers /></RouteGuard>} />
              <Route path="/admin/volunteers" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN']}><AdminVolunteers /></RouteGuard>} />

              <Route path="/admin/events" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN', 'MANAGER']}><AdminEvents /></RouteGuard>} />
              <Route path="/admin/projects" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN']}><AdminProjects /></RouteGuard>} />
              <Route path="/admin/tasks" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN', 'MANAGER']}><AdminTasks /></RouteGuard>} />
              <Route path="/admin/verification" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN']}><AdminVerification /></RouteGuard>} />
              <Route path="/admin/finance" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN']}><AdminFinance /></RouteGuard>} />
              <Route path="/admin/audit-logs" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN']}><AdminAuditLogs /></RouteGuard>} />
              <Route path="/admin/notices" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN', 'MANAGER']}><AdminNotices /></RouteGuard>} />
              <Route path="/admin/settings" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN']}><AdminSettings /></RouteGuard>} />

              {/* User/Member Routes (DONOR & MEMBER) */}
              <Route path="/user/dashboard" element={<RouteGuard allowedRoles={['DONOR', 'MEMBER']}><UserDashboard /></RouteGuard>} />
              <Route path="/user/profile" element={<RouteGuard allowedRoles={['DONOR', 'MEMBER']}><UserProfile /></RouteGuard>} />
              <Route path="/user/id-card" element={<RouteGuard allowedRoles={['DONOR', 'MEMBER']}><UserIdCard /></RouteGuard>} />
              <Route path="/user/tasks" element={<RouteGuard allowedRoles={['MEMBER', 'DONOR']}><UserTasks /></RouteGuard>} />
              <Route path="/user/certificates" element={<RouteGuard allowedRoles={['DONOR', 'MEMBER']}><UserCertificates /></RouteGuard>} />
              <Route path="/user/appointment" element={<RouteGuard allowedRoles={['DONOR', 'MEMBER']}><UserAppointment /></RouteGuard>} />
              <Route path="/user/receipts" element={<RouteGuard allowedRoles={['DONOR', 'MEMBER']}><UserReceipts /></RouteGuard>} />
              <Route path="/user/membership" element={<RouteGuard allowedRoles={['DONOR', 'MEMBER']}><UserMembership /></RouteGuard>} />
              <Route path="/user/notices" element={<RouteGuard allowedRoles={['DONOR', 'MEMBER']}><UserNotices /></RouteGuard>} />
              <Route path="/user/support" element={<RouteGuard allowedRoles={['DONOR', 'MEMBER']}><UserSupport /></RouteGuard>} />

              {/* Volunteer Routes */}
              <Route path="/volunteer/dashboard" element={<RouteGuard allowedRoles={['VOLUNTEER']}><VolunteerDashboard /></RouteGuard>} />
              <Route path="/volunteer/profile" element={<RouteGuard allowedRoles={['VOLUNTEER']}><VolunteerProfile /></RouteGuard>} />
              <Route path="/volunteer/tasks" element={<RouteGuard allowedRoles={['VOLUNTEER']}><VolunteerTasks /></RouteGuard>} />
              <Route path="/volunteer/certificates" element={<RouteGuard allowedRoles={['VOLUNTEER']}><VolunteerCertificates /></RouteGuard>} />
              <Route path="/volunteer/notices" element={<RouteGuard allowedRoles={['VOLUNTEER']}><VolunteerNotices /></RouteGuard>} />
              <Route path="/volunteer/support" element={<RouteGuard allowedRoles={['VOLUNTEER']}><VolunteerSupport /></RouteGuard>} />

              {/* Catch All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
