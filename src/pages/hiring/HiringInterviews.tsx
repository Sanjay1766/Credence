// ============================================
// CREDENCE - Hiring Interviews Page
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  User,
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  X,
  CheckCircle,
  XCircle,
  MessageSquare,
  Star,
  FileText,
  Edit2,
  Trash2
} from 'lucide-react';

const interviews = [
  {
    id: 1,
    candidate: 'Rahul Sharma',
    avatar: 'RS',
    position: 'Senior Frontend Developer',
    date: '2024-01-20',
    time: '10:00 AM',
    duration: '1 hour',
    type: 'video',
    round: 'Technical Round',
    interviewers: ['Priya M.', 'Arun K.'],
    status: 'scheduled',
    notes: 'Focus on React and system design',
    meetLink: 'https://meet.google.com/abc-xyz'
  },
  {
    id: 2,
    candidate: 'Priya Patel',
    avatar: 'PP',
    position: 'Data Scientist',
    date: '2024-01-20',
    time: '2:00 PM',
    duration: '45 mins',
    type: 'video',
    round: 'HR Round',
    interviewers: ['Sneha R.'],
    status: 'scheduled',
    notes: 'Cultural fit assessment',
    meetLink: 'https://meet.google.com/def-uvw'
  },
  {
    id: 3,
    candidate: 'Amit Kumar',
    avatar: 'AK',
    position: 'Backend Engineer',
    date: '2024-01-21',
    time: '11:00 AM',
    duration: '1 hour',
    type: 'onsite',
    round: 'Final Round',
    interviewers: ['Vikram S.', 'Deepa L.', 'Raj T.'],
    status: 'scheduled',
    notes: 'Meet with the team',
    location: 'TechCorp HQ, Bangalore'
  },
  {
    id: 4,
    candidate: 'Sneha Reddy',
    avatar: 'SR',
    position: 'Frontend Developer',
    date: '2024-01-19',
    time: '3:00 PM',
    duration: '1 hour',
    type: 'video',
    round: 'Technical Round',
    interviewers: ['Arun K.'],
    status: 'completed',
    notes: '',
    feedback: 'Strong candidate, good problem-solving skills',
    rating: 4
  },
  {
    id: 5,
    candidate: 'Vikram Singh',
    avatar: 'VS',
    position: 'DevOps Engineer',
    date: '2024-01-18',
    time: '10:00 AM',
    duration: '1 hour',
    type: 'phone',
    round: 'Screening',
    interviewers: ['HR Team'],
    status: 'completed',
    feedback: 'Excellent experience, proceeding to next round',
    rating: 5
  }
];

const typeConfig: Record<string, { icon: React.ComponentType<{className?: string}>; label: string; color: string }> = {
  video: { icon: Video, label: 'Video Call', color: 'text-blue-400 bg-blue-500/20' },
  phone: { icon: Phone, label: 'Phone', color: 'text-green-400 bg-green-500/20' },
  onsite: { icon: MapPin, label: 'On-site', color: 'text-purple-400 bg-purple-500/20' },
};

