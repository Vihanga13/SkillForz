import { Notification } from "@/types";

export const mockNotifications: Notification[] = [
  {
    id: "notif-001",
    recipientUserId: "user-seeker-01",
    title: "Interview Scheduled",
    message: "Dialog Axiata PLC has scheduled a technical interview for Senior Cloud Solutions Architect on Sep 22 at 10:30 AM.",
    type: "interview_invite",
    link: "/seeker/applications",
    isRead: false,
    createdAt: "2024-09-14T08:30:00Z",
  },
  {
    id: "notif-002",
    recipientUserId: "user-seeker-01",
    title: "Application Shortlisted",
    message: "WSO2 has reviewed your application for Lead Software Engineer and shortlisted your profile.",
    type: "application_status",
    link: "/seeker/applications",
    isRead: false,
    createdAt: "2024-09-13T14:15:00Z",
  },
  {
    id: "notif-003",
    recipientUserId: "user-seeker-01",
    title: "New Job Alert: Cloud Architecture",
    message: "3 new jobs matching your alert 'Cloud & DevOps Jobs in Colombo' were posted today.",
    type: "job_alert",
    link: "/find-jobs?category=software-it",
    isRead: true,
    createdAt: "2024-09-12T09:00:00Z",
  },
];
