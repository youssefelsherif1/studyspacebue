import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Button } from './ui/button';
import { 
  BookOpen, 
  Calendar, 
  Home, 
  Users, 
  Award, 
  MapPin,
  Settings,
  LogOut,
  Menu,
  Moon,
  Sun,
  Globe
} from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: 'student' | 'instructor' | 'admin' | 'receptionist';
  userName: string;
  userPoints?: number;
}

export function DashboardLayout({ children, userRole, userName, userPoints }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const getNavItems = () => {
    switch (userRole) {
      case 'student':
        return [
          { path: '/student', label: t('dashboard'), icon: Home },
          { path: '/booking', label: t('book_room'), icon: Calendar },
          { path: '/rooms', label: t('rooms'), icon: MapPin },
          { path: '/rewards', label: t('rewards'), icon: Award },
        ];
      case 'instructor':
        return [
          { path: '/instructor', label: t('dashboard'), icon: Home },
          { path: '/instructor/booking', label: t('book_room'), icon: Calendar },
          { path: '/rooms', label: t('rooms'), icon: MapPin },
          { path: '/rewards', label: t('rewards'), icon: Award },
        ];
      case 'admin':
        return [
          { path: '/admin', label: t('dashboard'), icon: Home },
          { path: '/rooms', label: t('manage_rooms'), icon: MapPin },
          { path: '/booking', label: t('bookings'), icon: Calendar },
        ];
      case 'receptionist':
        return [
          { path: '/receptionist', label: t('dashboard'), icon: Home },
          { path: '/booking', label: t('new_booking'), icon: Calendar },
          { path: '/rooms', label: t('rooms'), icon: MapPin },
        ];
      default:
        return [];
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const navItems = getNavItems();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#111827] text-white' : 'bg-[#f9fafb]'}`}>
      {/* Top Header */}
      <header className={`${theme === 'dark' ? 'bg-[#1f2937] border-[#374151]' : 'bg-white border-[#e5e7eb]'} border-b sticky top-0 z-40`}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-[#1a1a2e]'}`}>StudySpace</span>
            </Link>
            <Badge variant="secondary" className="hidden md:flex">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className={`p-2 rounded-lg hover:bg-[#f3f4f6] dark:hover:bg-[#374151] transition-colors`} title="Toggle Language">
              <Globe className="w-4 h-4 text-[#6b7280]" />
            </button>
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className={`p-2 rounded-lg hover:bg-[#f3f4f6] dark:hover:bg-[#374151] transition-colors`} title="Toggle Theme">
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#f59e0b]" /> : <Moon className="w-4 h-4 text-[#6b7280]" />}
            </button>
            {userPoints !== undefined && (
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4f46e5]/10 to-[#8b5cf6]/10 rounded-lg">
                <Award className="w-4 h-4 text-[#4f46e5]" />
                <span className="font-semibold text-[#4f46e5]">{userPoints} pts</span>
              </div>
            )}
            <Link to="/profile">
              <Avatar className="cursor-pointer hover:ring-2 hover:ring-[#4f46e5] transition-all">
                <AvatarFallback className="bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] text-white">
                  {userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`hidden md:flex w-64 border-r ${theme === 'dark' ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb] bg-white'} min-h-[calc(100vh-73px)] flex-col`}>
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start gap-3 ${
                      isActive 
                        ? 'bg-gradient-to-r from-[#4f46e5]/10 to-[#8b5cf6]/10 text-[#4f46e5]' 
                        : `${theme === 'dark' ? 'text-[#9ca3af] hover:text-white' : 'text-[#6b7280] hover:text-[#1a1a2e]'}`
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className={`p-4 space-y-1 border-t ${theme === 'dark' ? 'border-[#374151]' : 'border-[#e5e7eb]'}`}>
            <Link to="/settings">
              <Button variant="ghost" className={`w-full justify-start gap-3 ${theme === 'dark' ? 'text-[#9ca3af] hover:text-white' : 'text-[#6b7280] hover:text-[#1a1a2e]'}`}>
                <Settings className="w-5 h-5" />
                {t('settings')}
              </Button>
            </Link>
            <Button variant="ghost" className={`w-full justify-start gap-3 ${theme === 'dark' ? 'text-[#9ca3af]' : 'text-[#6b7280]'} hover:text-[#ef4444]`} onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
              {t('logout')}
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1f2937] border-t border-[#e5e7eb] dark:border-[#374151] py-2 px-2 z-40">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center gap-1 h-auto py-2 ${
                    isActive ? 'text-[#4f46e5]' : 'text-[#6b7280]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              </Link>
            );
          })}
          <Link to="/settings">
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2 text-[#6b7280]">
              <Menu className="w-5 h-5" />
              <span className="text-xs">More</span>
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
