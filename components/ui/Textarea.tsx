"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-ink-900">
            {label}
            {props.required && <span className="text-accent-danger ml-1">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink-900 placeholder:text-ink-500/60 transition-all duration-150 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 disabled:bg-ink-100/50 disabled:cursor-not-allowed resize-y",
            error && "border-accent-danger focus:border-accent-danger focus:ring-accent-danger/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-accent-danger mt-1">{error}</p>}
        {!error && helperText && <p className="text-xs text-ink-500 mt-1">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
