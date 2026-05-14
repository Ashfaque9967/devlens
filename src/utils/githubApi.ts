// ./src/utils/githubApi.ts
import type { GitHubUser, GitHubRepo } from '../types/github';

const BASE_URL = 'https://api.github.com';

class GitHubError extends Error {
  status: number;
  
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'GitHubError';
  }
}

async function fetchGitHub<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new GitHubError(404, 'User not found');
    }
    if (response.status === 403) {
      throw new GitHubError(403, 'Rate limit exceeded. Try again later.');
    }
    throw new GitHubError(response.status, 'GitHub API error');
  }
  
  return response.json() as Promise<T>;
}

export async function getUser(username: string): Promise<GitHubUser> {
  return fetchGitHub<GitHubUser>(`/users/${username}`);
}

export async function getRepos(username: string): Promise<GitHubRepo[]> {
  return fetchGitHub<GitHubRepo[]>(
    `/users/${username}/repos?sort=updated&per_page=10`
  );
}

export { GitHubError };