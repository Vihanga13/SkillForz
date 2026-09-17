import { Notification } from "@/types";
import { mockNotifications } from "@/lib/data/notifications";
import { JobMatchResult } from "./cvMatcher";

export interface MatchAlertConfig {
  id: string;
  candidateName: string;
  candidateTitle: string;
  email: string;
  phone?: string;
  threshold: number; // e.g. 80%
  channel: "email" | "whatsapp" | "both";
  frequency: "instant" | "daily";
  active: boolean;
  createdAt: string;
}

const NOTIFS_STORAGE_KEY = "skillforz_ai_notifications";
const ALERTS_STORAGE_KEY = "skillforz_ai_match_alerts";

export function getStoredNotifications(): Notification[] {
  if (typeof window === "undefined") return mockNotifications;
  try {
    const raw = localStorage.getItem(NOTIFS_STORAGE_KEY);
    if (!raw) return mockNotifications;
    const parsed: Notification[] = JSON.parse(raw);
    return [...parsed, ...mockNotifications.filter((m) => !parsed.some((p) => p.id === m.id))];
  } catch {
    return mockNotifications;
  }
}

export function dispatchAIMatchNotification(
  matches: JobMatchResult[],
  candidateName: string
): Notification {
  const topMatches = matches.filter((m) => m.score >= 75).slice(0, 3);
  const bestMatch = matches[0];

  const matchedSummaries = topMatches
    .map((m) => `${m.job.company.name} (${m.score}%)`)
    .join(", ");

  const newNotif: Notification = {
    id: `notif-ai-${Date.now()}`,
    recipientUserId: "user-seeker-01",
    title: `✨ AI Match Found: ${topMatches.length} High-Compatibility Roles!`,
    message: bestMatch
      ? `Top match: ${bestMatch.job.title} at ${bestMatch.job.company.name} (${bestMatch.score}% fit). Matched with: ${matchedSummaries}.`
      : `New potential opportunities matched for your candidate profile (${candidateName}).`,
    type: "job_alert",
    link: `/find-jobs?aiMatch=true`,
    isRead: false,
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      const current = getStoredNotifications();
      const updated = [newNotif, ...current.filter((n) => n.id !== newNotif.id)];
      localStorage.setItem(NOTIFS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("skillforz:notification", { detail: newNotif }));
    } catch (e) {
      console.error("Failed to store AI match notification:", e);
    }
  }

  // Also prepend to mockNotifications array in memory for immediate access
  if (!mockNotifications.some((n) => n.id === newNotif.id)) {
    mockNotifications.unshift(newNotif);
  }

  return newNotif;
}

export function getStoredAlertConfigs(): MatchAlertConfig[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ALERTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAlertConfig(config: Omit<MatchAlertConfig, "id" | "createdAt">): MatchAlertConfig {
  const newConfig: MatchAlertConfig = {
    ...config,
    id: `alert-cfg-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      const current = getStoredAlertConfigs();
      const updated = [newConfig, ...current.filter((c) => c.id !== newConfig.id)];
      localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("skillforz:alerts_updated", { detail: newConfig }));
    } catch (e) {
      console.error("Failed to save match alert config:", e);
    }
  }

  return newConfig;
}

export function removeAlertConfig(id: string): void {
  if (typeof window !== "undefined") {
    try {
      const current = getStoredAlertConfigs();
      const updated = current.filter((c) => c.id !== id);
      localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("skillforz:alerts_updated", { detail: { removedId: id } }));
    } catch (e) {
      console.error("Failed to remove alert config:", e);
    }
  }
}
