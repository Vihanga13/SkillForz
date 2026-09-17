"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Navigation,
  Hourglass,
  Bookmark,
  BadgeCheck,
  Timer,
  ArrowUpRight,
} from "lucide-react";
import { Job } from "@/types";
import { Avatar } from "./ui/Avatar";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";
import {
  formatSalaryRange,
  formatRelativeTime,
  calculateDaysRemaining,
} from "@/lib/utils";
import { useToast } from "./ui/Toast";

export interface JobCardProps {
  job: Job;
  isBookmarkedDefault?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, isBookmarkedDefault = false }) => {
  const [bookmarked, setBookmarked] = useState(isBookmarkedDefault);
  const { success } = useToast();

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !bookmarked;
    setBookmarked(nextState);
    if (nextState) {
      success("Job Saved", `${job.title} added to your bookmarked jobs.`);
    } else {
      success("Bookmark Removed", `${job.title} removed from bookmarks.`);
    }
  };

  const daysInfo = calculateDaysRemaining(job.deadline);

  return (
    <Card hoverEffect className="relative p-5 sm:p-6 transition-card group text-left">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        {/* Left Company Logo and Details */}
        <div className="flex items-start gap-3.5 sm:gap-4 flex-1">
          <Link href={`/company/${job.company.slug}`} className="shrink-0">
            <Avatar
              src={job.company.logo}
              alt={job.company.name}
              size="lg"
              verified={job.company.verified}
            />
          </Link>

          <div className="space-y-1.5 flex-1 min-w-0">
            {/* Top Reference & Tags */}
            <div className="flex items-center flex-wrap gap-2 text-xs">
              <span className="font-mono font-semibold text-[11px] text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md border border-primary-100">
                {job.referenceNumber}
              </span>
              <span className="text-ink-500 font-medium">{job.categoryName}</span>
              {daysInfo.isExpiringSoon && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-accent-danger bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
                  <Timer className="h-3 w-3" />
                  {daysInfo.days === 0 ? "Expires Today" : `${daysInfo.days}d left`}
                </span>
              )}
            </div>

            {/* Job Title */}
            <Link
              href={`/find-jobs/${job.slug}`}
              className="block group-hover:text-primary-600 transition-colors"
            >
              <h3 className="text-base sm:text-lg font-bold text-ink-900 tracking-tight flex items-center gap-1">
                <span className="truncate">{job.title}</span>
                <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all text-primary-600 shrink-0" />
              </h3>
            </Link>

            {/* Company Name & Location */}
            <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-ink-500">
              <Link
                href={`/company/${job.company.slug}`}
                className="font-medium text-ink-700 hover:text-primary-600 transition-colors flex items-center gap-1"
              >
                <BadgeCheck className="h-3.5 w-3.5 text-primary-600" />
                <span className="truncate">{job.company.name}</span>
              </Link>
              <div className="flex items-center gap-1">
                <Navigation className="h-3 w-3 text-ink-400" />
                <span>
                  {job.location.city}
                  {job.location.isRemote && " (Hybrid/Remote)"}
                </span>
              </div>
            </div>

            {/* Skills / Perks Chips */}
            <div className="pt-2 flex flex-wrap gap-1.5">
              <Badge variant="primary" size="sm">
                {job.jobType}
              </Badge>
              <Badge variant="secondary" size="sm">
                {job.experienceLevel}
              </Badge>
              {job.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-bg text-ink-500 border border-border"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 3 && (
                <span className="text-[10px] text-ink-500 self-center">
                  +{job.skills.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Salary and Bookmark CTA */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-border shrink-0">
          <button
            type="button"
            onClick={handleBookmarkToggle}
            className="p-2 rounded-xl text-ink-300 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            title={bookmarked ? "Remove Bookmark" : "Save Job"}
          >
            <Bookmark
              className="h-5 w-5"
              fill={bookmarked ? "#1D4ED8" : "none"}
              color={bookmarked ? "#1D4ED8" : "currentColor"}
            />
          </button>

          <div className="text-right">
            <p className="text-xs text-ink-500">Compensation</p>
            <p className="text-sm font-bold text-ink-900">
              {formatSalaryRange(job.minSalary, job.maxSalary, job.salaryPeriod)}
            </p>
            <span className="text-[11px] text-ink-500 flex items-center justify-end gap-1 mt-1">
              <Hourglass className="h-3 w-3" />
              {formatRelativeTime(job.postedAt)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
