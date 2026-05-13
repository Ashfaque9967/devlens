import { useForm } from "react-hook-form";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLoading?: boolean;
}

interface FormValues {
  username: string;
}

export function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    onSearch(data.username.trim());
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.inputWrap}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter GitHub username..."
          disabled={isLoading}
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <span className={styles.error}>{errors.username.message}</span>
        )}
      </div>
      <button
        className={styles.button}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Analyzing..." : "Analyze"}
      </button>
    </form>
  );
}