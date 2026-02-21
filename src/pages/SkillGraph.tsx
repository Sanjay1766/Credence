// ============================================
// CREDENCE - Skill Graph Page
// Interactive Skill Visualization & Growth
// ============================================

import { useState, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Brain,
  ChevronRight,
  Sparkles,
  Calendar,
  Download,
  FileImage,
  FileText,
  Share2,
  Users,
  Play,
  RotateCcw,
  Crown,
  Medal,
  Trophy,
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { QRCodeSVG } from 'qrcode.react';

interface SkillCategory {
  id: string;
  name: string;
  level: 'Emerging' | 'Developing' | 'Strong' | 'Advanced' | 'Exceptional';
  score: number;
  growth: number;
  skills: { name: string; score: number }[];
}

export default function SkillGraph() {
  const { state } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'6m' | '1y' | '2y' | 'all'>('1y');
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const skillGraphRef = useRef<HTMLDivElement>(null);

  // Mock user data for the profile
  const userData = {
    name: 'Sanjay Srivatsav',
    university: 'SECE - Coimbatore',
    batch: '2025',
    profileUrl: 'credence.app/u/sanjay-srivatsav',
  };

  // Batch ranking data
  const batchRanking = {
    rank: 12,
    total: 156,
    percentile: 92,
    topSkill: 'Learning Velocity',
  };

  // Sample skill categories
  const skillCategories: SkillCategory[] = [
    {
      id: 'problem-solving',
      name: 'Problem Solving',
      level: 'Advanced',
      score: 82,
      growth: 15,
      skills: [
        { name: 'Algorithms', score: 85 },
        { name: 'Data Structures', score: 80 },
        { name: 'Logical Thinking', score: 88 },
        { name: 'Optimization', score: 75 },
      ],
    },
    {
      id: 'system-design',
      name: 'System Design',
      level: 'Developing',
      score: 58,
      growth: 22,
      skills: [
        { name: 'Architecture', score: 55 },
        { name: 'Scalability', score: 50 },
        { name: 'Database Design', score: 65 },
        { name: 'API Design', score: 62 },
      ],
    },
    {
      id: 'code-quality',
      name: 'Code Quality',
      level: 'Strong',
      score: 75,
      growth: 8,
      skills: [
        { name: 'Clean Code', score: 78 },
        { name: 'Testing', score: 65 },
        { name: 'Documentation', score: 72 },
        { name: 'Code Review', score: 85 },
      ],
    },
    {
      id: 'consistency',
      name: 'Consistency',
      level: 'Advanced',
      score: 78,
      growth: 12,
      skills: [
        { name: 'Daily Practice', score: 85 },
        { name: 'Project Completion', score: 72 },
        { name: 'Learning Streak', score: 80 },
        { name: 'Habit Formation', score: 75 },
      ],
    },
    {
      id: 'collaboration',
      name: 'Collaboration',
      level: 'Developing',
      score: 62,
      growth: 18,
      skills: [
        { name: 'Git Workflow', score: 70 },
        { name: 'Code Review', score: 65 },
        { name: 'Communication', score: 55 },
        { name: 'Team Projects', score: 58 },
      ],
    },
    {
      id: 'learning-velocity',
      name: 'Learning Velocity',
      level: 'Exceptional',
      score: 88,
      growth: 25,
      skills: [
        { name: 'New Tech Adoption', score: 90 },
        { name: 'Concept Grasp', score: 85 },
        { name: 'Skill Diversification', score: 88 },
        { name: 'Self-Learning', score: 89 },
      ],
    },
  ];

  // Radar chart data
  const radarData = skillCategories.map((cat) => ({
    skill: cat.name,
    value: cat.score,
    fullMark: 100,
  }));

  // Growth timeline data (4-year journey)
  const timelineData = [
    { period: 'Y1 S1', score: 25, milestone: 'Started coding' },
    { period: 'Y1 S2', score: 32, milestone: 'First project' },
    { period: 'Y2 S1', score: 45, milestone: 'GitHub active' },
    { period: 'Y2 S2', score: 52, milestone: 'LeetCode started' },
    { period: 'Y3 S1', score: 65, milestone: 'First internship' },
    { period: 'Y3 S2', score: 72, milestone: 'Open source' },
    { period: 'Y4 S1', score: 78, milestone: 'Team lead' },
    { period: 'Y4 S2', score: 85, milestone: 'Current' },
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

  const overallScore = Math.round(
    skillCategories.reduce((sum, cat) => sum + cat.score, 0) / skillCategories.length
  );

  // Download as PNG
  const downloadAsPNG = useCallback(async () => {
    if (!skillGraphRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(skillGraphRef.current, {
        backgroundColor: '#0a0a0f',
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `${userData.name.replace(/\s+/g, '-')}-skill-graph.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to download PNG:', error);
    }
    setIsDownloading(false);
    setShowDownloadMenu(false);
  }, [userData.name]);

  // Download as PDF
  const downloadAsPDF = useCallback(async () => {
    if (!skillGraphRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(skillGraphRef.current, {
        backgroundColor: '#0a0a0f',
        scale: 2,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // Add footer
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`Generated by Credence | ${new Date().toLocaleDateString()}`, pdfWidth / 2, pdfHeight - 10, { align: 'center' });
      
      pdf.save(`${userData.name.replace(/\s+/g, '-')}-skill-graph.pdf`);
    } catch (error) {
      console.error('Failed to download PDF:', error);
    }
    setIsDownloading(false);
    setShowDownloadMenu(false);
  }, [userData.name]);

  // Time-lapse animation
  const startTimelapse = useCallback(() => {
    setIsAnimating(true);
    setAnimationStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnimationStep(step);
      if (step >= timelineData.length - 1) {
        clearInterval(interval);
        setTimeout(() => setIsAnimating(false), 1000);
      }
    }, 800);
  }, []);

  const resetTimelapse = useCallback(() => {
    setIsAnimating(false);
    setAnimationStep(0);
  }, []);

  // Get animated scores based on current step
  const getAnimatedScore = (finalScore: number) => {
    if (!isAnimating && animationStep === 0) return finalScore;
    const progress = (animationStep + 1) / timelineData.length;
    return Math.round(finalScore * progress);
  };

  return (
    <div className="animate-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Skill Graph</h1>
          <p className="text-gray-400">
            Your verified skill profile based on real work evidence
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Time-lapse Controls */}
          <div className="flex items-center gap-2 bg-dark-700 rounded-lg px-3 py-2">
            {!isAnimating ? (
              <button
                onClick={startTimelapse}
                className="flex items-center gap-2 text-accent-primary hover:text-accent-secondary transition-colors"
              >
                <Play className="w-4 h-4" />
                <span className="text-sm">Play Journey</span>
              </button>
            ) : (
              <button
                onClick={resetTimelapse}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm">Reset</span>
              </button>
            )}
          </div>

          {/* Share Button */}
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 bg-dark-700 hover:bg-dark-600 rounded-lg px-4 py-2 text-gray-300 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>

          {/* Download Button */}
          <div className="relative">
            <button
              onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              disabled={isDownloading}
              className="flex items-center gap-2 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-lg px-4 py-2 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? 'Generating...' : 'Download'}
            </button>
            
            <AnimatePresence>
              {showDownloadMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-dark-700 border border-dark-500 rounded-lg shadow-xl z-50 overflow-hidden"
                >
                  <button
                    onClick={downloadAsPNG}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-dark-600 transition-colors"
                  >
                    <FileImage className="w-4 h-4 text-accent-tertiary" />
                    <span>Download as PNG</span>
                  </button>
                  <button
                    onClick={downloadAsPDF}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-dark-600 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-accent-danger" />
                    <span>Download as PDF</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
            className="bg-dark-700 border border-dark-500 rounded-lg px-4 py-2 text-gray-300"
          >
            <option value="6m">Last 6 months</option>
            <option value="1y">Last year</option>
            <option value="2y">Last 2 years</option>
            <option value="all">All time</option>
          </select>
        </div>
      </div>

      {/* Share Modal with QR Code */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-800 border border-dark-500 rounded-2xl p-8 max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-bold text-white mb-2">Share Your Profile</h3>
              <p className="text-gray-400 mb-6">Scan the QR code or copy the link</p>
              
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white rounded-xl">
                  <QRCodeSVG
                    value={`https://${userData.profileUrl}`}
                    size={180}
                    bgColor="#ffffff"
                    fgColor="#0a0a0f"
                    level="H"
                    includeMargin={false}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-dark-700 rounded-lg p-3 mb-6">
                <input
                  type="text"
                  readOnly
                  value={`https://${userData.profileUrl}`}
                  className="flex-1 bg-transparent text-gray-300 text-sm outline-none"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(`https://${userData.profileUrl}`)}
                  className="px-3 py-1 bg-accent-primary rounded text-white text-sm hover:opacity-90"
                >
                  Copy
                </button>
              </div>
              
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full py-3 bg-dark-600 text-gray-300 rounded-lg hover:bg-dark-500 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Downloadable Content */}
      <div ref={skillGraphRef} className="space-y-8">

      {/* Overall Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-8 overflow-hidden"
      >
        <div className="flex items-center">
          <div className="flex-1 p-2">
            <div className="flex items-center gap-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="#2a2a38"
                    strokeWidth="10"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(isAnimating || animationStep > 0 ? getAnimatedScore(overallScore) : overallScore) * 3.52} 352`}
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span 
                    key={animationStep}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl font-bold text-white"
                  >
                    {isAnimating || animationStep > 0 ? getAnimatedScore(overallScore) : overallScore}
                  </motion.span>
                  <span className="text-xs text-gray-500">/ 100</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Overall Credence Score</h2>
                <p className="text-gray-400 mb-3">Based on verified work artifacts and consistency</p>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor('Advanced')}`}>
                    Advanced
                  </span>
                  <span className="flex items-center gap-1 text-accent-success text-sm">
                    <TrendingUp className="w-4 h-4" />
                    +12% this semester
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="w-80 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#2a2a38" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                <Radar
                  name="Skills"
                  dataKey="value"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Batch Ranking Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card mb-8 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border-yellow-500/30"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              {batchRanking.rank === 1 ? (
                <Crown className="w-12 h-12 text-yellow-400" />
              ) : batchRanking.rank <= 3 ? (
                <Trophy className="w-12 h-12 text-yellow-400" />
              ) : batchRanking.rank <= 10 ? (
                <Medal className="w-12 h-12 text-orange-400" />
              ) : (
                <Users className="w-12 h-12 text-accent-primary" />
              )}
              <div>
                <h3 className="text-xl font-bold text-white">Batch Ranking</h3>
                <p className="text-gray-400 text-sm">{userData.university} • Class of {userData.batch}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">#{batchRanking.rank}</p>
              <p className="text-sm text-gray-400">of {batchRanking.total} students</p>
            </div>
            <div className="h-12 w-px bg-dark-500" />
            <div className="text-center">
              <p className="text-4xl font-bold text-accent-success">Top {100 - batchRanking.percentile}%</p>
              <p className="text-sm text-gray-400">Percentile</p>
            </div>
            <div className="h-12 w-px bg-dark-500" />
            <div className="text-center px-4 py-2 bg-accent-primary/20 rounded-lg">
              <p className="text-sm text-gray-400">Top Skill</p>
              <p className="text-lg font-semibold text-accent-primary">{batchRanking.topSkill}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Skill Categories Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            className={`card cursor-pointer transition-all ${
              selectedCategory === category.id ? 'ring-2 ring-accent-primary' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-white">{category.name}</h3>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getLevelColor(category.level)}`}>
                  {category.level}
                </span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{category.score}</p>
                <p className="text-xs text-accent-success flex items-center justify-end gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +{category.growth}%
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-dark-600 rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${category.score}%` }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"
              />
            </div>

            {/* Skills Preview */}
            {selectedCategory === category.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2 pt-4 border-t border-dark-600"
              >
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{skill.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-dark-600 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-accent-tertiary"
                          style={{ width: `${skill.score}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-8">{skill.score}%</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            <div className="flex items-center justify-center text-xs text-gray-500 mt-2">
              <ChevronRight className={`w-4 h-4 transition-transform ${selectedCategory === category.id ? 'rotate-90' : ''}`} />
              Click to expand
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4-Year Growth Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-accent-primary" />
            <div>
              <h3 className="text-lg font-semibold text-white">4-Year Growth Timeline</h3>
              <p className="text-sm text-gray-400">Your skill evolution throughout college</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-accent-success">
            <Sparkles className="w-4 h-4" />
            <span>+240% total growth</span>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a38" />
              <XAxis dataKey="period" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#12121a',
                  border: '1px solid #2a2a38',
                  borderRadius: '8px',
                }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-dark-800 border border-dark-500 rounded-lg p-3">
                        <p className="text-white font-medium">{data.period}</p>
                        <p className="text-accent-primary">Score: {data.score}</p>
                        <p className="text-gray-400 text-sm">{data.milestone}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#6366f1"
                strokeWidth={3}
                fill="url(#colorGrowth)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Milestones */}
        <div className="mt-6 pt-6 border-t border-dark-600">
          <h4 className="text-sm font-medium text-gray-400 mb-4">Key Milestones</h4>
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {timelineData.map((point, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-700 border border-dark-500"
              >
                <div className="w-2 h-2 rounded-full bg-accent-primary" />
                <div>
                  <p className="text-xs text-white font-medium">{point.milestone}</p>
                  <p className="text-xs text-gray-500">{point.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* AI Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-6 rounded-xl bg-gradient-to-r from-accent-primary/10 via-accent-secondary/10 to-accent-tertiary/10 border border-accent-primary/30"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">AI-Generated Insight</h4>
            <p className="text-gray-300">
              Your <span className="text-accent-primary font-medium">Learning Velocity</span> is exceptional, 
              placing you in the top 10% of users. Your consistent LeetCode practice shows strong 
              <span className="text-accent-secondary font-medium"> Problem Solving</span> growth. 
              Consider focusing on <span className="text-accent-tertiary font-medium">System Design</span> projects 
              to round out your skill profile for senior-level opportunities.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Profile Signature */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 flex items-center justify-between p-4 bg-dark-700/50 rounded-xl border border-dark-600"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold text-lg">
            {userData.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div>
            <p className="text-white font-semibold">{userData.name}</p>
            <p className="text-gray-400 text-sm">{userData.university} • Class of {userData.batch}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white rounded-lg">
            <QRCodeSVG
              value={`https://${userData.profileUrl}`}
              size={48}
              bgColor="#ffffff"
              fgColor="#0a0a0f"
              level="L"
            />
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Scan to verify</p>
            <p className="text-sm text-accent-primary">{userData.profileUrl}</p>
          </div>
        </div>
      </motion.div>

      </div> {/* End of downloadable content */}
    </div>
  );
}
