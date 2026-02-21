// ============================================
// CREDENCE - Hiring Talent Search Page
// ============================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Star,
  Heart,
  MessageSquare,
  Calendar,
  ChevronDown,
  X,
  Github,
  Linkedin,
  ExternalLink,
  Award,
  TrendingUp,
  BookmarkPlus,
  Eye
} from 'lucide-react';

// Mock candidate data
const mockCandidates = [
  {
    id: 1,
    name: 'Rahul Sharma',
    avatar: 'RS',
    title: 'Full Stack Developer',
    location: 'Bangalore, India',
    experience: '3 years',
    education: 'B.Tech Computer Science - IIT Delhi',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    credenseScore: 92,
    availability: 'Immediately',
    expectedSalary: '18-22 LPA',
    leetcodeRating: 1856,
    githubContributions: 847,
    matchPercentage: 95,
    verified: true,
    openToWork: true
  },
  {
    id: 2,
    name: 'Priya Patel',
    avatar: 'PP',
    title: 'Data Scientist',
    location: 'Mumbai, India',
    experience: '4 years',
    education: 'M.Tech Data Science - IIT Bombay',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Spark'],
    credenseScore: 88,
    availability: '1 month',
    expectedSalary: '25-30 LPA',
    leetcodeRating: 1654,
    githubContributions: 523,
    matchPercentage: 87,
    verified: true,
    openToWork: true
  },
  {
    id: 3,
    name: 'Amit Kumar',
    avatar: 'AK',
    title: 'Backend Engineer',
    location: 'Hyderabad, India',
    experience: '2 years',
    education: 'B.Tech CSE - NIT Warangal',
    skills: ['Java', 'Spring Boot', 'Kubernetes', 'PostgreSQL', 'Redis'],
    credenseScore: 85,
    availability: '2 weeks',
    expectedSalary: '15-18 LPA',
    leetcodeRating: 1729,
    githubContributions: 612,
    matchPercentage: 82,
    verified: true,
    openToWork: true
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    avatar: 'SR',
    title: 'Frontend Developer',
    location: 'Chennai, India',
    experience: '3 years',
    education: 'B.E. Computer Science - Anna University',
    skills: ['React', 'Vue.js', 'TypeScript', 'Tailwind', 'Next.js'],
    credenseScore: 90,
    availability: 'Immediately',
    expectedSalary: '16-20 LPA',
    leetcodeRating: 1589,
    githubContributions: 934,
    matchPercentage: 91,
    verified: true,
    openToWork: false
  },
  {
    id: 5,
    name: 'Vikram Singh',
    avatar: 'VS',
    title: 'DevOps Engineer',
    location: 'Pune, India',
    experience: '5 years',
    education: 'B.Tech IT - BITS Pilani',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
    credenseScore: 94,
    availability: '1 month',
    expectedSalary: '28-35 LPA',
    leetcodeRating: 1423,
    githubContributions: 756,
    matchPercentage: 78,
    verified: true,
    openToWork: true
  },
  {
    id: 6,
    name: 'Kavya Menon',
    avatar: 'KM',
    title: 'Machine Learning Engineer',
    location: 'Bangalore, India',
    experience: '2 years',
    education: 'M.S. AI - Stanford University',
    skills: ['Python', 'MLOps', 'PyTorch', 'Computer Vision', 'NLP'],
    credenseScore: 96,
    availability: 'Immediately',
    expectedSalary: '35-45 LPA',
    leetcodeRating: 1967,
    githubContributions: 478,
    matchPercentage: 89,
    verified: true,
    openToWork: true
  }
];

const skillOptions = [
  'React', 'Node.js', 'Python', 'Java', 'TypeScript', 'AWS', 'Docker', 'Kubernetes',
  'MongoDB', 'PostgreSQL', 'TensorFlow', 'PyTorch', 'Go', 'Rust', 'Vue.js', 'Angular'
];

