"use client";

import React from "react";
import Link from "next/link";
import {
  FileCheck,
  Bookmark,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Briefcase,
  AlertCircle,
  Bell,
  MapPin,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { Avatar } from "@/components/ui/Avatar";
import { mockJobSeeker } from "@/lib/data/mockUsers";
import { mockApplications } from "@/lib/data/applications";
import { mockNotifications } from "@/lib/data/notifications";
import { jobs } from "@/lib/data/jobs";
import { formatSalaryRange } from "@/lib/utils";

export default function SeekerDashboardOverview() {
  const appliedCount = mockApplications.length;
  const shortlistedCount = mockApplications.filter((a) => a.status === "shortlisted").length;
  const interviewCount = mockApplications.filter((a) => a.status === "interview").length;
  const savedCount = mockJobSeeker.savedJobIds.length;

  // Recommended jobs based on Seeker skills
  const recommendedJobs = jobs.filter((j) =>
    j.skills.some((s) => ["AWS", "Kubernetes", "TypeScript", "React"].includes(s))
  ).slice(0, 3);

  // Circular progress calculation
  const percentage = mockJobSeeker.profileCompletionPercentage; // 85%
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="space-y-8 text-left">
      {/* Welcome Banner + Profile Ring */}
      <div className="rounded-3xl border border-primary-100 bg-gradient-to-r from-primary-50 via-white to-primary-50/50 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-bold">
            <Sparkles className="h-3.5 w-3.5" /> Candidate Workspace
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight font-heading">
            Ayubowan, {mockJobSeeker.fullName.split(" ")[0]}!
          </h1>
          <p className="text-sm text-ink-500 max-w-lg leading-relaxed">
            You have <strong className="text-primary-600">1 upcoming interview</strong> with Dialog
            Axiata and 3 vacancies actively reviewing your CV.
          </p>
          <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
            <Link href="/find-jobs">
              <Button variant="primary" size="sm">
                Explore Matching Jobs
              </Button>
            </Link>
            <Link href="/seeker/profile">
              <Button variant="outline" size="sm">
                Update Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Profile Completion Circular Progress Ring */}
        <div className="flex items-center gap-4 bg-surface p-4 rounded-2xl border border-border shadow-sm shrink-0">
          <div className="relative flex items-center justify-center">
            <svg className="h-24 w-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-ink-100"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-primary-600 transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-black text-ink-900 font-heading">{percentage}%</span>
              <span className="text-[9px] uppercase font-bold text-ink-500">Strength</span>
            </div>
          </div>
          <div className="text-xs space-y-1">
            <p className="font-bold text-ink-900">Profile Score: Great</p>
            <p className="text-ink-500 max-w-[130px] leading-tight">
              Add university certificates to reach 100% visibility.
            </p>
            <Link
              href="/seeker/profile"
              className="text-primary-600 font-bold hover:underline inline-block pt-1"
            >
              Finish Profile &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between text-xs text-ink-500 mb-2">
            <span>Applications</span>
            <FileCheck className="h-4 w-4 text-primary-600" />
          </div>
          <p className="text-3xl font-extrabold text-ink-900 font-heading">{appliedCount}</p>
          <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">
            All active in pipeline
          </span>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-xs text-ink-500 mb-2">
            <span>Shortlisted</span>
            <Sparkles className="h-4 w-4 text-purple-600" />
          </div>
          <p className="text-3xl font-extrabold text-purple-600 font-heading">{shortlistedCount}</p>
          <span className="text-xs text-ink-500 mt-1 inline-block">WSO2 Platform Team</span>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-xs text-ink-500 mb-2">
            <span>Interviews</span>
            <Calendar className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="text-3xl font-extrabold text-indigo-600 font-heading">{interviewCount}</p>
          <span className="text-xs text-indigo-600 font-semibold mt-1 inline-block">
            Sep 22 (Dialog Cloud)
          </span>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-xs text-ink-500 mb-2">
            <span>Saved Jobs</span>
            <Bookmark className="h-4 w-4 text-primary-600" />
          </div>
          <p className="text-3xl font-extrabold text-ink-900 font-heading">{savedCount}</p>
          <span className="text-xs text-ink-500 mt-1 inline-block">Bookmarked vacancies</span>
        </Card>
      </div>

      {/* TWO COLUMN CONTENT: Left Applications + Right Recommended */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): Recent Applications Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-ink-900 font-heading">Recent Applications</h3>
            <Link
              href="/seeker/applications"
              className="text-xs font-semibold text-primary-600 hover:underline"
            >
              View All Pipeline &rarr;
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
            <div className="divide-y divide-border/60">
              {mockApplications.slice(0, 4).map((app) => (
                <div
                  key={app.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-bg/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={app.job?.company.logo}
                      alt={app.job?.company.name}
                      size="md"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-ink-900 truncate max-w-xs">
                        {app.job?.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-ink-500 mt-0.5">
                        <span className="font-semibold text-ink-700">{app.job?.company.name}</span>
                        <span>&bull;</span>
                        <span>Applied {new Date(app.appliedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
                    <StatusPill status={app.status} />
                    <Link
                      href={`/find-jobs/${app.job?.slug}`}
                      className="text-xs font-bold text-primary-600 hover:underline"
                    >
                      Details &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Rail: Recommended Jobs & Job Alerts */}
        <div className="space-y-6">
          {/* Recommended Jobs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink-900 font-heading">Recommended For You</h3>
            </div>

            <div className="space-y-3">
              {recommendedJobs.map((recJob) => (
                <div
                  key={recJob.id}
                  className="p-4 rounded-2xl border border-border bg-surface shadow-sm hover:shadow-md transition-shadow space-y-2 text-left"
                >
                  <div className="flex items-start justify-between">
                    <Avatar src={recJob.company.logo} alt={recJob.company.name} size="sm" />
                    <span className="text-[10px] font-mono font-bold text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded">
                      {recJob.referenceNumber}
                    </span>
                  </div>

                  <Link href={`/find-jobs/${recJob.slug}`} className="block hover:text-primary-600 transition-colors">
                    <h4 className="text-sm font-bold text-ink-900 line-clamp-1">{recJob.title}</h4>
                  </Link>

                  <div className="flex items-center justify-between text-xs text-ink-500">
                    <span className="truncate">{recJob.company.name}</span>
                    <span className="font-bold text-primary-600">
                      {formatSalaryRange(recJob.minSalary, recJob.maxSalary, recJob.salaryPeriod)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Job Alert Card */}
          <div className="p-5 rounded-2xl border border-primary-200 bg-primary-50/50 space-y-3">
            <div className="flex items-center gap-2 text-primary-700">
              <Bell className="h-4 w-4" />
              <h4 className="text-sm font-bold">Active Daily Job Alert</h4>
            </div>
            <p className="text-xs text-ink-500 leading-relaxed">
              &quot;Cloud & DevOps Jobs in Colombo&quot; sends matching vacancies to{" "}
              <strong>{mockJobSeeker.email}</strong> every morning at 8:00 AM.
            </p>
            <Link href="/seeker/alerts" className="block pt-1">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Manage Job Alerts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
