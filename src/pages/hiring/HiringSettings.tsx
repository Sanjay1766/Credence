// ============================================
// CREDENCE - Hiring Settings Page
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Building2,
  Users,
  Bell,
  Link,
  Shield,
  Palette,
  Mail,
  Save,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Eye,
  EyeOff,
  Globe,
  Briefcase
} from 'lucide-react';

const settingsSections = [
  { id: 'company', label: 'Company Profile', icon: Building2 },
  { id: 'team', label: 'Team Members', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'integrations', label: 'Integrations', icon: Link },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'branding', label: 'Branding', icon: Palette },
];

const teamMembers = [
  { id: 1, name: 'Priya Mehta', email: 'priya@techcorp.com', role: 'Admin', avatar: 'PM', status: 'active' },
  { id: 2, name: 'Arun Kumar', email: 'arun@techcorp.com', role: 'Recruiter', avatar: 'AK', status: 'active' },
  { id: 3, name: 'Sneha Rao', email: 'sneha@techcorp.com', role: 'Hiring Manager', avatar: 'SR', status: 'active' },
  { id: 4, name: 'Raj Patel', email: 'raj@techcorp.com', role: 'Recruiter', avatar: 'RP', status: 'pending' },
];

const integrations = [
  { id: 1, name: 'Google Meet', description: 'Video interviews', connected: true, icon: '🎥' },
  { id: 2, name: 'Slack', description: 'Team notifications', connected: true, icon: '💬' },
  { id: 3, name: 'LinkedIn', description: 'Job postings sync', connected: false, icon: '💼' },
  { id: 4, name: 'Zoom', description: 'Video interviews', connected: false, icon: '📹' },
  { id: 5, name: 'Microsoft Teams', description: 'Team collaboration', connected: false, icon: '👥' },
  { id: 6, name: 'Google Calendar', description: 'Interview scheduling', connected: true, icon: '📅' },
];

