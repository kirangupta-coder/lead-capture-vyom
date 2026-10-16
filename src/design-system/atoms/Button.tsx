import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./atoms.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  fullWidth?: boolean;
};

export function Button({ children, fullWidth = false, className, type = "button", ...props }: Props) {
  return (
    <button
      {...props}
      type={type}
      className={[styles.button, fullWidth ? styles.buttonFull : "", className].filter(Boolean).join(" ")}
    >
      {children}
    </button>
  );
}