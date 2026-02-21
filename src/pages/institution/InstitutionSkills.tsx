// ============================================
// CREDENCE - Institution Skills Tracking
// ============================================

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Award,
  Users,
  BookOpen,
  Code,
  Database,
  Cloud,
  Cpu,
  Palette,
  BarChart3,
  ChevronRight
} from 'lucide-react';

// Mock skills data
const skillCategories = [
  {
    id: 'programming',
    name: 'Programming Languages',
    icon: Code,
    color: 'purple',
    skills: [
      { name: 'Python', students: 742, avgLevel: 3.8, trend: 18 },
      { name: 'JavaScript', students: 698, avgLevel: 3.6, trend: 12 },
      { name: 'Java', students: 524, avgLevel: 3.4, trend: 8 },
      { name: 'TypeScript', students: 412, avgLevel: 3.2, trend: 28 },
      { name: 'C++', students: 386, avgLevel: 3.1, trend: -5 },
      { name: 'Go', students: 156, avgLevel: 2.8, trend: 42 },
    ]
  },
  {
    id: 'frameworks',
    name: 'Frameworks & Libraries',
    icon: BookOpen,
    color: 'pink',
    skills: [
      { name: 'React', students: 856, avgLevel: 3.9, trend: 24 },
      { name: 'Node.js', students: 486, avgLevel: 3.5, trend: 15 },
      { name: 'Django', students: 324, avgLevel: 3.2, trend: 10 },
      { name: 'Spring Boot', students: 298, avgLevel: 3.0, trend: 8 },
      { name: 'Flutter', students: 256, avgLevel: 2.9, trend: 35 },
      { name: 'Vue.js', students: 198, avgLevel: 3.1, trend: 18 },
    ]
  },
  {
    id: 'data',
    name: 'Data & ML',
    icon: Database,
    color: 'cyan',
    skills: [
      { name: 'Machine Learning', students: 412, avgLevel: 3.3, trend: 32 },
      { name: 'Data Analysis', students: 524, avgLevel: 3.5, trend: 20 },
      { name: 'SQL', students: 686, avgLevel: 3.7, trend: 8 },
      { name: 'TensorFlow', students: 256, avgLevel: 2.9, trend: 28 },
      { name: 'Pandas', students: 486, avgLevel: 3.4, trend: 15 },
      { name: 'Deep Learning', students: 198, avgLevel: 2.8, trend: 38 },
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    icon: Cloud,
    color: 'orange',
    skills: [
      { name: 'AWS', students: 356, avgLevel: 3.2, trend: 28 },
      { name: 'Docker', students: 298, avgLevel: 3.0, trend: 22 },
      { name: 'Git', students: 856, avgLevel: 4.0, trend: 5 },
      { name: 'Kubernetes', students: 156, avgLevel: 2.6, trend: 45 },
      { name: 'CI/CD', students: 234, avgLevel: 2.8, trend: 30 },
      { name: 'Azure', students: 186, avgLevel: 2.7, trend: 25 },
    ]
  },
];

const topPerformingSkills = [
  { name: 'React', category: 'Frameworks', students: 856, avgScore: 85, growth: 24 },
  { name: 'Python', category: 'Programming', students: 742, avgScore: 82, growth: 18 },
  { name: 'Git', category: 'DevOps', students: 856, avgScore: 88, growth: 5 },
  { name: 'JavaScript', category: 'Programming', students: 698, avgScore: 80, growth: 12 },
  { name: 'SQL', category: 'Data', students: 686, avgScore: 79, growth: 8 },
];

const emergingSkills = [
  { name: 'Kubernetes', growth: 45, students: 156 },
  { name: 'Go', growth: 42, students: 156 },
  { name: 'Deep Learning', growth: 38, students: 198 },
  { name: 'Flutter', growth: 35, students: 256 },
  { name: 'Machine Learning', growth: 32, students: 412 },
];

export default function InstitutionSkills() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return skillCategories;
    
    return skillCategories.map(cat => ({
      ...cat,
      skills: cat.skills.filter(skill => 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(cat => cat.skills.length > 0);
  }, [searchQuery]);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
      pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30' },
      cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
      orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
    };
    return colors[color] || colors.purple;
  };

  const getLevelLabel = (level: number) => {
    if (level >= 4) return 'Expert';
    if (level >= 3) return 'Advanced';
    if (level >= 2) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Skills Tracking</h1>
          <p className="text-gray-400">Monitor and analyze skill development across your institution</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-gray-400">Total Skills Tracked</span>
          </div>
          <p className="text-2xl font-bold text-white">48</p>
          <p className="text-xs text-green-400 mt-1">+6 this month</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-pink-400" />
            <span className="text-sm text-gray-400">Avg Skills per Student</span>
          </div>
          <p className="text-2xl font-bold text-white">8.4</p>
          <p className="text-xs text-green-400 mt-1">+1.2 from last semester</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-400">Skill Verifications</span>
          </div>
          <p className="text-2xl font-bold text-white">15,420</p>
          <p className="text-xs text-green-400 mt-1">+24% this month</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-gray-400">Avg Proficiency</span>
          </div>
          <p className="text-2xl font-bold text-white">3.4/5</p>
          <p className="text-xs text-green-400 mt-1">+0.3 improvement</p>
        </motion.div>
      </div>

      {/* Search */}
      <div className="card p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills..."
              className="input pl-12 w-full"
            />
          </div>
          <div className="flex items-center gap-2 bg-dark-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Categories */}
        <div className="lg:col-span-2 space-y-6">
          {filteredCategories.map((category, catIndex) => {
            const Icon = category.icon;
            const colors = getColorClasses(category.color);
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.1 }}
                className="card overflow-hidden"
              >
                <div className={`p-4 ${colors.bg} border-b ${colors.border}`}>
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                    <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                    <span className="ml-auto text-sm text-gray-400">{category.skills.length} skills</span>
                  </div>
                </div>
                <div className="p-4">
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="p-3 rounded-xl bg-dark-700/50 hover:bg-dark-700 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-white">{skill.name}</span>
                            <span className={`text-xs ${skill.trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {skill.trend >= 0 ? '+' : ''}{skill.trend}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>{skill.students} students</span>
                            <span>{getLevelLabel(skill.avgLevel)}</span>
                          </div>
                          <div className="mt-2 h-1.5 bg-dark-600 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${colors.bg.replace('/20', '')} rounded-full`}
                              style={{ width: `${(skill.avgLevel / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center gap-4 p-3 rounded-xl bg-dark-700/50 hover:bg-dark-700 transition-colors cursor-pointer"
                        >
                          <span className="text-sm font-medium text-white w-32">{skill.name}</span>
                          <div className="flex-1 h-2 bg-dark-600 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${colors.bg.replace('/20', '')} rounded-full`}
                              style={{ width: `${(skill.avgLevel / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-400 w-24">{skill.students} students</span>
                          <span className={`text-sm w-16 text-right ${skill.trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {skill.trend >= 0 ? '+' : ''}{skill.trend}%
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Performing Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Top Performing Skills</h3>
            <div className="space-y-4">
              {topPerformingSkills.map((skill, index) => (
                <div key={skill.name} className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                    index === 1 ? 'bg-gray-400/20 text-gray-300' :
                    index === 2 ? 'bg-orange-500/20 text-orange-400' :
                    'bg-dark-700 text-gray-400'
                  }`}>
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{skill.name}</p>
                    <p className="text-xs text-gray-500">{skill.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{skill.avgScore}%</p>
                    <p className="text-xs text-green-400">+{skill.growth}%</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Emerging Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Emerging Skills</h3>
            <p className="text-sm text-gray-400 mb-4">Fastest growing skills this semester</p>
            <div className="space-y-3">
              {emergingSkills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{skill.name}</p>
                    <p className="text-xs text-gray-500">{skill.students} students</p>
                  </div>
                  <span className="text-sm font-bold text-green-400">+{skill.growth}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full btn-secondary text-sm justify-start">
                <Award className="w-4 h-4 mr-2" />
                Add New Skill to Track
              </button>
              <button className="w-full btn-secondary text-sm justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Skill Report
              </button>
              <button className="w-full btn-secondary text-sm justify-start">
                <Users className="w-4 h-4 mr-2" />
                View Student Rankings
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
