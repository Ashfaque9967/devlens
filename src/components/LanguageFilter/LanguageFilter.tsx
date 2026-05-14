import styles from "./LanguageFilter.module.css";

interface LanguageFilterProps {
  languages: string[];
  active: string | null;
  onChange: (lang: string | null) => void;
}

export function LanguageFilter({
  languages,
  active,
  onChange,
}: LanguageFilterProps) {
  return (
    <div className={styles.container}>
      <div className={styles.scroll}>
        <button
          className={`${styles.pill} ${active === null ? styles.pillActive : ""}`}
          onClick={() => onChange(null)}
        >
          All
        </button>
        {languages.map((lang) => (
          <button
            key={lang}
            className={`${styles.pill} ${active === lang ? styles.pillActive : ""}`}
            onClick={() => onChange(lang)}
          >
            {lang}
          </button>
        ))}
      </div>
    </div>
  );
}
