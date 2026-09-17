import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatLKR(amount: number): string {
  return `LKR ${amount.toLocaleString("en-LK")}`;
}

export function formatSalaryRange(min?: number, max?: number, period: "month" | "year" = "month"): string {
  if (!min && !max) return "Negotiable";
  const periodText = period === "month" ? "/mo" : "/yr";
  if (min && max) {
    return `${formatLKR(min)} - ${formatLKR(max)} ${periodText}`;
  }
  if (min) {
    return `From ${formatLKR(min)} ${periodText}`;
  }
  return `Up to ${formatLKR(max!)} ${periodText}`;
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  return `${Math.floor(diffInDays / 365)}y ago`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function calculateDaysRemaining(deadlineDateString: string): {
  days: number;
  hours: number;
  isExpiringSoon: boolean;
  isExpired: boolean;
} {
  const deadline = new Date(deadlineDateString).getTime();
  const now = new Date().getTime();
  const diff = deadline - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, isExpiringSoon: false, isExpired: true };
  }

  const totalHours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  return {
    days,
    hours,
    isExpiringSoon: days < 7,
    isExpired: false,
  };
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
