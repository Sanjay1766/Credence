// ============================================
// CREDENCE - Hiring Job Postings Page
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Plus,
  Search,
  MapPin,
  Clock,
  Users,
  Eye,
  Edit2,
  Trash2,
  MoreVertical,
  CheckCircle,
  XCircle,
  PauseCircle,
  DollarSign,
  Calendar,
  Building2,
  X,
  Save,
  Send
} from 'lucide-react';

const jobPostings = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Bangalore',
    type: 'Full-time',
    remote: true,
    salary: '25-35 LPA',
    posted: '2024-01-10',
    deadline: '2024-02-10',
    status: 'active',
    applications: 45,
    views: 234,
    shortlisted: 8,
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    description: 'We are looking for an experienced Frontend Developer to join our team...'
  },
  {
    id: 2,
    title: 'Data Scientist',
    department: 'Analytics',
    location: 'Mumbai',
    type: 'Full-time',
    remote: false,
    salary: '30-40 LPA',
    posted: '2024-01-08',
    deadline: '2024-02-08',
    status: 'active',
    applications: 32,
    views: 189,
    shortlisted: 5,
    skills: ['Python', 'TensorFlow', 'SQL', 'Machine Learning'],
    description: 'Join our data science team to build innovative ML solutions...'
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Remote',
    type: 'Full-time',
    remote: true,
    salary: '28-38 LPA',
    posted: '2024-01-05',
    deadline: '2024-02-05',
    status: 'paused',
    applications: 28,
    views: 156,
    shortlisted: 4,
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
    description: 'Looking for a DevOps engineer to scale our infrastructure...'
  },
  {
    id: 4,
    title: 'Product Manager',
    department: 'Product',
    location: 'Delhi NCR',
    type: 'Full-time',
    remote: false,
    salary: '35-50 LPA',
    posted: '2024-01-01',
    deadline: '2024-01-31',
    status: 'closed',
    applications: 67,
    views: 345,
    shortlisted: 12,
    skills: ['Product Strategy', 'Agile', 'Analytics', 'User Research'],
    description: 'Lead product development for our core platform...'
  }
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{className?: string}> }> = {
  active: { label: 'Active', color: 'text-green-400 bg-green-500/20', icon: CheckCircle },
  paused: { label: 'Paused', color: 'text-yellow-400 bg-yellow-500/20', icon: PauseCircle },
  closed: { label: 'Closed', color: 'text-gray-400 bg-gray-500/20', icon: XCircle },
};

