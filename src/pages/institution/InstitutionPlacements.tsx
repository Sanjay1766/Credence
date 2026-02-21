// ============================================
// CREDENCE - Institution Placements Page
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Building2,
  Users,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Plus,
  Eye,
  Mail,
  CheckCircle2,
  Clock,
  X,
  ExternalLink,
  MapPin,
  DollarSign,
  Star
} from 'lucide-react';

// Mock data
const placementStats = {
  totalPlaced: 524,
  averagePackage: '12.5 LPA',
  highestPackage: '45 LPA',
  companiesVisited: 42,
  ongoingDrives: 8,
  offersReceived: 687
};

const upcomingDrives = [
  { id: '1', company: 'Google', role: 'Software Engineer', date: '2026-03-05', package: '35-45 LPA', eligibility: 'CGPA > 8.0', registered: 156, status: 'open' },
  { id: '2', company: 'Microsoft', role: 'SDE', date: '2026-03-12', package: '28-38 LPA', eligibility: 'CGPA > 7.5', registered: 189, status: 'open' },
  { id: '3', company: 'Amazon', role: 'SDE-1', date: '2026-03-18', package: '32-42 LPA', eligibility: 'CGPA > 7.0', registered: 245, status: 'open' },
  { id: '4', company: 'Adobe', role: 'Member Technical Staff', date: '2026-03-25', package: '25-35 LPA', eligibility: 'CGPA > 7.5', registered: 134, status: 'upcoming' },
];

const recentPlacements = [
  { id: '1', student: 'Sneha Reddy', company: 'Google', role: 'Software Engineer', package: '42 LPA', date: '2026-02-15' },
  { id: '2', student: 'Rahul Sharma', company: 'Microsoft', role: 'SDE', package: '38 LPA', date: '2026-02-14' },
  { id: '3', student: 'Priya Patel', company: 'Amazon', role: 'Data Scientist', package: '35 LPA', date: '2026-02-12' },
  { id: '4', student: 'Amit Kumar', company: 'Meta', role: 'Frontend Engineer', package: '40 LPA', date: '2026-02-10' },
  { id: '5', student: 'Vikram Singh', company: 'Apple', role: 'iOS Developer', package: '36 LPA', date: '2026-02-08' },
];

const topRecruiters = [
  { name: 'Google', placements: 28, avgPackage: '40 LPA', logo: null },
  { name: 'Microsoft', placements: 35, avgPackage: '35 LPA', logo: null },
  { name: 'Amazon', placements: 42, avgPackage: '32 LPA', logo: null },
  { name: 'Meta', placements: 18, avgPackage: '38 LPA', logo: null },
  { name: 'Adobe', placements: 22, avgPackage: '28 LPA', logo: null },
];

