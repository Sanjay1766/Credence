// ============================================
// CREDENCE - LeetCode API Service
// Using leetcode-api-faisalshohag.vercel.app
// ============================================

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  realName: string;
  acceptanceRate: number;
  contributionPoints: number;
  reputation: number;
  totalSubmissions: number;
  recentSubmissions: RecentSubmission[];
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
}

export interface RecentSubmission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

// Fetch user profile stats using third-party API
export async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats> {
  const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);

  if (!response.ok) {
    throw new Error('Failed to fetch LeetCode data');
  }

  const data = await response.json();
  
  if (data.error || !data.totalSolved) {
    throw new Error('LeetCode user not found');
  }

  // Calculate total submissions from the submissions array
  const totalSubmissionsData = data.totalSubmissions || [];
  const totalAttempts = totalSubmissionsData.find((s: { difficulty: string }) => s.difficulty === 'All')?.submissions || 1;
  const acceptanceRate = Math.round((data.totalSolved / totalAttempts) * 100);

  return {
    username: username,
    totalSolved: data.totalSolved || 0,
    easySolved: data.easySolved || 0,
    mediumSolved: data.mediumSolved || 0,
    hardSolved: data.hardSolved || 0,
    ranking: data.ranking || 0,
    realName: username,
    acceptanceRate,
    contributionPoints: data.contributionPoint || 0,
    reputation: data.reputation || 0,
    totalSubmissions: totalAttempts,
    recentSubmissions: (data.recentSubmissions || []).slice(0, 10).map((sub: { title: string; titleSlug: string; timestamp: string; statusDisplay: string; lang: string }) => ({
      title: sub.title || '',
      titleSlug: sub.titleSlug || '',
      timestamp: sub.timestamp || '',
      statusDisplay: sub.statusDisplay || 'Accepted',
      lang: sub.lang || ''
    })),
    totalEasy: data.totalEasy || 927,
    totalMedium: data.totalMedium || 2010,
    totalHard: data.totalHard || 909
  };
}

// Fetch user contest rating (also from same API if available, otherwise return defaults)
export async function fetchLeetCodeContestRating(username: string): Promise<{ rating: number; globalRanking: number; attendedContests: number }> {
  try {
    const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
    
    if (!response.ok) {
      return { rating: 0, globalRanking: 0, attendedContests: 0 };
    }

    const data = await response.json();
    
    return {
      rating: data.contestRating || 0,
      globalRanking: data.contestRanking || data.ranking || 0,
      attendedContests: data.contestAttended || 0
    };
  } catch {
    return { rating: 0, globalRanking: 0, attendedContests: 0 };
  }
}
