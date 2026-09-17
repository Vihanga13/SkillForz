"use client";

import React, { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import {
  Building,
  Navigation,
  Timer,
  Bookmark,
  Share2,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowLeft,
  Copy,
  ExternalLink,
  ShieldAlert,
  SendHorizontal,
  BadgeCheck,
  Coins,
  Boxes,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { FileUpload } from "@/components/ui/FileUpload";
import { ReportModal } from "@/components/ReportModal";
import { JobCard } from "@/components/JobCard";
import { useToast } from "@/components/ui/Toast";
import { jobs } from "@/lib/data/jobs";
import {
  formatSalaryRange,
  formatRelativeTime,
  calculateDaysRemaining,
} from "@/lib/utils";

export default function JobDetailsPage({
  params: routeParams,
}: {
  params?: { slug?: string };
} = {}) {
  const hookParams = useParams();
  const slug = (routeParams?.slug || hookParams?.slug) as string;
  const job = jobs.find((j) => j.slug === slug);

  const { success, error: toastError } = useToast();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  
  // Guest Direct Application Form State (Zero login required)
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantCity, setApplicantCity] = useState("Colombo");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [applicationSuccessModal, setApplicationSuccessModal] = useState(false);

  if (!job) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900">Job Not Found</h2>
          <p className="text-ink-500 mt-2">
            The vacancy you are looking for may have expired or been removed.
          </p>
          <Link href="/find-jobs" className="mt-6">
            <Button variant="primary">Browse Open Vacancies</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const daysInfo = calculateDaysRemaining(job.deadline);
  const similarJobs = jobs
    .filter((j) => j.categoryId === job.categoryId && j.id !== job.id)
    .slice(0, 3);

  const handleShare = (platform: "copy" | "whatsapp" | "linkedin") => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      success("Link Copied", "Job vacancy URL copied to clipboard.");
    } else if (platform === "whatsapp") {
      const msg = encodeURIComponent(`Check out this vacancy on SkillForz: ${job.title} at ${job.company.name} (${url})`);
      window.open(`https://wa.me/?text=${msg}`, "_blank");
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        "_blank"
      );
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim()) {
      toastError("Full Name Required", "Please enter your full name.");
      return;
    }
    if (!applicantEmail.trim() || !/\S+@\S+\.\S+/.test(applicantEmail)) {
      toastError("Valid Email Required", "Please provide a valid email so the employer can contact you.");
      return;
    }
    if (!applicantPhone.trim()) {
      toastError("Phone Number Required", "Please enter your phone or WhatsApp number.");
      return;
    }
    if (!cvFile) {
      toastError("Resume Required", "Please upload your CV document (PDF or DOCX).");
      return;
    }

    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setIsApplied(true);
      setApplyModalOpen(false);
      setApplicationSuccessModal(true);
      success(
        "Application Dispatched Directly!",
        `Sent to ${job.company.name} under TopJobs Reference: ${job.referenceNumber}`
      );
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-bg py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "Find Jobs", href: "/find-jobs" },
                { label: job.categoryName, href: `/find-jobs?category=${job.categoryId}` },
                { label: job.title },
              ]}
            />
          </div>

          {/* TWO COLUMN LAYOUT: Main Content + Sticky Right Rail */}
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* MAIN CONTENT COLUMN */}
            <div className="flex-1 w-full space-y-6 text-left">
              {/* Job Header Card */}
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-6 border-b border-border">
                  <div className="flex items-start gap-4">
                    <Link href={`/company/${job.company.slug}`} className="shrink-0">
                      <Avatar
                        src={job.company.logo}
                        alt={job.company.name}
                        size="xl"
                        verified={job.company.verified}
                      />
                    </Link>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span className="font-mono font-bold text-xs text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-md border border-primary-100">
                          {job.referenceNumber}
                        </span>
                        <Badge variant="primary" size="sm">
                          {job.jobType}
                        </Badge>
                        <Badge variant="secondary" size="sm">
                          {job.experienceLevel}
                        </Badge>
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight font-heading">
                        {job.title}
                      </h1>
                      <div className="flex items-center gap-3 text-sm text-ink-500 mt-2 flex-wrap">
                        <Link
                          href={`/company/${job.company.slug}`}
                          className="font-semibold text-ink-700 hover:text-primary-600 transition-colors"
                        >
                          {job.company.name}
                        </Link>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <Navigation className="h-4 w-4 text-primary-600" />
                          {job.location.city}
                          {job.location.isRemote && " (Hybrid/Remote)"}
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <Timer className="h-4 w-4 text-ink-500" />
                          Posted {formatRelativeTime(job.postedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deadline Countdown Banner if under 7 days */}
                {daysInfo.isExpiringSoon && !daysInfo.isExpired && (
                  <div className="mt-6 rounded-xl border border-red-200 bg-red-50/70 p-4 flex items-center justify-between gap-4 text-accent-danger">
                    <div className="flex items-center gap-2.5">
                      <AlertTriangle className="h-5 w-5 shrink-0" />
                      <div>
                        <p className="text-sm font-bold">Applications Closing Soon!</p>
                        <p className="text-xs text-red-600">
                          This vacancy closes on {new Date(job.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="inline-block px-3 py-1 rounded-lg bg-accent-danger text-white font-mono text-xs font-bold shadow-sm">
                        {daysInfo.days}d {daysInfo.hours}h Remaining
                      </span>
                    </div>
                  </div>
                )}

                {/* Key Overview Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-sm">
                  <div className="p-3.5 rounded-xl bg-bg border border-border">
                    <span className="text-xs text-ink-500">Monthly Compensation</span>
                    <p className="font-bold text-ink-900 mt-1">
                      {formatSalaryRange(job.minSalary, job.maxSalary, job.salaryPeriod)}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-bg border border-border">
                    <span className="text-xs text-ink-500">Open Vacancies</span>
                    <p className="font-bold text-ink-900 mt-1">{job.vacanciesCount} Positions</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-bg border border-border">
                    <span className="text-xs text-ink-500">Industry</span>
                    <p className="font-bold text-ink-900 mt-1 truncate">{job.industry}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-bg border border-border">
                    <span className="text-xs text-ink-500">Application Deadline</span>
                    <p className="font-bold text-ink-900 mt-1">
                      {new Date(job.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-ink-900 mb-3">About the Role</h3>
                  <p className="text-sm text-ink-700 leading-relaxed">{job.description}</p>
                </div>

                {/* Responsibilities */}
                <div>
                  <h3 className="text-lg font-bold text-ink-900 mb-3">Key Responsibilities</h3>
                  <ul className="space-y-2.5 text-sm text-ink-700">
                    {job.responsibilities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-primary-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-lg font-bold text-ink-900 mb-3">Experience & Skills Required</h3>
                  <ul className="space-y-2.5 text-sm text-ink-700">
                    {job.requirements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-primary-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Educational Qualifications */}
                <div>
                  <h3 className="text-lg font-bold text-ink-900 mb-3 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary-600" />
                    <span>Education & Qualifications</span>
                  </h3>
                  <ul className="space-y-2.5 text-sm text-ink-700">
                    {job.qualifications.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary-600 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills Chips */}
                <div>
                  <h3 className="text-lg font-bold text-ink-900 mb-3">Required Skillsets</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-xl bg-primary-50 text-primary-700 font-semibold text-xs border border-primary-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-lg font-bold text-ink-900 mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent-warning" />
                    <span>Perks & Employee Benefits</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {job.benefits.map((b, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-bg border border-border text-xs sm:text-sm text-ink-700"
                      >
                        <CheckCircle2 className="h-4 w-4 text-accent-success shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* STICKY RIGHT RAIL */}
            <aside className="w-full lg:w-80 shrink-0 space-y-6 lg:sticky lg:top-24 text-left">
              {/* Action Box Card */}
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-4">
                {isApplied ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                    <BadgeCheck className="h-8 w-8 text-accent-success mx-auto" />
                    <h4 className="font-bold text-ink-900 text-sm">Application Dispatched!</h4>
                    <p className="text-xs text-ink-600 leading-relaxed">
                      Your CV and details have been delivered directly to <strong>{job.company.name}</strong> under TopJobs Ref: <span className="font-mono font-bold text-primary-700">{job.referenceNumber}</span>.
                    </p>
                    <p className="text-[11px] text-ink-500">
                      The employer will contact you directly via your provided phone or email.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full text-base font-bold shadow-md shadow-primary-600/20"
                      onClick={() => setApplyModalOpen(true)}
                      rightIcon={<SendHorizontal className="h-4 w-4" />}
                    >
                      Apply for this Vacancy
                    </Button>
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-accent-success font-medium">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      <span>No Sign-In Needed • Direct Recruiter Dispatch</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="md"
                    className="flex-1"
                    onClick={() => {
                      setIsBookmarked(!isBookmarked);
                      success(
                        isBookmarked ? "Bookmark Removed" : "Vacancy Saved",
                        `${job.title} saved to bookmarks.`
                      );
                    }}
                    leftIcon={
                      <Bookmark
                        className="h-4 w-4"
                        fill={isBookmarked ? "#1D4ED8" : "none"}
                        color={isBookmarked ? "#1D4ED8" : "currentColor"}
                      />
                    }
                  >
                    {isBookmarked ? "Saved" : "Save Job"}
                  </Button>

                  <div className="relative group">
                    <Button variant="outline" size="md" leftIcon={<Share2 className="h-4 w-4" />}>
                      Share
                    </Button>
                    <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-surface p-1.5 shadow-xl hidden group-hover:block z-20">
                      <button
                        type="button"
                        onClick={() => handleShare("copy")}
                        className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-ink-700 hover:bg-bg rounded-lg"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Link</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShare("whatsapp")}
                        className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-ink-700 hover:bg-bg rounded-lg"
                      >
                        <span>Share on WhatsApp</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShare("linkedin")}
                        className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-ink-700 hover:bg-bg rounded-lg"
                      >
                        <span>Share on LinkedIn</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Report link */}
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(true)}
                    className="text-xs text-ink-500 hover:text-accent-danger flex items-center justify-center gap-1.5 transition-colors mx-auto"
                  >
                    <ShieldAlert className="h-3.5 w-3.5" />
                    <span>Report this job listing</span>
                  </button>
                </div>
              </div>

              {/* Employer Mini-Card */}
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={job.company.logo}
                    alt={job.company.name}
                    size="lg"
                    verified={job.company.verified}
                  />
                  <div>
                    <h4 className="font-bold text-ink-900 text-sm truncate">{job.company.name}</h4>
                    <p className="text-xs text-ink-500 truncate">{job.company.industry}</p>
                  </div>
                </div>

                <p className="text-xs text-ink-500 line-clamp-3 leading-relaxed">
                  {job.company.description}
                </p>

                <div className="pt-2 border-t border-border space-y-2 text-xs text-ink-500">
                  <div className="flex items-center justify-between">
                    <span>Company Size:</span>
                    <span className="font-semibold text-ink-900">{job.company.companySize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Headquarters:</span>
                    <span className="font-semibold text-ink-900">{job.company.location.city}</span>
                  </div>
                </div>

                <Link href={`/company/${job.company.slug}`} className="block pt-2">
                  <Button variant="secondary" size="sm" className="w-full">
                    View Company Profile
                  </Button>
                </Link>
              </div>
            </aside>
          </div>

          {/* SIMILAR JOBS SECTION */}
          {similarJobs.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border text-left">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-ink-900">Similar Job Openings</h3>
                <p className="text-xs text-ink-500 mt-0.5">
                  Other active opportunities in {job.categoryName}
                </p>
              </div>
              <div className="space-y-4">
                {similarJobs.map((simJob) => (
                  <JobCard key={simJob.id} job={simJob} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* DIRECT GUEST APPLY MODAL (ZERO LOGIN REQUIRED) */}
      <Modal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        title={
          <div className="flex items-center gap-2">
            <SendHorizontal className="h-5 w-5 text-primary-600" />
            <span>Apply for {job.title}</span>
          </div>
        }
        description={`Direct candidate dispatch to ${job.company.name} • TopJobs Ref: ${job.referenceNumber}`}
        maxWidth="lg"
      >
        <form onSubmit={handleApplySubmit} className="space-y-4 text-left">
          {/* Zero Login Reassurance Banner */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
            <BadgeCheck className="h-4 w-4 text-accent-success shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Zero Friction: No Account or Sign-In Required</p>
              <p className="text-emerald-800 text-[11px] mt-0.5 leading-relaxed">
                Your application details and attached CV will be dispatched directly to {job.company.name}&apos;s recruitment team. The employer will reach out to you via your provided contact details.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              placeholder="e.g. Kasun Fernando"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. kasun.fernando@gmail.com"
              value={applicantEmail}
              onChange={(e) => setApplicantEmail(e.target.value)}
              required
              helperText="Employer response & interview invites go here."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Phone / WhatsApp Number"
              type="tel"
              placeholder="e.g. +94 77 123 4567"
              value={applicantPhone}
              onChange={(e) => setApplicantPhone(e.target.value)}
              required
            />
            <Input
              label="Current City / District"
              placeholder="e.g. Colombo, Kandy, Galle, Remote"
              value={applicantCity}
              onChange={(e) => setApplicantCity(e.target.value)}
              required
            />
          </div>

          {/* Resume Upload */}
          <div>
            <FileUpload
              label="Attach Your CV / Resume (PDF / DOCX)"
              helperText="Upload your latest CV (Max 5MB)"
              maxSizeMB={5}
              onFileSelect={(file) => setCvFile(file)}
            />
          </div>

          {/* Cover Note */}
          <div>
            <Textarea
              label="Short Note to Hiring Manager (Optional)"
              placeholder={`Highlight your relevant expertise (${job.skills.slice(0, 3).join(", ")}) or earliest available joining date...`}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-[11px] text-ink-500 font-mono">
              TopJobs Ref: {job.referenceNumber}
            </span>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setApplyModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={isApplying}
                rightIcon={<SendHorizontal className="h-4 w-4" />}
              >
                Submit Application Directly
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      {/* CELEBRATORY APPLICATION SUCCESS MODAL */}
      <Modal
        isOpen={applicationSuccessModal}
        onClose={() => setApplicationSuccessModal(false)}
        title="Application Dispatched Successfully!"
      >
        <div className="space-y-4 text-center py-2">
          <div className="h-16 w-16 rounded-full bg-emerald-100 text-accent-success flex items-center justify-center mx-auto">
            <BadgeCheck className="h-8 w-8" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-ink-900 font-heading">
              Your Application is On Its Way
            </h3>
            <p className="text-xs text-ink-600 mt-1 max-w-sm mx-auto leading-relaxed">
              Your resume and contact details were delivered directly to <strong>{job.company.name}</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-bg border border-border inline-block text-left w-full max-w-xs">
            <span className="text-[11px] font-bold text-ink-500 uppercase tracking-wider block mb-1">
              TopJobs Reference Code:
            </span>
            <span className="text-base font-mono font-bold text-primary-700">
              {job.referenceNumber}
            </span>
            <div className="mt-2 text-[11px] text-ink-500">
              Confirmation sent to: <strong className="text-ink-800">{applicantEmail}</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => setApplicationSuccessModal(false)}
            >
              Done
            </Button>
            <Link href="/find-jobs" className="flex-1">
              <Button variant="outline" className="w-full">
                Browse More Vacancies
              </Button>
            </Link>
          </div>
        </div>
      </Modal>

      {/* REPORT LISTING MODAL */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        targetType="job"
        targetId={job.id}
        targetTitle={`${job.title} (${job.referenceNumber})`}
      />

      <Footer />
    </div>
  );
}