const experienceOptions = ['0-1 years', '1-3 years', '3-5 years', '5-8 years', '8+ years'];
const locationOptions = ['Bangalore', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Chennai', 'Pune', 'Remote'];

export default function HiringTalentSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [minCredenseScore, setMinCredenseScore] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState<typeof mockCandidates[0] | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [savedCandidates, setSavedCandidates] = useState<number[]>([]);

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter(candidate => {
      const matchesSearch = searchQuery === '' ||
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSkills = selectedSkills.length === 0 ||
        selectedSkills.some(skill => candidate.skills.includes(skill));

      const matchesScore = candidate.credenseScore >= minCredenseScore;

      const matchesLocation = selectedLocations.length === 0 ||
        selectedLocations.some(loc => candidate.location.includes(loc));

      return matchesSearch && matchesSkills && matchesScore && matchesLocation;
    });
  }, [searchQuery, selectedSkills, minCredenseScore, selectedLocations]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleSaveCandidate = (id: number) => {
    setSavedCandidates(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Talent Search</h1>
          <p className="text-gray-400 mt-1">Find and connect with verified candidates</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">{filteredCandidates.length} candidates found</span>
          <div className="flex rounded-lg border border-dark-600 overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:text-white'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:text-white'}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, skills, or job title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
            showFilters
              ? 'bg-orange-500/20 border-orange-500/30 text-orange-400'
              : 'border-dark-600 text-gray-400 hover:text-white hover:border-dark-500'
          }`}
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-dark-800 border border-dark-700 rounded-xl p-6 space-y-6"
          >
            {/* Skills Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Skills</label>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      selectedSkills.includes(skill)
                        ? 'bg-orange-500 text-white'
                        : 'bg-dark-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* More Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <div className="space-y-2">
                  {locationOptions.map(loc => (
                    <label key={loc} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(loc)}
                        onChange={() => setSelectedLocations(prev =>
                          prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
                        )}
                        className="w-4 h-4 rounded border-dark-600 bg-dark-700 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-400">{loc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Experience</label>
                <div className="space-y-2">
                  {experienceOptions.map(exp => (
                    <label key={exp} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedExperience.includes(exp)}
                        onChange={() => setSelectedExperience(prev =>
                          prev.includes(exp) ? prev.filter(e => e !== exp) : [...prev, exp]
                        )}
                        className="w-4 h-4 rounded border-dark-600 bg-dark-700 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-400">{exp}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Credense Score */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Minimum Credense Score: {minCredenseScore}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={minCredenseScore}
                  onChange={(e) => setMinCredenseScore(Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedSkills.length > 0 || selectedLocations.length > 0 || minCredenseScore > 0) && (
              <button
                onClick={() => {
                  setSelectedSkills([]);
                  setSelectedLocations([]);
                  setSelectedExperience([]);
                  setMinCredenseScore(0);
                }}
                className="text-sm text-orange-400 hover:underline"
              >
                Clear all filters
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Candidates Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredCandidates.map((candidate, index) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-dark-800 border border-dark-700 rounded-xl p-6 hover:border-orange-500/30 transition-all ${
              viewMode === 'list' ? 'flex items-center gap-6' : ''
            }`}
          >
            {/* Profile Header */}
            <div className={viewMode === 'list' ? 'flex items-center gap-4 flex-1' : ''}>
              <div className={viewMode === 'list' ? 'flex items-center gap-4' : 'flex items-start justify-between mb-4'}>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                      {candidate.avatar}
                    </div>
                    {candidate.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Award className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-semibold">{candidate.name}</h3>
                      {candidate.openToWork && (
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                          Open to Work
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{candidate.title}</p>
                  </div>
                </div>
                {viewMode === 'grid' && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-orange-400" />
                    <span className="text-orange-400 font-medium">{candidate.credenseScore}</span>
                  </div>
                )}
              </div>

              {viewMode === 'list' && (
                <div className="flex items-center gap-6 ml-auto">
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-400">{candidate.credenseScore}</div>
                    <div className="text-xs text-gray-500">Credense</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{candidate.matchPercentage}%</div>
                    <div className="text-xs text-gray-500">Match</div>
                  </div>
                </div>
              )}
            </div>

            {viewMode === 'grid' && (
              <>
                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" />
                    {candidate.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Briefcase className="w-4 h-4" />
                    {candidate.experience}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <GraduationCap className="w-4 h-4" />
                    <span className="truncate">{candidate.education}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {candidate.skills.slice(0, 4).map(skill => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-dark-700 text-gray-300 text-xs rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.length > 4 && (
                    <span className="px-2 py-1 bg-dark-700 text-gray-500 text-xs rounded-lg">
                      +{candidate.skills.length - 4}
                    </span>
                  )}
                </div>

                {/* Match Score */}
                <div className="flex items-center justify-between mb-4 p-3 bg-dark-700 rounded-lg">
                  <span className="text-sm text-gray-400">Match Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-dark-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                        style={{ width: `${candidate.matchPercentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-white">{candidate.matchPercentage}%</span>
                  </div>
                </div>
              </>
            )}

            {/* Actions */}
            <div className={viewMode === 'list' ? 'flex items-center gap-2' : 'flex gap-2'}>
              <button
                onClick={() => setSelectedCandidate(candidate)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                {viewMode === 'grid' && 'View Profile'}
              </button>
              <button
                onClick={() => toggleSaveCandidate(candidate.id)}
                className={`p-2 rounded-lg transition-colors ${
                  savedCandidates.includes(candidate.id)
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-dark-700 text-gray-400 hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${savedCandidates.includes(candidate.id) ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 bg-dark-700 text-gray-400 hover:text-white rounded-lg transition-colors">
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No candidates found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Candidate Detail Modal */}
      <AnimatePresence>
        {selectedCandidate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSelectedCandidate(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 bg-dark-800 border border-dark-700 rounded-2xl z-50 overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-dark-700 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Candidate Profile</h2>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Profile Info */}
                  <div className="space-y-6">
                    {/* Profile Card */}
                    <div className="bg-dark-700 rounded-xl p-6 text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                        {selectedCandidate.avatar}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{selectedCandidate.name}</h3>
                      <p className="text-gray-400 mb-4">{selectedCandidate.title}</p>
                      <div className="flex justify-center gap-3">
                        <button className="p-2 bg-dark-600 text-gray-400 hover:text-white rounded-lg">
                          <Github className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-dark-600 text-gray-400 hover:text-white rounded-lg">
                          <Linkedin className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-dark-600 text-gray-400 hover:text-white rounded-lg">
                          <ExternalLink className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-dark-700 rounded-xl p-6 space-y-4">
                      <h4 className="text-sm font-medium text-gray-300">Details</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-400">{selectedCandidate.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Briefcase className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-400">{selectedCandidate.experience}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <GraduationCap className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-400">{selectedCandidate.education}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-400">Available: {selectedCandidate.availability}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Skills & Stats */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-dark-700 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-orange-400">{selectedCandidate.credenseScore}</div>
                        <div className="text-xs text-gray-500">Credense Score</div>
                      </div>
                      <div className="bg-dark-700 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-400">{selectedCandidate.matchPercentage}%</div>
                        <div className="text-xs text-gray-500">Match Score</div>
                      </div>
                      <div className="bg-dark-700 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-purple-400">{selectedCandidate.leetcodeRating}</div>
                        <div className="text-xs text-gray-500">LeetCode Rating</div>
                      </div>
                      <div className="bg-dark-700 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-blue-400">{selectedCandidate.githubContributions}</div>
                        <div className="text-xs text-gray-500">GitHub Contributions</div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="bg-dark-700 rounded-xl p-6">
                      <h4 className="text-sm font-medium text-gray-300 mb-4">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.skills.map(skill => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 bg-dark-600 text-gray-300 rounded-lg text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expected Compensation */}
                    <div className="bg-dark-700 rounded-xl p-6">
                      <h4 className="text-sm font-medium text-gray-300 mb-4">Compensation Expectation</h4>
                      <div className="text-2xl font-bold text-white">{selectedCandidate.expectedSalary}</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors font-medium">
                        <BookmarkPlus className="w-5 h-5" />
                        Shortlist Candidate
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-orange-500 text-orange-400 hover:bg-orange-500/10 rounded-xl transition-colors font-medium">
                        <MessageSquare className="w-5 h-5" />
                        Send Message
                      </button>
                      <button className="flex items-center justify-center gap-2 px-6 py-3 border border-dark-600 text-gray-400 hover:text-white hover:border-dark-500 rounded-xl transition-colors">
                        <Calendar className="w-5 h-5" />
                        Schedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
