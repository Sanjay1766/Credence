// ============================================
// CREDENCE - Onboarding Page
// Collect Academic Progress & Setup
// ============================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  GraduationCap,
  Building2,
  Calendar,
  BookOpen,
  Award,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Plus,
  X,
  Brain,
} from 'lucide-react';

interface CourseEntry {
  id: string;
  name: string;
  grade: string;
  semester: number;
}

export default function Onboarding() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Basic Info
  const [university, setUniversity] = useState('');
  const [degree, setDegree] = useState('');
  const [major, setMajor] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [currentYear, setCurrentYear] = useState('1');

  // Step 2: Academic Performance
  const [cgpa, setCgpa] = useState('');
  const [courses, setCourses] = useState<CourseEntry[]>([]);
  const [newCourse, setNewCourse] = useState({ name: '', grade: '', semester: 1 });

  // Step 3: Skills & Interests
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const totalSteps = 4;

  const domains = [
    { id: 'software', label: 'Software Development', icon: '💻' },
    { id: 'web', label: 'Web Development', icon: '🌐' },
    { id: 'mobile', label: 'Mobile Development', icon: '📱' },
    { id: 'data', label: 'Data Science', icon: '📊' },
    { id: 'ml', label: 'Machine Learning / AI', icon: '🤖' },
    { id: 'devops', label: 'DevOps / Cloud', icon: '☁️' },
    { id: 'security', label: 'Cybersecurity', icon: '🔒' },
    { id: 'design', label: 'UI/UX Design', icon: '🎨' },
    { id: 'research', label: 'Research', icon: '🔬' },
  ];

  const addCourse = () => {
    if (newCourse.name && newCourse.grade) {
      setCourses([
        ...courses,
        { ...newCourse, id: Date.now().toString() },
      ]);
      setNewCourse({ name: '', grade: '', semester: newCourse.semester });
    }
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const toggleDomain = (domainId: string) => {
    setSelectedDomains((prev) =>
      prev.includes(domainId)
        ? prev.filter((d) => d !== domainId)
        : [...prev, domainId]
    );
  };

  const handleComplete = () => {
    setIsLoading(true);

    // Save academic data
    dispatch({
      type: 'SET_ACADEMIC_DATA',
      payload: {
        cgpa: parseFloat(cgpa) || 0,
        totalCredits: courses.length * 3,
        semesters: [],
        courses: courses.map((c) => ({
          id: c.id,
          name: c.name,
          code: '',
          credits: 3,
          grade: c.grade,
          semester: c.semester,
          category: 'programming' as const,
        })),
        certifications: [],
      },
    });

    // Update user info
    dispatch({
      type: 'SET_USER',
      payload: {
        id: '1',
        email: 'user@example.com',
        fullName: 'Demo User',
        university,
        graduationYear: parseInt(graduationYear),
        currentYear: parseInt(currentYear),
        major,
        createdAt: new Date(),
        onboardingComplete: true,
      },
    });

    dispatch({ type: 'COMPLETE_ONBOARDING' });

    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return university && degree && major && graduationYear;
      case 2:
        return cgpa;
      case 3:
        return selectedDomains.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 bg-grid flex items-center justify-center p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-secondary/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary via-accent-secondary to-accent-tertiary flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Credence</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Let's Set Up Your Profile</h1>
          <p className="text-gray-400">Tell us about your academic journey</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
                  s < step
                    ? 'bg-accent-success text-white'
                    : s === step
                    ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white'
                    : 'bg-dark-600 text-gray-500'
                }`}
              >
                {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>
          <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              className="h-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary"
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="card p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Academic Info */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-accent-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Academic Information</h2>
                    <p className="text-sm text-gray-400">Tell us about your university</p>
                  </div>
                </div>

                <div>
                  <label className="input-label">University / Institution</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className="input pl-12"
                      placeholder="e.g., Stanford University"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Degree</label>
                    <select
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      className="input"
                    >
                      <option value="">Select Degree</option>
                      <option value="btech">B.Tech</option>
                      <option value="bsc">B.Sc</option>
                      <option value="bca">BCA</option>
                      <option value="mtech">M.Tech</option>
                      <option value="msc">M.Sc</option>
                      <option value="mca">MCA</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="input-label">Major / Specialization</label>
                    <input
                      type="text"
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                      className="input"
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Current Year</label>
                    <select
                      value={currentYear}
                      onChange={(e) => setCurrentYear(e.target.value)}
                      className="input"
                    >
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                      <option value="5">5th Year</option>
                      <option value="graduated">Graduated</option>
                    </select>
                  </div>
                  <div>
                    <label className="input-label">Expected Graduation</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="number"
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(e.target.value)}
                        className="input pl-12"
                        placeholder="2028"
                        min="2024"
                        max="2035"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Academic Performance */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent-secondary/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-accent-secondary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Academic Performance</h2>
                    <p className="text-sm text-gray-400">Your grades and courses</p>
                  </div>
                </div>

                <div>
                  <label className="input-label">Current CGPA (out of 10)</label>
                  <input
                    type="number"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    className="input"
                    placeholder="8.5"
                    step="0.01"
                    min="0"
                    max="10"
                  />
                </div>

                <div>
                  <label className="input-label">Key Courses Completed</label>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <input
                      type="text"
                      value={newCourse.name}
                      onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                      className="input col-span-1"
                      placeholder="Course name"
                    />
                    <select
                      value={newCourse.grade}
                      onChange={(e) => setNewCourse({ ...newCourse, grade: e.target.value })}
                      className="input"
                    >
                      <option value="">Grade</option>
                      <option value="A+">A+</option>
                      <option value="A">A</option>
                      <option value="B+">B+</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                    <button onClick={addCourse} className="btn-secondary flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>

                  {courses.length > 0 && (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {courses.map((course) => (
                        <div
                          key={course.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-dark-700 border border-dark-500"
                        >
                          <div>
                            <p className="text-white font-medium">{course.name}</p>
                            <p className="text-xs text-gray-500">Grade: {course.grade}</p>
                          </div>
                          <button
                            onClick={() => removeCourse(course.id)}
                            className="text-gray-500 hover:text-accent-danger transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Skills & Interests */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent-tertiary/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-accent-tertiary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Areas of Interest</h2>
                    <p className="text-sm text-gray-400">Select your focus areas (choose multiple)</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {domains.map((domain) => (
                    <button
                      key={domain.id}
                      onClick={() => toggleDomain(domain.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedDomains.includes(domain.id)
                          ? 'bg-accent-primary/20 border-accent-primary text-white'
                          : 'bg-dark-700 border-dark-500 text-gray-400 hover:border-dark-400'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{domain.icon}</span>
                      <span className="text-sm font-medium">{domain.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: AI Setup */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent-success/20 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-accent-success" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">AI Analysis Setup</h2>
                    <p className="text-sm text-gray-400">Configure your skill intelligence engine</p>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-dark-700 border border-dark-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center flex-shrink-0">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Ollama LLM Integration</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Credence uses Ollama LLM to analyze your projects and understand:
                      </p>
                      <ul className="space-y-2">
                        {[
                          'Project nature and domain classification',
                          'Code complexity and difficulty level',
                          'Architecture patterns and design quality',
                          'Technical depth and skill proficiency',
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-accent-success" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-accent-primary/10 border border-accent-primary/30">
                  <p className="text-sm text-accent-primary">
                    <strong>Note:</strong> AI interprets project meaning and complexity. 
                    Final scores are calculated using deterministic logic for fairness and consistency.
                  </p>
                </div>

                <div className="text-center pt-4">
                  <p className="text-gray-400 mb-2">You're all set!</p>
                  <p className="text-2xl font-bold gradient-text">
                    Ready to build your proof graph
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-dark-600">
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className={`btn-ghost flex items-center gap-2 ${step === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {step < totalSteps ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className={`btn-primary flex items-center gap-2 ${!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={isLoading}
                className="btn-primary flex items-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Complete Setup
                    <CheckCircle2 className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
