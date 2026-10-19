import type { ButtonHTMLAttributes } from "react";

const VARIANT_CLASSES = Object.freeze({
  primary: "bg-ticket text-white hover:bg-ticket-hover",
  ghost: "border border-seat text-screen hover:border-dust hover:bg-curtain",
});

const BASE_CLASSES =
  "focus-ring inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: keyof typeof VARIANT_CLASSES;
}

export function Button({ variant = "primary", type = "button", className = "", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
