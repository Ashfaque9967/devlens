import type { GitHubUser } from "../../types/github";
import styles from "./HeroProfile.module.css";

interface HeroProfileProps {
  user: GitHubUser;
}

export function HeroProfile({ user }: HeroProfileProps) {
  return (
    <div className={styles.card}>
      <div className={styles.avatarWrap}>
        <img
          className={styles.avatar}
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
        />
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>{user.name || user.login}</h2>
        <p className={styles.handle}>@{user.login}</p>
        {user.bio && <p className={styles.bio}>{user.bio}</p>}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{user.public_repos}</span>
            <span className={styles.statLabel}>Repos</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{user.followers}</span>
            <span className={styles.statLabel}>Followers</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{user.following}</span>
            <span className={styles.statLabel}>Following</span>
          </div>
        </div>
      </div>
    </div>
  );
}