export default function HiringJobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<typeof jobPostings[0] | null>(null);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  // Form state for new job
  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    remote: false,
    salaryMin: '',
    salaryMax: '',
    deadline: '',
    skills: '',
    description: ''
  });

  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: jobPostings.length,
    active: jobPostings.filter(j => j.status === 'active').length,
    totalApplications: jobPostings.reduce((sum, j) => sum + j.applications, 0),
    totalViews: jobPostings.reduce((sum, j) => sum + j.views, 0),
  };

  const handleCreateJob = () => {
    // In a real app, this would make an API call
    console.log('Creating job:', newJob);
    setShowCreateModal(false);
    setNewJob({
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      remote: false,
      salaryMin: '',
      salaryMax: '',
      deadline: '',
      skills: '',
      description: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Job Postings</h1>
          <p className="text-gray-400 mt-1">Manage and track your job listings</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
          Post New Job
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-xs text-gray-500">Total Jobs</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.active}</p>
              <p className="text-xs text-gray-500">Active Jobs</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalApplications}</p>
              <p className="text-xs text-gray-500">Applications</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Eye className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalViews}</p>
              <p className="text-xs text-gray-500">Total Views</p>
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
            placeholder="Search jobs..."
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
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job, index) => {
          const StatusIcon = statusConfig[job.status].icon;
          return (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-dark-800 border border-dark-700 rounded-xl p-6 hover:border-orange-500/30 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Job Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${statusConfig[job.status].color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig[job.status].label}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                          {job.remote && <span className="text-green-400 ml-1">(Remote)</span>}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {job.skills.map(skill => (
                          <span key={skill} className="px-2 py-1 bg-dark-700 text-gray-300 text-xs rounded-lg">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">{job.applications}</p>
                    <p className="text-xs text-gray-500">Applications</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">{job.views}</p>
                    <p className="text-xs text-gray-500">Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-orange-400">{job.shortlisted}</p>
                    <p className="text-xs text-gray-500">Shortlisted</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="p-2 bg-dark-700 text-gray-400 hover:text-white rounded-lg transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-dark-700 text-gray-400 hover:text-white rounded-lg transition-colors">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === job.id ? null : job.id)}
                      className="p-2 bg-dark-700 text-gray-400 hover:text-white rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {activeMenu === job.id && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-dark-700 border border-dark-600 rounded-xl shadow-xl overflow-hidden z-10">
                        <button className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-dark-600">
                          <PauseCircle className="w-4 h-4" />
                          {job.status === 'paused' ? 'Resume' : 'Pause'} Job
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-dark-600">
                          <XCircle className="w-4 h-4" />
                          Close Job
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-dark-600">
                          <Trash2 className="w-4 h-4" />
                          Delete Job
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Deadline */}
              <div className="mt-4 pt-4 border-t border-dark-700 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  Posted: {job.posted}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  Deadline: {job.deadline}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No jobs found</h3>
          <p className="text-gray-400">Try adjusting your search or create a new job posting</p>
        </div>
      )}

      {/* Create Job Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowCreateModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 bg-dark-800 border border-dark-700 rounded-2xl z-50 overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-dark-700 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Post New Job</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Job Title *</label>
                        <input
                          type="text"
                          value={newJob.title}
                          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                          placeholder="e.g., Senior Frontend Developer"
                          className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Department *</label>
                        <input
                          type="text"
                          value={newJob.department}
                          onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                          placeholder="e.g., Engineering"
                          className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Location *</label>
                        <input
                          type="text"
                          value={newJob.location}
                          onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                          placeholder="e.g., Bangalore"
                          className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Employment Type</label>
                        <select
                          value={newJob.type}
                          onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                          className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newJob.remote}
                        onChange={(e) => setNewJob({ ...newJob, remote: e.target.checked })}
                        className="w-5 h-5 rounded border-dark-600 bg-dark-700 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-gray-300">Remote work available</span>
                    </label>
                  </div>

                  {/* Compensation */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Compensation</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Minimum Salary (LPA)</label>
                        <input
                          type="number"
                          value={newJob.salaryMin}
                          onChange={(e) => setNewJob({ ...newJob, salaryMin: e.target.value })}
                          placeholder="e.g., 20"
                          className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Maximum Salary (LPA)</label>
                        <input
                          type="number"
                          value={newJob.salaryMax}
                          onChange={(e) => setNewJob({ ...newJob, salaryMax: e.target.value })}
                          placeholder="e.g., 35"
                          className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Requirements</h3>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Required Skills (comma separated)</label>
                      <input
                        type="text"
                        value={newJob.skills}
                        onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
                        placeholder="e.g., React, TypeScript, Node.js"
                        className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Application Deadline</label>
                      <input
                        type="date"
                        value={newJob.deadline}
                        onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
                        className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Job Description</h3>
                    <textarea
                      value={newJob.description}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                      placeholder="Describe the role, responsibilities, and what you're looking for..."
                      rows={6}
                      className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-dark-700 flex items-center justify-end gap-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 border border-dark-600 text-gray-400 hover:text-white rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateJob}
                  className="flex items-center gap-2 px-6 py-3 bg-dark-700 text-white hover:bg-dark-600 rounded-xl transition-colors"
                >
                  <Save className="w-5 h-5" />
                  Save as Draft
                </button>
                <button
                  onClick={handleCreateJob}
                  className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors"
                >
                  <Send className="w-5 h-5" />
                  Publish Job
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Job Detail Modal */}
      <AnimatePresence>
        {selectedJob && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSelectedJob(null)}
            />
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-dark-800 border-l border-dark-700 z-50 overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">Job Details</h2>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <Briefcase className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedJob.title}</h3>
                      <p className="text-gray-400">{selectedJob.department}</p>
                    </div>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig[selectedJob.status].color}`}>
                    {(() => {
                      const Icon = statusConfig[selectedJob.status].icon;
                      return <Icon className="w-4 h-4" />;
                    })()}
                    <span className="text-sm">{statusConfig[selectedJob.status].label}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-dark-700 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-white">{selectedJob.applications}</p>
                      <p className="text-xs text-gray-500">Applications</p>
                    </div>
                    <div className="bg-dark-700 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-white">{selectedJob.views}</p>
                      <p className="text-xs text-gray-500">Views</p>
                    </div>
                  </div>

                  <div className="bg-dark-700 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-300">{selectedJob.location}</span>
                      {selectedJob.remote && <span className="text-green-400 text-sm">(Remote)</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-300">{selectedJob.salary}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-300">{selectedJob.type}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-300">Deadline: {selectedJob.deadline}</span>
                    </div>
                  </div>

                  <div className="bg-dark-700 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-dark-600 text-gray-300 text-sm rounded-lg">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-dark-700 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Description</h4>
                    <p className="text-gray-400 text-sm">{selectedJob.description}</p>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors">
                      <Users className="w-5 h-5" />
                      View Applicants
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-dark-600 text-gray-400 hover:text-white rounded-xl transition-colors">
                      <Edit2 className="w-5 h-5" />
                      Edit Job
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