export default function InstitutionPlacements() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'drives' | 'placements' | 'recruiters'>('drives');
  const [showAddDriveModal, setShowAddDriveModal] = useState(false);
  const [newDrive, setNewDrive] = useState({
    company: '',
    role: '',
    date: '',
    package: '',
    eligibility: '',
    description: ''
  });

  const handleAddDrive = () => {
    // In real app, this would call an API
    console.log('Adding drive:', newDrive);
    setShowAddDriveModal(false);
    setNewDrive({ company: '', role: '', date: '', package: '', eligibility: '', description: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Placements</h1>
          <p className="text-gray-400">Manage placement drives and track student placements</p>
        </div>
        <button
          onClick={() => setShowAddDriveModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Placement Drive
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-green-400" />
            <span className="text-xs text-gray-400">Total Placed</span>
          </div>
          <p className="text-xl font-bold text-white">{placementStats.totalPlaced}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-gray-400">Avg Package</span>
          </div>
          <p className="text-xl font-bold text-white">{placementStats.averagePackage}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-orange-400" />
            <span className="text-xs text-gray-400">Highest Package</span>
          </div>
          <p className="text-xl font-bold text-white">{placementStats.highestPackage}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-gray-400">Companies</span>
          </div>
          <p className="text-xl font-bold text-white">{placementStats.companiesVisited}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-400">Active Drives</span>
          </div>
          <p className="text-xl font-bold text-white">{placementStats.ongoingDrives}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-gray-400">Total Offers</span>
          </div>
          <p className="text-xl font-bold text-white">{placementStats.offersReceived}</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-dark-700">
        <button
          onClick={() => setActiveTab('drives')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'drives' ? 'text-purple-400 border-purple-400' : 'text-gray-400 border-transparent hover:text-white'
          }`}
        >
          Placement Drives
        </button>
        <button
          onClick={() => setActiveTab('placements')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'placements' ? 'text-purple-400 border-purple-400' : 'text-gray-400 border-transparent hover:text-white'
          }`}
        >
          Recent Placements
        </button>
        <button
          onClick={() => setActiveTab('recruiters')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'recruiters' ? 'text-purple-400 border-purple-400' : 'text-gray-400 border-transparent hover:text-white'
          }`}
        >
          Top Recruiters
        </button>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab}...`}
            className="input pl-12 w-full"
          />
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'drives' && (
          <motion.div
            key="drives"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {upcomingDrives.map((drive) => (
              <div key={drive.id} className="card p-6 hover:border-purple-500/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 font-bold">
                      {drive.company[0]}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{drive.company}</h3>
                      <p className="text-sm text-gray-400">{drive.role}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    drive.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {drive.status === 'open' ? 'Open' : 'Upcoming'}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {new Date(drive.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <DollarSign className="w-4 h-4" />
                    {drive.package}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    {drive.registered} students registered
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-4">Eligibility: {drive.eligibility}</p>
                <div className="flex gap-2">
                  <button className="flex-1 btn-primary text-sm">View Details</button>
                  <button className="btn-secondary text-sm">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'placements' && (
          <motion.div
            key="placements"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="card overflow-hidden"
          >
            <table className="w-full">
              <thead className="bg-dark-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Student</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Company</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Package</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Date</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentPlacements.map((placement, index) => (
                  <motion.tr
                    key={placement.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t border-dark-700 hover:bg-dark-700/30"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 text-sm font-medium">
                          {placement.student.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm text-white">{placement.student}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-300">{placement.company}</td>
                    <td className="px-4 py-4 text-sm text-gray-300">{placement.role}</td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium text-green-400">{placement.package}</span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-400">
                      {new Date(placement.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-600 rounded-lg">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {activeTab === 'recruiters' && (
          <motion.div
            key="recruiters"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {topRecruiters.map((recruiter, index) => (
              <div key={recruiter.name} className="card p-6 hover:border-purple-500/50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 font-bold text-xl">
                    {recruiter.name[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{recruiter.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-white">{recruiter.placements}</p>
                    <p className="text-xs text-gray-400">Students Placed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{recruiter.avgPackage}</p>
                    <p className="text-xs text-gray-400">Avg Package</p>
                  </div>
                </div>
                <button className="w-full mt-4 btn-secondary text-sm">View Details</button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Drive Modal */}
      <AnimatePresence>
        {showAddDriveModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowAddDriveModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-dark-800 border border-dark-700 rounded-2xl shadow-xl z-50"
            >
              <div className="p-6 border-b border-dark-700 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Add Placement Drive</h2>
                <button onClick={() => setShowAddDriveModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Company Name</label>
                  <input
                    type="text"
                    value={newDrive.company}
                    onChange={(e) => setNewDrive({ ...newDrive, company: e.target.value })}
                    className="input w-full"
                    placeholder="e.g. Google"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Role</label>
                  <input
                    type="text"
                    value={newDrive.role}
                    onChange={(e) => setNewDrive({ ...newDrive, role: e.target.value })}
                    className="input w-full"
                    placeholder="e.g. Software Engineer"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Date</label>
                    <input
                      type="date"
                      value={newDrive.date}
                      onChange={(e) => setNewDrive({ ...newDrive, date: e.target.value })}
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Package</label>
                    <input
                      type="text"
                      value={newDrive.package}
                      onChange={(e) => setNewDrive({ ...newDrive, package: e.target.value })}
                      className="input w-full"
                      placeholder="e.g. 30-40 LPA"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Eligibility Criteria</label>
                  <input
                    type="text"
                    value={newDrive.eligibility}
                    onChange={(e) => setNewDrive({ ...newDrive, eligibility: e.target.value })}
                    className="input w-full"
                    placeholder="e.g. CGPA > 7.0"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Description</label>
                  <textarea
                    value={newDrive.description}
                    onChange={(e) => setNewDrive({ ...newDrive, description: e.target.value })}
                    className="input w-full h-24 resize-none"
                    placeholder="Additional details about the drive..."
                  />
                </div>
              </div>
              <div className="p-6 border-t border-dark-700 flex gap-3">
                <button onClick={() => setShowAddDriveModal(false)} className="flex-1 btn-secondary">
                  Cancel
                </button>
                <button onClick={handleAddDrive} className="flex-1 btn-primary">
                  Add Drive
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
