import React from "react";
import { cn } from "@/lib/utils";
import { SearchX } from "lucide-react";
import { Button } from "./Button";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  suggestions,
  onSuggestionClick,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-border bg-surface",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 mb-4 shadow-sm">
        {icon || <SearchX className="h-8 w-8" />}
      </div>
      <h3 className="text-lg font-bold text-ink-900 tracking-tight">{title}</h3>
      <p className="text-sm text-ink-500 max-w-md mt-1.5 leading-relaxed">{description}</p>

      {actionLabel && onAction && (
        <div className="mt-6">
          <Button variant="primary" size="md" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}

      {suggestions && suggestions.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border w-full max-w-sm">
          <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2.5">
            Try searching for:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => onSuggestionClick && onSuggestionClick(suggestion)}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-bg hover:bg-primary-50 hover:text-primary-600 border border-border transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
