import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface StepItem {
  id: string | number;
  title: string;
  description?: string;
}

export interface StepperProps {
  steps: StepItem[];
  currentStep: number; // 0-indexed
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  className,
}) => {
  return (
    <div className={cn("w-full", className)}>
      <ol className="flex items-center w-full justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = onStepClick && index <= currentStep;

          return (
            <li
              key={step.id}
              className={cn(
                "relative flex-1 flex items-center",
                index === steps.length - 1 ? "flex-initial" : "w-full"
              )}
            >
              <div
                onClick={() => isClickable && onStepClick(index)}
                className={cn(
                  "flex items-center gap-3 select-none",
                  isClickable && "cursor-pointer group"
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-200 border-2",
                    isCompleted && "bg-primary-600 border-primary-600 text-white",
                    isCurrent && "border-primary-600 bg-primary-50 text-primary-600 ring-4 ring-primary-50",
                    !isCompleted && !isCurrent && "border-border bg-surface text-ink-500"
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <div className="hidden sm:block text-left">
                  <p
                    className={cn(
                      "text-xs font-semibold uppercase tracking-wider",
                      isCurrent
                        ? "text-primary-600"
                        : isCompleted
                        ? "text-ink-900"
                        : "text-ink-500"
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-[11px] text-ink-500">{step.description}</p>
                  )}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-4 transition-colors duration-200",
                    index < currentStep ? "bg-primary-600" : "bg-border"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};
