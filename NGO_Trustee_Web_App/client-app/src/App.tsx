import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import RouteGuard from "./components/RouteGuard";
import { ThemeProvider } from "./contexts/ThemeContext";
import PublicLayout from "./components/layout/PublicLayout";

// Public Pages
import PublicHome from "./pages/public/Home";
import About from "./pages/public/About";
import Projects from "./pages/public/Projects";
import Events from "./pages/public/Events";
import Donate from "./pages/public/Donate";
import Login from "./pages/Login";
import VolunteerRegister from "./pages/Auth/VolunteerRegister";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminMembers from "./pages/admin/Members";
import AdminVolunteers from "./pages/admin/Volunteers";
import AdminDonations from "./pages/admin/Donations";
import AdminEvents from "./pages/admin/Events";
import AdminProjects from "./pages/admin/Projects";
import AdminVerification from "./pages/admin/Verification";
import AdminFinance from "./pages/admin/Finance";
import AdminAuditLogs from "./pages/admin/AuditLogs";
import AdminNotices from "./pages/admin/Notices";
import AdminSettings from "./pages/admin/Settings";

// User/Member Pages (Mapped to DONOR in backend)
import UserDashboard from "./pages/user/Dashboard";
import UserProfile from "./pages/user/Profile";
import UserIdCard from "./pages/user/IdCard";
import UserCertificates from "./pages/user/Certificates";
import UserAppointment from "./pages/user/Appointment";
import UserReceipts from "./pages/user/Receipts";
import UserMembership from "./pages/user/Membership";
import UserNotices from "./pages/user/Notices";
import UserSupport from "./pages/user/Support";

// Volunteer Pages
import VolunteerDashboard from "./pages/volunteer/Dashboard";
import VolunteerTasks from "./pages/volunteer/Tasks";
import VolunteerAttendance from "./pages/volunteer/Attendance";
import VolunteerCertificates from "./pages/volunteer/Certificates";
import VolunteerNotices from "./pages/volunteer/Notices";
import VolunteerSupport from "./pages/volunteer/Support";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<PublicHome />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/events" element={<Events />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<VolunteerRegister />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN', 'MANAGER']}><AdminDashboard /></RouteGuard>} />
              <Route path="/admin/members" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN']}><AdminMembers /></RouteGuard>} />
              <Route path="/admin/volunteers" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN']}><AdminVolunteers /></RouteGuard>} />
              <Route path="/admin/donations" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN']}><AdminDonations /></RouteGuard>} />
              <Route path="/admin/events" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN', 'MANAGER']}><AdminEvents /></RouteGuard>} />
              <Route path="/admin/projects" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN']}><AdminProjects /></RouteGuard>} />
              <Route path="/admin/verification" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN']}><AdminVerification /></RouteGuard>} />
              <Route path="/admin/finance" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN']}><AdminFinance /></RouteGuard>} />
              <Route path="/admin/audit-logs" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN']}><AdminAuditLogs /></RouteGuard>} />
              <Route path="/admin/notices" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN', 'MANAGER']}><AdminNotices /></RouteGuard>} />
              <Route path="/admin/settings" element={<RouteGuard allowedRoles={['ADMIN', 'SUPER_ADMIN']}><AdminSettings /></RouteGuard>} />

              {/* User/Member Routes (DONOR) */}
              <Route path="/user/dashboard" element={<RouteGuard allowedRoles={['DONOR']}><UserDashboard /></RouteGuard>} />
              <Route path="/user/profile" element={<RouteGuard allowedRoles={['DONOR']}><UserProfile /></RouteGuard>} />
              <Route path="/user/id-card" element={<RouteGuard allowedRoles={['DONOR']}><UserIdCard /></RouteGuard>} />
              <Route path="/user/certificates" element={<RouteGuard allowedRoles={['DONOR']}><UserCertificates /></RouteGuard>} />
              <Route path="/user/appointment" element={<RouteGuard allowedRoles={['DONOR']}><UserAppointment /></RouteGuard>} />
              <Route path="/user/receipts" element={<RouteGuard allowedRoles={['DONOR']}><UserReceipts /></RouteGuard>} />
              <Route path="/user/membership" element={<RouteGuard allowedRoles={['DONOR']}><UserMembership /></RouteGuard>} />
              <Route path="/user/notices" element={<RouteGuard allowedRoles={['DONOR']}><UserNotices /></RouteGuard>} />
              <Route path="/user/support" element={<RouteGuard allowedRoles={['DONOR']}><UserSupport /></RouteGuard>} />

              {/* Volunteer Routes */}
              <Route path="/volunteer/dashboard" element={<RouteGuard allowedRoles={['VOLUNTEER']}><VolunteerDashboard /></RouteGuard>} />
              <Route path="/volunteer/tasks" element={<RouteGuard allowedRoles={['VOLUNTEER']}><VolunteerTasks /></RouteGuard>} />
              <Route path="/volunteer/attendance" element={<RouteGuard allowedRoles={['VOLUNTEER']}><VolunteerAttendance /></RouteGuard>} />
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
