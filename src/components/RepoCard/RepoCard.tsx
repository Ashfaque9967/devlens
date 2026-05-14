import { Star, ArrowUpRight } from "lucide-react";
import styles from "./RepoCard.module.css";
import type { GitHubRepo } from "../../types/github";
import { getLanguageColor } from "../../utils/languageColors";

interface RepoCardProps {
  repo: GitHubRepo;
}

function getContrastColor(hexColor: string): string {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

export function RepoCard({ repo }: RepoCardProps) {
  const bgColor = getLanguageColor(repo.language);
  const textColor = getContrastColor(bgColor);
  const repoUrl = `https://github.com/${repo.owner?.login || ""}/${repo.name}`;

  const handleClick = () => {
    window.open(repoUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={styles.card}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      <div className={styles.header}>
        <h3 className={styles.name}>{repo.name}</h3>
        <ArrowUpRight size={20} strokeWidth={2} style={{ color: textColor }} />
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
        <span className={styles.stars}>
          <Star size={14} strokeWidth={2} style={{ color: textColor }} />
          {repo.stargazers_count.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
