import { useState, useEffect, useMemo } from "react";
import "./styles/global.css";
import styles from "./App.module.css";
import { AppWrapper } from "./components/AppWrapper/AppWrapper";
import { BottomNav } from "./components/BottomNav/BottomNav";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { ProfileHeader } from "./components/ProfileHeader/ProfileHeader";
import { ProfileRepoList } from "./components/RepoList/ProfileRepoList";
import { RepoList } from "./components/RepoList/RepoList";
import { LanguageFilter } from "./components/LanguageFilter/LanguageFilter";
import { useGitHubUser } from "./hooks/useGitHubUser";
import { useGitHubRepos } from "./hooks/useGitHubRepo";

type Tab = "profile" | "repos";

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [searchUser, setSearchUser] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);

  useEffect(() => {
    const lastUser = localStorage.getItem("devlens_last_user");
    if (lastUser) {
      setSearchUser(lastUser);
    }
  }, []);

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useGitHubUser(searchUser);
  const { data: repos, isLoading: reposLoading } = useGitHubRepos(searchUser);

  const handleSearch = (username: string) => {
    setSearchUser(username);
    localStorage.setItem("devlens_last_user", username);
  };

  const isLoading = userLoading || reposLoading;

  const languages = useMemo(() => {
    if (!repos) return [];
    const set = new Set<string>();
    repos.forEach((r) => {
      if (r.language) set.add(r.language);
    });
    return Array.from(set).sort();
  }, [repos]);

  const filteredRepos = useMemo(() => {
    if (!repos) return [];
    if (!languageFilter) return repos;
    return repos.filter((r) => r.language === languageFilter);
  }, [repos, languageFilter]);

  return (
    <div className={styles.app}>
      <main className={styles.main}>
        {activeTab === "profile" && (
          <div className={styles.page}>
            <AppHeader onSearch={handleSearch} isLoading={isLoading} />

            {userError && (
              <div className={styles.error}>
                <p>User not found. Try another username.</p>
              </div>
            )}

            {user && !userError && (
              <>
                <ProfileHeader user={user} />
                {repos && repos.length > 0 && <ProfileRepoList repos={repos} />}
              </>
            )}

            {!user && !userError && !isLoading && (
              <div className={styles.empty}>
                <p>Find a developer. Explore their work.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "repos" && (
          <div className={styles.page}>
            <AppHeader onSearch={handleSearch} isLoading={isLoading} />

            {user && !userError && repos && (
              <>
                <div className={styles.repoHeader}>
                  <h2 className={styles.repoTitle}>{user.login}</h2>
                  <p className={styles.repoCount}>
                    {repos.length} repositories
                  </p>
                </div>

                {languages.length > 0 && (
                  <LanguageFilter
                    languages={languages}
                    active={languageFilter}
                    onChange={setLanguageFilter}
                  />
                )}

                <RepoList repos={filteredRepos} />
              </>
            )}

            {!user && !userError && !isLoading && (
              <div className={styles.empty}>
                <p>Find a developer to see their repositories.</p>
              </div>
            )}
          </div>
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

function App() {
  return (
    <AppWrapper>
      <AppContent />
    </AppWrapper>
  );
}

export default App;
