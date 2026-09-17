import React from "react";
import { cn } from "@/lib/utils";
import { Check, X, Clock, Calendar, Eye, Award } from "lucide-react";
import { ApplicationStatus } from "@/types";

export interface ApplicationStatusStepperProps {
  status: ApplicationStatus;
  className?: string;
  size?: "sm" | "md";
}

export const ApplicationStatusStepper: React.FC<ApplicationStatusStepperProps> = ({
  status,
  className,
  size = "md",
}) => {
  const steps: { key: string; label: string; icon: React.ReactNode }[] = [
    { key: "applied", label: "Applied", icon: <Clock className="h-3 w-3" /> },
    { key: "under_review", label: "Under Review", icon: <Eye className="h-3 w-3" /> },
    { key: "shortlisted", label: "Shortlisted", icon: <Check className="h-3 w-3" /> },
    { key: "interview", label: "Interview", icon: <Calendar className="h-3 w-3" /> },
    {
      key: status === "rejected" ? "rejected" : "selected",
      label: status === "rejected" ? "Rejected" : "Selected",
      icon: status === "rejected" ? <X className="h-3 w-3" /> : <Award className="h-3 w-3" />,
    },
  ];

  const getStepIndex = (s: ApplicationStatus) => {
    switch (s) {
      case "applied":
        return 0;
      case "under_review":
        return 1;
      case "shortlisted":
        return 2;
      case "interview":
        return 3;
      case "selected":
      case "rejected":
        return 4;
      default:
        return 0;
    }
  };

  const currentIndex = getStepIndex(status);
  const isRejected = status === "rejected";

  return (
    <div className={cn("w-full select-none", className)}>
      <div className="flex items-center justify-between relative">
        {steps.map((step, idx) => {
          const isPassed = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <React.Fragment key={step.key}>
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={cn(
                    "flex items-center justify-center rounded-full font-bold transition-all duration-200 shadow-sm",
                    size === "sm" ? "h-6 w-6 text-[10px]" : "h-8 w-8 text-xs",
                    isCurrent && !isRejected && "bg-primary-600 text-white ring-4 ring-primary-100",
                    isCurrent && isRejected && "bg-accent-danger text-white ring-4 ring-red-100",
                    isPassed && "bg-primary-600 text-white",
                    !isPassed && !isCurrent && "border-2 border-border bg-surface text-ink-300"
                  )}
                >
                  {isPassed ? <Check className="h-3 w-3" /> : step.icon}
                </div>

                <span
                  className={cn(
                    "text-center mt-1 font-semibold whitespace-nowrap",
                    size === "sm" ? "text-[10px]" : "text-xs",
                    isCurrent && !isRejected && "text-primary-600",
                    isCurrent && isRejected && "text-accent-danger",
                    isPassed && "text-ink-900",
                    !isPassed && !isCurrent && "text-ink-300"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 -mt-4 transition-colors duration-300",
                    idx < currentIndex ? "bg-primary-600" : "bg-border"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
