// ============================================
// CREDENCE - Public Profile Page
// Recruiter-Facing Professional Profile
// ============================================

import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Zap,
  CheckCircle2,
  MapPin,
  GraduationCap,
  Calendar,
  Github,
  Linkedin,
  Globe,
  ExternalLink,
  Award,
  TrendingUp,
  Code2,
  FolderGit2,
  Flame,
  Target,
  Star,
  ArrowLeft,
  Share2,
  Download,
  Brain,
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

export default function PublicProfile() {
  const { username } = useParams();
  const navigate = useNavigate();

  // Demo profile data (in real app, this would be fetched)
  const profile = {
    name: 'Alex Johnson',
    email: 'alex.johnson@stanford.edu',
    title: 'Software Engineering Student',
    university: 'Stanford University',
    major: 'Computer Science',
    year: 3,
    graduationYear: 2027,
    location: 'San Francisco, CA',
    bio: 'Passionate about building scalable systems and solving complex problems. Strong focus on AI/ML and distributed systems.',
    overallScore: 82,
    verificationLevel: 'Verified',
    github: 'alexjohnson',
    linkedin: 'alexjohnson',
    portfolio: 'https://alexjohnson.dev',
    memberSince: 'September 2024',
  };

  const skillRadarData = [
    { skill: 'Problem Solving', value: 85 },
    { skill: 'System Design', value: 62 },
    { skill: 'Code Quality', value: 78 },
    { skill: 'Consistency', value: 80 },
    { skill: 'Collaboration', value: 68 },
    { skill: 'Learning Speed', value: 90 },
  ];

  const growthData = [
    { period: 'Y1 S1', score: 28 },
    { period: 'Y1 S2', score: 35 },
    { period: 'Y2 S1', score: 48 },
    { period: 'Y2 S2', score: 58 },
    { period: 'Y3 S1', score: 72 },
    { period: 'Y3 S2', score: 82 },
  ];

  const skills = [
    { name: 'Problem Solving', level: 'Advanced', score: 85 },
    { name: 'Learning Velocity', level: 'Exceptional', score: 90 },
    { name: 'Consistency', level: 'Advanced', score: 80 },
    { name: 'Code Quality', level: 'Strong', score: 78 },
    { name: 'Collaboration', level: 'Developing', score: 68 },
    { name: 'System Design', level: 'Developing', score: 62 },
  ];

  const projects = [
    {
      name: 'AI Chatbot Platform',
      description: 'Full-stack conversational AI with NLP capabilities',
      difficulty: 'Advanced',
      score: 88,
      tech: ['TypeScript', 'Python', 'TensorFlow'],
    },
    {
      name: 'Distributed Task Scheduler',
      description: 'Scalable job scheduling system using Redis',
      difficulty: 'Advanced',
      score: 82,
      tech: ['Go', 'Redis', 'Docker'],
    },
    {
      name: 'React Component Library',
      description: 'Production-ready UI components with Storybook',
      difficulty: 'Intermediate',
      score: 75,
      tech: ['TypeScript', 'React', 'Storybook'],
    },
  ];

  const leetCodeStats = {
    totalSolved: 287,
    currentStreak: 42,
    consistencyIndex: 85,
    topTopics: ['Dynamic Programming', 'Graphs', 'Trees', 'Arrays'],
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Emerging': return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
      case 'Developing': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'Strong': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'Advanced': return 'text-orange-400 bg-orange-400/20 border-orange-400/30';
      case 'Exceptional': return 'text-emerald-400 bg-emerald-400/20 border-emerald-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner': return 'text-green-400';
      case 'Intermediate': return 'text-yellow-400';
      case 'Advanced': return 'text-orange-400';
      case 'Expert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 bg-grid">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-dark-600 bg-dark-900/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-white">Credence</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-ghost flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-8 py-12">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-border p-8 mb-8"
        >
          <div className="flex items-start gap-8">
            {/* Avatar & Score */}
            <div className="text-center">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-accent-primary via-accent-secondary to-accent-tertiary p-1">
                  <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center">
                    <span className="text-5xl font-bold text-white">
                      {profile.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-accent-success flex items-center justify-center border-4 border-dark-800">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Credence Score */}
              <div className="mt-6 p-4 rounded-xl bg-dark-700 border border-dark-500">
                <p className="text-xs text-gray-500 mb-1">Credence Score</p>
                <p className="text-4xl font-bold gradient-text">{profile.overallScore}</p>
                <p className="text-xs text-gray-500">out of 100</p>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent-success/20 text-accent-success border border-accent-success/30">
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  {profile.verificationLevel}
                </span>
              </div>

              <p className="text-lg text-gray-400 mb-4">{profile.title}</p>

              <p className="text-gray-300 mb-6">{profile.bio}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-400">
                  <GraduationCap className="w-4 h-4" />
                  <span>{profile.university} • {profile.major}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Year {profile.year} • Graduating {profile.graduationYear}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Award className="w-4 h-4" />
                  <span>Member since {profile.memberSince}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-700 text-gray-300 hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-700 text-gray-300 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a href={profile.portfolio} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-700 text-gray-300 hover:text-white transition-colors">
                  <Globe className="w-4 h-4" />
                  Portfolio
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Projects Analyzed', value: projects.length, icon: FolderGit2, color: 'text-accent-primary' },
            { label: 'LeetCode Solved', value: leetCodeStats.totalSolved, icon: Code2, color: 'text-orange-400' },
            { label: 'Current Streak', value: `${leetCodeStats.currentStreak}d`, icon: Flame, color: 'text-yellow-400' },
            { label: 'Consistency', value: `${leetCodeStats.consistencyIndex}%`, icon: Target, color: 'text-accent-success' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Skills & Growth */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Skill Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Skill Profile</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillRadarData}>
                  <PolarGrid stroke="#2a2a38" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <Radar
                    dataKey="value"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Growth Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Growth Trajectory</h3>
              <span className="text-sm text-accent-success flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +193% total growth
              </span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="colorGrowthPub" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a38" />
                  <XAxis dataKey="period" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} domain={[0, 100]} />
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
                    strokeWidth={3}
                    fill="url(#colorGrowthPub)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Verified Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card mb-8"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Verified Skills</h3>
          <div className="grid grid-cols-6 gap-4">
            {skills.map((skill, i) => (
              <div key={skill.name} className="p-4 rounded-xl bg-dark-700 border border-dark-500">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${getLevelColor(skill.level)}`}>
                  {skill.level}
                </span>
                <h4 className="font-medium text-white text-sm mb-2">{skill.name}</h4>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-dark-600 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{skill.score}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Verified Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-5 h-5 text-accent-primary" />
            <h3 className="text-lg font-semibold text-white">AI-Analyzed Projects</h3>
          </div>
          <div className="space-y-4">
            {projects.map((project, i) => (
              <div key={project.name} className="p-4 rounded-xl bg-dark-700 border border-dark-500">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-white">{project.name}</h4>
                      <span className={`text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                        {project.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2 py-1 rounded-lg bg-dark-600 text-xs text-gray-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">AI Score</p>
                    <p className="text-2xl font-bold text-white">{project.score}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* LeetCode Discipline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-xl bg-gradient-to-r from-orange-500/10 via-accent-primary/10 to-accent-success/10 border border-orange-500/30"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Problem Solving Discipline</h3>
              <p className="text-gray-400">
                Consistent daily practice with <span className="text-white font-medium">{leetCodeStats.totalSolved} problems solved</span> and 
                a <span className="text-accent-success font-medium">{leetCodeStats.currentStreak}-day streak</span>.
                Strong in: {leetCodeStats.topTopics.join(', ')}.
              </p>
            </div>
            <div className="text-center px-6 border-l border-dark-500">
              <p className="text-xs text-gray-500">Discipline Rating</p>
              <p className="text-4xl font-bold gradient-text">A+</p>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 text-sm">
            This profile was generated by <span className="text-accent-primary">Credence</span> — 
            AI-powered skill verification based on real work artifacts.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            All skills and scores are derived from verified sources: GitHub repositories, LeetCode activity, and analyzed projects.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
