// ============================================
// CREDENCE - Hiring Partners Dashboard
// Real demo data integration
// ============================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  Search, 
  MapPin,
  GraduationCap,
  Code,
  BookmarkPlus,
  CheckCircle2,
  Zap,
  GitBranch,
  Award,
  Loader2,
  Building2,
  X,
  Sparkles,
  Target,
  AlertCircle
} from 'lucide-react';
import { 
  fetchAllDemoStudents, 
  DemoStudent, 
  AVAILABLE_INSTITUTIONS 
} from '../services/demoDataService';
import { groqService } from '../services/groqService';

interface AIAnalysis {
  leetcode?: {
    overallAssessment: string;
    strengthAreas: string[];
    improvementAreas: string[];
    readinessLevel: string;
    recommendations: string[];
    interviewTips: string[];
  };
  github?: {
    developerLevel: string;
    primarySkills: string[];
    projectComplexity: string;
    collaborationScore: number;
    openSourceContribution: string;
    portfolioStrength: string;
    recommendations: string[];
    hiringInsights: string;
  };
}

export default function HiringDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [students, setStudents] = useState<DemoStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<DemoStudent | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const fetchedStudents = await fetchAllDemoStudents();
        setStudents(fetchedStudents);
      } catch (error) {
        console.error('Failed to load candidate data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Get all unique skills from students
  const allSkills = [...new Set(students.flatMap(s => s.skills))].slice(0, 8);

  // Filter students based on search and skills
  const filteredStudents = students.filter(student => {
    const matchesSearch = !searchQuery || 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSkills = selectedSkills.length === 0 ||
      selectedSkills.some(skill => student.skills.includes(skill));
    
    return matchesSearch && matchesSkills;
  });

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const toggleShortlist = (id: string) => {
    setShortlistedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Stats
  const stats = {
    talentPool: students.length,
    shortlisted: shortlistedIds.length,
    avgScore: students.length > 0 
      ? Math.round(students.reduce((sum, s) => sum + s.overallScore, 0) / students.length)
      : 0,
    institutions: 1,
  };

  // AI Analysis function
  const analyzeCandidate = async (candidate: DemoStudent) => {
    setSelectedCandidate(candidate);
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const results: AIAnalysis = {};

      // Analyze LeetCode profile if available
      if (candidate.leetcodeStats) {
        results.leetcode = await groqService.analyzeLeetCodeProfile({
          username: candidate.leetcodeUsername,
          totalSolved: candidate.leetcodeStats.totalSolved,
          easySolved: candidate.leetcodeStats.easySolved,
          mediumSolved: candidate.leetcodeStats.mediumSolved,
          hardSolved: candidate.leetcodeStats.hardSolved,
          ranking: candidate.leetcodeStats.ranking || 0,
          acceptanceRate: candidate.leetcodeStats.acceptanceRate || 0,
        });
      }

      // Analyze GitHub profile if available
      if (candidate.githubProfile) {
        results.github = await groqService.analyzeGitHubProfile({
          username: candidate.githubUsername,
          publicRepos: candidate.githubProfile.publicRepos,
          followers: candidate.githubProfile.followers,
          following: candidate.githubProfile.following || 0,
          bio: candidate.githubProfile.bio,
          repositories: [],
        });
      }

      setAnalysis(results);
    } catch (error) {
      console.error('AI analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const closeAnalysisModal = () => {
    setSelectedCandidate(null);
    setAnalysis(null);
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
                <p className="text-sm text-gray-400">Recruiter Portal • Verified Talent</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-medium">
                R
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-accent-primary animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Fetching verified candidates from GitHub & LeetCode...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-xs text-gray-400">Verified Candidates</span>
                </div>
                <p className="text-2xl font-bold text-white">{stats.talentPool}</p>
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
                <p className="text-2xl font-bold text-white">{stats.shortlisted}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card p-5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-orange-400" />
                  <span className="text-xs text-gray-400">Avg. Credense Score</span>
                </div>
                <p className="text-2xl font-bold text-white">{stats.avgScore}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card p-5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="w-5 h-5 text-purple-400" />
                  <span className="text-xs text-gray-400">Partner Institutions</span>
                </div>
                <p className="text-2xl font-bold text-white">{stats.institutions}</p>
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
                        placeholder="Search by name or skill..."
                        className="input pl-12"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.map((skill) => (
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
                  {filteredStudents.map((candidate, index) => (
                    <motion.div
                      key={candidate.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={`card p-6 transition-all ${
                        shortlistedIds.includes(candidate.id) 
                          ? 'border-yellow-500/50 bg-yellow-500/5' 
                          : 'hover:border-accent-primary/50'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        {candidate.avatar ? (
                          <img 
                            src={candidate.avatar} 
                            alt={candidate.name}
                            className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center text-orange-400 text-xl font-bold flex-shrink-0">
                            {candidate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                        )}

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-white">{candidate.name}</h3>
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-medium ml-auto">
                              Score: {candidate.overallScore}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                            <span className="flex items-center gap-1">
                              <GraduationCap className="w-4 h-4" />
                              {candidate.university}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              Chennai, India
                            </span>
                            <span className="text-gray-500">
                              Class of {candidate.graduationYear}
                            </span>
                          </div>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {candidate.skills.slice(0, 5).map((skill, idx) => (
                              <span 
                                key={idx}
                                className="px-2 py-1 rounded-md bg-dark-700 text-xs text-gray-300"
                              >
                                {skill}
                              </span>
                            ))}
                            {candidate.skills.length > 5 && (
                              <span className="px-2 py-1 rounded-md bg-dark-700 text-xs text-gray-400">
                                +{candidate.skills.length - 5}
                              </span>
                            )}
                          </div>

                          {/* Stats Row */}
                          <div className="flex items-center gap-6 text-sm">
                            {candidate.leetcodeStats && (
                              <div className="flex items-center gap-2">
                                <Code className="w-4 h-4 text-yellow-400" />
                                <span className="text-white font-medium">{candidate.leetcodeStats.totalSolved}</span>
                                <span className="text-gray-400">LeetCode</span>
                              </div>
                            )}
                            {candidate.githubProfile && (
                              <div className="flex items-center gap-2">
                                <GitBranch className="w-4 h-4 text-purple-400" />
                                <span className="text-white font-medium">{candidate.githubProfile.publicRepos}</span>
                                <span className="text-gray-400">Repos</span>
                              </div>
                            )}
                            {candidate.githubProfile && (
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-blue-400" />
                                <span className="text-white font-medium">{candidate.githubProfile.followers}</span>
                                <span className="text-gray-400">Followers</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => analyzeCandidate(candidate)}
                            className="btn-primary text-sm px-4 py-2 flex items-center justify-center"
                          >
                            Analyse
                          </button>
                          <div className="flex gap-2">
                            <a 
                              href={`https://github.com/${candidate.githubUsername}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-secondary text-sm px-3 py-2 flex items-center gap-1"
                              title="View GitHub"
                            >
                              <GitBranch className="w-4 h-4" />
                              GitHub
                            </a>
                            <a 
                              href={`https://leetcode.com/u/${candidate.leetcodeUsername}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-secondary text-sm px-3 py-2 flex items-center gap-1"
                              title="View LeetCode"
                            >
                              <Code className="w-4 h-4" />
                              LeetCode
                            </a>
                          </div>
                          <button 
                            onClick={() => toggleShortlist(candidate.id)}
                            className={`text-sm px-4 py-2 flex items-center justify-center gap-1 rounded-lg transition-colors ${
                              shortlistedIds.includes(candidate.id)
                                ? 'bg-yellow-500 text-black'
                                : 'btn-secondary'
                            }`}
                          >
                            <BookmarkPlus className="w-4 h-4" />
                            {shortlistedIds.includes(candidate.id) ? 'Shortlisted' : 'Shortlist'}
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
                {/* Partner Institution */}
                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Partner Institutions</h2>
                  <div className="space-y-3">
                    {AVAILABLE_INSTITUTIONS.map((inst) => (
                      <div 
                        key={inst.id}
                        className="p-3 rounded-xl bg-dark-700/50 hover:bg-dark-700 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-white">{inst.name}</h3>
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span>{inst.studentCount} students</span>
                          <span>Avg. Score: {inst.avgScore}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {inst.topSkills.slice(0, 3).map((skill, i) => (
                            <span key={i} className="px-2 py-0.5 rounded text-xs bg-dark-600 text-gray-400">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shortlisted Candidates */}
                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Shortlisted ({shortlistedIds.length})</h2>
                  {shortlistedIds.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">
                      No candidates shortlisted yet. Click "Shortlist" on a candidate to add them.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {students
                        .filter(s => shortlistedIds.includes(s.id))
                        .map((student) => (
                          <div 
                            key={student.id}
                            className="flex items-center gap-3 p-2 rounded-lg bg-dark-700/50"
                          >
                            {student.avatar ? (
                              <img src={student.avatar} alt="" className="w-8 h-8 rounded-full" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-xs text-white font-medium">
                                {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white truncate">{student.name}</p>
                              <p className="text-xs text-gray-400">Score: {student.overallScore}</p>
                            </div>
                            <button 
                              onClick={() => toggleShortlist(student.id)}
                              className="text-gray-400 hover:text-red-400"
                            >
                              ×
                            </button>
                          </div>
                        ))
                      }
                    </div>
                  )}
                </div>

                {/* Top Skills Available */}
                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Top Skills Available</h2>
                  <div className="space-y-3">
                    {allSkills.slice(0, 5).map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center">
                          <Award className="w-4 h-4 text-orange-400" />
                        </div>
                        <span className="text-sm text-gray-300">{skill}</span>
                        <span className="ml-auto text-xs text-gray-500">
                          {students.filter(s => s.skills.includes(skill)).length} verified
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </main>

      {/* AI Analysis Modal */}
      <AnimatePresence>
        {selectedCandidate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeAnalysisModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-dark-800 border border-dark-600 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-dark-600">
                <div className="flex items-center gap-4">
                  {selectedCandidate.avatar ? (
                    <img src={selectedCandidate.avatar} alt="" className="w-12 h-12 rounded-full" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                      {selectedCandidate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      {selectedCandidate.name}
                      <Sparkles className="w-5 h-5 text-purple-400" />
                    </h2>
                    <p className="text-sm text-gray-400">Candidate Profile Analysis</p>
                  </div>
                </div>
                <button
                  onClick={closeAnalysisModal}
                  className="p-2 hover:bg-dark-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-100px)]">
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-12 h-12 text-accent-primary animate-spin" />
                    <p className="mt-4 text-gray-400">Analysing candidate...</p>
                    <p className="text-xs text-gray-500 mt-2">Evaluating LeetCode & GitHub profiles</p>
                  </div>
                ) : analysis ? (
                  <div className="space-y-6">
                    {/* LeetCode Analysis */}
                    {analysis.leetcode && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          <Code className="w-5 h-5 text-yellow-400" />
                          LeetCode Analysis
                        </h3>
                        <div className="bg-dark-700/50 rounded-xl p-4 space-y-4">
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Overall Assessment</p>
                            <p className="text-white">{analysis.leetcode.overallAssessment}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">Interview Readiness:</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              analysis.leetcode.readinessLevel === 'Expert' ? 'bg-purple-500/20 text-purple-400' :
                              analysis.leetcode.readinessLevel === 'Advanced' ? 'bg-green-500/20 text-green-400' :
                              analysis.leetcode.readinessLevel === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {analysis.leetcode.readinessLevel}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-400 mb-2 flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4 text-green-400" /> Strengths
                              </p>
                              <ul className="space-y-1">
                                {analysis.leetcode.strengthAreas.map((s, i) => (
                                  <li key={i} className="text-sm text-gray-300">• {s}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400 mb-2 flex items-center gap-1">
                                <Target className="w-4 h-4 text-orange-400" /> Areas to Improve
                              </p>
                              <ul className="space-y-1">
                                {analysis.leetcode.improvementAreas.map((s, i) => (
                                  <li key={i} className="text-sm text-gray-300">• {s}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-2 flex items-center gap-1">
                              <Sparkles className="w-4 h-4 text-yellow-400" /> Interview Tips
                            </p>
                            <ul className="space-y-1">
                              {analysis.leetcode.interviewTips.map((t, i) => (
                                <li key={i} className="text-sm text-gray-300">• {t}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* GitHub Analysis */}
                    {analysis.github && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          <GitBranch className="w-5 h-5 text-purple-400" />
                          GitHub Analysis
                        </h3>
                        <div className="bg-dark-700/50 rounded-xl p-4 space-y-4">
                          <div className="flex flex-wrap gap-3">
                            <div className="px-3 py-2 rounded-lg bg-dark-600">
                              <p className="text-xs text-gray-400">Developer Level</p>
                              <p className="text-white font-medium">{analysis.github.developerLevel}</p>
                            </div>
                            <div className="px-3 py-2 rounded-lg bg-dark-600">
                              <p className="text-xs text-gray-400">Project Complexity</p>
                              <p className="text-white font-medium">{analysis.github.projectComplexity}</p>
                            </div>
                            <div className="px-3 py-2 rounded-lg bg-dark-600">
                              <p className="text-xs text-gray-400">Portfolio Strength</p>
                              <p className="text-white font-medium">{analysis.github.portfolioStrength}</p>
                            </div>
                            <div className="px-3 py-2 rounded-lg bg-dark-600">
                              <p className="text-xs text-gray-400">Collaboration Score</p>
                              <p className="text-white font-medium">{analysis.github.collaborationScore}/100</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-2">Primary Skills</p>
                            <div className="flex flex-wrap gap-2">
                              {analysis.github.primarySkills.map((skill, i) => (
                                <span key={i} className="px-2 py-1 rounded-md bg-purple-500/20 text-purple-300 text-sm">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Hiring Insights</p>
                            <p className="text-white">{analysis.github.hiringInsights}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-2 flex items-center gap-1">
                              <Sparkles className="w-4 h-4 text-yellow-400" /> Portfolio Recommendations
                            </p>
                            <ul className="space-y-1">
                              {analysis.github.recommendations.map((r, i) => (
                                <li key={i} className="text-sm text-gray-300">• {r}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {!analysis.leetcode && !analysis.github && (
                      <div className="text-center py-8">
                        <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-400">No profile data available for analysis</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">Unable to load analysis</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
