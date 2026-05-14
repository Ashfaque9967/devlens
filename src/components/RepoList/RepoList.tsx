import styles from "./RepoList.module.css";
import { FullRepoCard } from "../FullRepoCard/FullRepoCard";
import type { GitHubRepo } from "../../types/github";

interface RepoListProps {
  repos: GitHubRepo[];
}

export function RepoList({ repos }: RepoListProps) {
  const sortedRepos = [...repos].sort(
    (a, b) => b.stargazers_count - a.stargazers_count,
  );

  if (sortedRepos.length === 0) return null;

  return (
    <div className={styles.container}>
      {sortedRepos.map((repo) => (
        <FullRepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
