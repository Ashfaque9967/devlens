// ./src/hooks/useGithubRepo.ts
import { useQuery } from "@tanstack/react-query";
import { getRepos } from "../utils/githubApi";

export function useGitHubRepos(username: string | null) {
  return useQuery({
    queryKey: ["githubRepos", username],
    queryFn: () => getRepos(username!),
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
  });
}