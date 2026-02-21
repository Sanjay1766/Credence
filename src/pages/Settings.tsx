// ============================================
// CREDENCE - Settings Page
// Application Configuration
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings2,
  User,
  Bell,
  Palette,
  Shield,
  ChevronRight,
  Check,
  Moon,
  Sun,
  Monitor,
  Download,
  Trash2,
  LogOut,
  AlertTriangle,
  GraduationCap,
  Mail,
  Building,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SettingsPage() {
  const { state, dispatch } = useApp();
  const [activeSection, setActiveSection] = useState('account');

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    streakReminders: true,
    weeklyDigest: true,
    newFeatures: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    publicProfile: true,
    showEmail: false,
    showGitHub: true,
    showLeetCode: true,
    showProjects: true,
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'dark' as 'dark' | 'light' | 'system',
    accentColor: 'indigo' as string,
    compactMode: false,
  });

  const sections = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'export', label: 'Data Export', icon: Download },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
  ];

  const accentColors = [
    { id: 'indigo', bg: 'bg-indigo-500', name: 'Indigo' },
    { id: 'purple', bg: 'bg-purple-500', name: 'Purple' },
    { id: 'cyan', bg: 'bg-cyan-500', name: 'Cyan' },
    { id: 'emerald', bg: 'bg-emerald-500', name: 'Emerald' },
    { id: 'rose', bg: 'bg-rose-500', name: 'Rose' },
    { id: 'orange', bg: 'bg-orange-500', name: 'Orange' },
  ];

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Configure your Credence experience</p>
      </motion.div>

      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-3"
        >
          <div className="card p-2 space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === section.id
                    ? 'bg-accent-primary text-white'
                    : 'text-gray-400 hover:text-white hover:bg-dark-700'
                } ${section.id === 'danger' ? 'text-red-400 hover:text-red-300' : ''}`}
              >
                <section.icon className={`w-5 h-5 ${section.id === 'danger' && activeSection !== 'danger' ? 'text-red-400' : ''}`} />
                <span className="font-medium">{section.label}</span>
                <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${activeSection === section.id ? 'rotate-90' : ''}`} />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Settings Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-9"
        >
          {/* Account Settings */}
          {activeSection === 'account' && (
            <div className="space-y-6">
              <div className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-accent-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Account Information</h3>
                    <p className="text-sm text-gray-400">Manage your personal details</p>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-dark-700 border border-dark-500">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-2xl font-bold text-white">
                        {state.user?.fullName?.charAt(0) || 'S'}
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-white">{state.user?.fullName || 'Student Name'}</p>
                        <p className="text-sm text-gray-400">{state.user?.email || 'student@university.edu'}</p>
                      </div>
                      <button className="btn-secondary">Edit Profile</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-dark-700 border border-dark-500">
                      <div className="flex items-center gap-3 mb-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">University</span>
                      </div>
                      <p className="font-medium text-white">{state.user?.university || 'University Name'}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-dark-700 border border-dark-500">
                      <div className="flex items-center gap-3 mb-2">
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Graduation Year</span>
                      </div>
                      <p className="font-medium text-white">{state.user?.graduationYear || '2027'}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-dark-700 border border-dark-500">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Email Address</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-white">{state.user?.email || 'student@university.edu'}</p>
                      <span className="px-2 py-1 rounded-full text-xs bg-accent-success/20 text-accent-success">Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Academic Details</h3>
                    <p className="text-sm text-gray-400">Your academic progress information</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-dark-700 border border-dark-500 text-center">
                    <p className="text-3xl font-bold text-white mb-1">{state.academicData?.cgpa || '8.5'}</p>
                    <p className="text-sm text-gray-400">Current CGPA</p>
                  </div>
                  <div className="p-4 rounded-xl bg-dark-700 border border-dark-500 text-center">
                    <p className="text-3xl font-bold text-white mb-1">{state.user?.currentYear || '3'}rd</p>
                    <p className="text-sm text-gray-400">Year of Study</p>
                  </div>
                  <div className="p-4 rounded-xl bg-dark-700 border border-dark-500 text-center">
                    <p className="text-3xl font-bold text-white mb-1">{state.academicData?.totalCredits || '120'}</p>
                    <p className="text-sm text-gray-400">Credits Earned</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeSection === 'notifications' && (
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Notifications</h3>
                  <p className="text-sm text-gray-400">Manage your notification preferences</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive important updates via email' },
                  { key: 'streakReminders', label: 'Streak Reminders', desc: 'Get reminded to maintain your LeetCode streak' },
                  { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Receive a weekly summary of your progress' },
                  { key: 'newFeatures', label: 'Feature Announcements', desc: 'Be notified about new Credence features' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-dark-700 border border-dark-500">
                    <div>
                      <p className="font-medium text-white">{item.label}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotificationSettings({
                        ...notificationSettings,
                        [item.key]: !notificationSettings[item.key as keyof typeof notificationSettings]
                      })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notificationSettings[item.key as keyof typeof notificationSettings] ? 'bg-accent-primary' : 'bg-dark-500'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        notificationSettings[item.key as keyof typeof notificationSettings] ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Privacy Settings */}
          {activeSection === 'privacy' && (
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-success/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-accent-success" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Privacy & Visibility</h3>
                  <p className="text-sm text-gray-400">Control what's visible on your public profile</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'publicProfile', label: 'Public Profile', desc: 'Allow recruiters to view your profile' },
                  { key: 'showEmail', label: 'Show Email', desc: 'Display your email on public profile' },
                  { key: 'showGitHub', label: 'Show GitHub', desc: 'Display GitHub stats and repositories' },
                  { key: 'showLeetCode', label: 'Show LeetCode', desc: 'Display LeetCode statistics' },
                  { key: 'showProjects', label: 'Show Projects', desc: 'Display analyzed projects and scores' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-dark-700 border border-dark-500">
                    <div>
                      <p className="font-medium text-white">{item.label}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setPrivacySettings({
                        ...privacySettings,
                        [item.key]: !privacySettings[item.key as keyof typeof privacySettings]
                      })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        privacySettings[item.key as keyof typeof privacySettings] ? 'bg-accent-primary' : 'bg-dark-500'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        privacySettings[item.key as keyof typeof privacySettings] ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeSection === 'appearance' && (
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Appearance</h3>
                  <p className="text-sm text-gray-400">Customize how Credence looks</p>
                </div>
              </div>

              {/* Theme Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'dark', label: 'Dark', icon: Moon },
                    { id: 'light', label: 'Light', icon: Sun },
                    { id: 'system', label: 'System', icon: Monitor },
                  ].map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setAppearanceSettings({ ...appearanceSettings, theme: theme.id as typeof appearanceSettings.theme })}
                      className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                        appearanceSettings.theme === theme.id
                          ? 'border-accent-primary bg-accent-primary/10'
                          : 'border-dark-500 bg-dark-700 hover:border-dark-400'
                      }`}
                    >
                      <theme.icon className={`w-5 h-5 ${appearanceSettings.theme === theme.id ? 'text-accent-primary' : 'text-gray-400'}`} />
                      <span className={appearanceSettings.theme === theme.id ? 'text-white' : 'text-gray-400'}>{theme.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent Color */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">Accent Color</label>
                <div className="flex gap-3">
                  {accentColors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setAppearanceSettings({ ...appearanceSettings, accentColor: color.id })}
                      className={`w-10 h-10 rounded-lg ${color.bg} transition-all ${
                        appearanceSettings.accentColor === color.id
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-dark-800'
                          : 'hover:scale-110'
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Compact Mode */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-dark-700 border border-dark-500">
                <div>
                  <p className="font-medium text-white">Compact Mode</p>
                  <p className="text-sm text-gray-400">Use smaller spacing and font sizes</p>
                </div>
                <button
                  onClick={() => setAppearanceSettings({ ...appearanceSettings, compactMode: !appearanceSettings.compactMode })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    appearanceSettings.compactMode ? 'bg-accent-primary' : 'bg-dark-500'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    appearanceSettings.compactMode ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          )}

          {/* Data Export */}
          {activeSection === 'export' && (
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <Download className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Export Your Data</h3>
                  <p className="text-sm text-gray-400">Download your Credence data</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-dark-700 border border-dark-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Export Profile Data</p>
                      <p className="text-sm text-gray-400">Download all your profile information as JSON</p>
                    </div>
                    <button className="btn-secondary">
                      <Download className="w-4 h-4 mr-2" />
                      Export JSON
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-dark-700 border border-dark-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Export Public Profile as PDF</p>
                      <p className="text-sm text-gray-400">Generate a shareable PDF resume</p>
                    </div>
                    <button className="btn-secondary">
                      <Download className="w-4 h-4 mr-2" />
                      Export PDF
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-dark-700 border border-dark-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Export Analysis History</p>
                      <p className="text-sm text-gray-400">Download all project analyses and insights</p>
                    </div>
                    <button className="btn-secondary">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Danger Zone */}
          {activeSection === 'danger' && (
            <div className="space-y-6">
              <div className="card border-red-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Danger Zone</h3>
                    <p className="text-sm text-gray-400">Irreversible actions — proceed with caution</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Clear All Analysis Data</p>
                        <p className="text-sm text-gray-400">Remove all project analyses. Your account remains.</p>
                      </div>
                      <button className="px-4 py-2 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors">
                        <Trash2 className="w-4 h-4 mr-2 inline" />
                        Clear Data
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Delete Account</p>
                        <p className="text-sm text-gray-400">Permanently delete your account and all data. This cannot be undone.</p>
                      </div>
                      <button className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 transition-colors">
                        <Trash2 className="w-4 h-4 mr-2 inline" />
                        Delete Account
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Sign Out of All Devices</p>
                        <p className="text-sm text-gray-400">Log out from all browsers and devices.</p>
                      </div>
                      <button className="px-4 py-2 rounded-lg border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 transition-colors">
                        <LogOut className="w-4 h-4 mr-2 inline" />
                        Sign Out All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button className="btn-primary">
              <Check className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
