// ============================================
// CREDENCE - Institution Students Page
// ============================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
  Eye,
  Mail,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  GraduationCap,
  X,
  SortAsc,
  SortDesc
} from 'lucide-react';

// Mock student data
const mockStudents = [
  { id: '1', name: 'Sneha Reddy', email: 'sneha.r@techuniv.edu', department: 'Computer Science', year: 4, cgpa: 9.2, credenseScore: 94, skills: 28, githubConnected: true, leetcodeConnected: true, status: 'active', avatar: null },
  { id: '2', name: 'Rahul Sharma', email: 'rahul.s@techuniv.edu', department: 'Information Technology', year: 4, cgpa: 8.8, credenseScore: 91, skills: 25, githubConnected: true, leetcodeConnected: true, status: 'active', avatar: null },
  { id: '3', name: 'Priya Patel', email: 'priya.p@techuniv.edu', department: 'Data Science', year: 3, cgpa: 9.0, credenseScore: 89, skills: 24, githubConnected: true, leetcodeConnected: false, status: 'active', avatar: null },
  { id: '4', name: 'Amit Kumar', email: 'amit.k@techuniv.edu', department: 'Computer Science', year: 4, cgpa: 8.5, credenseScore: 87, skills: 22, githubConnected: true, leetcodeConnected: true, status: 'active', avatar: null },
  { id: '5', name: 'Vikram Singh', email: 'vikram.s@techuniv.edu', department: 'Electronics', year: 3, cgpa: 8.3, credenseScore: 85, skills: 21, githubConnected: false, leetcodeConnected: true, status: 'pending', avatar: null },
  { id: '6', name: 'Ananya Gupta', email: 'ananya.g@techuniv.edu', department: 'Computer Science', year: 2, cgpa: 9.1, credenseScore: 82, skills: 18, githubConnected: true, leetcodeConnected: true, status: 'active', avatar: null },
  { id: '7', name: 'Karthik Menon', email: 'karthik.m@techuniv.edu', department: 'Information Technology', year: 4, cgpa: 8.0, credenseScore: 79, skills: 16, githubConnected: true, leetcodeConnected: false, status: 'active', avatar: null },
  { id: '8', name: 'Divya Nair', email: 'divya.n@techuniv.edu', department: 'Data Science', year: 3, cgpa: 8.7, credenseScore: 76, skills: 15, githubConnected: false, leetcodeConnected: false, status: 'inactive', avatar: null },
  { id: '9', name: 'Arjun Krishnan', email: 'arjun.k@techuniv.edu', department: 'Mechanical', year: 4, cgpa: 7.8, credenseScore: 72, skills: 12, githubConnected: true, leetcodeConnected: true, status: 'active', avatar: null },
  { id: '10', name: 'Meera Iyer', email: 'meera.i@techuniv.edu', department: 'Electronics', year: 2, cgpa: 8.9, credenseScore: 68, skills: 10, githubConnected: false, leetcodeConnected: true, status: 'pending', avatar: null },
];

const departments = ['All Departments', 'Computer Science', 'Information Technology', 'Data Science', 'Electronics', 'Mechanical'];
const years = ['All Years', '1st Year', '2nd Year', '3rd Year', '4th Year'];
const statuses = ['All Status', 'Active', 'Pending', 'Inactive'];

type SortField = 'name' | 'credenseScore' | 'cgpa' | 'skills';
type SortOrder = 'asc' | 'desc';

