import type { GitHubRepo, LanguageBreakdown } from '../types/github';

export function calculateAccountAge(createdAt: string): string {
  const created = new Date(createdAt);
  const now = new Date();
  const years = Math.floor((now.getTime() - created.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  return `${years}y`;
}

export function analyzeLanguages(repos: GitHubRepo[]): LanguageBreakdown[] {
  const counts: Record<string, number> = {};
  
  repos.forEach(repo => {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
    }
  });
  
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  if (total === 0) return [];
  
  return Object.entries(counts)
    .map(([language, count]) => ({
      language,
      percentage: Math.round((count / total) * 1000) / 10,
      bytes: count * 1000,
    }))
    .sort((a, b) => b.percentage - a.percentage);
}

export function calculateTotalStars(repos: GitHubRepo[]): number {
  return repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${Math.floor(num / 1000)}K`;
  return num.toString();
}