// ============================================
// CREDENCE - Hiring Reports Page
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Users,
  Briefcase,
  Clock,
  Filter,
  RefreshCw,
  ChevronDown,
  BarChart2,
  PieChart,
  LineChart,
  Table,
  Mail,
  Share2
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const hiringFunnelData = [
  { stage: 'Applications', count: 450, percentage: 100 },
  { stage: 'Screened', count: 280, percentage: 62 },
  { stage: 'Interviews', count: 120, percentage: 27 },
  { stage: 'Offers', count: 35, percentage: 8 },
  { stage: 'Hired', count: 28, percentage: 6 },
];

const timeToHireData = [
  { month: 'Aug', days: 32 },
  { month: 'Sep', days: 28 },
  { month: 'Oct', days: 25 },
  { month: 'Nov', days: 22 },
  { month: 'Dec', days: 20 },
  { month: 'Jan', days: 18 },
];

const sourceData = [
  { name: 'Credense', value: 45, color: '#f97316' },
  { name: 'LinkedIn', value: 25, color: '#0ea5e9' },
  { name: 'Referrals', value: 18, color: '#22c55e' },
  { name: 'Job Boards', value: 12, color: '#a855f7' },
];

const departmentHiringData = [
  { department: 'Engineering', openings: 15, hired: 8, pending: 7 },
  { department: 'Product', openings: 5, hired: 3, pending: 2 },
  { department: 'Design', openings: 4, hired: 2, pending: 2 },
  { department: 'Sales', openings: 8, hired: 6, pending: 2 },
  { department: 'Marketing', openings: 3, hired: 2, pending: 1 },
];

const reportTemplates = [
  { id: 1, name: 'Weekly Hiring Summary', description: 'Overview of hiring activity for the week', icon: Calendar },
  { id: 2, name: 'Pipeline Analysis', description: 'Detailed funnel conversion metrics', icon: TrendingUp },
  { id: 3, name: 'Source Effectiveness', description: 'ROI analysis by recruitment source', icon: PieChart },
  { id: 4, name: 'Time to Hire Report', description: 'Average hiring duration by role', icon: Clock },
  { id: 5, name: 'Offer Acceptance Rate', description: 'Offer to acceptance conversion', icon: FileText },
  { id: 6, name: 'Diversity Report', description: 'Hiring diversity metrics', icon: Users },
];

export default function HiringReports() {
  const [dateRange, setDateRange] = useState('30days');
  const [activeTab, setActiveTab] = useState<'overview' | 'templates' | 'scheduled'>('overview');
  const [generating, setGenerating] = useState(false);

  const handleGenerateReport = (templateId: number) => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      // In a real app, this would trigger a download
    }, 2000);
  };

  const metrics = [
    { label: 'Total Applications', value: '450', change: '+12%', positive: true, icon: Users },
    { label: 'Positions Filled', value: '28', change: '+8%', positive: true, icon: Briefcase },
    { label: 'Avg. Time to Hire', value: '18 days', change: '-15%', positive: true, icon: Clock },
    { label: 'Offer Acceptance', value: '80%', change: '+5%', positive: true, icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
          <p className="text-gray-400 mt-1">Insights into your hiring performance</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-dark-800 border border-dark-600 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-orange-500"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="year">This year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-dark-700">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'templates', label: 'Report Templates' },
          { id: 'scheduled', label: 'Scheduled Reports' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'overview' | 'templates' | 'scheduled')}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-orange-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
              />
            )}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-dark-800 border border-dark-700 rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <metric.icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500">{metric.label}</p>
                      <span className={`text-xs ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hiring Funnel */}
            <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Hiring Funnel</h3>
              <div className="space-y-4">
                {hiringFunnelData.map((stage, index) => (
                  <div key={stage.stage}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">{stage.stage}</span>
                      <span className="text-sm font-medium text-white">{stage.count}</span>
                    </div>
                    <div className="h-3 bg-dark-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stage.percentage}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Source Distribution */}
            <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Candidate Sources</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {sourceData.map(source => (
                  <div key={source.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                    <span className="text-sm text-gray-400">{source.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Time to Hire Trend */}
            <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Time to Hire Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeToHireData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="days"
                      stroke="#f97316"
                      fill="url(#colorGradient)"
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Department Hiring */}
            <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Hiring by Department</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentHiringData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                    <YAxis dataKey="department" type="category" stroke="#9ca3af" fontSize={12} width={80} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="hired" name="Hired" fill="#22c55e" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="pending" name="Pending" fill="#f97316" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-dark-800 border border-dark-700 rounded-xl p-6 hover:border-orange-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4">
                <template.icon className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{template.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{template.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleGenerateReport(template.id)}
                  disabled={generating}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-lg transition-colors"
                >
                  {generating ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  Generate
                </button>
                <button className="p-2 bg-dark-700 text-gray-400 hover:text-white rounded-lg transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'scheduled' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-400">Configure automatic report delivery</p>
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors">
              <Calendar className="w-5 h-5" />
              Schedule New
            </button>
          </div>

          <div className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Report</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Frequency</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Recipients</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Next Run</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-dark-700">
                  <td className="px-6 py-4 text-white">Weekly Hiring Summary</td>
                  <td className="px-6 py-4 text-gray-400">Every Monday</td>
                  <td className="px-6 py-4 text-gray-400">hr@techcorp.com</td>
                  <td className="px-6 py-4 text-gray-400">Jan 22, 2024</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Active</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-dark-700">
                  <td className="px-6 py-4 text-white">Pipeline Analysis</td>
                  <td className="px-6 py-4 text-gray-400">Monthly</td>
                  <td className="px-6 py-4 text-gray-400">leadership@techcorp.com</td>
                  <td className="px-6 py-4 text-gray-400">Feb 1, 2024</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Active</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
