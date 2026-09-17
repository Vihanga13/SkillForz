"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, id, checked, defaultChecked, onChange, ...props }, ref) => {
    const inputId = id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex items-start space-x-3 text-left">
        <div className="relative flex items-center pt-0.5">
          <input
            id={inputId}
            ref={ref}
            type="checkbox"
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            className={cn(
              "peer h-4.5 w-4.5 cursor-pointer appearance-none rounded-md border border-border bg-surface checked:bg-primary-600 checked:border-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/30 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-accent-danger",
              className
            )}
            {...props}
          />
          <Check className="pointer-events-none absolute left-0.5 top-1 h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
        {(label || description) && (
          <div className="text-sm">
            {label && (
              <label htmlFor={inputId} className="font-medium text-ink-900 cursor-pointer select-none">
                {label}
              </label>
            )}
            {description && <p className="text-xs text-ink-500 mt-0.5">{description}</p>}
            {error && <p className="text-xs text-accent-danger mt-1">{error}</p>}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