export default function HiringSettings() {
  const [activeSection, setActiveSection] = useState('company');
  const [saving, setSaving] = useState(false);

  // Company settings state
  const [companySettings, setCompanySettings] = useState({
    name: 'TechCorp Inc.',
    website: 'https://techcorp.com',
    industry: 'Technology',
    size: '500-1000',
    location: 'Bangalore, India',
    about: 'TechCorp is a leading technology company specializing in innovative software solutions.',
    logo: ''
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    newApplications: true,
    interviewReminders: true,
    candidateMessages: true,
    teamMentions: true,
    weeklyDigest: true,
    emailNotifications: true,
    pushNotifications: false,
    slackNotifications: true
  });

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    ipWhitelist: false,
    auditLogs: true
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Configure your hiring portal preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-2">
            {settingsSections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === section.id
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'text-gray-400 hover:text-white hover:bg-dark-700'
                }`}
              >
                <section.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Company Profile */}
          {activeSection === 'company' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-800 border border-dark-700 rounded-xl p-6 space-y-6"
            >
              <h2 className="text-lg font-semibold text-white">Company Profile</h2>
              
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-2xl font-bold">
                  TC
                </div>
                <div>
                  <button className="px-4 py-2 bg-dark-700 text-white hover:bg-dark-600 rounded-lg transition-colors">
                    Upload Logo
                  </button>
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={companySettings.name}
                    onChange={(e) => setCompanySettings({ ...companySettings, name: e.target.value })}
                    className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Website</label>
                  <input
                    type="url"
                    value={companySettings.website}
                    onChange={(e) => setCompanySettings({ ...companySettings, website: e.target.value })}
                    className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Industry</label>
                  <select
                    value={companySettings.industry}
                    onChange={(e) => setCompanySettings({ ...companySettings, industry: e.target.value })}
                    className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail">Retail</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Company Size</label>
                  <select
                    value={companySettings.size}
                    onChange={(e) => setCompanySettings({ ...companySettings, size: e.target.value })}
                    className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="1-50">1-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500-1000">500-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Location</label>
                <input
                  type="text"
                  value={companySettings.location}
                  onChange={(e) => setCompanySettings({ ...companySettings, location: e.target.value })}
                  className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">About Company</label>
                <textarea
                  value={companySettings.about}
                  onChange={(e) => setCompanySettings({ ...companySettings, about: e.target.value })}
                  rows={4}
                  className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl transition-colors"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </motion.div>
          )}

          {/* Team Members */}
          {activeSection === 'team' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-800 border border-dark-700 rounded-xl p-6 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Team Members</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors">
                  <Plus className="w-5 h-5" />
                  Invite Member
                </button>
              </div>

              <div className="space-y-4">
                {teamMembers.map(member => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 bg-dark-700 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-medium">
                        {member.avatar}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{member.name}</h4>
                        <p className="text-sm text-gray-400">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-dark-600 text-gray-300 text-sm rounded-lg">
                        {member.role}
                      </span>
                      {member.status === 'pending' && (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                          Pending
                        </span>
                      )}
                      <button className="p-2 text-gray-400 hover:text-white">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-800 border border-dark-700 rounded-xl p-6 space-y-6"
            >
              <h2 className="text-lg font-semibold text-white">Notification Preferences</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-4">Activity Notifications</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'newApplications', label: 'New Applications', description: 'Get notified when candidates apply' },
                      { key: 'interviewReminders', label: 'Interview Reminders', description: 'Reminders before scheduled interviews' },
                      { key: 'candidateMessages', label: 'Candidate Messages', description: 'When candidates send messages' },
                      { key: 'teamMentions', label: 'Team Mentions', description: 'When teammates mention you' },
                      { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Weekly summary of hiring activity' },
                    ].map(item => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-dark-700 rounded-xl">
                        <div>
                          <h4 className="text-white font-medium">{item.label}</h4>
                          <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                            onChange={(e) => setNotificationSettings({
                              ...notificationSettings,
                              [item.key]: e.target.checked
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-4">Channels</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'emailNotifications', label: 'Email', icon: Mail },
                      { key: 'pushNotifications', label: 'Push Notifications', icon: Bell },
                      { key: 'slackNotifications', label: 'Slack', icon: Globe },
                    ].map(item => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-dark-700 rounded-xl">
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-gray-400" />
                          <span className="text-white">{item.label}</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                            onChange={(e) => setNotificationSettings({
                              ...notificationSettings,
                              [item.key]: e.target.checked
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl transition-colors"
              >
                <Save className="w-5 h-5" />
                Save Preferences
              </button>
            </motion.div>
          )}

          {/* Integrations */}
          {activeSection === 'integrations' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-800 border border-dark-700 rounded-xl p-6 space-y-6"
            >
              <h2 className="text-lg font-semibold text-white">Integrations</h2>
              <p className="text-gray-400">Connect with your favorite tools</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map(integration => (
                  <div
                    key={integration.id}
                    className="flex items-center justify-between p-4 bg-dark-700 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-dark-600 flex items-center justify-center text-2xl">
                        {integration.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{integration.name}</h4>
                        <p className="text-sm text-gray-400">{integration.description}</p>
                      </div>
                    </div>
                    <button
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        integration.connected
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-dark-600 text-gray-400 hover:text-white'
                      }`}
                    >
                      {integration.connected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Security */}
          {activeSection === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-800 border border-dark-700 rounded-xl p-6 space-y-6"
            >
              <h2 className="text-lg font-semibold text-white">Security Settings</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-dark-700 rounded-xl">
                  <div>
                    <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-400">Add an extra layer of security</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.twoFactorAuth}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        twoFactorAuth: e.target.checked
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>

                <div className="p-4 bg-dark-700 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-white font-medium">Session Timeout</h4>
                      <p className="text-sm text-gray-400">Auto logout after inactivity</p>
                    </div>
                  </div>
                  <select
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({
                      ...securitySettings,
                      sessionTimeout: e.target.value
                    })}
                    className="w-full bg-dark-600 border border-dark-500 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-dark-700 rounded-xl">
                  <div>
                    <h4 className="text-white font-medium">Audit Logs</h4>
                    <p className="text-sm text-gray-400">Track all account activities</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.auditLogs}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        auditLogs: e.target.checked
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl transition-colors"
              >
                <Save className="w-5 h-5" />
                Save Security Settings
              </button>
            </motion.div>
          )}

          {/* Branding */}
          {activeSection === 'branding' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-800 border border-dark-700 rounded-xl p-6 space-y-6"
            >
              <h2 className="text-lg font-semibold text-white">Branding</h2>
              <p className="text-gray-400">Customize your company's hiring page appearance</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Primary Color</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      defaultValue="#f97316"
                      className="w-12 h-12 rounded-lg border-none cursor-pointer"
                    />
                    <input
                      type="text"
                      defaultValue="#f97316"
                      className="flex-1 bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Career Page Banner</label>
                  <div className="border-2 border-dashed border-dark-600 rounded-xl p-8 text-center">
                    <Briefcase className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">Drag and drop or click to upload</p>
                    <p className="text-xs text-gray-500">Recommended: 1920x400px</p>
                    <button className="mt-4 px-4 py-2 bg-dark-700 text-white hover:bg-dark-600 rounded-lg transition-colors">
                      Upload Banner
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Career Page URL</label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">https://careers.credense.com/</span>
                    <input
                      type="text"
                      defaultValue="techcorp"
                      className="flex-1 bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl transition-colors"
              >
                <Save className="w-5 h-5" />
                Save Branding
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
