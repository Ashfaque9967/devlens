import { useQuery } from "@tanstack/react-query";
import { getUser } from "../utils/githubApi";

export function useGitHubUser(username: string | null) {
  return useQuery({
    queryKey: ["githubUser", username],
    queryFn: () => getUser(username!),
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
  });
}