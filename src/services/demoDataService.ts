// ============================================
// CREDENCE - Demo Data Service
// Real student data for Institution & Hiring demos
// ============================================

import { fetchLeetCodeStats, LeetCodeStats } from './leetcodeService';
import { fetchGitHubProfile } from './githubService';
import { GitHubProfile } from '../types';

// Demo student profiles
export interface DemoStudent {
  id: string;
  name: string;
  email: string;
  university: string;
  githubUsername: string;
  leetcodeUsername: string;
  graduationYear: number;
  currentYear: number;
  major: string;
  avatar?: string;
  // Fetched data
  leetcodeStats?: LeetCodeStats;
  githubProfile?: GitHubProfile;
  // Calculated scores
  overallScore: number;
  skills: string[];
  isLoading?: boolean;
}

// Raw demo data - Chennai Institute of Technology students
export const DEMO_STUDENTS_RAW = [
  {
    id: 'student-1',
    name: 'C B Sanjay Srivatsav',
    email: 'sanjay.srivatsav@citchennai.edu',
    university: 'Chennai Institute of Technology',
    githubUsername: 'Sanjay1766',
    leetcodeUsername: 'sanjay3954',
    graduationYear: 2028,
    currentYear: 2,
    major: 'Computer Science',
  },
  {
    id: 'student-2',
    name: 'Dhanush M',
    email: 'dhanush.m@citchennai.edu',
    university: 'Chennai Institute of Technology',
    githubUsername: 'mister-dee',
    leetcodeUsername: 'mrdee09',
    graduationYear: 2028,
    currentYear: 2,
    major: 'Computer Science',
  },
  {
    id: 'student-3',
    name: 'Chanakiyan K',
    email: 'chanakiyan.k@citchennai.edu',
    university: 'Chennai Institute of Technology',
    githubUsername: 'kchanakiyan',
    leetcodeUsername: 'chanakiyank-cse',
    graduationYear: 2028,
    currentYear: 2,
    major: 'Computer Science',
  },
  {
    id: 'student-4',
    name: 'Charan Kumar B',
    email: 'charan.kumar@citchennai.edu',
    university: 'Chennai Institute of Technology',
    githubUsername: 'charankumarcsecit',
    leetcodeUsername: 'charan_cse_2007',
    graduationYear: 2028,
    currentYear: 2,
    major: 'Computer Science',
  },
  {
    id: 'student-5',
    name: 'Jagadheesh C',
    email: 'jagadheesh.c@citchennai.edu',
    university: 'Chennai Institute of Technology',
    githubUsername: 'Jagadheeeeesh',
    leetcodeUsername: 'jagadheeeeesh',
    graduationYear: 2028,
    currentYear: 2,
    major: 'Computer Science',
  },
  {
    id: 'student-6',
    name: 'Dakshan Kumar',
    email: 'dakshan.kumar@citchennai.edu',
    university: 'Chennai Institute of Technology',
    githubUsername: 'daks19',
    leetcodeUsername: 'Dakshan0_0',
    graduationYear: 2028,
    currentYear: 2,
    major: 'Computer Science',
  },
];

// Calculate overall score based on LeetCode and GitHub data
function calculateOverallScore(leetcode?: LeetCodeStats, github?: GitHubProfile): number {
  let score = 0;
  
  // LeetCode score (max 40 points)
  if (leetcode) {
    const leetcodeScore = Math.min(40,
      (leetcode.totalSolved / 200) * 20 +
      (leetcode.mediumSolved / 100) * 12 +
      (leetcode.hardSolved / 50) * 8
    );
    score += leetcodeScore;
  }
  
  // GitHub score (max 40 points)
  if (github) {
    const githubScore = Math.min(40,
      Math.min(15, github.publicRepos * 1.5) +
      Math.min(15, github.contributions / 50 * 15) +
      Math.min(10, github.followers * 2)
    );
    score += githubScore;
  }
  
  // Base score for being active (20 points)
  if (leetcode || github) {
    score += 20;
  }
  
  return Math.round(Math.min(100, score));
}

