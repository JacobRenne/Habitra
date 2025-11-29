"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export function Button({
  children,
  variant = "secondary",
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium transition-all border shadow-sm border-dashed";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-yellow-100 border-yellow-300 hover:bg-yellow-200",
    secondary: "bg-gray-50 border-gray-300 hover:bg-gray-100",
    danger: "bg-red-100 border-red-300 hover:bg-red-200 text-red-800",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
