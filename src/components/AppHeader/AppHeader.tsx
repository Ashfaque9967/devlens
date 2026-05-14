import { Search } from "lucide-react";
import { useState } from "react";
import styles from "./AppHeader.module.css";
import { SearchModal } from "../SearchModal/SearchModal";

interface AppHeaderProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

export function AppHeader({ onSearch, isLoading }: AppHeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>
          GitHub
          <br />
          Profiles
        </h1>
        <button
          className={styles.searchTrigger}
          onClick={() => setModalOpen(true)}
          aria-label="Open search"
        >
          <Search size={22} strokeWidth={2} />
        </button>
      </div>

      {modalOpen && (
        <SearchModal
          onSearch={onSearch}
          isLoading={isLoading}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
