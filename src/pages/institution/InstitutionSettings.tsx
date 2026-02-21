// ============================================
// CREDENCE - Institution Settings Page
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Building2,
  Users,
  Bell,
  Shield,
  Mail,
  Globe,
  Palette,
  Save,
  Upload,
  Key,
  Link,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export default function InstitutionSettings() {
  const [activeSection, setActiveSection] = useState('general');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Form states
  const [generalSettings, setGeneralSettings] = useState({
    institutionName: 'Tech University',
    shortName: 'TU',
    email: 'admin@techuniv.edu',
    phone: '+91 98765 43210',
    website: 'https://techuniv.edu',
    address: '123 Education Street, Tech City',
    description: 'A leading institution for technology education'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newStudentAlert: true,
    placementUpdates: true,
    weeklyDigest: true,
    skillMilestones: false,
    companyRequests: true
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    githubOAuth: true,
    leetcodeApi: true,
    linkedinIntegration: false,
    slackWebhook: ''
  });

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const sections = [
    { id: 'general', label: 'General', icon: Building2 },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Link },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'branding', label: 'Branding', icon: Palette },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">Manage your institution's preferences and configuration</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary flex items-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : saved ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="card p-4">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'text-gray-400 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeSection === 'general' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Institution Details</h2>
                
                {/* Logo Upload */}
                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-dark-700">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <Building2 className="w-10 h-10 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white mb-2">Institution Logo</h3>
                    <button className="btn-secondary text-sm flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload New Logo
                    </button>
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Institution Name</label>
                    <input
                      type="text"
                      value={generalSettings.institutionName}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, institutionName: e.target.value })}
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Short Name / Abbreviation</label>
                    <input
                      type="text"
                      value={generalSettings.shortName}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, shortName: e.target.value })}
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Admin Email</label>
                    <input
                      type="email"
                      value={generalSettings.email}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Phone Number</label>
                    <input
                      type="tel"
                      value={generalSettings.phone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                      className="input w-full"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-400 mb-2 block">Website</label>
                    <input
                      type="url"
                      value={generalSettings.website}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, website: e.target.value })}
                      className="input w-full"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-400 mb-2 block">Address</label>
                    <input
                      type="text"
                      value={generalSettings.address}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                      className="input w-full"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-400 mb-2 block">Description</label>
                    <textarea
                      value={generalSettings.description}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, description: e.target.value })}
                      className="input w-full h-24 resize-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'team' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Team Members</h2>
                <button className="btn-primary text-sm">Invite Member</button>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: 'Admin User', email: 'admin@techuniv.edu', role: 'Super Admin', status: 'active' },
                  { name: 'Placement Officer', email: 'placements@techuniv.edu', role: 'Placement Manager', status: 'active' },
                  { name: 'HOD - CSE', email: 'cse.hod@techuniv.edu', role: 'Department Admin', status: 'active' },
                  { name: 'Training Coordinator', email: 'training@techuniv.edu', role: 'Viewer', status: 'pending' },
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-dark-700/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 font-medium">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{member.name}</p>
                        <p className="text-xs text-gray-400">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 rounded-full bg-dark-600 text-xs text-gray-300">{member.role}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        member.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {member.status}
                      </span>
                      <button className="text-gray-400 hover:text-white">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-6">Notification Preferences</h2>
              
              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive email notifications for important updates' },
                  { key: 'newStudentAlert', label: 'New Student Alerts', description: 'Get notified when new students join the platform' },
                  { key: 'placementUpdates', label: 'Placement Updates', description: 'Notifications about placement drives and offers' },
                  { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Receive a weekly summary of platform activity' },
                  { key: 'skillMilestones', label: 'Skill Milestones', description: 'Alerts when students achieve skill milestones' },
                  { key: 'companyRequests', label: 'Company Requests', description: 'Notifications when companies request student profiles' },
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-4 rounded-xl bg-dark-700/50">
                    <div>
                      <p className="text-sm font-medium text-white">{setting.label}</p>
                      <p className="text-xs text-gray-400">{setting.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          [setting.key]: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'integrations' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Platform Integrations</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-dark-700/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-dark-600 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">GitHub OAuth</p>
                        <p className="text-xs text-gray-400">Allow students to connect their GitHub accounts</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">Connected</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-dark-700/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                        <span className="text-yellow-400 font-bold">LC</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">LeetCode API</p>
                        <p className="text-xs text-gray-400">Verify student LeetCode progress</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">Connected</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-dark-700/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-400 font-bold">in</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">LinkedIn Integration</p>
                        <p className="text-xs text-gray-400">Connect with LinkedIn for profile enhancement</p>
                      </div>
                    </div>
                    <button className="btn-secondary text-sm">Connect</button>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Webhook Configuration</h3>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Slack Webhook URL</label>
                  <input
                    type="url"
                    value={integrationSettings.slackWebhook}
                    onChange={(e) => setIntegrationSettings({ ...integrationSettings, slackWebhook: e.target.value })}
                    placeholder="https://hooks.slack.com/services/..."
                    className="input w-full"
                  />
                  <p className="text-xs text-gray-500 mt-2">Receive notifications in your Slack channel</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-dark-700/50">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-400">Add an extra layer of security to admin accounts</p>
                      </div>
                      <button className="btn-secondary text-sm">Enable 2FA</button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-dark-700/50">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium text-white">API Keys</p>
                        <p className="text-xs text-gray-400">Manage API access keys for integrations</p>
                      </div>
                      <button className="btn-secondary text-sm flex items-center gap-2">
                        <Key className="w-4 h-4" />
                        Generate New Key
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-400">Danger Zone</p>
                        <p className="text-xs text-gray-400 mb-4">These actions are irreversible. Please proceed with caution.</p>
                        <button className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors">
                          Delete Institution Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'branding' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-6">Branding & Customization</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Primary Color</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      defaultValue="#8b5cf6"
                      className="w-12 h-12 rounded-lg border border-dark-600 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      defaultValue="#8b5cf6"
                      className="input w-32"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Custom Domain</label>
                  <input
                    type="text"
                    placeholder="credense.techuniv.edu"
                    className="input w-full"
                  />
                  <p className="text-xs text-gray-500 mt-2">Set up a custom domain for your institution's portal</p>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Footer Text</label>
                  <input
                    type="text"
                    defaultValue="© 2026 Tech University. All rights reserved."
                    className="input w-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
