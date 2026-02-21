// ============================================
// CREDENCE - Interview Readiness Score
// Shows how ready you are for tech interviews
// ============================================

import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, TrendingUp, Briefcase } from 'lucide-react';

interface InterviewCategory {
  name: string;
  score: number;
  weight: number;
  status: 'ready' | 'improving' | 'needs-work';
  tips: string;
}

const interviewCategories: InterviewCategory[] = [
  {
    name: 'DSA & Algorithms',
    score: 78,
    weight: 30,
    status: 'ready',
    tips: 'Strong foundation. Practice system design next.',
  },
  {
    name: 'Problem Solving Speed',
    score: 65,
    weight: 20,
    status: 'improving',
    tips: 'Try timed practice sessions on LeetCode.',
  },
  {
    name: 'System Design',
    score: 45,
    weight: 20,
    status: 'needs-work',
    tips: 'Study scalability patterns and distributed systems.',
  },
  {
    name: 'Project Experience',
    score: 82,
    weight: 15,
    status: 'ready',
    tips: 'Great portfolio! Document your learnings.',
  },
  {
    name: 'Communication',
    score: 70,
    weight: 15,
    status: 'improving',
    tips: 'Practice explaining your thought process aloud.',
  },
];

export default function InterviewReadiness() {
  const overallScore = Math.round(
    interviewCategories.reduce(
      (sum, cat) => sum + cat.score * (cat.weight / 100),
      0
    )
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="w-4 h-4 text-accent-success" />;
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-yellow-400" />;
      case 'needs-work':
        return <AlertCircle className="w-4 h-4 text-accent-danger" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-accent-success/20 text-accent-success';
      case 'improving':
        return 'bg-yellow-400/20 text-yellow-400';
      case 'needs-work':
        return 'bg-accent-danger/20 text-accent-danger';
      default:
        return '';
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 70) return 'from-green-400 to-green-600';
    if (score >= 50) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  const readyCategories = interviewCategories.filter(c => c.status === 'ready').length;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Interview Readiness</h3>
            <p className="text-sm text-gray-400">How prepared are you for tech interviews?</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-white">{overallScore}%</p>
          <p className="text-sm text-gray-400">{readyCategories}/5 areas ready</p>
        </div>
      </div>

      {/* Progress Ring */}
      <div className="flex items-center gap-8 mb-6">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="#2a2a38"
              strokeWidth="8"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="url(#readinessGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ strokeDasharray: '0 251' }}
              animate={{ strokeDasharray: `${overallScore * 2.51} 251` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="readinessGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-white">{overallScore}%</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-accent-success" />
            <span className="text-gray-300">Strong DSA foundation</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300">Communication improving</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4 text-accent-danger" />
            <span className="text-gray-300">Focus on System Design</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-4">
        {interviewCategories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-dark-700/50 rounded-lg border border-dark-600"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(category.status)}
                <span className="font-medium text-white">{category.name}</span>
                <span className="text-xs text-gray-500">({category.weight}% weight)</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(category.status)}`}>
                {category.status === 'ready' ? 'Ready' : category.status === 'improving' ? 'Improving' : 'Needs Work'}
              </span>
            </div>
            
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1 h-2 bg-dark-600 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${category.score}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(category.score)}`}
                />
              </div>
              <span className="text-sm font-medium text-white w-12 text-right">{category.score}%</span>
            </div>
            
            <p className="text-xs text-gray-500">{category.tips}</p>
          </motion.div>
        ))}
      </div>

      {/* Target Companies */}
      <div className="mt-6 p-4 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded-lg border border-accent-primary/30">
        <h4 className="text-sm font-medium text-white mb-2">Based on your profile, you're a good fit for:</h4>
        <div className="flex flex-wrap gap-2">
          {['Product-based startups', 'Mid-sized tech companies', 'SDE-1 roles'].map((company) => (
            <span key={company} className="px-3 py-1 bg-dark-700 rounded-full text-sm text-gray-300">
              {company}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
