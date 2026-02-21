// ============================================
// CREDENCE - Institution Dashboard
// Real demo data integration
// ============================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  GraduationCap,
  CheckCircle2,
  Search,
  Download,
  Zap,
  Code2,
  GitBranch,
  Loader2,
  Brain,
  X,
  Sparkles,
  Target,
  AlertCircle
} from 'lucide-react';
import { 
  fetchAllDemoStudents, 
  calculateInstitutionStats, 
  DemoStudent, 
  DEMO_INSTITUTION 
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

export default function InstitutionDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<DemoStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<DemoStudent | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    avgScore: 0,
    avgLeetcodeSolved: 0,
    avgGithubRepos: 0,
    topSkills: [] as { skill: string; count: number }[],
    skillDistribution: [] as { name: string; value: number }[],
  });

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const fetchedStudents = await fetchAllDemoStudents();
        setStudents(fetchedStudents);
        setStats(calculateInstitutionStats(fetchedStudents));
      } catch (error) {
        console.error('Failed to load student data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter students based on search
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Recent activity based on real data
  const recentActivity = students.slice(0, 5).map((student, i) => ({
    id: student.id,
    student: student.name,
    action: student.leetcodeStats 
      ? `Solved ${student.leetcodeStats.totalSolved} LeetCode problems`
      : student.githubProfile 
        ? `Has ${student.githubProfile.publicRepos} GitHub repositories`
        : 'Profile created',
    time: `${i * 2 + 1} hours ago`,
  }));

  // AI Analysis function
  const analyzeStudent = async (student: DemoStudent) => {
    setSelectedStudent(student);
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const results: AIAnalysis = {};

      // Analyze LeetCode profile if available
      if (student.leetcodeStats) {
        results.leetcode = await groqService.analyzeLeetCodeProfile({
          username: student.leetcodeUsername,
          totalSolved: student.leetcodeStats.totalSolved,
          easySolved: student.leetcodeStats.easySolved,
          mediumSolved: student.leetcodeStats.mediumSolved,
          hardSolved: student.leetcodeStats.hardSolved,
          ranking: student.leetcodeStats.ranking || 0,
          acceptanceRate: student.leetcodeStats.acceptanceRate || 0,
        });
      }

      // Analyze GitHub profile if available
      if (student.githubProfile) {
        results.github = await groqService.analyzeGitHubProfile({
          username: student.githubUsername,
          publicRepos: student.githubProfile.publicRepos,
          followers: student.githubProfile.followers,
          following: student.githubProfile.following || 0,
          bio: student.githubProfile.bio,
          repositories: [], // Would need to fetch repos for detailed analysis
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
    setSelectedStudent(null);
    setAnalysis(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{DEMO_INSTITUTION.name}</h1>
          <p className="text-gray-400 mt-1">{DEMO_INSTITUTION.location} | {stats.totalStudents} Students Registered</p>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-accent-primary animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading real student data from GitHub & LeetCode...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{stats.totalStudents}</p>
              <p className="text-sm text-gray-400">Total Students</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{stats.avgScore}</p>
              <p className="text-sm text-gray-400">Avg. Credense Score</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{stats.avgLeetcodeSolved}</p>
              <p className="text-sm text-gray-400">Avg. LeetCode Solved</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <GitBranch className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{stats.avgGithubRepos}</p>
              <p className="text-sm text-gray-400">Avg. GitHub Repos</p>
            </motion.div>
          </div>

          {/* Skills & Activity Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 card p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-6">Top Skills Across Students</h2>
              <div className="space-y-4">
                {stats.topSkills.slice(0, 6).map((skill, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-32 text-sm text-gray-400 truncate">{skill.skill}</div>
                    <div className="flex-1">
                      <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          style={{ width: `${(skill.count / stats.totalStudents) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-white w-16 text-right">
                      {skill.count} students
                    </span>
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
              <h2 className="text-lg font-semibold text-white mb-6">Student Highlights</h2>
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
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* All Students */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">All Students</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search students or skills..."
                    className="input pl-10 py-2 text-sm w-64"
                  />
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-600">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Rank</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Student</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">LeetCode</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">GitHub</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Skills</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Score</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr key={student.id} className="border-b border-dark-700 hover:bg-dark-700/50">
                      <td className="py-4 px-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                          index === 1 ? 'bg-gray-400/20 text-gray-300' :
                          index === 2 ? 'bg-orange-500/20 text-orange-400' :
                          'bg-dark-600 text-gray-400'
                        }`}>
                          {index + 1}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {student.avatar ? (
                            <img src={student.avatar} alt="" className="w-10 h-10 rounded-full" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                              {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-white">{student.name}</p>
                            <p className="text-xs text-gray-400">{student.major} • {student.graduationYear}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {student.leetcodeStats ? (
                          <div className="flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-orange-400" />
                            <div>
                              <p className="text-sm text-white">{student.leetcodeStats.totalSolved} solved</p>
                              <p className="text-xs text-gray-400">
                                E:{student.leetcodeStats.easySolved} M:{student.leetcodeStats.mediumSolved} H:{student.leetcodeStats.hardSolved}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500">Not connected</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {student.githubProfile ? (
                          <div className="flex items-center gap-2">
                            <GitBranch className="w-4 h-4 text-purple-400" />
                            <div>
                              <p className="text-sm text-white">{student.githubProfile.publicRepos} repos</p>
                              <p className="text-xs text-gray-400">{student.githubProfile.followers} followers</p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500">Not connected</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {student.skills.slice(0, 3).map((skill, i) => (
                            <span key={i} className="px-2 py-0.5 rounded text-xs bg-dark-600 text-gray-300">
                              {skill}
                            </span>
                          ))}
                          {student.skills.length > 3 && (
                            <span className="px-2 py-0.5 rounded text-xs bg-dark-600 text-gray-400">
                              +{student.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-dark-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                student.overallScore >= 70 ? 'bg-green-500' :
                                student.overallScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${student.overallScore}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-white">{student.overallScore}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => analyzeStudent(student)}
                            className="px-3 py-1.5 text-sm font-medium rounded-lg bg-accent-primary hover:bg-accent-primary/80 text-white transition-colors"
                            title="Analyse Profile"
                          >
                            Analyse
                          </button>
                          <a 
                            href={`https://github.com/${student.githubUsername}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-dark-600 rounded-lg transition-colors"
                            title="View GitHub"
                          >
                            <GitBranch className="w-4 h-4 text-gray-400 hover:text-white" />
                          </a>
                          <a 
                            href={`https://leetcode.com/u/${student.leetcodeUsername}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-dark-600 rounded-lg transition-colors"
                            title="View LeetCode"
                          >
                            <Code2 className="w-4 h-4 text-gray-400 hover:text-white" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}

      {/* AI Analysis Modal */}
      <AnimatePresence>
        {selectedStudent && (
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
                  {selectedStudent.avatar ? (
                    <img src={selectedStudent.avatar} alt="" className="w-12 h-12 rounded-full" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {selectedStudent.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      {selectedStudent.name}
                      <Sparkles className="w-5 h-5 text-purple-400" />
                    </h2>
                    <p className="text-sm text-gray-400">Profile Analysis</p>
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
                    <div className="relative">
                      <Brain className="w-16 h-16 text-purple-400 animate-pulse" />
                      <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-bounce" />
                    </div>
                    <p className="mt-4 text-gray-400">Analyzing with Groq AI...</p>
                    <p className="text-xs text-gray-500 mt-2">Evaluating LeetCode & GitHub profiles</p>
                  </div>
                ) : analysis ? (
                  <div className="space-y-6">
                    {/* LeetCode Analysis */}
                    {analysis.leetcode && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          <Code2 className="w-5 h-5 text-yellow-400" />
                          LeetCode Analysis
                        </h3>
                        <div className="bg-dark-700/50 rounded-xl p-4 space-y-4">
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Overall Assessment</p>
                            <p className="text-white">{analysis.leetcode.overallAssessment}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">Readiness Level:</span>
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
                                <Target className="w-4 h-4 text-orange-400" /> Improvements
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
                              <Sparkles className="w-4 h-4 text-yellow-400" /> Recommendations
                            </p>
                            <ul className="space-y-1">
                              {analysis.leetcode.recommendations.map((r, i) => (
                                <li key={i} className="text-sm text-gray-300">• {r}</li>
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
                              <Sparkles className="w-4 h-4 text-yellow-400" /> Recommendations
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
                    <p className="text-gray-400">Click a student to analyze their profile</p>
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
