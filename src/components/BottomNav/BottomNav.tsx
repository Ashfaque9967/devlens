import { User, GitBranch } from "lucide-react";
import styles from "./BottomNav.module.css";

type Tab = "profile" | "repos";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs: { id: Tab; label: string; icon: typeof User }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "repos", label: "Repos", icon: GitBranch },
  ];

  return (
    <nav
      className={styles.container}
      role="tablist"
      aria-label="App navigation"
    >
      <div className={styles.island}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
              onClick={() => onTabChange(tab.id)}
              role="tab"
              aria-selected={isActive}
              aria-label={tab.label}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2 : 1.5}
                className={styles.icon}
              />
              <span className={styles.label}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
