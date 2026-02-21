// ============================================
// CREDENCE - Institution Portal Layout
// ============================================

import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  LayoutDashboard,
  Users,
  BarChart3,
  Award,
  Briefcase,
  Settings,
  Bell,
  LogOut,
  ChevronDown,
  Search,
  Menu,
  X,
  GraduationCap,
  FileText,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface InstitutionLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/institution/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/institution/students', label: 'Students', icon: Users },
  { path: '/institution/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/institution/skills', label: 'Skills Tracking', icon: Award },
  { path: '/institution/placements', label: 'Placements', icon: Briefcase },
  { path: '/institution/reports', label: 'Reports', icon: FileText },
  { path: '/institution/settings', label: 'Settings', icon: Settings },
];

export default function InstitutionLayout({ children }: InstitutionLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: '15 new students registered today', time: '2 mins ago', read: false },
    { id: 2, message: 'Monthly report is ready for download', time: '1 hour ago', read: false },
    { id: 3, message: 'Amazon requested 5 student profiles', time: '3 hours ago', read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'} bg-dark-800 border-r border-dark-700 transition-all duration-300`}>
        {/* Logo */}
        <div className="p-4 border-b border-dark-700">
          <Link to="/institution/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <span className="text-lg font-bold text-white">Credense</span>
                <p className="text-xs text-gray-400">Institution Portal</p>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-dark-700'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Button */}
        <div className="p-4 border-t border-dark-700">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
            {sidebarOpen && <span className="text-sm">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-dark-800 border-r border-dark-700 z-50"
            >
              <div className="p-4 border-b border-dark-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-bold text-white">Credense</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'text-gray-400 hover:text-white hover:bg-dark-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-dark-800/80 backdrop-blur-xl border-b border-dark-700 sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-gray-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden md:flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <span className="text-white font-medium">Tech University</span>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs">Pro Plan</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search students, skills..."
                  className="w-64 bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-purple-500 rounded-full text-[10px] text-white flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-dark-800 border border-dark-700 rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="p-4 border-b border-dark-700">
                        <h3 className="text-sm font-semibold text-white">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-4 border-b border-dark-700 hover:bg-dark-700/50 cursor-pointer ${
                              !notif.read ? 'bg-purple-500/5' : ''
                            }`}
                          >
                            <p className="text-sm text-white">{notif.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 text-center">
                        <button className="text-sm text-purple-400 hover:underline">
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium text-sm">
                    A
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                <AnimatePresence>
                  {profileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-dark-800 border border-dark-700 rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="p-4 border-b border-dark-700">
                        <p className="text-sm font-medium text-white">Admin User</p>
                        <p className="text-xs text-gray-400">admin@techuniv.edu</p>
                      </div>
                      <div className="p-2">
                        <Link
                          to="/institution/settings"
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-dark-700 rounded-lg"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-dark-700 rounded-lg"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
