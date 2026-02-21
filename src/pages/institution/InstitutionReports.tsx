// ============================================
// CREDENCE - Institution Reports Page
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  BarChart3,
  Users,
  Award,
  Briefcase,
  Clock,
  CheckCircle2,
  Eye,
  Trash2,
  RefreshCw
} from 'lucide-react';

// Mock data
const reportTemplates = [
  {
    id: 'placement',
    name: 'Placement Report',
    description: 'Comprehensive placement statistics including company-wise data',
    icon: Briefcase,
    lastGenerated: '2026-02-18',
    color: 'purple'
  },
  {
    id: 'skills',
    name: 'Skills Analysis Report',
    description: 'In-depth analysis of student skills and proficiency levels',
    icon: Award,
    lastGenerated: '2026-02-15',
    color: 'pink'
  },
  {
    id: 'student-progress',
    name: 'Student Progress Report',
    description: 'Track individual and cohort progress over time',
    icon: Users,
    lastGenerated: '2026-02-20',
    color: 'cyan'
  },
  {
    id: 'analytics',
    name: 'Analytics Summary',
    description: 'High-level overview of institutional performance metrics',
    icon: BarChart3,
    lastGenerated: '2026-02-19',
    color: 'orange'
  },
];

const generatedReports = [
  { id: '1', name: 'Placement Report - February 2026', type: 'placement', date: '2026-02-18', size: '2.4 MB', status: 'ready' },
  { id: '2', name: 'Skills Analysis Q1 2026', type: 'skills', date: '2026-02-15', size: '1.8 MB', status: 'ready' },
  { id: '3', name: 'Student Progress - Batch 2026', type: 'student-progress', date: '2026-02-20', size: '3.2 MB', status: 'ready' },
  { id: '4', name: 'Department-wise Analytics', type: 'analytics', date: '2026-02-19', size: '1.5 MB', status: 'ready' },
  { id: '5', name: 'Placement Report - January 2026', type: 'placement', date: '2026-01-31', size: '2.1 MB', status: 'ready' },
  { id: '6', name: 'Annual Skills Report 2025', type: 'skills', date: '2026-01-05', size: '4.8 MB', status: 'ready' },
];

const scheduledReports = [
  { id: '1', name: 'Weekly Placement Summary', schedule: 'Every Monday', nextRun: '2026-02-24', status: 'active' },
  { id: '2', name: 'Monthly Skills Progress', schedule: '1st of every month', nextRun: '2026-03-01', status: 'active' },
  { id: '3', name: 'Quarterly Analytics Report', schedule: 'Every quarter', nextRun: '2026-04-01', status: 'paused' },
];

export default function InstitutionReports() {
  const [activeTab, setActiveTab] = useState<'generate' | 'history' | 'scheduled'>('generate');
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(['all']);

  const handleGenerateReport = async (templateId: string) => {
    setGeneratingReport(templateId);
    // Simulate report generation
    setTimeout(() => {
      setGeneratingReport(null);
      // In real app, this would add to generatedReports
    }, 3000);
  };

  const handleDownload = (reportId: string) => {
    // In real app, this would trigger file download
    console.log('Downloading report:', reportId);
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      purple: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
      pink: { bg: 'bg-pink-500/20', text: 'text-pink-400' },
      cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400' },
      orange: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
    };
    return colors[color] || colors.purple;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-gray-400">Generate, download, and schedule institutional reports</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-dark-700">
        <button
          onClick={() => setActiveTab('generate')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'generate' ? 'text-purple-400 border-purple-400' : 'text-gray-400 border-transparent hover:text-white'
          }`}
        >
          Generate Reports
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'history' ? 'text-purple-400 border-purple-400' : 'text-gray-400 border-transparent hover:text-white'
          }`}
        >
          Report History
        </button>
        <button
          onClick={() => setActiveTab('scheduled')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'scheduled' ? 'text-purple-400 border-purple-400' : 'text-gray-400 border-transparent hover:text-white'
          }`}
        >
          Scheduled Reports
        </button>
      </div>

      {/* Content */}
      {activeTab === 'generate' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Filters */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Report Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Departments</label>
                <select
                  value={selectedDepartments[0]}
                  onChange={(e) => setSelectedDepartments([e.target.value])}
                  className="input w-full"
                >
                  <option value="all">All Departments</option>
                  <option value="cse">Computer Science</option>
                  <option value="it">Information Technology</option>
                  <option value="ds">Data Science</option>
                  <option value="ece">Electronics</option>
                </select>
              </div>
            </div>
          </div>

          {/* Report Templates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTemplates.map((template) => {
              const Icon = template.icon;
              const colors = getColorClasses(template.color);
              const isGenerating = generatingReport === template.id;

              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card p-6 hover:border-purple-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                      <p className="text-xs text-gray-500 mb-4">
                        Last generated: {new Date(template.lastGenerated).toLocaleDateString()}
                      </p>
                      <button
                        onClick={() => handleGenerateReport(template.id)}
                        disabled={isGenerating}
                        className="btn-primary text-sm flex items-center gap-2"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <FileText className="w-4 h-4" />
                            Generate Report
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {activeTab === 'history' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card overflow-hidden"
        >
          <table className="w-full">
            <thead className="bg-dark-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Report Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Generated</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Size</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {generatedReports.map((report, index) => (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t border-dark-700 hover:bg-dark-700/30"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-purple-400" />
                      <span className="text-sm text-white">{report.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-gray-400 capitalize">{report.type.replace('-', ' ')}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-400">
                    {new Date(report.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-400">{report.size}</td>
                  <td className="px-4 py-4">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs w-fit">
                      <CheckCircle2 className="w-3 h-3" />
                      Ready
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDownload(report.id)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-dark-600 rounded-lg"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-600 rounded-lg" title="Preview">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-dark-600 rounded-lg" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {activeTab === 'scheduled' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {scheduledReports.map((report) => (
            <div key={report.id} className="card p-6 hover:border-purple-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{report.name}</h3>
                    <p className="text-sm text-gray-400">{report.schedule}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Next run</p>
                    <p className="text-sm text-white">{new Date(report.nextRun).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    report.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {report.status === 'active' ? 'Active' : 'Paused'}
                  </span>
                  <button className="btn-secondary text-sm">Edit</button>
                </div>
              </div>
            </div>
          ))}

          <button className="w-full card p-4 border-dashed hover:border-purple-500 transition-colors flex items-center justify-center gap-2 text-gray-400 hover:text-purple-400">
            <Calendar className="w-5 h-5" />
            Schedule New Report
          </button>
        </motion.div>
      )}
    </div>
  );
}
