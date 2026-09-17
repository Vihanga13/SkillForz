"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-ink-900">
            {label}
            {props.required && <span className="text-accent-danger ml-1">*</span>}
          </label>
        )}
        <div className="relative rounded-xl shadow-sm">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-500">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            type={type}
            className={cn(
              "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-500/60 transition-all duration-150 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 disabled:bg-ink-100/50 disabled:cursor-not-allowed",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-accent-danger focus:border-accent-danger focus:ring-accent-danger/20",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-ink-500">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-accent-danger mt-1">{error}</p>}
        {!error && helperText && <p className="text-xs text-ink-500 mt-1">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
