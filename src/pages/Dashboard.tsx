// ============================================
// CREDENCE - Dashboard Page
// Main Overview & Metrics
// ============================================

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import {
  GitBranch,
  Code2,
  FolderGit2,
  Brain,
  Zap,
  CheckCircle2,
  Target,
  Activity,
  ChevronRight,
  Sparkles,
  Download,
  Trophy,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import SkillDNA from '../components/SkillDNA';
import AchievementBadges from '../components/AchievementBadges';
import InterviewReadiness from '../components/InterviewReadiness';

export default function Dashboard() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  // Sample growth data
  const growthData = [
    { month: 'Jan', score: 45 },
    { month: 'Feb', score: 52 },
    { month: 'Mar', score: 48 },
    { month: 'Apr', score: 61 },
    { month: 'May', score: 55 },
    { month: 'Jun', score: 67 },
    { month: 'Jul', score: 72 },
    { month: 'Aug', score: 78 },
  ];

  // Quick actions
  const quickActions = [
    { icon: GitBranch, label: 'Connect GitHub', path: '/github', color: 'from-blue-500 to-cyan-500' },
    { icon: Code2, label: 'Link LeetCode', path: '/leetcode', color: 'from-orange-500 to-yellow-500' },
    { icon: FolderGit2, label: 'Add Project', path: '/projects', color: 'from-purple-500 to-pink-500' },
    { icon: Brain, label: 'View Skills', path: '/skills', color: 'from-green-500 to-emerald-500' },
  ];

  // Sample skills for SkillDNA
  const sampleSkills = [
    { name: 'React', score: 85 },
    { name: 'TypeScript', score: 78 },
    { name: 'Python', score: 72 },
    { name: 'Data Structures', score: 80 },
    { name: 'System Design', score: 58 },
    { name: 'Problem Solving', score: 82 },
  ];

  // Set LLM connected for analysis (background, no UI)
  useEffect(() => {
    dispatch({ type: 'SET_LLM_CONNECTED', payload: true });
  }, [dispatch]);

  // Profile completion items
  const profileChecklist = [
    { label: 'Academic information', complete: !!state.academicData },
    { label: 'GitHub connected', complete: !!state.githubProfile },
    { label: 'LeetCode linked', complete: !!state.leetCodeStats },
    { label: 'First project analyzed', complete: state.projects.length > 0 },
  ];

  const profileStrength = Math.round(
    (profileChecklist.filter((item) => item.complete).length / profileChecklist.length) * 100
  );

  return (
    <div className="animate-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {state.user?.fullName?.split(' ')[0] || 'Student'}
          </h1>
          <p className="text-gray-400">
            Track your skill growth and build your proof graph
          </p>
        </div>

        {/* Download Skill Graph Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => navigate('/skills')}
          className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-medium hover:shadow-glow transition-all"
        >
          <Download className="w-5 h-5" />
          <span>Download Skill Graph</span>
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Overall Score', value: state.overallScore || 72, icon: Target, suffix: '/100', trend: '+5' },
          { label: 'Projects Analyzed', value: state.projects.length || 8, icon: FolderGit2, trend: '+2' },
          { label: 'Skills Verified', value: state.skills.length || 24, icon: CheckCircle2, trend: '+3' },
          { label: 'LeetCode Streak', value: state.leetCodeStats?.currentStreak || 15, icon: Zap, suffix: ' days' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-accent-primary" />
              </div>
              {stat.trend && (
                <span className="text-xs px-2 py-1 rounded-full bg-accent-success/20 text-accent-success">
                  {stat.trend}
                </span>
              )}
            </div>
            <p className="text-3xl font-bold text-white">
              {stat.value}
              {stat.suffix && <span className="text-lg text-gray-500">{stat.suffix}</span>}
            </p>
            <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-2 card"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Skill Growth Trajectory</h2>
              <p className="text-sm text-gray-400">Your progress over the last 8 months</p>
            </div>
            <select className="bg-dark-700 border border-dark-500 rounded-lg px-3 py-2 text-sm text-gray-300">
              <option>Last 8 months</option>
              <option>Last year</option>
              <option>All time</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a38" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#12121a',
                    border: '1px solid #2a2a38',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#colorScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Profile Strength */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Profile Strength</h2>
          
          {/* Progress Circle */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="#2a2a38"
                strokeWidth="12"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${profileStrength * 3.52} 352`}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{profileStrength}%</span>
            </div>
          </div>

          <div className="space-y-3">
            {profileChecklist.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  item.complete ? 'bg-accent-success/20' : 'bg-dark-600'
                }`}>
                  {item.complete ? (
                    <CheckCircle2 className="w-3 h-3 text-accent-success" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-gray-500" />
                  )}
                </div>
                <span className={`text-sm ${item.complete ? 'text-gray-300' : 'text-gray-500'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Skill DNA - Unique Visual Fingerprint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Your Skill DNA</h2>
          <p className="text-sm text-gray-400 mb-4">Unique visual fingerprint based on your skills</p>
          <div className="flex justify-center">
            <SkillDNA skills={sampleSkills} size={220} />
          </div>
        </motion.div>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <h2 className="text-lg font-semibold text-white">Achievements</h2>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="text-xs text-accent-primary hover:text-accent-secondary transition-colors"
            >
              View All →
            </button>
          </div>
          <AchievementBadges compact limit={8} />
          <div className="mt-4 p-3 rounded-lg bg-dark-700/50 border border-dark-600">
            <p className="text-xs text-gray-400">7 of 12 achievements unlocked</p>
            <div className="mt-2 h-1.5 bg-dark-600 rounded-full overflow-hidden">
              <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
            </div>
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-accent-primary" />
            <h2 className="text-lg font-semibold text-white">Insights</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-accent-primary mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300">
                    Your <span className="text-accent-primary font-medium">Problem Solving</span> skills 
                    show strong growth. Consider taking on more system design challenges.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-dark-700 border border-dark-500">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-accent-tertiary mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300">
                    Upload more projects to improve your <span className="text-white font-medium">Technical Depth</span> score.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-dark-700 border border-dark-500">
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-accent-success mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300">
                    Your LeetCode consistency is in the <span className="text-accent-success font-medium">top 20%</span> of users.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interview Readiness Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-8"
      >
        <InterviewReadiness />
      </motion.div>

      {/* Quick Actions Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-4 gap-4"
      >
        {quickActions.map((action) => (
          <button
            key={action.path}
            onClick={() => navigate(action.path)}
            className="flex items-center gap-4 p-4 rounded-xl bg-dark-700 border border-dark-500 hover:border-accent-primary/50 transition-all group"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="flex-1 text-left text-white font-medium">{action.label}</span>
            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
          </button>
        ))}
      </motion.div>
    </div>
  );
}
