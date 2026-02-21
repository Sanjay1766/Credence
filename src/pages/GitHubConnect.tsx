// ============================================
// CREDENCE - GitHub Connect Page
// Repository Analysis & Integration
// ============================================

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import {
  GitBranch,
  Link2,
  Star,
  GitFork,
  ExternalLink,
  CheckCircle2,
  Code2,
  Activity,
  Calendar,
  Users,
  Loader2,
  Brain,
  BarChart3,
  FolderGit2,
  AlertCircle,
  Search,
  Key,
} from 'lucide-react';
import { GitHubProfile, GitHubRepository } from '../types';
import { fetchGitHubProfile, setGitHubToken, getGitHubToken } from '../services/githubService';

export default function GitHubConnect() {
  const { state, dispatch } = useApp();
  const [isConnecting, setIsConnecting] = useState(false);
  const [analyzingRepo, setAnalyzingRepo] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(getGitHubToken() || '');
  const [showToken, setShowToken] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    if (!username.trim()) {
      setError('Please enter a GitHub username');
      return;
    }
    
    // Set token if provided
    if (token.trim()) {
      setGitHubToken(token.trim());
    }
    
    setIsConnecting(true);
    setError(null);
    
    try {
      const profile = await fetchGitHubProfile(username.trim());
      dispatch({ type: 'SET_GITHUB_PROFILE', payload: profile });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to GitHub');
    } finally {
      setIsConnecting(false);
    }
  };

  const analyzeRepository = (repoId: string) => {
    setAnalyzingRepo(repoId);
    // Simulate analysis
    setTimeout(() => {
      if (state.githubProfile) {
        const updatedRepos = state.githubProfile.repositories.map((r) =>
          r.id === repoId ? { ...r, isAnalyzed: true } : r
        );
        dispatch({
          type: 'SET_GITHUB_PROFILE',
          payload: { ...state.githubProfile, repositories: updatedRepos },
        });
      }
      setAnalyzingRepo(null);
    }, 3000);
  };

  const profile = state.githubProfile;

  const getLanguageColor = (lang: string) => {
    const colors: Record<string, string> = {
      TypeScript: '#3178c6',
      JavaScript: '#f7df1e',
      Python: '#3776ab',
      Java: '#ed8b00',
      Go: '#00add8',
      Rust: '#ce412b',
      Ruby: '#cc342d',
      PHP: '#777bb4',
    };
    return colors[lang] || '#6366f1';
  };

  return (
    <div className="animate-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">GitHub Integration</h1>
          <p className="text-gray-400">
            Connect your GitHub to analyze repositories and track contributions
          </p>
        </div>
      </div>

      {!profile ? (
        /* Not Connected State */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card text-center py-16"
        >
          <div className="w-24 h-24 rounded-full bg-dark-700 flex items-center justify-center mx-auto mb-6">
            <GitBranch className="w-12 h-12 text-gray-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Connect Your GitHub</h3>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            Link your GitHub account to automatically import repositories,
            analyze code quality, and track your contribution history.
          </p>

          <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
            {[
              { icon: FolderGit2, label: 'Import Repos', desc: 'Auto-import your repositories' },
              { icon: Brain, label: 'AI Analysis', desc: 'Analyze code complexity' },
              { icon: Activity, label: 'Contributions', desc: 'Track commit history' },
              { icon: Code2, label: 'Languages', desc: 'Detect tech stack' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-dark-700 border border-dark-500">
                <item.icon className="w-8 h-8 text-accent-primary mx-auto mb-2" />
                <h4 className="font-semibold text-white text-sm">{item.label}</h4>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Token Input (collapsible) */}
          <div className="max-w-md mx-auto mb-4">
            <button
              onClick={() => setShowToken(!showToken)}
              className="text-sm text-gray-400 hover:text-white flex items-center gap-2 mx-auto mb-2"
            >
              <Key className="w-4 h-4" />
              {showToken ? 'Hide' : 'Add'} GitHub Token (for higher rate limits)
            </button>
            {showToken && (
              <div className="relative mb-4">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxx (Personal Access Token)"
                  className="w-full bg-dark-700 border border-dark-500 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-accent-primary focus:outline-none transition-colors"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Get a token at <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:underline">github.com/settings/tokens</a>
                </p>
              </div>
            )}
          </div>

          {/* Username Input */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleConnect()}
                placeholder="Enter GitHub username (e.g., torvalds)"
                className="w-full bg-dark-700 border border-dark-500 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-accent-primary focus:outline-none transition-colors"
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 mt-3 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>

          <button
            onClick={handleConnect}
            disabled={isConnecting || !username.trim()}
            className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <GitBranch className="w-5 h-5" />
                Connect with GitHub
              </>
            )}
          </button>
        </motion.div>
      ) : (
        /* Connected State */
        <>
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-6"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-dark-600 overflow-hidden border-2 border-accent-primary">
                <img
                  src={profile.avatarUrl}
                  alt={profile.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-white">@{profile.username}</h2>
                  <CheckCircle2 className="w-5 h-5 text-accent-success" />
                </div>
                <p className="text-gray-400">GitHub account connected</p>
              </div>
              <a
                href={`https://github.com/${profile.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                View Profile
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Repositories', value: profile.publicRepos, icon: FolderGit2 },
              { label: 'Contributions', value: profile.contributions, icon: Activity },
              { label: 'Followers', value: profile.followers, icon: Users },
              { label: 'Following', value: profile.following, icon: Link2 },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card"
              >
                <stat.icon className="w-8 h-8 text-accent-primary mb-3" />
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Languages & Repositories */}
          <div className="grid grid-cols-3 gap-6">
            {/* Top Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Top Languages</h3>
              <div className="space-y-4">
                {profile.topLanguages.map((lang, i) => (
                  <div key={lang.name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getLanguageColor(lang.name) }}
                        />
                        <span className="text-white text-sm">{lang.name}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{lang.percentage}%</span>
                    </div>
                    <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${lang.percentage}%` }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: getLanguageColor(lang.name) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Repositories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="col-span-2 card"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Your Repositories</h3>
                <span className="text-sm text-gray-400">
                  {profile.repositories.filter((r) => r.isAnalyzed).length} / {profile.repositories.length} analyzed
                </span>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {profile.repositories.map((repo) => (
                  <div
                    key={repo.id}
                    className="p-4 rounded-xl bg-dark-700 border border-dark-500 hover:border-dark-400 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-white">{repo.name}</h4>
                          {repo.isAnalyzed && (
                            <span className="badge-success">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Analyzed
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{repo.description}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: getLanguageColor(repo.language) }}
                            />
                            <span className="text-xs text-gray-400">{repo.language}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Star className="w-3 h-3" />
                            <span className="text-xs">{repo.stars}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <GitFork className="w-3 h-3" />
                            <span className="text-xs">{repo.forks}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Calendar className="w-3 h-3" />
                            <span className="text-xs">
                              {repo.lastCommit.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!repo.isAnalyzed && (
                          <button
                            onClick={() => analyzeRepository(repo.id)}
                            disabled={analyzingRepo === repo.id || !state.llmConnected}
                            className="btn-secondary text-sm flex items-center gap-2"
                          >
                            {analyzingRepo === repo.id ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Analyzing...
                              </>
                            ) : (
                              <>
                                <Brain className="w-4 h-4" />
                                Analyze
                              </>
                            )}
                          </button>
                        )}
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-600 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* AI Analysis Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 p-4 rounded-xl bg-accent-primary/10 border border-accent-primary/30"
          >
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-accent-primary" />
              <p className="text-sm text-gray-300">
                <span className="text-white font-medium">AI Analysis:</span> Click "Analyze" on any repository 
                to let Ollama LLM evaluate code complexity, identify skills, and assess project difficulty.
                {!state.llmConnected && (
                  <span className="text-accent-warning"> (Ollama must be running)</span>
                )}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
