import type { InputHTMLAttributes } from "react";
import styles from "./atoms.module.css";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function TextInput({ label, value, onChange, className, ...props }: Props) {
  return (
    <input
      {...props}
      className={[styles.control, className].filter(Boolean).join(" ")}
      aria-label={props["aria-label"] ?? label}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
}