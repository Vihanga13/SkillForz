"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: string;
  badge?: string;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  layout?: "vertical" | "horizontal" | "card";
  error?: string;
  label?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  defaultValue,
  onChange,
  className,
  layout = "vertical",
  error,
  label,
}) => {
  const [internalValue, setInternalValue] = React.useState<string>(value || defaultValue || "");

  const currentValue = value !== undefined ? value : internalValue;

  const handleSelect = (val: string) => {
    setInternalValue(val);
    if (onChange) onChange(val);
  };

  return (
    <div className="w-full space-y-2 text-left">
      {label && <span className="block text-sm font-medium text-ink-900">{label}</span>}
      <div
        className={cn(
          layout === "vertical" && "space-y-2.5",
          layout === "horizontal" && "flex flex-wrap gap-4",
          layout === "card" && "grid grid-cols-1 sm:grid-cols-2 gap-3",
          className
        )}
      >
        {options.map((option) => {
          const isChecked = currentValue === option.value;
          const id = `${name}-${option.value}`;

          if (layout === "card") {
            return (
              <label
                key={option.value}
                htmlFor={id}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "relative flex cursor-pointer items-start justify-between rounded-xl border p-4 transition-all duration-150",
                  isChecked
                    ? "border-primary-600 bg-primary-50/50 ring-2 ring-primary-600/20"
                    : "border-border bg-surface hover:border-ink-300"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-border bg-surface">
                    {isChecked && <div className="h-2 w-2 rounded-full bg-primary-600" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-ink-900">{option.label}</span>
                      {option.badge && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-primary-100 text-primary-600">
                          {option.badge}
                        </span>
                      )}
                    </div>
                    {option.description && (
                      <p className="text-xs text-ink-500 mt-1">{option.description}</p>
                    )}
                  </div>
                </div>
                <input
                  id={id}
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  onChange={() => handleSelect(option.value)}
                  className="sr-only"
                />
              </label>
            );
          }

          return (
            <label key={option.value} htmlFor={id} className="flex items-start gap-3 cursor-pointer">
              <div className="relative flex items-center pt-0.5">
                <input
                  id={id}
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  onChange={() => handleSelect(option.value)}
                  className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-border bg-surface checked:border-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/30"
                />
                {isChecked && (
                  <span className="pointer-events-none absolute left-1 top-1.5 h-2 w-2 rounded-full bg-primary-600" />
                )}
              </div>
              <div className="text-sm">
                <span className="font-medium text-ink-900">{option.label}</span>
                {option.description && <p className="text-xs text-ink-500 mt-0.5">{option.description}</p>}
              </div>
            </label>
          );
        })}
      </div>
      {error && <p className="text-xs text-accent-danger mt-1">{error}</p>}
    </div>
  );
};
