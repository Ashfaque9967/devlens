import styles from "./ProfileRepoList.module.css";
import { RepoCard } from "../RepoCard/RepoCard";
import type { GitHubRepo } from "../../types/github";

interface ProfileRepoListProps {
  repos: GitHubRepo[];
}

export function ProfileRepoList({ repos }: ProfileRepoListProps) {
  const sortedRepos = [...repos].sort(
    (a, b) => b.stargazers_count - a.stargazers_count,
  );
  const topRepos = sortedRepos.slice(0, 5);

  if (topRepos.length === 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.divider} />
      <h2 className={styles.heading}>Most Starred</h2>
      <div className={styles.scrollContainer}>
        <div className={styles.scrollTrack}>
          {topRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
}
