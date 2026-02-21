// ============================================
// CREDENCE - Institution Analytics Page
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  Code,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RePieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

// Mock data for charts
const monthlyEngagement = [
  { month: 'Jan', students: 1200, skills: 3200, projects: 450 },
  { month: 'Feb', students: 1350, skills: 3800, projects: 520 },
  { month: 'Mar', students: 1500, skills: 4500, projects: 680 },
  { month: 'Apr', students: 1680, skills: 5200, projects: 750 },
  { month: 'May', students: 1820, skills: 5800, projects: 890 },
  { month: 'Jun', students: 2000, skills: 6500, projects: 1020 },
  { month: 'Jul', students: 2150, skills: 7200, projects: 1150 },
  { month: 'Aug', students: 2300, skills: 8000, projects: 1280 },
];

const departmentDistribution = [
  { name: 'Computer Science', value: 35, color: '#8b5cf6' },
  { name: 'Information Technology', value: 25, color: '#ec4899' },
  { name: 'Data Science', value: 18, color: '#06b6d4' },
  { name: 'Electronics', value: 12, color: '#f59e0b' },
  { name: 'Mechanical', value: 10, color: '#10b981' },
];

const skillTrends = [
  { skill: 'React', count: 856, growth: 24 },
  { skill: 'Python', count: 742, growth: 18 },
  { skill: 'JavaScript', count: 698, growth: 12 },
  { skill: 'Java', count: 524, growth: 8 },
  { skill: 'Node.js', count: 486, growth: 15 },
  { skill: 'Machine Learning', count: 412, growth: 32 },
  { skill: 'AWS', count: 356, growth: 28 },
  { skill: 'Docker', count: 298, growth: 22 },
];

const placementTrends = [
  { month: 'Jan', placed: 45, offers: 62 },
  { month: 'Feb', placed: 58, offers: 78 },
  { month: 'Mar', placed: 72, offers: 95 },
  { month: 'Apr', placed: 88, offers: 112 },
  { month: 'May', placed: 105, offers: 138 },
  { month: 'Jun', placed: 125, offers: 165 },
];

const yearWiseDistribution = [
  { year: '1st Year', active: 420, inactive: 80 },
  { year: '2nd Year', active: 580, inactive: 120 },
  { year: '3rd Year', active: 750, inactive: 150 },
  { year: '4th Year', active: 680, inactive: 220 },
];

export default function InstitutionAnalytics() {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const stats = [
    { label: 'Active Students', value: '2,847', change: '+12%', positive: true, icon: Users },
    { label: 'Skills Verified', value: '15,420', change: '+24%', positive: true, icon: Award },
    { label: 'Avg. Credense Score', value: '72', change: '+5%', positive: true, icon: Activity },
    { label: 'GitHub Connections', value: '2,156', change: '+18%', positive: true, icon: Code },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400">Track student progress and institutional performance</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-sm text-white"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-purple-400" />
                </div>
                <span className={`flex items-center gap-1 text-sm font-medium ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Student Engagement</h2>
              <p className="text-sm text-gray-400">Monthly active students and skill verifications</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                Students
              </span>
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-500" />
                Skills
              </span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyEngagement}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSkills" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="students" stroke="#8b5cf6" fill="url(#colorStudents)" />
                <Area type="monotone" dataKey="skills" stroke="#ec4899" fill="url(#colorSkills)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Department Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Department Distribution</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={departmentDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  dataKey="value"
                  stroke="none"
                >
                  {departmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {departmentDistribution.map((dept) => (
              <div key={dept.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                  <span className="text-gray-400">{dept.name}</span>
                </span>
                <span className="text-white font-medium">{dept.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Skills & Placement Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Top Skills</h2>
            <button className="text-sm text-purple-400 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {skillTrends.slice(0, 6).map((skill, index) => (
              <div key={skill.skill} className="flex items-center gap-4">
                <span className="w-6 text-sm text-gray-500">{index + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white">{skill.skill}</span>
                    <span className="text-sm text-gray-400">{skill.count} students</span>
                  </div>
                  <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(skill.count / 856) * 100}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                  </div>
                </div>
                <span className="text-sm text-green-400 font-medium">+{skill.growth}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Placement Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Placement Trends</h2>
              <p className="text-sm text-gray-400">Students placed vs offers received</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={placementTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="placed" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
                <Line type="monotone" dataKey="offers" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Year-wise Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Year-wise Student Distribution</h2>
            <p className="text-sm text-gray-400">Active vs inactive students by academic year</p>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearWiseDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="active" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="inactive" fill="#6b7280" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
