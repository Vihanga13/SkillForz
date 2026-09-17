"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "white";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5 font-medium",
      md: "text-sm px-4 py-2.5 gap-2 font-medium",
      lg: "text-base px-6 py-3.5 gap-2.5 font-semibold",
    };

    const variantStyles = {
      primary:
        "bg-primary-600 text-white hover:bg-primary-500 shadow-sm hover:shadow active:bg-primary-700",
      secondary:
        "bg-primary-50 text-primary-600 hover:bg-primary-100 active:bg-primary-200 border border-primary-100",
      outline:
        "border border-border bg-surface text-ink-900 hover:bg-bg hover:border-ink-300 active:bg-ink-100",
      ghost:
        "text-ink-700 hover:bg-primary-50 hover:text-primary-600 active:bg-primary-100",
      danger:
        "bg-accent-danger text-white hover:bg-red-700 active:bg-red-800 shadow-sm",
      white:
        "bg-surface text-primary-600 hover:bg-primary-50 shadow-sm hover:shadow font-semibold",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
