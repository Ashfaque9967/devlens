import { useState } from "react";
import { Header } from "./components/Header/Header";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { HeroProfile } from "./components/HeroProfile/HeroProfile";
import { useGitHubUser } from "./hooks/useGitHubUser";
import { useGitHubRepos } from "./hooks/useGitHubRepo";
import styles from "./App.module.css";

export default function App() {
  const [username, setUsername] = useState<string | null>(null);

  const userQuery = useGitHubUser(username);
  const reposQuery = useGitHubRepos(username);

  const isLoading = userQuery.isLoading || reposQuery.isLoading;
  const hasError = userQuery.isError || reposQuery.isError;
  const errorMessage = userQuery.error?.message || reposQuery.error?.message;

  console.log("username:", username);
  console.log("userQuery.isPending:", userQuery.isPending);
  console.log("reposQuery.isPending:", reposQuery.isPending);
  console.log("isLoading:", isLoading);

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <div className={styles.searchSection}>
          <SearchBar
            onSearch={setUsername}
            isLoading={isLoading}
          />
        </div>

        {hasError && (
          <div className={styles.errorCard}>
            <p className={styles.errorText}>{errorMessage}</p>
          </div>
        )}

        {userQuery.isSuccess && userQuery.data && (
          <div className={styles.results}>
            <HeroProfile user={userQuery.data} />
          </div>
        )}
      </main>
    </div>
  );
}