// ============================================
// CREDENCE - Hiring Shortlisted Candidates
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookmarkPlus,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  Star,
  MessageSquare,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight,
  Users,
  Briefcase,
  ArrowUpRight
} from 'lucide-react';

const shortlistedCandidates = [
  {
    id: 1,
    name: 'Rahul Sharma',
    avatar: 'RS',
    title: 'Full Stack Developer',
    skills: ['React', 'Node.js', 'TypeScript'],
    credenseScore: 92,
    addedDate: '2024-01-15',
    status: 'interview_scheduled',
    interviewDate: '2024-01-20',
    notes: 'Strong technical skills, good communication',
    position: 'Senior Frontend Developer'
  },
  {
    id: 2,
    name: 'Priya Patel',
    avatar: 'PP',
    title: 'Data Scientist',
    skills: ['Python', 'TensorFlow', 'SQL'],
    credenseScore: 88,
    addedDate: '2024-01-14',
    status: 'pending_review',
    notes: 'Excellent ML background',
    position: 'Data Scientist'
  },
  {
    id: 3,
    name: 'Amit Kumar',
    avatar: 'AK',
    title: 'Backend Engineer',
    skills: ['Java', 'Spring Boot', 'Kubernetes'],
    credenseScore: 85,
    addedDate: '2024-01-12',
    status: 'offer_sent',
    notes: 'Great system design skills',
    position: 'Backend Engineer'
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    avatar: 'SR',
    title: 'Frontend Developer',
    skills: ['React', 'Vue.js', 'TypeScript'],
    credenseScore: 90,
    addedDate: '2024-01-10',
    status: 'rejected',
    notes: 'Good skills but looking for more experience',
    position: 'Senior Frontend Developer'
  },
  {
    id: 5,
    name: 'Vikram Singh',
    avatar: 'VS',
    title: 'DevOps Engineer',
    skills: ['Docker', 'Kubernetes', 'AWS'],
    credenseScore: 94,
    addedDate: '2024-01-08',
    status: 'hired',
    notes: 'Excellent candidate, fast learner',
    position: 'DevOps Engineer'
  }
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{className?: string}> }> = {
  pending_review: { label: 'Pending Review', color: 'text-yellow-400 bg-yellow-500/20', icon: Clock },
  interview_scheduled: { label: 'Interview Scheduled', color: 'text-blue-400 bg-blue-500/20', icon: Calendar },
  offer_sent: { label: 'Offer Sent', color: 'text-purple-400 bg-purple-500/20', icon: Mail },
  hired: { label: 'Hired', color: 'text-green-400 bg-green-500/20', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'text-red-400 bg-red-500/20', icon: XCircle },
};

export default function HiringShortlisted() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCandidate, setSelectedCandidate] = useState<typeof shortlistedCandidates[0] | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<number | null>(null);

  const filteredCandidates = shortlistedCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Group by status for kanban view
  const groupedByStatus = {
    pending_review: filteredCandidates.filter(c => c.status === 'pending_review'),
    interview_scheduled: filteredCandidates.filter(c => c.status === 'interview_scheduled'),
    offer_sent: filteredCandidates.filter(c => c.status === 'offer_sent'),
    hired: filteredCandidates.filter(c => c.status === 'hired'),
  };

  const stats = {
    total: shortlistedCandidates.length,
    pending: shortlistedCandidates.filter(c => c.status === 'pending_review').length,
    interviewing: shortlistedCandidates.filter(c => c.status === 'interview_scheduled').length,
    hired: shortlistedCandidates.filter(c => c.status === 'hired').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Shortlisted Candidates</h1>
          <p className="text-gray-400 mt-1">Track and manage your candidate pipeline</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <BookmarkPlus className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-xs text-gray-500">Total Shortlisted</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.pending}</p>
              <p className="text-xs text-gray-500">Pending Review</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.interviewing}</p>
              <p className="text-xs text-gray-500">Interviewing</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.hired}</p>
              <p className="text-xs text-gray-500">Hired</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-dark-800 border border-dark-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
        >
          <option value="all">All Status</option>
          <option value="pending_review">Pending Review</option>
          <option value="interview_scheduled">Interview Scheduled</option>
          <option value="offer_sent">Offer Sent</option>
          <option value="hired">Hired</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(groupedByStatus).map(([status, candidates]) => {
          const config = statusConfig[status];
          const StatusIcon = config.icon;
          return (
            <div key={status} className="bg-dark-800/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <StatusIcon className={`w-4 h-4 ${config.color.split(' ')[0]}`} />
                  <span className="text-sm font-medium text-white">{config.label}</span>
                </div>
                <span className="text-xs text-gray-500 bg-dark-700 px-2 py-1 rounded-full">
                  {candidates.length}
                </span>
              </div>
              <div className="space-y-3">
                {candidates.map((candidate, index) => (
                  <motion.div
                    key={candidate.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-dark-800 border border-dark-700 rounded-xl p-4 hover:border-orange-500/30 cursor-pointer transition-all"
                    onClick={() => setSelectedCandidate(candidate)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-medium text-sm">
                          {candidate.avatar}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white">{candidate.name}</h4>
                          <p className="text-xs text-gray-500">{candidate.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-orange-400" />
                        <span className="text-xs text-orange-400">{candidate.credenseScore}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {candidate.skills.slice(0, 2).map(skill => (
                        <span key={skill} className="px-2 py-0.5 bg-dark-700 text-gray-400 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">For: {candidate.position}</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </div>
                  </motion.div>
                ))}
                {candidates.length === 0 && (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    No candidates
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

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
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-dark-800 border-l border-dark-700 z-50 overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">Candidate Details</h2>
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                {/* Profile */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {selectedCandidate.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-white">{selectedCandidate.name}</h3>
                  <p className="text-gray-400">{selectedCandidate.title}</p>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mt-3 ${statusConfig[selectedCandidate.status].color}`}>
                    {(() => {
                      const Icon = statusConfig[selectedCandidate.status].icon;
                      return <Icon className="w-4 h-4" />;
                    })()}
                    <span className="text-sm">{statusConfig[selectedCandidate.status].label}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="bg-dark-700 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Position Applied</h4>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-500" />
                      <span className="text-white">{selectedCandidate.position}</span>
                    </div>
                  </div>

                  <div className="bg-dark-700 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Credense Score</h4>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl font-bold text-orange-400">{selectedCandidate.credenseScore}</div>
                      <div className="flex-1">
                        <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                            style={{ width: `${selectedCandidate.credenseScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-700 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-dark-600 text-gray-300 text-sm rounded-lg">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-dark-700 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Notes</h4>
                    <p className="text-gray-400 text-sm">{selectedCandidate.notes}</p>
                  </div>

                  {selectedCandidate.interviewDate && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-sm font-medium text-blue-400">Interview Scheduled</p>
                          <p className="text-white">{selectedCandidate.interviewDate}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors">
                    <Calendar className="w-5 h-5" />
                    Schedule Interview
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-orange-500 text-orange-400 hover:bg-orange-500/10 rounded-xl transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    Send Message
                  </button>
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-xl transition-colors">
                      <CheckCircle className="w-5 h-5" />
                      Send Offer
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl transition-colors">
                      <XCircle className="w-5 h-5" />
                      Reject
                    </button>
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