// Extract skills from GitHub profile
function extractSkills(github?: GitHubProfile): string[] {
  const skills: string[] = [];
  
  if (github?.topLanguages) {
    github.topLanguages.forEach(lang => {
      skills.push(lang.name);
    });
  }
  
  // Add common skills based on languages
  const languageToSkills: Record<string, string[]> = {
    'JavaScript': ['React', 'Node.js', 'Web Development'],
    'TypeScript': ['React', 'Angular', 'Full Stack'],
    'Python': ['Data Science', 'Machine Learning', 'Backend'],
    'Java': ['Spring Boot', 'Android', 'Enterprise'],
    'C++': ['DSA', 'Competitive Programming', 'Systems'],
    'C': ['Embedded Systems', 'Low Level Programming'],
    'HTML': ['Frontend', 'Web Development'],
    'CSS': ['UI/UX', 'Styling'],
  };
  
  if (github?.topLanguages) {
    github.topLanguages.slice(0, 3).forEach(lang => {
      const relatedSkills = languageToSkills[lang.name];
      if (relatedSkills) {
        skills.push(...relatedSkills.slice(0, 2));
      }
    });
  }
  
  // Remove duplicates
  return [...new Set(skills)].slice(0, 8);
}

// Fetch complete student data with real API calls
export async function fetchDemoStudentData(student: typeof DEMO_STUDENTS_RAW[0]): Promise<DemoStudent> {
  let leetcodeStats: LeetCodeStats | undefined;
  let githubProfile: GitHubProfile | undefined;
  
  // Fetch LeetCode data
  try {
    leetcodeStats = await fetchLeetCodeStats(student.leetcodeUsername);
  } catch (error) {
    console.warn(`Failed to fetch LeetCode data for ${student.name}:`, error);
  }
  
  // Fetch GitHub data
  try {
    githubProfile = await fetchGitHubProfile(student.githubUsername);
  } catch (error) {
    console.warn(`Failed to fetch GitHub data for ${student.name}:`, error);
  }
  
  const overallScore = calculateOverallScore(leetcodeStats, githubProfile);
  const skills = extractSkills(githubProfile);
  
  // Add DSA skill if they have LeetCode progress
  if (leetcodeStats && leetcodeStats.totalSolved > 0) {
    if (!skills.includes('DSA')) skills.unshift('DSA');
    if (leetcodeStats.totalSolved > 50 && !skills.includes('Problem Solving')) {
      skills.push('Problem Solving');
    }
  }
  
  return {
    ...student,
    avatar: githubProfile?.avatarUrl,
    leetcodeStats,
    githubProfile,
    overallScore,
    skills: skills.slice(0, 8),
  };
}

// Fetch all demo students with real data
export async function fetchAllDemoStudents(): Promise<DemoStudent[]> {
  const students = await Promise.all(
    DEMO_STUDENTS_RAW.map(student => fetchDemoStudentData(student))
  );
  
  // Sort by overall score descending
  return students.sort((a, b) => b.overallScore - a.overallScore);
}

// Get institution stats from demo data
export function calculateInstitutionStats(students: DemoStudent[]): {
  totalStudents: number;
  avgScore: number;
  avgLeetcodeSolved: number;
  avgGithubRepos: number;
  topSkills: { skill: string; count: number }[];
  skillDistribution: { name: string; value: number }[];
} {
  const totalStudents = students.length;
  
  const avgScore = students.reduce((sum, s) => sum + s.overallScore, 0) / totalStudents;
  
  const avgLeetcodeSolved = students.reduce((sum, s) => 
    sum + (s.leetcodeStats?.totalSolved || 0), 0) / totalStudents;
  
  const avgGithubRepos = students.reduce((sum, s) => 
    sum + (s.githubProfile?.publicRepos || 0), 0) / totalStudents;
  
  // Calculate skill distribution
  const skillCounts: Record<string, number> = {};
  students.forEach(student => {
    student.skills.forEach(skill => {
      skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    });
  });
  
  const topSkills = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([skill, count]) => ({ skill, count }));
  
  const skillDistribution = topSkills.slice(0, 6).map(({ skill, count }) => ({
    name: skill,
    value: count,
  }));
  
  return {
    totalStudents,
    avgScore: Math.round(avgScore),
    avgLeetcodeSolved: Math.round(avgLeetcodeSolved),
    avgGithubRepos: Math.round(avgGithubRepos),
    topSkills,
    skillDistribution,
  };
}

// Institution info
export const DEMO_INSTITUTION = {
  name: 'Chennai Institute of Technology',
  shortName: 'CIT',
  location: 'Chennai, Tamil Nadu',
  type: 'Engineering College',
  website: 'https://citchennai.net',
  totalStudents: 6,
  departments: ['Computer Science', 'Information Technology', 'Electronics'],
};

// For hiring partners - available institutions to choose from
export const AVAILABLE_INSTITUTIONS = [
  {
    id: 'cit',
    name: 'Chennai Institute of Technology',
    location: 'Chennai, Tamil Nadu',
    studentCount: 6,
    avgScore: 75,
    topSkills: ['Python', 'JavaScript', 'DSA', 'React'],
  },
  // Add more institutions here as needed
];
