import type { InputHTMLAttributes } from "react";
import styles from "./atoms.module.css";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "checked" | "onChange"> & {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function Checkbox({ label, checked, onChange, className, ...props }: Props) {
  return (
    <div className={styles.checkboxRow}>
      <input
        {...props}
        className={[styles.checkbox, className].filter(Boolean).join(" ")}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.currentTarget.checked)}
      />
      <span className={styles.checkboxLabel}>{label}</span>
    </div>
  );
}