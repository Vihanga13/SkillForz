import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "neutral" | "outline";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center font-medium rounded-lg select-none";

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
  };

  const variantStyles = {
    primary: "bg-primary-50 text-primary-600 border border-primary-100",
    secondary: "bg-ink-100 text-ink-700",
    success: "bg-accent-success-soft text-accent-success font-semibold",
    warning: "bg-accent-warning-soft text-accent-warning font-semibold",
    danger: "bg-accent-danger-soft text-accent-danger font-semibold",
    neutral: "bg-bg text-ink-500 border border-border",
    outline: "border border-border text-ink-700 bg-surface",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};
