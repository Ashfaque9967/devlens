import { MapPin, Calendar } from "lucide-react";
import styles from "./ProfileHeader.module.css";
import type { GitHubUser } from "../../types/github";
import { calculateAccountAge, formatNumber } from "../../utils/analyzers";

interface ProfileHeaderProps {
  user: GitHubUser;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const accountAge = calculateAccountAge(user.created_at);

  return (
    <div className={styles.container}>
      <div className={styles.avatarSection}>
        <div className={styles.avatarFrame}>
          <img
            src={user.avatar_url}
            alt={user.login}
            className={styles.avatar}
          />
        </div>
        <div className={styles.nameBlock}>
          <h1 className={styles.name}>{user.name || user.login}</h1>
          <p className={styles.handle}>@{user.login}</p>
        </div>
      </div>

      {user.bio && <p className={styles.bio}>{user.bio}</p>}

      <div className={styles.metaRow}>
        {user.location && (
          <span className={styles.metaItem}>
            <MapPin size={16} strokeWidth={1.5} />
            <span>{user.location}</span>
          </span>
        )}
        <span className={styles.metaItem}>
          <Calendar size={16} strokeWidth={1.5} />
          <span>{accountAge} on GitHub</span>
        </span>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {formatNumber(user.public_repos)}
          </span>
          <span className={styles.statLabel}>Repos</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {formatNumber(user.followers)}
          </span>
          <span className={styles.statLabel}>Followers</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {formatNumber(user.following)}
          </span>
          <span className={styles.statLabel}>Following</span>
        </div>
      </div>
    </div>
  );
}
