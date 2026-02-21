// ============================================
// CREDENCE - Application Context
// Global State Management
// ============================================

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { 
  User, 
  AcademicData, 
  Project, 
  SkillAssessment, 
  GrowthTimeline,
  GitHubProfile,
  SkillNode
} from '../types';

// LeetCode Types
interface LeetCodeStats {
  username: string;
  connected: boolean;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  currentStreak: number;
  maxStreak: number;
  consistencyIndex: number;
  dailyActivity: DailyActivity[];
  topicCoverage: TopicCoverage[];
  difficultyGrowth: number; // percentage improvement
}

interface DailyActivity {
  date: string;
  problemsSolved: number;
  difficulty: 'easy' | 'medium' | 'hard';
  topics: string[];
}

interface TopicCoverage {
  topic: string;
  solved: number;
  total: number;
  percentage: number;
}

// App State
interface AppState {
  // Auth
  isAuthenticated: boolean;
  user: User | null;
  onboardingStep: number;
  onboardingComplete: boolean;

  // Academic
  academicData: AcademicData | null;

  // Projects & Skills
  projects: Project[];
  skills: SkillAssessment[];
  skillGraph: SkillNode[];

  // Integrations
  githubProfile: GitHubProfile | null;
  leetCodeStats: LeetCodeStats | null;

  // Timeline
  growthTimeline: GrowthTimeline | null;

  // Overall Scores
  overallScore: number;
  profileStrength: number;

  // UI State
  isLoading: boolean;
  activeView: string;
  sidebarCollapsed: boolean;

  // LLM State
  llmConnected: boolean;
  llmModel: string;
  analysisInProgress: boolean;
}

// Initial State
const initialState: AppState = {
  isAuthenticated: false,
  user: null,
  onboardingStep: 0,
  onboardingComplete: false,
  academicData: null,
  projects: [],
  skills: [],
  skillGraph: [],
  githubProfile: null,
  leetCodeStats: null,
  growthTimeline: null,
  overallScore: 0,
  profileStrength: 0,
  isLoading: false,
  activeView: 'dashboard',
  sidebarCollapsed: false,
  llmConnected: false,
  llmModel: 'llama3.2',
  analysisInProgress: false,
};

// Action Types
type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_ONBOARDING_STEP'; payload: number }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'SET_ACADEMIC_DATA'; payload: AcademicData }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'REMOVE_PROJECT'; payload: string }
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'SET_SKILLS'; payload: SkillAssessment[] }
  | { type: 'SET_SKILL_GRAPH'; payload: SkillNode[] }
  | { type: 'SET_GITHUB_PROFILE'; payload: GitHubProfile }
  | { type: 'SET_LEETCODE_STATS'; payload: LeetCodeStats }
  | { type: 'SET_GROWTH_TIMELINE'; payload: GrowthTimeline }
  | { type: 'SET_OVERALL_SCORE'; payload: number }
  | { type: 'SET_PROFILE_STRENGTH'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ACTIVE_VIEW'; payload: string }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_LLM_CONNECTED'; payload: boolean }
  | { type: 'SET_LLM_MODEL'; payload: string }
  | { type: 'SET_ANALYSIS_IN_PROGRESS'; payload: boolean };

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...initialState };
    case 'SET_ONBOARDING_STEP':
      return { ...state, onboardingStep: action.payload };
    case 'COMPLETE_ONBOARDING':
      return { ...state, onboardingComplete: true };
    case 'SET_ACADEMIC_DATA':
      return { ...state, academicData: action.payload };
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case 'REMOVE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== action.payload),
      };
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    case 'SET_SKILLS':
      return { ...state, skills: action.payload };
    case 'SET_SKILL_GRAPH':
      return { ...state, skillGraph: action.payload };
    case 'SET_GITHUB_PROFILE':
      return { ...state, githubProfile: action.payload };
    case 'SET_LEETCODE_STATS':
      return { ...state, leetCodeStats: action.payload };
    case 'SET_GROWTH_TIMELINE':
      return { ...state, growthTimeline: action.payload };
    case 'SET_OVERALL_SCORE':
      return { ...state, overallScore: action.payload };
    case 'SET_PROFILE_STRENGTH':
      return { ...state, profileStrength: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ACTIVE_VIEW':
      return { ...state, activeView: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case 'SET_LLM_CONNECTED':
      return { ...state, llmConnected: action.payload };
    case 'SET_LLM_MODEL':
      return { ...state, llmModel: action.payload };
    case 'SET_ANALYSIS_IN_PROGRESS':
      return { ...state, analysisInProgress: action.payload };
    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Export types
export type { AppState, LeetCodeStats, DailyActivity, TopicCoverage };
