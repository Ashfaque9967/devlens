import styles from "./RepoList.module.css";
import { FullRepoCard } from "../FullRepoCard/FullRepoCard";
import type { GitHubRepo } from "../../types/github";

interface RepoListProps {
  repos: GitHubRepo[];
}

export function RepoList({ repos }: RepoListProps) {
  if (repos.length === 0) return null;

  return (
    <div className={styles.container}>
      {repos.map((repo) => (
        <FullRepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
