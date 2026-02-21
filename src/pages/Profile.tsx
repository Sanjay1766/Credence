// ============================================
// CREDENCE - Profile Page
// User's Personal Profile Management
// ============================================

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  MapPin,
  GraduationCap,
  Calendar,
  Edit2,
  Save,
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  CheckCircle2,
  Award,
  TrendingUp,
  Code2,
  FolderGit2,
  Eye,
  IndianRupee,
  Briefcase,
  Target,
  Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Editable fields
  const [bio, setBio] = useState(state.user?.bio || 'Passionate developer focused on building impactful solutions.');
  const [location, setLocation] = useState(state.user?.location || 'San Francisco, CA');
  const [linkedin, setLinkedin] = useState(state.user?.linkedIn || '');
  const [portfolio, setPortfolio] = useState(state.user?.portfolio || '');

  const handleSave = () => {
    if (state.user) {
      dispatch({
        type: 'SET_USER',
        payload: {
          ...state.user,
          bio,
          location,
          linkedIn: linkedin,
          portfolio,
        },
      });
    }
    setIsEditing(false);
  };

  const profileStats = [
    { label: 'Overall Score', value: state.overallScore || 78, icon: Award },
    { label: 'Projects', value: state.projects.length || 8, icon: FolderGit2 },
    { label: 'Skills Verified', value: state.skills.length || 24, icon: CheckCircle2 },
    { label: 'LeetCode Streak', value: `${state.leetCodeStats?.currentStreak || 15}d`, icon: Code2 },
  ];

  // Skill levels for display
  const topSkills = [
    { name: 'Problem Solving', level: 'Advanced', score: 82 },
    { name: 'Learning Velocity', level: 'Exceptional', score: 88 },
    { name: 'Code Quality', level: 'Strong', score: 75 },
    { name: 'Consistency', level: 'Advanced', score: 78 },
    { name: 'System Design', level: 'Developing', score: 58 },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Emerging': return 'text-gray-400 bg-gray-400/20';
      case 'Developing': return 'text-blue-400 bg-blue-400/20';
      case 'Strong': return 'text-yellow-400 bg-yellow-400/20';
      case 'Advanced': return 'text-orange-400 bg-orange-400/20';
      case 'Exceptional': return 'text-accent-success bg-accent-success/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  // CTC Estimation based on skill score
  const overallScore = state.overallScore || 78;
  const calculateCTC = (score: number) => {
    // Base CTC ranges in LPA (Lakhs Per Annum)
    if (score >= 90) return { min: 25, max: 45, tier: 'Elite', color: 'text-purple-400' };
    if (score >= 80) return { min: 15, max: 25, tier: 'Premium', color: 'text-accent-success' };
    if (score >= 70) return { min: 10, max: 18, tier: 'Strong', color: 'text-yellow-400' };
    if (score >= 60) return { min: 6, max: 12, tier: 'Good', color: 'text-blue-400' };
    if (score >= 50) return { min: 4, max: 8, tier: 'Average', color: 'text-orange-400' };
    return { min: 3, max: 5, tier: 'Entry', color: 'text-gray-400' };
  };

  const ctcEstimate = calculateCTC(overallScore);
  
  const ctcFactors = [
    { label: 'Problem Solving', score: 82, impact: '+2.5 LPA' },
    { label: 'System Design', score: 58, impact: '+1.2 LPA' },
    { label: 'Learning Velocity', score: 88, impact: '+3.0 LPA' },
    { label: 'Consistency', score: 78, impact: '+1.8 LPA' },
  ];

  return (
    <div className="animate-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-gray-400">
            Manage your profile and view your skill credentials
          </p>
        </div>
        <button
          onClick={() => navigate(`/profile/${state.user?.email?.split('@')[0] || 'demo'}`)}
          className="btn-secondary flex items-center gap-2"
        >
          <Eye className="w-5 h-5" />
          View Public Profile
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-primary via-accent-secondary to-accent-tertiary p-1 mx-auto">
                <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {state.user?.fullName?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-accent-success flex items-center justify-center border-4 border-dark-800">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mt-4">{state.user?.fullName || 'Demo User'}</h2>
            <p className="text-gray-400">{state.user?.email || 'user@university.edu'}</p>

            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="badge-primary">Verified</span>
              <span className="badge-success">Active</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {profileStats.map((stat) => (
              <div key={stat.label} className="p-3 rounded-xl bg-dark-700 text-center">
                <stat.icon className="w-5 h-5 text-accent-primary mx-auto mb-1" />
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="space-y-2">
            {state.githubProfile && (
              <a
                href={`https://github.com/${state.githubProfile.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-dark-700 hover:bg-dark-600 transition-colors"
              >
                <Github className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">@{state.githubProfile.username}</span>
                <ExternalLink className="w-4 h-4 text-gray-500 ml-auto" />
              </a>
            )}
          </div>
        </motion.div>

        {/* Details & Edit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-2 card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Profile Details</h3>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`flex items-center gap-2 ${isEditing ? 'btn-primary' : 'btn-secondary'}`}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Academic Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Academic Information
              </h4>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">University</p>
                  <p className="text-white">{state.user?.university || 'Stanford University'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Major</p>
                  <p className="text-white">{state.user?.major || 'Computer Science'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Current Year</p>
                  <p className="text-white">Year {state.user?.currentYear || 3}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Expected Graduation</p>
                  <p className="text-white">{state.user?.graduationYear || 2027}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">CGPA</p>
                  <p className="text-white">{state.academicData?.cgpa || 8.5}/10</p>
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Personal Information
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="input mt-1 min-h-[80px] resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-white mt-1">{bio}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500">Location</label>
                  {isEditing ? (
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="input pl-10"
                      />
                    </div>
                  ) : (
                    <p className="text-white mt-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      {location}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500">LinkedIn</label>
                  {isEditing ? (
                    <div className="relative mt-1">
                      <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="url"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        className="input pl-10"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  ) : linkedin ? (
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:underline mt-1 flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn Profile
                    </a>
                  ) : (
                    <p className="text-gray-500 mt-1">Not set</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500">Portfolio</label>
                  {isEditing ? (
                    <div className="relative mt-1">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="url"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        className="input pl-10"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                  ) : portfolio ? (
                    <a href={portfolio} target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:underline mt-1 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Portfolio Website
                    </a>
                  ) : (
                    <p className="text-gray-500 mt-1">Not set</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Average CTC Indication */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="col-span-3 card bg-gradient-to-r from-accent-primary/5 via-accent-secondary/5 to-accent-tertiary/5 border-accent-primary/20"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Average CTC Indication</h3>
                <p className="text-sm text-gray-400">Estimated based on your verified skill profile</p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-full ${ctcEstimate.color} bg-white/5 font-medium`}>
              {ctcEstimate.tier} Tier Candidate
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {/* Main CTC Display */}
            <div className="col-span-1 p-6 rounded-xl bg-dark-700/50 border border-dark-500">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">Expected Package</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">₹{ctcEstimate.min}-{ctcEstimate.max}</span>
                <span className="text-lg text-gray-400">LPA</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Based on current market trends</p>
            </div>

            {/* CTC Breakdown */}
            <div className="col-span-2 p-6 rounded-xl bg-dark-700/50 border border-dark-500">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-4 h-4 text-accent-primary" />
                <span className="text-sm font-medium text-white">Skill Impact on CTC</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {ctcFactors.map((factor) => (
                  <div key={factor.label} className="flex items-center justify-between p-2 rounded-lg bg-dark-600/50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-1.5 rounded-full bg-dark-500 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary" 
                          style={{ width: `${factor.score}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-300">{factor.label}</span>
                    </div>
                    <span className="text-sm font-medium text-accent-success">{factor.impact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTC Improvement Tips */}
            <div className="col-span-1 p-6 rounded-xl bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/30">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-accent-primary" />
                <span className="text-sm font-medium text-white">Boost Your CTC</span>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-accent-success mt-1">→</span>
                  <span className="text-gray-300">Improve System Design to add +2 LPA</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-success mt-1">→</span>
                  <span className="text-gray-300">Complete 3 more projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-success mt-1">→</span>
                  <span className="text-gray-300">Reach 50-day LeetCode streak</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Top Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-3 card"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Verified Skills</h3>
              <p className="text-sm text-gray-400">Based on your projects, LeetCode activity, and contributions</p>
            </div>
            <button
              onClick={() => navigate('/skills')}
              className="btn-ghost flex items-center gap-2"
            >
              View Full Graph
              <TrendingUp className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {topSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="p-4 rounded-xl bg-dark-700 border border-dark-500"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                    {skill.level}
                  </span>
                  <span className="text-lg font-bold text-white">{skill.score}</span>
                </div>
                <h4 className="font-medium text-white mb-2">{skill.name}</h4>
                <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.score}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
