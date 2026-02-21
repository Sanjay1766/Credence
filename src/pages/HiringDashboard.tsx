// ============================================
// CREDENCE - Hiring Partners Dashboard
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  Search, 
  Filter,
  MapPin,
  GraduationCap,
  Code,
  BookmarkPlus,
  MessageSquare,
  ExternalLink,
  CheckCircle2,
  Clock,
  Zap,
  Github,
  Award
} from 'lucide-react';

// Mock data for demonstration
const hiringStats = {
  talentPool: 15420,
  shortlisted: 48,
  interviewed: 12,
  hired: 5,
  avgTimeToHire: 14,
  openPositions: 8
};

const candidateProfiles = [
  {
    id: 1,
    name: 'Sneha Reddy',
    avatar: null,
    university: 'IIT Delhi',
    degree: 'B.Tech Computer Science',
    year: 2026,
    credenseScore: 94,
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
    leetcode: { solved: 342, rating: 1856 },
    github: { repos: 28, contributions: 1240 },
    location: 'Delhi, India',
    verified: true,
    matchScore: 96
  },
  {
    id: 2,
    name: 'Rahul Sharma',
    avatar: null,
    university: 'NIT Trichy',
    degree: 'B.Tech Information Technology',
    year: 2026,
    credenseScore: 91,
    skills: ['Java', 'Spring Boot', 'Microservices', 'Docker', 'Kubernetes'],
    leetcode: { solved: 289, rating: 1742 },
    github: { repos: 35, contributions: 980 },
    location: 'Chennai, India',
    verified: true,
    matchScore: 92
  },
  {
    id: 3,
    name: 'Priya Patel',
    avatar: null,
    university: 'BITS Pilani',
    degree: 'M.Tech Data Science',
    year: 2026,
    credenseScore: 89,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Spark'],
    leetcode: { solved: 198, rating: 1654 },
    github: { repos: 22, contributions: 856 },
    location: 'Hyderabad, India',
    verified: true,
    matchScore: 88
  },
  {
    id: 4,
    name: 'Amit Kumar',
    avatar: null,
    university: 'VIT Vellore',
    degree: 'B.Tech Computer Science',
    year: 2025,
    credenseScore: 87,
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
    leetcode: { solved: 156, rating: 1523 },
    github: { repos: 18, contributions: 642 },
    location: 'Bangalore, India',
    verified: true,
    matchScore: 85
  },
];

const openRoles = [
  { title: 'Senior Frontend Developer', applicants: 145, shortlisted: 12, department: 'Engineering' },
  { title: 'Backend Engineer', applicants: 198, shortlisted: 18, department: 'Engineering' },
  { title: 'Data Scientist', applicants: 87, shortlisted: 8, department: 'AI/ML' },
  { title: 'DevOps Engineer', applicants: 64, shortlisted: 5, department: 'Infrastructure' },
];

export default function HiringDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const skillFilters = ['React', 'Python', 'Java', 'Node.js', 'AWS', 'Machine Learning', 'Docker'];

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <div className="min-h-screen bg-dark-900 bg-grid">
      {/* Header */}
      <header className="bg-dark-800/80 backdrop-blur-xl border-b border-dark-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Hiring Dashboard</h1>
                <p className="text-sm text-gray-400">TechCorp Inc. • Recruiter Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="btn-secondary flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Post New Role
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-medium">
                R
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-xs text-gray-400">Talent Pool</span>
            </div>
            <p className="text-2xl font-bold text-white">{hiringStats.talentPool.toLocaleString()}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <BookmarkPlus className="w-5 h-5 text-yellow-400" />
              <span className="text-xs text-gray-400">Shortlisted</span>
            </div>
            <p className="text-2xl font-bold text-white">{hiringStats.shortlisted}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-5 h-5 text-purple-400" />
              <span className="text-xs text-gray-400">Interviewed</span>
            </div>
            <p className="text-2xl font-bold text-white">{hiringStats.interviewed}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-xs text-gray-400">Hired</span>
            </div>
            <p className="text-2xl font-bold text-white">{hiringStats.hired}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span className="text-xs text-gray-400">Avg. Days to Hire</span>
            </div>
            <p className="text-2xl font-bold text-white">{hiringStats.avgTimeToHire}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="w-5 h-5 text-orange-400" />
              <span className="text-xs text-gray-400">Open Positions</span>
            </div>
            <p className="text-2xl font-bold text-white">{hiringStats.openPositions}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Talent Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Search & Filters */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Find Verified Talent</h2>
              <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by skills, university, or name..."
                    className="input pl-12"
                  />
                </div>
                <button className="btn-secondary flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Advanced
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillFilters.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedSkills.includes(skill)
                        ? 'bg-accent-primary text-white'
                        : 'bg-dark-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Candidate Cards */}
            <div className="space-y-4">
              {candidateProfiles.map((candidate, index) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="card p-6 hover:border-accent-primary/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center text-orange-400 text-xl font-bold flex-shrink-0">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-white">{candidate.name}</h3>
                        {candidate.verified && (
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        )}
                        <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-medium ml-auto">
                          {candidate.matchScore}% Match
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          {candidate.university}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {candidate.location}
                        </span>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {candidate.skills.map((skill, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 rounded-md bg-dark-700 text-xs text-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Stats Row */}
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-orange-400" />
                          <span className="text-white font-medium">{candidate.credenseScore}</span>
                          <span className="text-gray-400">Credense Score</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Code className="w-4 h-4 text-yellow-400" />
                          <span className="text-white font-medium">{candidate.leetcode.solved}</span>
                          <span className="text-gray-400">LeetCode</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Github className="w-4 h-4 text-gray-400" />
                          <span className="text-white font-medium">{candidate.github.repos}</span>
                          <span className="text-gray-400">Repos</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <button className="btn-primary text-sm px-4 py-2">
                        View Profile
                      </button>
                      <button className="btn-secondary text-sm px-4 py-2 flex items-center gap-1">
                        <BookmarkPlus className="w-4 h-4" />
                        Shortlist
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Open Roles */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Your Open Roles</h2>
              <div className="space-y-3">
                {openRoles.map((role, index) => (
                  <div 
                    key={index}
                    className="p-3 rounded-xl bg-dark-700/50 hover:bg-dark-700 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-white">{role.title}</h3>
                      <ExternalLink className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>{role.applicants} applicants</span>
                      <span className="text-green-400">{role.shortlisted} shortlisted</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 btn-secondary text-sm">
                View All Roles
              </button>
            </div>

            {/* Quick Stats */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Platform Insights</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Verified Candidates</span>
                  <span className="text-sm font-medium text-white">12,450+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Partner Universities</span>
                  <span className="text-sm font-medium text-white">85+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Avg. Skill Verification</span>
                  <span className="text-sm font-medium text-white">8.5/10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Quality Score</span>
                  <span className="text-sm font-medium text-green-400">94%</span>
                </div>
              </div>
            </div>

            {/* Top Skills in Demand */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Top Skills Available</h2>
              <div className="space-y-3">
                {['React/TypeScript', 'Python/ML', 'Java/Spring', 'AWS/DevOps', 'Data Science'].map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center">
                      <Award className="w-4 h-4 text-orange-400" />
                    </div>
                    <span className="text-sm text-gray-300">{skill}</span>
                    <span className="ml-auto text-xs text-gray-500">{Math.floor(Math.random() * 2000) + 500}+ verified</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
