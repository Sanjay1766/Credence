// ============================================
// CREDENCE - Hiring Partners Layout
// ============================================

import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  LayoutDashboard,
  Users,
  Search,
  BookmarkPlus,
  MessageSquare,
  Calendar,
  Settings,
  Bell,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Building2,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HiringLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/hiring/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/hiring/talent-search', label: 'Talent Search', icon: Search },
  { path: '/hiring/shortlisted', label: 'Shortlisted', icon: BookmarkPlus },
  { path: '/hiring/jobs', label: 'Job Postings', icon: Briefcase },
  { path: '/hiring/interviews', label: 'Interviews', icon: Calendar },
  { path: '/hiring/messages', label: 'Messages', icon: MessageSquare },
  { path: '/hiring/reports', label: 'Reports', icon: FileText },
  { path: '/hiring/settings', label: 'Settings', icon: Settings },
];

export default function HiringLayout({ children }: HiringLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New candidate matches your search', time: '5 mins ago', read: false },
    { id: 2, message: 'Interview scheduled with Rahul S.', time: '1 hour ago', read: false },
    { id: 3, message: '3 candidates shortlisted by your team', time: '2 hours ago', read: true },
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
          <Link to="/hiring/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <span className="text-lg font-bold text-white">Credense</span>
                <p className="text-xs text-gray-400">Hiring Portal</p>
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
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
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
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
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
                          ? 'bg-orange-500/20 text-orange-400'
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
                <Building2 className="w-5 h-5 text-orange-400" />
                <span className="text-white font-medium">TechCorp Inc.</span>
                <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs">Enterprise</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  className="w-64 bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
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
                    <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 rounded-full text-[10px] text-white flex items-center justify-center">
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
                              !notif.read ? 'bg-orange-500/5' : ''
                            }`}
                          >
                            <p className="text-sm text-white">{notif.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 text-center">
                        <button className="text-sm text-orange-400 hover:underline">
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
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-medium text-sm">
                    R
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
                        <p className="text-sm font-medium text-white">Recruiter</p>
                        <p className="text-xs text-gray-400">hr@techcorp.com</p>
                      </div>
                      <div className="p-2">
                        <Link
                          to="/hiring/settings"
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
