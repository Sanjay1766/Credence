// ============================================
// CREDENCE - Achievement Badges Component
// Gamification with Unlockable Achievements
// ============================================

import { motion } from 'framer-motion';
import {
  Flame,
  Target,
  Zap,
  Star,
  Award,
  TrendingUp,
  Code,
  GitBranch,
  BookOpen,
  Users,
  Coffee,
  Shield,
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedDate?: string;
}

const badges: Badge[] = [
  {
    id: 'first-blood',
    name: 'First Blood',
    description: 'Complete your first LeetCode problem',
    icon: Target,
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    rarity: 'common',
    unlockedDate: '2023-01-15',
  },
  {
    id: 'streak-master',
    name: 'Streak Master',
    description: 'Maintain a 30-day coding streak',
    icon: Flame,
    unlocked: true,
    progress: 30,
    maxProgress: 30,
    rarity: 'rare',
    unlockedDate: '2024-02-20',
  },
  {
    id: 'century-club',
    name: 'Century Club',
    description: 'Solve 100 problems',
    icon: Award,
    unlocked: true,
    progress: 100,
    maxProgress: 100,
    rarity: 'epic',
    unlockedDate: '2024-06-10',
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Solve a hard problem in under 20 minutes',
    icon: Zap,
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    rarity: 'legendary',
    unlockedDate: '2024-08-05',
  },
  {
    id: 'open-source-hero',
    name: 'Open Source Hero',
    description: 'Get 10 merged PRs on external repos',
    icon: GitBranch,
    unlocked: true,
    progress: 10,
    maxProgress: 10,
    rarity: 'epic',
    unlockedDate: '2024-09-15',
  },
  {
    id: 'project-builder',
    name: 'Project Builder',
    description: 'Create 5 complete projects',
    icon: Code,
    unlocked: true,
    progress: 5,
    maxProgress: 5,
    rarity: 'rare',
    unlockedDate: '2024-03-20',
  },
  {
    id: 'rising-star',
    name: 'Rising Star',
    description: 'Reach top 20% in batch ranking',
    icon: Star,
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    rarity: 'rare',
    unlockedDate: '2024-10-01',
  },
  {
    id: 'consistency-king',
    name: 'Consistency King',
    description: 'Maintain 90+ day streak',
    icon: Shield,
    unlocked: false,
    progress: 45,
    maxProgress: 90,
    rarity: 'legendary',
  },
  {
    id: 'knowledge-seeker',
    name: 'Knowledge Seeker',
    description: 'Complete 10 courses or certifications',
    icon: BookOpen,
    unlocked: false,
    progress: 6,
    maxProgress: 10,
    rarity: 'epic',
  },
  {
    id: 'growth-rocket',
    name: 'Growth Rocket',
    description: 'Improve score by 50% in one semester',
    icon: TrendingUp,
    unlocked: false,
    progress: 35,
    maxProgress: 50,
    rarity: 'rare',
  },
  {
    id: 'team-player',
    name: 'Team Player',
    description: 'Collaborate on 5 group projects',
    icon: Users,
    unlocked: false,
    progress: 3,
    maxProgress: 5,
    rarity: 'common',
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Code for 100 hours after midnight',
    icon: Coffee,
    unlocked: false,
    progress: 67,
    maxProgress: 100,
    rarity: 'common',
  },
];

const rarityColors = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-orange-500',
};

const rarityGlow = {
  common: 'shadow-gray-500/20',
  rare: 'shadow-blue-500/30',
  epic: 'shadow-purple-500/40',
  legendary: 'shadow-yellow-500/50',
};

interface AchievementBadgesProps {
  compact?: boolean;
  limit?: number;
}

export default function AchievementBadges({ compact = false, limit }: AchievementBadgesProps) {
  const displayBadges = limit ? badges.slice(0, limit) : badges;
  const unlockedCount = badges.filter(b => b.unlocked).length;
  
  if (compact) {
    // Compact view - just show badges in a row
    return (
      <div className="flex flex-wrap gap-2">
        {displayBadges.filter(b => b.unlocked).map((badge, i) => {
          const Icon = badge.icon;
          return (
            <motion.div
              key={badge.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`relative group w-10 h-10 rounded-lg bg-gradient-to-br ${rarityColors[badge.rarity]} flex items-center justify-center shadow-lg ${rarityGlow[badge.rarity]}`}
              title={badge.name}
            >
              <Icon className="w-5 h-5 text-white" />
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-dark-700 rounded-lg border border-dark-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                <p className="text-sm font-medium text-white">{badge.name}</p>
                <p className="text-xs text-gray-400">{badge.description}</p>
              </div>
            </motion.div>
          );
        })}
        {unlockedCount > (limit || badges.length) && (
          <div className="w-10 h-10 rounded-lg bg-dark-600 flex items-center justify-center text-sm text-gray-400">
            +{unlockedCount - (limit || badges.length)}
          </div>
        )}
      </div>
    );
  }

  // Full view
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Achievements</h3>
          <p className="text-sm text-gray-400">{unlockedCount} of {badges.length} unlocked</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-400" /> Common</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-400" /> Rare</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-400" /> Epic</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-400" /> Legendary</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {displayBadges.map((badge, i) => {
          const Icon = badge.icon;
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`relative p-4 rounded-xl border transition-all ${
                badge.unlocked
                  ? `bg-dark-700 border-dark-500 ${rarityGlow[badge.rarity]} shadow-lg`
                  : 'bg-dark-800/50 border-dark-600 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  badge.unlocked
                    ? `bg-gradient-to-br ${rarityColors[badge.rarity]}`
                    : 'bg-dark-600'
                }`}>
                  <Icon className={`w-6 h-6 ${badge.unlocked ? 'text-white' : 'text-gray-500'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium ${badge.unlocked ? 'text-white' : 'text-gray-500'}`}>
                    {badge.name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">{badge.description}</p>
                </div>
              </div>

              {/* Progress bar for locked badges */}
              {!badge.unlocked && badge.progress > 0 && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{badge.progress}/{badge.maxProgress}</span>
                  </div>
                  <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${rarityColors[badge.rarity]}`}
                      style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Unlocked date */}
              {badge.unlocked && badge.unlockedDate && (
                <p className="mt-2 text-xs text-gray-600">
                  Unlocked {new Date(badge.unlockedDate).toLocaleDateString()}
                </p>
              )}

              {/* Rarity indicator */}
              <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-r ${rarityColors[badge.rarity]}`} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
