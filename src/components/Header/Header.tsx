import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <span className={styles.logo}>DevLens</span>
        <span className={styles.tagline}>GitHub Profile Analyzer</span>
      </div>
    </header>
  );
}
