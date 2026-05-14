import { Search, X, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import styles from "./SearchModal.module.css";

interface SearchFormData {
  username: string;
}

interface SearchModalProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
  onClose: () => void;
}

export function SearchModal({
  onSearch,
  isLoading,
  onClose,
}: SearchModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<SearchFormData>({
    mode: "onChange",
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = (data: SearchFormData) => {
    if (data.username.trim()) {
      onSearch(data.username.trim());
      reset();
      onClose();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose} />

      <div className={styles.sheet}>
        <div className={styles.handleBar} />

        <div className={styles.header}>
          <h2 className={styles.heading}>Search</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputRow}>
            <Search size={20} strokeWidth={2} className={styles.inputIcon} />
            <input
              {...register("username", { required: true, minLength: 1 })}
              ref={(e) => {
                register("username").ref(e);
                (inputRef as any).current = e;
              }}
              placeholder="GitHub username..."
              className={styles.input}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading || !isValid}
          >
            {isLoading ? (
              <span className={styles.loading}>...</span>
            ) : (
              <ArrowRight size={20} strokeWidth={2} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
