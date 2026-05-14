import { Smartphone, Copy, Check } from "lucide-react";
import { useState } from "react";
import styles from "./MobileBlocker.module.css";

export function MobileBlocker() {
  const [copied, setCopied] = useState(false);
  const appUrl = window.location.href;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silent fail
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.accentShape} />

      <div className={styles.content}>
        <div className={styles.tag}>
          <Smartphone size={14} strokeWidth={2} />
          <span>Mobile Only</span>
        </div>

        <h1 className={styles.headline}>
          Github Profile
          <br />
          <span className={styles.headlineMuted}>is for phones.</span>
        </h1>

        <p className={styles.body}>
          We built this for the screen in your pocket.
          <br />
          Not the one on your desk.
        </p>

        <div className={styles.divider} />

        <button className={styles.copyBlock} onClick={handleCopy}>
          <div className={styles.copyIcon}>
            {copied ? (
              <Check size={16} strokeWidth={2.5} />
            ) : (
              <Copy size={16} strokeWidth={2} />
            )}
          </div>
          <div className={styles.copyText}>
            <span className={styles.copyAction}>
              {copied ? "Copied" : "Copy link"}
            </span>
            <span className={styles.copyUrl}>{appUrl}</span>
          </div>
        </button>
      </div>
    </div>
  );
}
