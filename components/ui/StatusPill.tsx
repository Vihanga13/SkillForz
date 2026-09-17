import React from "react";
import { cn } from "@/lib/utils";
import { ApplicationStatus, UserStatus, InterviewStatus } from "@/types";

export type StatusPillType = ApplicationStatus | UserStatus | InterviewStatus | string;

export interface StatusPillProps {
  status: StatusPillType;
  showDot?: boolean;
  className?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({
  status,
  showDot = true,
  className,
}) => {
  const getStatusConfig = (s: string) => {
    switch (s) {
      case "applied":
        return {
          label: "Applied",
          bg: "bg-blue-50 text-blue-700 border-blue-200",
          dot: "bg-blue-500",
        };
      case "under_review":
        return {
          label: "Under Review",
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          dot: "bg-amber-500",
        };
      case "shortlisted":
        return {
          label: "Shortlisted",
          bg: "bg-purple-50 text-purple-700 border-purple-200",
          dot: "bg-purple-500",
        };
      case "interview":
      case "scheduled":
        return {
          label: s === "scheduled" ? "Scheduled" : "Interview",
          bg: "bg-indigo-50 text-indigo-700 border-indigo-200",
          dot: "bg-indigo-500",
        };
      case "selected":
      case "passed":
      case "active":
      case "completed":
        return {
          label: s.charAt(0).toUpperCase() + s.slice(1),
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          dot: "bg-emerald-500",
        };
      case "rejected":
      case "failed":
      case "cancelled":
      case "suspended":
      case "deactivated":
        return {
          label: s.charAt(0).toUpperCase() + s.slice(1),
          bg: "bg-rose-50 text-rose-700 border-rose-200",
          dot: "bg-rose-500",
        };
      case "rescheduled":
        return {
          label: "Rescheduled",
          bg: "bg-yellow-50 text-yellow-700 border-yellow-200",
          dot: "bg-yellow-500",
        };
      default:
        return {
          label: s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          bg: "bg-slate-50 text-slate-700 border-slate-200",
          dot: "bg-slate-500",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border shadow-sm select-none",
        config.bg,
        className
      )}
    >
      {showDot && <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />}
      <span>{config.label}</span>
    </span>
  );
};
