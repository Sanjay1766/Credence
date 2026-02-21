// ============================================
// CREDENCE - GitHub API Service
// Real API Integration with Token Support
// ============================================

import { GitHubProfile, GitHubRepository } from '../types';

// Store token in memory (user provides via UI)
let githubToken: string | null = null;

export function setGitHubToken(token: string) {
  githubToken = token;
}

export function getGitHubToken(): string | null {
  return githubToken;
}

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (githubToken) {
    headers['Authorization'] = `Bearer ${githubToken}`;
  }
  return headers;
}

interface GitHubUserResponse {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  name: string;
  bio: string;
  location: string;
  created_at: string;
}

interface GitHubRepoResponse {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  pushed_at: string;
  fork: boolean;
}

// Fetch user profile from GitHub API
export async function fetchGitHubUser(username: string): Promise<GitHubUserResponse> {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: getHeaders()
  });
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('User not found');
    }
    if (response.status === 403) {
      const data = await response.json();
      if (data.message?.includes('rate limit')) {
        throw new Error('GitHub API rate limit exceeded. Please add a Personal Access Token.');
      }
    }
    throw new Error('Failed to fetch GitHub user');
  }
  
  return response.json();
}

// Fetch user repositories
export async function fetchGitHubRepos(username: string): Promise<GitHubRepoResponse[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
    { headers: getHeaders() }
  );
  
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please add a Personal Access Token.');
    }
    throw new Error('Failed to fetch repositories');
  }
  
  return response.json();
}

// Calculate language percentages from repos
function calculateLanguagePercentages(repos: GitHubRepoResponse[]): { name: string; percentage: number }[] {
  const languageCounts: Record<string, number> = {};
  let total = 0;
  
  repos.forEach(repo => {
    if (repo.language && !repo.fork) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      total++;
    }
  });
  
  if (total === 0) return [];
  
  const sorted = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / total) * 100)
    }));
  
  return sorted;
}

// Fetch contribution count (using events API as approximation)
export async function fetchContributionCount(username: string): Promise<number> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100`,
      { headers: getHeaders() }
    );
    if (!response.ok) return 0;
    
    const events = await response.json();
    // Count push events as contributions
    const pushEvents = events.filter((e: { type: string }) => e.type === 'PushEvent');
    // Estimate yearly contributions (this is approximate)
    return pushEvents.length * 4; // Rough estimate
  } catch {
    return 0;
  }
}

// Main function to fetch complete GitHub profile
export async function fetchGitHubProfile(username: string): Promise<GitHubProfile> {
  // Fetch user data and repos in parallel
  const [userData, reposData] = await Promise.all([
    fetchGitHubUser(username),
    fetchGitHubRepos(username)
  ]);
  
  // Get contribution estimate
  const contributions = await fetchContributionCount(username);
  
  // Calculate top languages
  const topLanguages = calculateLanguagePercentages(reposData);
  
  // Transform repos to our format (exclude forks, take top 10)
  const repositories: GitHubRepository[] = reposData
    .filter(repo => !repo.fork)
    .slice(0, 10)
    .map(repo => ({
      id: repo.id.toString(),
      name: repo.name,
      description: repo.description || 'No description',
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
      isAnalyzed: false,
      lastCommit: new Date(repo.pushed_at)
    }));
  
  return {
    username: userData.login,
    avatarUrl: userData.avatar_url,
    publicRepos: userData.public_repos,
    followers: userData.followers,
    following: userData.following,
    contributions: contributions || Math.floor(userData.public_repos * 15),
    topLanguages,
    repositories
  };
}
