import { Star, GitFork } from "lucide-react";
import styles from "./FullRepoCard.module.css";
import type { GitHubRepo } from "../../types/github";
import { getLanguageColor } from "../../utils/languageColors";

interface FullRepoCardProps {
  repo: GitHubRepo;
}

function getContrastColor(hexColor: string): string {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

export function FullRepoCard({ repo }: FullRepoCardProps) {
  const bgColor = getLanguageColor(repo.language);
  const textColor = getContrastColor(bgColor);

  return (
    <div
      className={styles.card}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div className={styles.header}>
        <h3 className={styles.name}>{repo.name}</h3>
        <span className={styles.stars}>
          <Star size={14} strokeWidth={2} style={{ color: textColor }} />
          {repo.stargazers_count.toLocaleString()}
        </span>
      </div>

      {repo.description && (
        <p
          className={styles.description}
          style={{ color: textColor, opacity: 0.85 }}
        >
          {repo.description}
        </p>
      )}

      <div className={styles.footer}>
        <span className={styles.language}>{repo.language}</span>
        <span className={styles.forks}>
          <GitFork size={14} strokeWidth={2} style={{ color: textColor }} />
          {repo.forks_count}
        </span>
      </div>
    </div>
  );
}
