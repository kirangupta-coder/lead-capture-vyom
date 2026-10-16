import type { SelectHTMLAttributes } from "react";
import styles from "./atoms.module.css";

export interface SelectOption {
  label: string;
  value: string;
}

type Props = Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> & {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
};

export function Select({ label, value, options, onChange, className, ...props }: Props) {
  return (
    <select
      {...props}
      className={[styles.control, styles.select, className].filter(Boolean).join(" ")}
      aria-label={props["aria-label"] ?? label}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
    >
      <option value="">Choose an option</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}