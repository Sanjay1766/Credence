// ============================================
// CREDENCE - Institution Dashboard
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  Award, 
  GraduationCap,
  CheckCircle2,
  Search,
  Filter,
  Download,
  Eye,
  ArrowUpRight,
  Zap
} from 'lucide-react';

// Mock data for demonstration
const institutionStats = {
  totalStudents: 2847,
  activeStudents: 2156,
  verifiedSkills: 15420,
  avgCredenseScore: 72,
  placementRate: 89,
  topCompanies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple']
};

const departmentData = [
  { name: 'Computer Science', students: 856, avgScore: 78, placed: 92 },
  { name: 'Information Technology', students: 642, avgScore: 74, placed: 88 },
  { name: 'Electronics & Comm.', students: 524, avgScore: 71, placed: 85 },
  { name: 'Mechanical Engineering', students: 438, avgScore: 68, placed: 82 },
  { name: 'Data Science', students: 387, avgScore: 81, placed: 94 },
];

const recentActivity = [
  { id: 1, student: 'Rahul Sharma', action: 'Verified React Advanced', time: '2 mins ago' },
  { id: 2, student: 'Priya Patel', action: 'Completed 100 LeetCode problems', time: '15 mins ago' },
  { id: 3, student: 'Amit Kumar', action: 'Connected GitHub with 50+ repos', time: '1 hour ago' },
  { id: 4, student: 'Sneha Reddy', action: 'Achieved Expert Badge in Python', time: '2 hours ago' },
  { id: 5, student: 'Vikram Singh', action: 'Profile viewed by Amazon', time: '3 hours ago' },
];

const topPerformers = [
  { name: 'Sneha Reddy', department: 'CSE', score: 94, skills: 28, rank: 1 },
  { name: 'Rahul Sharma', department: 'IT', score: 91, skills: 25, rank: 2 },
  { name: 'Priya Patel', department: 'DS', score: 89, skills: 24, rank: 3 },
  { name: 'Amit Kumar', department: 'CSE', score: 87, skills: 22, rank: 4 },
  { name: 'Vikram Singh', department: 'ECE', score: 85, skills: 21, rank: 5 },
];

export default function InstitutionDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Overview of your institution's performance</p>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-xs text-green-400 font-medium">+12%</span>
          </div>
          <p className="text-2xl font-bold text-white">{institutionStats.totalStudents.toLocaleString()}</p>
          <p className="text-sm text-gray-400">Total Students</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-xs text-green-400 font-medium">+8%</span>
          </div>
          <p className="text-2xl font-bold text-white">{institutionStats.activeStudents.toLocaleString()}</p>
          <p className="text-sm text-gray-400">Active on Credense</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-xs text-green-400 font-medium">+24%</span>
          </div>
          <p className="text-2xl font-bold text-white">{institutionStats.verifiedSkills.toLocaleString()}</p>
          <p className="text-sm text-gray-400">Verified Skills</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{institutionStats.avgCredenseScore}</p>
          <p className="text-sm text-gray-400">Avg. Credense Score</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-xs text-green-400 font-medium">+5%</span>
          </div>
          <p className="text-2xl font-bold text-white">{institutionStats.placementRate}%</p>
          <p className="text-sm text-gray-400">Placement Rate</p>
        </motion.div>
      </div>

      {/* Department & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Department Performance</h2>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-sm text-white"
            >
              <option value="all">All Departments</option>
              <option value="cse">Computer Science</option>
              <option value="it">Information Technology</option>
              <option value="ece">Electronics</option>
            </select>
          </div>
          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-32 text-sm text-gray-400 truncate">{dept.name}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-2 bg-dark-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${dept.avgScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-white w-12">{dept.avgScore}%</span>
                  </div>
                </div>
                <div className="text-sm text-gray-400 w-24 text-right">
                  {dept.students} students
                </div>
                <div className="text-sm text-green-400 w-16 text-right">
                  {dept.placed}% placed
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">{activity.student}</p>
                  <p className="text-xs text-gray-400 truncate">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sm text-accent-primary hover:underline">
            View All Activity
          </button>
        </motion.div>
      </div>

      {/* Search & Top Performers Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Search Students</h2>
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, ID, or skill..."
                className="input pl-12"
              />
            </div>
            <button className="btn-secondary flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
          <div className="text-center py-8 text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Enter a search query to find students</p>
          </div>
        </motion.div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Top Performers</h2>
            <button className="text-sm text-accent-primary hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {topPerformers.map((student) => (
              <div 
                key={student.rank}
                className="flex items-center gap-4 p-3 rounded-xl bg-dark-700/50 hover:bg-dark-700 transition-colors"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  student.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                  student.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                  student.rank === 3 ? 'bg-orange-500/20 text-orange-400' :
                  'bg-dark-600 text-gray-400'
                }`}>
                  {student.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{student.name}</p>
                  <p className="text-xs text-gray-400">{student.department}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{student.score}</p>
                  <p className="text-xs text-gray-400">{student.skills} skills</p>
                </div>
                <button className="p-2 hover:bg-dark-600 rounded-lg transition-colors">
                  <Eye className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Hiring Partners */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-white mb-4">Top Hiring Partners</h2>
        <div className="flex flex-wrap gap-3">
          {institutionStats.topCompanies.map((company, index) => (
            <div 
              key={index}
              className="px-4 py-2 rounded-xl bg-dark-700/50 border border-dark-600 text-white text-sm font-medium"
            >
              {company}
            </div>
          ))}
          <button className="px-4 py-2 rounded-xl border border-dashed border-dark-500 text-gray-400 text-sm hover:border-accent-primary hover:text-accent-primary transition-colors">
            + View All Partners
          </button>
        </div>
      </motion.div>
    </div>
  );
}