export default function HiringInterviews() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'calendar' | 'list'>('list');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<typeof interviews[0] | null>(null);

  // Schedule interview form state
  const [scheduleForm, setScheduleForm] = useState({
    candidate: '',
    position: '',
    date: '',
    time: '',
    duration: '1 hour',
    type: 'video',
    round: '',
    interviewers: '',
    notes: ''
  });

  const todayInterviews = interviews.filter(i => i.status === 'scheduled');
  const completedInterviews = interviews.filter(i => i.status === 'completed');

  const upcomingByDate = todayInterviews.reduce((acc, interview) => {
    if (!acc[interview.date]) {
      acc[interview.date] = [];
    }
    acc[interview.date].push(interview);
    return acc;
  }, {} as Record<string, typeof interviews>);

  const handleSchedule = () => {
    console.log('Scheduling interview:', scheduleForm);
    setShowScheduleModal(false);
    setScheduleForm({
      candidate: '',
      position: '',
      date: '',
      time: '',
      duration: '1 hour',
      type: 'video',
      round: '',
      interviewers: '',
      notes: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Interviews</h1>
          <p className="text-gray-400 mt-1">Schedule and manage candidate interviews</p>
        </div>
        <button
          onClick={() => setShowScheduleModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
          Schedule Interview
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{todayInterviews.length}</p>
              <p className="text-xs text-gray-500">Upcoming</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{completedInterviews.length}</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">2</p>
              <p className="text-xs text-gray-500">Today</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Video className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">3</p>
              <p className="text-xs text-gray-500">Video Calls</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex rounded-lg border border-dark-600 overflow-hidden">
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 text-sm ${view === 'list' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:text-white'}`}
          >
            List View
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`px-4 py-2 text-sm ${view === 'calendar' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:text-white'}`}
          >
            Calendar
          </button>
        </div>
      </div>

      {/* Upcoming Interviews */}
      <div className="space-y-6">
        {Object.entries(upcomingByDate).map(([date, dateInterviews]) => (
          <div key={date}>
            <h3 className="text-sm font-medium text-gray-400 mb-4">{date}</h3>
            <div className="space-y-4">
              {dateInterviews.map((interview, index) => {
                const TypeIcon = typeConfig[interview.type].icon;
                return (
                  <motion.div
                    key={interview.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-dark-800 border border-dark-700 rounded-xl p-6 hover:border-orange-500/30 transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                          {interview.avatar}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">{interview.candidate}</h4>
                          <p className="text-sm text-gray-400">{interview.position}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${typeConfig[interview.type].color}`}>
                              <TypeIcon className="w-3 h-3" />
                              {typeConfig[interview.type].label}
                            </span>
                            <span className="text-xs text-gray-500">
                              {interview.round}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="flex items-center gap-2 text-white">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{interview.time}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{interview.duration}</p>
                        </div>

                        <div className="text-center hidden md:block">
                          <div className="flex items-center gap-2 text-white">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{interview.interviewers.length}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Interviewers</p>
                        </div>

                        <div className="flex items-center gap-2">
                          {interview.type === 'video' && interview.meetLink && (
                            <a
                              href={interview.meetLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                            >
                              <Video className="w-4 h-4" />
                              Join
                            </a>
                          )}
                          <button
                            onClick={() => setSelectedInterview(interview)}
                            className="p-2 bg-dark-700 text-gray-400 hover:text-white rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {interview.notes && (
                      <div className="mt-4 pt-4 border-t border-dark-700">
                        <p className="text-sm text-gray-500">
                          <span className="text-gray-400">Note:</span> {interview.notes}
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Completed Interviews */}
      {completedInterviews.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Recently Completed</h3>
          <div className="space-y-4">
            {completedInterviews.map((interview, index) => (
              <motion.div
                key={interview.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-dark-800/50 border border-dark-700 rounded-xl p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center text-white font-medium">
                      {interview.avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{interview.candidate}</h4>
                      <p className="text-sm text-gray-500">{interview.position} • {interview.round}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {interview.rating && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < interview.rating ? 'text-orange-400 fill-orange-400' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                    )}
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                      Completed
                    </span>
                  </div>
                </div>
                {interview.feedback && (
                  <div className="mt-4 pt-4 border-t border-dark-700">
                    <p className="text-sm text-gray-400">
                      <span className="text-gray-300">Feedback:</span> {interview.feedback}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowScheduleModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 bg-dark-800 border border-dark-700 rounded-2xl z-50 overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-dark-700 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Schedule Interview</h2>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Candidate Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Candidate Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Candidate Name *</label>
                        <input
                          type="text"
                          value={scheduleForm.candidate}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, candidate: e.target.value })}
                          placeholder="Search or enter name"
                          className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Position *</label>
                        <input
                          type="text"
                          value={scheduleForm.position}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, position: e.target.value })}
                          placeholder="e.g., Senior Frontend Developer"
                          className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Schedule Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Schedule Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Date *</label>
                        <input
                          type="date"
                          value={scheduleForm.date}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                          className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Time *</label>
                        <input
                          type="time"
                          value={scheduleForm.time}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                          className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Duration</label>
                        <select
                          value={scheduleForm.duration}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, duration: e.target.value })}
                          className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                        >
                          <option value="30 mins">30 minutes</option>
                          <option value="45 mins">45 minutes</option>
                          <option value="1 hour">1 hour</option>
                          <option value="1.5 hours">1.5 hours</option>
                          <option value="2 hours">2 hours</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Interview Type</label>
                        <select
                          value={scheduleForm.type}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, type: e.target.value })}
                          className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                        >
                          <option value="video">Video Call</option>
                          <option value="phone">Phone</option>
                          <option value="onsite">On-site</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Interview Round</label>
                        <input
                          type="text"
                          value={scheduleForm.round}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, round: e.target.value })}
                          placeholder="e.g., Technical Round"
                          className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Interviewers */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Interviewers</h3>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Add Interviewers (comma separated)</label>
                      <input
                        type="text"
                        value={scheduleForm.interviewers}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, interviewers: e.target.value })}
                        placeholder="e.g., John D., Jane S."
                        className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Additional Notes</h3>
                    <textarea
                      value={scheduleForm.notes}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, notes: e.target.value })}
                      placeholder="Any specific topics to cover or notes for interviewers..."
                      rows={4}
                      className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-dark-700 flex items-center justify-end gap-4">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-6 py-3 border border-dark-600 text-gray-400 hover:text-white rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSchedule}
                  className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule Interview
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Interview Detail Slide-over */}
      <AnimatePresence>
        {selectedInterview && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSelectedInterview(null)}
            />
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-dark-800 border-l border-dark-700 z-50 overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">Interview Details</h2>
                  <button
                    onClick={() => setSelectedInterview(null)}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {selectedInterview.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-white">{selectedInterview.candidate}</h3>
                  <p className="text-gray-400">{selectedInterview.position}</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-dark-700 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-300">{selectedInterview.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-300">{selectedInterview.time} ({selectedInterview.duration})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {(() => {
                        const Icon = typeConfig[selectedInterview.type].icon;
                        return <Icon className="w-4 h-4 text-gray-500" />;
                      })()}
                      <span className="text-gray-300">{typeConfig[selectedInterview.type].label}</span>
                    </div>
                  </div>

                  <div className="bg-dark-700 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Round</h4>
                    <p className="text-white">{selectedInterview.round}</p>
                  </div>

                  <div className="bg-dark-700 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Interviewers</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedInterview.interviewers.map(name => (
                        <span key={name} className="px-3 py-1 bg-dark-600 text-gray-300 text-sm rounded-lg">
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedInterview.notes && (
                    <div className="bg-dark-700 rounded-xl p-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">Notes</h4>
                      <p className="text-gray-400 text-sm">{selectedInterview.notes}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {selectedInterview.type === 'video' && selectedInterview.meetLink && (
                    <a
                      href={selectedInterview.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
                    >
                      <Video className="w-5 h-5" />
                      Join Meeting
                    </a>
                  )}
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-orange-500 text-orange-400 hover:bg-orange-500/10 rounded-xl transition-colors">
                    <Edit2 className="w-5 h-5" />
                    Reschedule
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
                    <XCircle className="w-5 h-5" />
                    Cancel Interview
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
