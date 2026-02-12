import { type ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
  Search,
  CreditCard,
  ClipboardList,
  Award,
  MessageSquare,
  User,
  Receipt,
  IdCard,
  ScrollText,
  Send,
  Globe,
  UserCheck,
  Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Footer from './Footer';
import nhrdLogo from '@/assets/nhrd-logo.png';
import { DEFAULT_USER_AVATAR } from '@/utils/constants';

interface DashboardLayoutProps {
  children: ReactNode;
}

const adminNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: User, label: 'Profile', path: '/admin/profile' },
  { icon: Users, label: 'User Management', path: '/admin/members' },
  { icon: Calendar, label: 'Events', path: '/admin/events' },
  { icon: FileText, label: 'Projects', path: '/admin/projects' },
  { icon: ClipboardList, label: 'Task & Teams', path: '/admin/tasks' },
  { icon: UserCheck, label: 'Verification', path: '/admin/verification' },
  { icon: CreditCard, label: 'Finance', path: '/admin/finance' },
  { icon: ScrollText, label: 'Audit Logs', path: '/admin/audit-logs' },
  { icon: Send, label: 'Notices', path: '/admin/notices' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

const memberNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/user/dashboard' },
  { icon: User, label: 'My Profile', path: '/user/profile' },
  { icon: IdCard, label: 'My ID Card', path: '/user/id-card' },
  { icon: Award, label: 'Certificates', path: '/user/certificates' },
  { icon: FileText, label: 'Appointment Letter', path: '/user/appointment' },
  { icon: Receipt, label: 'Receipts', path: '/user/receipts' },
  { icon: CreditCard, label: 'Membership', path: '/user/membership' },
  { icon: Bell, label: 'Notices', path: '/user/notices' },
  { icon: MessageSquare, label: 'Support Chat', path: '/user/support' },
];

const volunteerNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/volunteer/dashboard' },
  { icon: User, label: 'Profile', path: '/volunteer/profile' },
  { icon: ClipboardList, label: 'Task Board', path: '/volunteer/tasks' },
  { icon: Award, label: 'Certificates', path: '/volunteer/certificates' },
  { icon: Bell, label: 'Notices', path: '/volunteer/notices' },
  { icon: MessageSquare, label: 'Support Chat', path: '/volunteer/support' },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let navItems = user?.role === 'ADMIN' ? adminNavItems : user?.role === 'VOLUNTEER' ? volunteerNavItems : memberNavItems;

  if (user?.role === 'MEMBER') {
    navItems = memberNavItems.map(item =>
      item.label === 'Membership'
        ? { icon: ClipboardList, label: 'My Tasks', path: '/user/tasks' }
        : item
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out shadow-xl",
          sidebarOpen ? "w-64" : "w-20",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-20 border-b border-gray-100 bg-white/50 backdrop-blur-xl">
          <img src={nhrdLogo} alt="NHRD Logo" className="w-10 h-10 object-contain" />
          {sidebarOpen && (
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold text-slate-900 tracking-tight">
                NHRD
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
                Admin Panel
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary border-l-4 border-primary font-medium"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <Button
            variant="ghost"
            asChild
            className={cn(
              "w-full justify-start text-slate-600 hover:text-primary hover:bg-primary/10",
              !sidebarOpen && "justify-center"
            )}
          >
            <Link to="/">
              <Home className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="ml-3">Back to Home</span>}
            </Link>
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-slate-600 hover:text-red-600 hover:bg-red-50",
              !sidebarOpen && "justify-center"
            )}
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        sidebarOpen ? "md:ml-64" : "md:ml-20"
      )}>
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border h-16 flex items-center px-4 md:px-6">
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            {/* Sidebar Toggle (Desktop) */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Search */}
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">EN</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>हिंदी (Hindi)</DropdownMenuItem>
                <DropdownMenuItem>ଓଡ଼ିଆ (Odia)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>



            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="notification-dot" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.avatar || DEFAULT_USER_AVATAR} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 flex flex-col">
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