export default function InstitutionStudents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [sortField, setSortField] = useState<SortField>('credenseScore');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewingStudent, setViewingStudent] = useState<typeof mockStudents[0] | null>(null);

  const filteredStudents = useMemo(() => {
    let result = [...mockStudents];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query) ||
        s.department.toLowerCase().includes(query)
      );
    }

    // Department filter
    if (selectedDepartment !== 'All Departments') {
      result = result.filter(s => s.department === selectedDepartment);
    }

    // Year filter
    if (selectedYear !== 'All Years') {
      const yearNum = parseInt(selectedYear);
      result = result.filter(s => s.year === yearNum);
    }

    // Status filter
    if (selectedStatus !== 'All Status') {
      result = result.filter(s => s.status === selectedStatus.toLowerCase());
    }

    // Sorting
    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });

    return result;
  }, [searchQuery, selectedDepartment, selectedYear, selectedStatus, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const toggleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id));
    }
  };

  const toggleSelectStudent = (id: string) => {
    setSelectedStudents(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Department', 'Year', 'CGPA', 'Credense Score', 'Skills', 'Status'];
    const data = filteredStudents.map(s => [s.name, s.email, s.department, s.year, s.cgpa, s.credenseScore, s.skills, s.status]);
    const csvContent = [headers, ...data].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students_export.csv';
    a.click();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs"><CheckCircle2 className="w-3 h-3" /> Active</span>;
      case 'pending':
        return <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs"><Clock className="w-3 h-3" /> Pending</span>;
      case 'inactive':
        return <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-500/20 text-gray-400 text-xs"><AlertCircle className="w-3 h-3" /> Inactive</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Students</h1>
          <p className="text-gray-400">Manage and track your institution's students</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportToCSV}
            className="btn-secondary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Users className="w-4 h-4" />
            Invite Students
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{mockStudents.length}</p>
              <p className="text-sm text-gray-400">Total Students</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{mockStudents.filter(s => s.status === 'active').length}</p>
              <p className="text-sm text-gray-400">Active</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{mockStudents.filter(s => s.status === 'pending').length}</p>
              <p className="text-sm text-gray-400">Pending</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{(mockStudents.reduce((a, b) => a + b.credenseScore, 0) / mockStudents.length).toFixed(0)}</p>
              <p className="text-sm text-gray-400">Avg Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="card p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or department..."
              className="input pl-12 w-full"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary flex items-center gap-2 ${showFilters ? 'bg-purple-500/20 border-purple-500' : ''}`}
          >
            <Filter className="w-4 h-4" />
            Filters
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-dark-700">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Department</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="input w-full"
                  >
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="input w-full"
                  >
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="input w-full"
                  >
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Student Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-700/50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-dark-500 bg-dark-700 text-purple-500"
                  />
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white"
                  >
                    Student
                    {sortField === 'name' && (sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />)}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Department</th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('cgpa')}
                    className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white"
                  >
                    CGPA
                    {sortField === 'cgpa' && (sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />)}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('credenseScore')}
                    className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white"
                  >
                    Credense Score
                    {sortField === 'credenseScore' && (sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />)}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('skills')}
                    className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white"
                  >
                    Skills
                    {sortField === 'skills' && (sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />)}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Integrations</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-t border-dark-700 hover:bg-dark-700/30"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => toggleSelectStudent(student.id)}
                      className="w-4 h-4 rounded border-dark-500 bg-dark-700 text-purple-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 font-medium text-sm">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-300">{student.department}</p>
                    <p className="text-xs text-gray-500">Year {student.year}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-white">{student.cgpa}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-dark-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          style={{ width: `${student.credenseScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white">{student.credenseScore}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-300">{student.skills} verified</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${student.githubConnected ? 'bg-green-400' : 'bg-gray-500'}`} title="GitHub" />
                      <span className={`w-2 h-2 rounded-full ${student.leetcodeConnected ? 'bg-yellow-400' : 'bg-gray-500'}`} title="LeetCode" />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(student.status)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setViewingStudent(student)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-dark-600 rounded-lg"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-600 rounded-lg">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-600 rounded-lg">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-dark-700 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing {filteredStudents.length} of {mockStudents.length} students
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm text-gray-400 hover:text-white bg-dark-700 rounded-lg disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 text-sm text-white bg-purple-500 rounded-lg">1</button>
            <button className="px-3 py-1 text-sm text-gray-400 hover:text-white bg-dark-700 rounded-lg">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      <AnimatePresence>
        {viewingStudent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setViewingStudent(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-dark-800 border border-dark-700 rounded-2xl shadow-xl z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-dark-700 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Student Profile</h2>
                <button onClick={() => setViewingStudent(null)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 font-bold text-2xl">
                    {viewingStudent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{viewingStudent.name}</h3>
                    <p className="text-gray-400">{viewingStudent.email}</p>
                    <p className="text-sm text-gray-500 mt-1">{viewingStudent.department} • Year {viewingStudent.year}</p>
                    <div className="mt-3">{getStatusBadge(viewingStudent.status)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-dark-700/50">
                    <p className="text-2xl font-bold text-white">{viewingStudent.credenseScore}</p>
                    <p className="text-sm text-gray-400">Credense Score</p>
                  </div>
                  <div className="p-4 rounded-xl bg-dark-700/50">
                    <p className="text-2xl font-bold text-white">{viewingStudent.cgpa}</p>
                    <p className="text-sm text-gray-400">CGPA</p>
                  </div>
                  <div className="p-4 rounded-xl bg-dark-700/50">
                    <p className="text-2xl font-bold text-white">{viewingStudent.skills}</p>
                    <p className="text-sm text-gray-400">Verified Skills</p>
                  </div>
                  <div className="p-4 rounded-xl bg-dark-700/50">
                    <p className="text-2xl font-bold text-white">Year {viewingStudent.year}</p>
                    <p className="text-sm text-gray-400">Current Year</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Connected Platforms</h4>
                  <div className="flex gap-3">
                    <div className={`px-4 py-2 rounded-lg flex items-center gap-2 ${viewingStudent.githubConnected ? 'bg-green-500/20 text-green-400' : 'bg-dark-700 text-gray-500'}`}>
                      <CheckCircle2 className="w-4 h-4" />
                      GitHub
                    </div>
                    <div className={`px-4 py-2 rounded-lg flex items-center gap-2 ${viewingStudent.leetcodeConnected ? 'bg-yellow-500/20 text-yellow-400' : 'bg-dark-700 text-gray-500'}`}>
                      <CheckCircle2 className="w-4 h-4" />
                      LeetCode
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 btn-primary">View Full Profile</button>
                  <button className="btn-secondary flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Contact
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
