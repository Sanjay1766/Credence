// ============================================
// CREDENCE - LeetCode Tracker Page
// Daily Problem Solving Monitoring
// ============================================

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import {
  Code2,
  Target,
  Flame,
  TrendingUp,
  Trophy,
  CheckCircle2,
  Link2,
  Zap,
  BarChart3,
  Loader2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import {
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Tooltip,
} from 'recharts';
import { fetchLeetCodeStats, fetchLeetCodeContestRating, LeetCodeStats } from '../services/leetcodeService';

export default function LeetCodeTracker() {
  const { dispatch } = useApp();
  const [username, setUsername] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leetcodeData, setLeetcodeData] = useState<LeetCodeStats | null>(null);
  const [contestRating, setContestRating] = useState<{ rating: number; globalRanking: number; attendedContests: number } | null>(null);

  const handleConnect = async () => {
    if (!username.trim()) {
      setError('Please enter a LeetCode username');
      return;
    }
    
    setIsConnecting(true);
    setError(null);
    
    try {
      const [stats, contest] = await Promise.all([
        fetchLeetCodeStats(username.trim()),
        fetchLeetCodeContestRating(username.trim())
      ]);
      setLeetcodeData(stats);
      setContestRating(contest);
      dispatch({ 
        type: 'SET_LEETCODE_STATS', 
        payload: { 
          username: stats.username,
          connected: true,
          totalSolved: stats.totalSolved,
          easySolved: stats.easySolved,
          mediumSolved: stats.mediumSolved,
          hardSolved: stats.hardSolved,
          currentStreak: 0,
          maxStreak: 0,
          consistencyIndex: stats.acceptanceRate,
          difficultyGrowth: Math.round((stats.hardSolved / stats.totalSolved) * 100),
          dailyActivity: [],
          topicCoverage: []
        } 
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch LeetCode data');
    } finally {
      setIsConnecting(false);
    }
  };

  const stats = leetcodeData;

  // Chart data based on real stats
  const difficultyData = stats ? [
    { name: 'Easy', value: stats.easySolved, color: '#10b981' },
    { name: 'Medium', value: stats.mediumSolved, color: '#f59e0b' },
    { name: 'Hard', value: stats.hardSolved, color: '#ef4444' },
  ] : [];

  return (
    <div className="animate-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">LeetCode Tracker</h1>
          <p className="text-gray-400">
            Monitor your problem-solving discipline and consistency
          </p>
        </div>
        {!stats && (
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConnect()}
              placeholder="LeetCode username"
              className="input w-48"
            />
            <button
              onClick={handleConnect}
              disabled={!username || isConnecting}
              className="btn-primary flex items-center gap-2"
            >
              {isConnecting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Link2 className="w-5 h-5" />
                  Connect
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {!stats ? (
        /* Connect State */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card text-center py-16"
        >
          <Code2 className="w-20 h-20 text-orange-500 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-3">Connect Your LeetCode</h3>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            Link your LeetCode account to track daily problem-solving consistency,
            difficulty growth, and topic coverage.
          </p>

          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            {[
              { icon: Flame, label: 'Streak Tracking', desc: 'Monitor your daily consistency' },
              { icon: TrendingUp, label: 'Difficulty Growth', desc: 'Track progression to harder problems' },
              { icon: Target, label: 'Topic Coverage', desc: 'See which topics you\'ve mastered' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-dark-700 border border-dark-500">
                <item.icon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <h4 className="font-semibold text-white">{item.label}</h4>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="inline-flex flex-col items-center gap-3 p-4 rounded-xl bg-dark-700 border border-dark-500">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleConnect()}
                placeholder="Enter your LeetCode username"
                className="input w-64"
              />
              <button
                onClick={handleConnect}
                disabled={!username || isConnecting}
                className="btn-primary flex items-center gap-2"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Fetching...
                  </>
                ) : (
                  'Connect Account'
                )}
              </button>
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        /* Connected State - Dashboard */
        <>
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{stats.username}</h2>
                  <p className="text-gray-400">Ranking #{stats.ranking.toLocaleString()}</p>
                </div>
              </div>
              <a
                href={`https://leetcode.com/u/${stats.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                View Profile
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Main Stats */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Solved', value: stats.totalSolved, icon: CheckCircle2, color: 'text-accent-primary' },
              { label: 'Easy', value: stats.easySolved, icon: Zap, color: 'text-green-500' },
              { label: 'Medium', value: stats.mediumSolved, icon: Target, color: 'text-yellow-500' },
              { label: 'Hard', value: stats.hardSolved, icon: Flame, color: 'text-red-500' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Contest Rating & Stats */}
          {contestRating && contestRating.rating > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card mb-8"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Contest Rating</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold text-white">{contestRating.rating}</p>
                  <p className="text-sm text-gray-400">Rating</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">#{contestRating.globalRanking.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Global Ranking</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{contestRating.attendedContests}</p>
                  <p className="text-sm text-gray-400">Contests Attended</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Difficulty Breakdown & Recent Submissions */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Difficulty Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Difficulty Distribution</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={difficultyData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={3}
                    >
                      {difficultyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#12121a',
                        border: '1px solid #2a2a38',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                {difficultyData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-400">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Submissions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Recent Submissions</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {stats.recentSubmissions.length > 0 ? (
                  stats.recentSubmissions.map((sub, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-dark-700">
                      <div className="flex-1 min-w-0">
                        <a
                          href={`https://leetcode.com/problems/${sub.titleSlug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-white hover:text-accent-primary truncate block"
                        >
                          {sub.title}
                        </a>
                        <p className="text-xs text-gray-500">{sub.lang}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        sub.statusDisplay === 'Accepted' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {sub.statusDisplay}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-4">No recent submissions</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Additional Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Performance Stats</h3>
                <p className="text-sm text-gray-400">Additional metrics from your LeetCode profile</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-dark-700 border border-dark-500">
                <Trophy className="w-6 h-6 text-yellow-500 mb-2" />
                <p className="text-2xl font-bold text-white">{stats.acceptanceRate}%</p>
                <p className="text-xs text-gray-500">Acceptance Rate</p>
              </div>
              <div className="p-4 rounded-xl bg-dark-700 border border-dark-500">
                <BarChart3 className="w-6 h-6 text-purple-500 mb-2" />
                <p className="text-2xl font-bold text-white">{stats.totalSubmissions.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Total Submissions</p>
              </div>
              <div className="p-4 rounded-xl bg-dark-700 border border-dark-500">
                <TrendingUp className="w-6 h-6 text-blue-500 mb-2" />
                <p className="text-2xl font-bold text-white">{stats.contributionPoints}</p>
                <p className="text-xs text-gray-500">Contribution Points</p>
              </div>
              <div className="p-4 rounded-xl bg-dark-700 border border-dark-500">
                <CheckCircle2 className="w-6 h-6 text-green-500 mb-2" />
                <p className="text-2xl font-bold text-white">{stats.reputation}</p>
                <p className="text-xs text-gray-500">Reputation</p>
              </div>
            </div>
          </motion.div>

          {/* Problem Solving Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-6 rounded-xl bg-gradient-to-r from-orange-500/10 via-accent-primary/10 to-accent-success/10 border border-orange-500/30"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Problem Solving Summary</h3>
                <p className="text-gray-400">
                  You've solved <span className="text-accent-success font-semibold">{stats.totalSolved} problems</span> with 
                  <span className="text-green-400 font-semibold"> {stats.easySolved} Easy</span>, 
                  <span className="text-yellow-400 font-semibold"> {stats.mediumSolved} Medium</span>, and 
                  <span className="text-red-400 font-semibold"> {stats.hardSolved} Hard</span>.
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-sm text-gray-500">Hard Problem Ratio</p>
                <p className="text-3xl font-bold gradient-text">{Math.round((stats.hardSolved / stats.totalSolved) * 100)}%</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
