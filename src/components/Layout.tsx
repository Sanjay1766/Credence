// ============================================
// CREDENCE - Layout Component
// Main App Shell with Sidebar
// ============================================

import { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  FolderGit2, 
  GitBranch, 
  Code2, 
  User, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const { sidebarCollapsed, user, overallScore } = state;

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/projects', icon: FolderGit2, label: 'Projects' },
    { path: '/skills', icon: TrendingUp, label: 'Skill Graph' },
    { path: '/leetcode', icon: Code2, label: 'LeetCode' },
    { path: '/github', icon: GitBranch, label: 'GitHub' },
    { path: '/my-profile', icon: User, label: 'Profile' },
  ];

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-dark-900 bg-grid">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        className="fixed left-0 top-0 h-full bg-dark-800 border-r border-dark-600 z-50 flex flex-col"
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-dark-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary via-accent-secondary to-accent-tertiary flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold gradient-text"
              >
                Credence
              </motion.span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 text-white border border-accent-primary/30'
                        : 'text-gray-400 hover:text-white hover:bg-dark-600'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-dark-600">
          {/* Score Badge */}
          {!sidebarCollapsed && overallScore > 0 && (
            <div className="mb-4 p-3 rounded-xl bg-dark-700 border border-dark-500">
              <p className="text-xs text-gray-500 mb-1">Overall Score</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold gradient-text">{overallScore}</span>
                <span className="text-gray-500">/100</span>
              </div>
            </div>
          )}

          {/* User Info */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.fullName || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || 'user@email.com'}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <NavLink
              to="/settings"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-600 transition-colors"
            >
              <Settings className="w-4 h-4" />
              {!sidebarCollapsed && <span className="text-sm">Settings</span>}
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center px-3 py-2 rounded-lg text-gray-400 hover:text-accent-danger hover:bg-accent-danger/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
          className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-dark-600 border border-dark-400 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-primary transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-[280px]'
        }`}
      >
        <div className="min-h-screen p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
