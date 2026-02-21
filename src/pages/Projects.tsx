// ============================================
// CREDENCE - Projects Page
// Upload & Analyze Projects with LLM
// ============================================

import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2,
  Upload,
  Plus,
  X,
  Brain,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FileCode,
  ExternalLink,
  Trash2,
  BarChart3,
  Code2,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { groqService } from '../services/groqService';
import { Project, ProjectType, ProjectAnalysis } from '../types';

export default function Projects() {
  const { state, dispatch } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ProjectAnalysis | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectType, setProjectType] = useState<ProjectType>('software');
  const [technologies, setTechnologies] = useState('');
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');

  const projectTypes: { value: ProjectType; label: string }[] = [
    { value: 'software', label: 'Software Development' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-app', label: 'Mobile App' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'design', label: 'UI/UX Design' },
    { value: 'research', label: 'Research' },
    { value: 'other', label: 'Other' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const analyzeWithLLM = async () => {
    if (!groqService.isConfigured()) {
      alert('Groq API key not configured');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const analysis = await groqService.analyzeProject({
        projectDescription: description,
        codeContent: fileContent,
        technologies: technologies.split(',').map((t) => t.trim()).filter(Boolean),
        projectType,
      });

      setAnalysisResult(analysis);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please check your internet connection.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title,
      description,
      type: projectType,
      technologies: technologies.split(',').map((t) => t.trim()).filter(Boolean),
      startDate: new Date(),
      status: 'completed',
      repositoryUrl: repositoryUrl || undefined,
      files: fileName ? [{ id: '1', name: fileName, type: 'code', size: fileContent.length, uploadedAt: new Date() }] : [],
      analysis: analysisResult || undefined,
      difficultyScore: analysisResult?.difficultyScore,
      skillsExtracted: analysisResult?.skillsIdentified.map((s) => s.skillName) || [],
    };

    dispatch({ type: 'ADD_PROJECT', payload: newProject });
    resetForm();
    setShowAddModal(false);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setProjectType('software');
    setTechnologies('');
    setRepositoryUrl('');
    setFileContent('');
    setFileName('');
    setAnalysisResult(null);
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-green-400 bg-green-400/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/20';
      case 'advanced': return 'text-orange-400 bg-orange-400/20';
      case 'expert': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const deleteProject = (id: string) => {
    dispatch({ type: 'REMOVE_PROJECT', payload: id });
  };

  return (
    <div className="animate-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-gray-400">
            Upload and analyze your projects with AI
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* AI Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-6 p-4 rounded-xl flex items-center gap-4 ${
          state.llmConnected
            ? 'bg-accent-success/10 border border-accent-success/30'
            : 'bg-accent-warning/10 border border-accent-warning/30'
        }`}
      >
        <Brain className={`w-6 h-6 ${state.llmConnected ? 'text-accent-success' : 'text-accent-warning'}`} />
        <div className="flex-1">
          <p className={`font-medium ${state.llmConnected ? 'text-accent-success' : 'text-accent-warning'}`}>
            {state.llmConnected ? 'AI Analysis Ready' : 'AI Engine Offline'}
          </p>
          <p className="text-sm text-gray-400">
            {state.llmConnected
              ? `Using ${state.llmModel} to analyze project complexity, skills, and provide insights`
              : 'Run `ollama serve` to enable AI-powered project analysis'}
          </p>
        </div>
        {state.llmConnected && <Sparkles className="w-5 h-5 text-accent-success" />}
      </motion.div>

      {/* Projects Grid */}
      {state.projects.length > 0 ? (
        <div className="space-y-4">
          {state.projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center flex-shrink-0">
                  <FolderGit2 className="w-6 h-6 text-accent-primary" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {project.analysis && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.analysis.difficultyLevel)}`}>
                          {project.analysis.difficultyLevel}
                        </span>
                      )}
                      {project.difficultyScore && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent-primary/20 text-accent-primary">
                          Score: {project.difficultyScore}/100
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-1 rounded-lg bg-dark-600 text-xs text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Analysis Preview */}
                  {project.analysis && (
                    <div className="mt-4">
                      <button
                        onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                        className="flex items-center gap-2 text-sm text-accent-primary hover:text-white transition-colors"
                      >
                        <BarChart3 className="w-4 h-4" />
                        {expandedProject === project.id ? 'Hide Analysis' : 'View AI Analysis'}
                        {expandedProject === project.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      <AnimatePresence>
                        {expandedProject === project.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 p-4 rounded-xl bg-dark-700 border border-dark-500"
                          >
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Code Structure</p>
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-2 bg-dark-600 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                                      style={{ width: `${project.analysis.complexityMetrics.codeStructure}%` }}
                                    />
                                  </div>
                                  <span className="text-sm text-gray-300">{project.analysis.complexityMetrics.codeStructure}%</span>
                                </div>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Algorithmic Complexity</p>
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-2 bg-dark-600 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                                      style={{ width: `${project.analysis.complexityMetrics.algorithmicComplexity}%` }}
                                    />
                                  </div>
                                  <span className="text-sm text-gray-300">{project.analysis.complexityMetrics.algorithmicComplexity}%</span>
                                </div>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">System Design</p>
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-2 bg-dark-600 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                                      style={{ width: `${project.analysis.complexityMetrics.systemDesign}%` }}
                                    />
                                  </div>
                                  <span className="text-sm text-gray-300">{project.analysis.complexityMetrics.systemDesign}%</span>
                                </div>
                              </div>
                            </div>

                            {/* Skills Identified */}
                            {project.analysis.skillsIdentified.length > 0 && (
                              <div className="mb-4">
                                <p className="text-xs text-gray-500 mb-2">Skills Identified by AI</p>
                                <div className="flex flex-wrap gap-2">
                                  {project.analysis.skillsIdentified.map((skill, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-1 rounded-lg bg-accent-primary/10 text-xs text-accent-primary border border-accent-primary/30"
                                    >
                                      {skill.skillName} ({skill.proficiencyLevel}%)
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Suggestions */}
                            {project.analysis.suggestions.length > 0 && (
                              <div>
                                <p className="text-xs text-gray-500 mb-2">AI Suggestions</p>
                                <ul className="space-y-1">
                                  {project.analysis.suggestions.slice(0, 3).map((suggestion, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                      <span className="text-accent-tertiary">•</span>
                                      {suggestion}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {project.repositoryUrl && (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-600 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-accent-danger hover:bg-accent-danger/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card text-center py-16"
        >
          <FolderGit2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
          <p className="text-gray-400 mb-6">
            Upload your first project and let AI analyze your skills
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Your First Project
          </button>
        </motion.div>
      )}

      {/* Add Project Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-dark-800 border border-dark-600 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-dark-600 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Add New Project</h2>
                  <p className="text-sm text-gray-400">Upload your project for AI analysis</p>
                </div>
                <button
                  onClick={() => { setShowAddModal(false); resetForm(); }}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div>
                  <label className="input-label">Project Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input"
                    placeholder="e.g., E-Commerce Platform"
                  />
                </div>

                <div>
                  <label className="input-label">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input min-h-[100px] resize-none"
                    placeholder="Describe what the project does, the problems it solves, and your role..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Project Type</label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value as ProjectType)}
                      className="input"
                    >
                      {projectTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="input-label">Technologies (comma separated)</label>
                    <input
                      type="text"
                      value={technologies}
                      onChange={(e) => setTechnologies(e.target.value)}
                      className="input"
                      placeholder="React, Node.js, PostgreSQL"
                    />
                  </div>
                </div>

                <div>
                  <label className="input-label">Repository URL (optional)</label>
                  <input
                    type="url"
                    value={repositoryUrl}
                    onChange={(e) => setRepositoryUrl(e.target.value)}
                    className="input"
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="input-label">Upload Code File (for AI Analysis)</label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                      fileContent
                        ? 'border-accent-success bg-accent-success/5'
                        : 'border-dark-500 hover:border-accent-primary'
                    }`}
                  >
                    {fileContent ? (
                      <div className="flex items-center justify-center gap-3">
                        <FileCode className="w-8 h-8 text-accent-success" />
                        <div className="text-left">
                          <p className="text-white font-medium">{fileName}</p>
                          <p className="text-sm text-gray-400">{fileContent.length} characters</p>
                        </div>
                        <CheckCircle2 className="w-6 h-6 text-accent-success" />
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-400">Click to upload a code file</p>
                        <p className="text-sm text-gray-500">.py, .js, .ts, .java, .cpp, etc.</p>
                      </>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    accept=".py,.js,.ts,.tsx,.jsx,.java,.cpp,.c,.go,.rs,.rb,.php,.html,.css"
                    className="hidden"
                  />
                </div>

                {/* Analyze Button */}
                {fileContent && !analysisResult && (
                  <button
                    onClick={analyzeWithLLM}
                    disabled={isAnalyzing || !state.llmConnected}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5" />
                        Analyze with Ollama LLM
                      </>
                    )}
                  </button>
                )}

                {/* Analysis Result */}
                {analysisResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/30"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-5 h-5 text-accent-success" />
                      <h4 className="font-semibold text-white">AI Analysis Complete</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Difficulty Level</p>
                        <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(analysisResult.difficultyLevel)}`}>
                          {analysisResult.difficultyLevel}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Difficulty Score</p>
                        <p className="text-2xl font-bold text-white">{analysisResult.difficultyScore}<span className="text-sm text-gray-500">/100</span></p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Skills Identified</p>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.skillsIdentified.map((skill, i) => (
                          <span key={i} className="px-2 py-1 rounded-lg bg-dark-700 text-xs text-gray-300">
                            {skill.skillName}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-gray-500">
                      Note: AI interprets project complexity. Final scores use deterministic logic.
                    </p>
                  </motion.div>
                )}
              </div>

              <div className="p-6 border-t border-dark-600 flex items-center justify-end gap-3">
                <button
                  onClick={() => { setShowAddModal(false); resetForm(); }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProject}
                  disabled={!title || !description}
                  className="btn-primary"
                >
                  Save Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
