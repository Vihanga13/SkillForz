"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Sparkles,
  Bookmark,
  Building,
  ArrowRight,
} from "lucide-react";
import { Job } from "@/types";
import { Avatar } from "./ui/Avatar";
import { Badge } from "./ui/Badge";
import {
  formatSalaryRange,
  formatRelativeTime,
} from "@/lib/utils";
import { useToast } from "./ui/Toast";

export interface FeaturedJobCardProps {
  job: Job;
}

export const FeaturedJobCard: React.FC<FeaturedJobCardProps> = ({ job }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const { success } = useToast();

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(!bookmarked);
    success(
      bookmarked ? "Bookmark Removed" : "Featured Job Saved",
      `${job.title} updated in your bookmarks.`
    );
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-primary-500/30 bg-gradient-to-b from-white to-primary-50/20 p-5 sm:p-6 shadow-md hover:shadow-xl hover:border-primary-600 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-left group min-w-[280px] sm:min-w-[320px]">
      {/* Featured Ribbon */}
      <div className="absolute top-0 right-0">
        <div className="bg-primary-600 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-bl-xl shadow-sm flex items-center gap-1">
          <Sparkles className="h-3 w-3 fill-white" />
          Featured
        </div>
      </div>

      <div>
        {/* Top Header: Logo + Bookmark */}
        <div className="flex items-start justify-between">
          <Link href={`/company/${job.company.slug}`}>
            <Avatar
              src={job.company.logo}
              alt={job.company.name}
              size="lg"
              verified={job.company.verified}
            />
          </Link>
          <button
            type="button"
            onClick={handleBookmark}
            className="p-1.5 rounded-lg text-ink-300 hover:text-primary-600 hover:bg-primary-50 transition-colors mr-16"
            title="Bookmark job"
          >
            <Bookmark
              className="h-4 w-4"
              fill={bookmarked ? "#1D4ED8" : "none"}
              color={bookmarked ? "#1D4ED8" : "currentColor"}
            />
          </button>
        </div>

        {/* Company & Reference */}
        <div className="mt-4 flex items-center justify-between text-xs">
          <Link
            href={`/company/${job.company.slug}`}
            className="font-semibold text-ink-700 hover:text-primary-600 transition-colors truncate max-w-[170px]"
          >
            {job.company.name}
          </Link>
          <span className="font-mono text-[10px] text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded border border-primary-100">
            {job.referenceNumber}
          </span>
        </div>

        {/* Title */}
        <Link href={`/find-jobs/${job.slug}`} className="block mt-1.5 group-hover:text-primary-600 transition-colors">
          <h3 className="text-base font-bold text-ink-900 tracking-tight line-clamp-2">
            {job.title}
          </h3>
        </Link>

        {/* Location & Job Type */}
        <div className="mt-3 flex items-center gap-3 text-xs text-ink-500">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-primary-600" />
            {job.location.city}
          </span>
          <span>&bull;</span>
          <Badge variant="primary" size="sm">
            {job.jobType}
          </Badge>
        </div>

        {/* Skills Tag Strip */}
        <div className="mt-3 flex flex-wrap gap-1">
          {job.skills.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="text-[10px] px-2 py-0.5 rounded bg-surface text-ink-500 border border-border"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Salary + Quick Link */}
      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <div>
          <p className="text-[11px] text-ink-500">Monthly Compensation</p>
          <p className="text-xs sm:text-sm font-bold text-primary-600">
            {formatSalaryRange(job.minSalary, job.maxSalary, job.salaryPeriod)}
          </p>
        </div>
        <Link
          href={`/find-jobs/${job.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-ink-700 group-hover:text-primary-600 transition-colors"
        >
          <span>Apply</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
