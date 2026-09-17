export type UserRole = "seeker" | "employer";

export type UserStatus = "active" | "suspended" | "deactivated";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  phone?: string;
  status: UserStatus;
  createdAt: string;
}

export interface Company {
  id: string;
  slug: string;
  name: string;
  logo: string;
  coverImage: string;
  tagline: string;
  description: string;
  industry: string;
  companySize: string;
  foundedYear: number;
  website: string;
  email: string;
  phone: string;
  location: {
    city: string;
    district: string;
    address: string;
  };
  verified: boolean;
  featured: boolean;
  openVacanciesCount: number;
  socialLinks: {
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    website?: string;
  };
  perks: string[];
  rating: number;
  reviewCount: number;
}

export type JobType =
  | "Full-time"
  | "Part-time"
  | "Internship"
  | "Contract"
  | "Remote";

export type ExperienceLevel =
  | "Entry Level"
  | "Mid Level"
  | "Senior Level"
  | "Lead / Principal"
  | "Executive";

export type JobStatus =
  | "active"
  | "expired"
  | "draft"
  | "pending_approval"
  | "rejected";

export interface Job {
  id: string;
  slug: string;
  referenceNumber: string; // e.g. REF-MAS-2024-089 (TopJobs style)
  title: string;
  companyId: string;
  company: Company;
  location: {
    city: string;
    district: string;
    isRemote: boolean;
  };
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  categoryId: string;
  categoryName: string;
  industry: string;
  minSalary?: number; // In LKR
  maxSalary?: number; // In LKR
  salaryNegotiable: boolean;
  salaryPeriod: "month" | "year";
  vacanciesCount: number;
  deadline: string;
  postedAt: string;
  isFeatured: boolean;
  isHot: boolean;
  isUrgent: boolean;
  status: JobStatus;
  viewsCount: number;
  applicationsCount: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  qualifications: string[];
  skills: string[];
  benefits: string[];
  contactEmail: string;
  applicationMethod: "portal" | "email" | "external_url";
  externalUrl?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  fieldOfStudy: string;
  startYear: string;
  endYear?: string;
  isCurrent: boolean;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
}

export interface CertificateItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  fileUrl?: string;
}

export interface SkillItem {
  name: string;
  level: "Beginner" | "Intermediate" | "Expert";
}

export interface LanguageItem {
  language: string;
  proficiency: "Basic" | "Conversational" | "Fluent" | "Native";
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  link?: string;
}

export interface JobAlertPreference {
  id: string;
  title: string;
  category?: string;
  location?: string;
  jobType?: string;
  frequency: "daily" | "weekly";
}

export interface JobSeeker {
  id: string;
  userId: string;
  fullName: string;
  headline: string;
  summary: string;
  avatar: string;
  phone: string;
  email: string;
  location: {
    city: string;
    country: string;
  };
  profileCompletionPercentage: number;
  cvUrl?: string;
  cvFileName?: string;
  cvUploadedAt?: string;
  certificates: CertificateItem[];
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  projects: ProjectItem[];
  savedJobIds: string[];
  jobAlerts: JobAlertPreference[];
}

export type ApplicationStatus =
  | "applied"
  | "under_review"
  | "shortlisted"
  | "interview"
  | "selected"
  | "rejected";

export interface Application {
  id: string;
  jobId: string;
  job?: Job;
  applicantId: string;
  applicant?: JobSeeker;
  status: ApplicationStatus;
  appliedDate: string;
  updatedDate: string;
  cvUrl: string;
  cvFileName?: string;
  coverLetter?: string;
  certificates: string[];
  employerNotes?: string;
  starRating?: number; // 1 to 5
}

export type InterviewType = "online" | "physical";
export type InterviewStatus = "scheduled" | "completed" | "cancelled" | "rescheduled";
export type InterviewResult = "pending" | "passed" | "failed";

export interface Interview {
  id: string;
  applicationId: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  applicantId: string;
  applicantName: string;
  employerId: string;
  scheduledAt: string;
  type: InterviewType;
  locationOrLink: string;
  instructions?: string;
  status: InterviewStatus;
  interviewNotes?: string;
  result: InterviewResult;
}

export type NotificationType =
  | "job_alert"
  | "application_status"
  | "interview_invite"
  | "system"
  | "new_applicant";

export interface Notification {
  id: string;
  recipientUserId: string;
  title: string;
  message: string;
  type: NotificationType;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  description: string;
  jobCount: number;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  readingTimeMinutes: number;
  publishedAt: string;
  tags: string[];
}

export type ReportReason =
  | "fake_job"
  | "scam_or_fraud"
  | "inappropriate_content"
  | "expired_vacancy"
  | "other";

export type ReportStatus = "pending" | "reviewed" | "action_taken" | "dismissed";

export interface Report {
  id: string;
  targetType: "job" | "company" | "user";
  targetId: string;
  targetTitle: string;
  reportedByUserId: string;
  reportedByEmail: string;
  reason: ReportReason;
  details: string;
  status: ReportStatus;
  createdAt: string;
}
