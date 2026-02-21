// ============================================
// CREDENCE - Type Definitions
// Skill Verification Engine
// ============================================

// User Role Types
export type UserRole = 'student' | 'institution' | 'hiring';

// User Profile Types
export interface User {
  id: string;
  email: string;
  fullName: string;
  role?: UserRole;
  avatar?: string;
  university?: string;
  graduationYear?: number;
  currentYear?: number;
  major?: string;
  bio?: string;
  location?: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
  createdAt: Date;
  onboardingComplete: boolean;
}

// Academic Data Types
export interface AcademicData {
  cgpa: number;
  totalCredits: number;
  semesters: Semester[];
  courses: Course[];
  certifications: Certification[];
}

export interface Semester {
  id: string;
  number: number;
  year: string;
  gpa: number;
  credits: number;
  courses: string[];
}

export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  grade: string;
  semester: number;
  category: SkillCategory;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialUrl?: string;
  skills: string[];
}

// Project / Artifact Types
export interface Project {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  technologies: string[];
  startDate: Date;
  endDate?: Date;
  status: ProjectStatus;
  repositoryUrl?: string;
  liveUrl?: string;
  files: UploadedFile[];
  analysis?: ProjectAnalysis;
  difficultyScore?: number;
  skillsExtracted: string[];
}

export type ProjectType = 
  | 'software' 
  | 'data-science' 
  | 'machine-learning' 
  | 'web-development'
  | 'mobile-app'
  | 'design'
  | 'writing'
  | 'research'
  | 'other';

export type ProjectStatus = 'in-progress' | 'completed' | 'archived';

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  content?: string;
  uploadedAt: Date;
}

export interface ProjectAnalysis {
  id: string;
  projectId: string;
  analyzedAt: Date;
  difficultyLevel: DifficultyLevel;
  difficultyScore: number; // 0-100
  complexityMetrics: ComplexityMetrics;
  skillsIdentified: SkillAssessment[];
  codeQuality?: CodeQualityMetrics;
  suggestions: string[];
  llmResponse: string;
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface ComplexityMetrics {
  overallComplexity: number;
  codeStructure: number;
  algorithmicComplexity: number;
  systemDesign: number;
  testCoverage: number;
  documentation: number;
}

export interface CodeQualityMetrics {
  cleanCode: number;
  maintainability: number;
  bestPractices: number;
  errorHandling: number;
  performance: number;
}

// Skill Types
export interface SkillAssessment {
  skillId: string;
  skillName: string;
  category: SkillCategory;
  proficiencyLevel: number; // 0-100
  evidence: string[];
  lastUpdated: Date;
  trend: 'improving' | 'stable' | 'declining';
}

export type SkillCategory = 
  | 'programming'
  | 'frameworks'
  | 'databases'
  | 'devops'
  | 'data-science'
  | 'machine-learning'
  | 'design'
  | 'soft-skills'
  | 'domain-knowledge';

export interface SkillNode {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;
  connections: string[];
  x?: number;
  y?: number;
}

// Growth Timeline Types
export interface GrowthTimeline {
  userId: string;
  milestones: Milestone[];
  skillSnapshots: SkillSnapshot[];
}

export interface Milestone {
  id: string;
  date: Date;
  title: string;
  description: string;
  type: MilestoneType;
  skills: string[];
  impact: number; // 1-5 stars
}

export type MilestoneType = 
  | 'project-completed'
  | 'certification-earned'
  | 'skill-unlocked'
  | 'academic-achievement'
  | 'contribution'
  | 'award';

export interface SkillSnapshot {
  date: Date;
  skills: Record<string, number>;
  overallScore: number;
}

// GitHub Integration Types
export interface GitHubProfile {
  username: string;
  avatarUrl: string;
  bio?: string;
  publicRepos: number;
  followers: number;
  following: number;
  contributions: number;
  topLanguages: { name: string; percentage: number }[];
  repositories: GitHubRepository[];
}

export interface GitHubRepository {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  isAnalyzed: boolean;
  lastCommit: Date;
}

// Profile & Score Types
export interface CredenceProfile {
  user: User;
  academicData: AcademicData;
  overallScore: number; // 0-100
  skillGraph: SkillNode[];
  topSkills: SkillAssessment[];
  projects: Project[];
  timeline: GrowthTimeline;
  profileStrength: number;
  verificationLevel: VerificationLevel;
}

export type VerificationLevel = 'basic' | 'verified' | 'premium' | 'institution';

// Ollama LLM Types
export interface OllamaRequest {
  model: string;
  prompt: string;
  stream?: boolean;
  options?: {
    temperature?: number;
    top_p?: number;
    max_tokens?: number;
  };
}

export interface OllamaResponse {
  model: string;
  response: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

export interface AnalysisPrompt {
  projectDescription: string;
  codeContent: string;
  technologies: string[];
  projectType: ProjectType;
}

// Navigation & UI Types
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
