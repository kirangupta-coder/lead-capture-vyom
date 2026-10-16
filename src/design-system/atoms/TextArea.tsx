import type { TextareaHTMLAttributes } from "react";
import styles from "./atoms.module.css";

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange"> & {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function TextArea({ label, value, onChange, className, ...props }: Props) {
  return (
    <textarea
      {...props}
      className={[styles.control, styles.textarea, className].filter(Boolean).join(" ")}
      aria-label={props["aria-label"] ?? label}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
}