import type { ReactNode } from "react";
import styles from "./FormField.module.css";

interface Props {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}

export function FormField({ id, label, required = false, hint, error, children }: Props) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}{required && <span className={styles.required} aria-hidden="true"> *</span>}
      </label>
      <div className={styles.controlWrap}>
        {children}
      </div>
      {hint && <div className={styles.hint} id={hintId}>{hint}</div>}
      {error && <p className={styles.error} id={errorId} role="alert">{error}</p>}
      {/* Controls set aria-describedby to matching hint/error IDs in the field renderer. */}
      {void describedBy}
    </div>
  );
}