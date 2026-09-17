"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Compass,
  Crown,
  ChevronRight,
  Terminal,
  Coins,
  Scissors,
  Rocket,
  DraftingCompass,
  Satellite,
  Activity,
  Palmtree,
  Hourglass,
  Timer,
  Flame,
  ArrowRight,
  BadgeCheck,
  LayoutGrid,
  List as ListIcon,
  Columns2,
  Bookmark,
  Navigation,
  ArrowUpRight,
  SendHorizontal,
  ShieldCheck,
  Radio,
  Fingerprint,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { categories } from "@/lib/data/categories";
import { jobs } from "@/lib/data/jobs";
import { companies } from "@/lib/data/companies";
import { Job } from "@/types";
import { calculateDaysRemaining, formatSalaryRange, formatRelativeTime } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

// Category icon helper with distinct, uncommon icons
const CategoryIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  switch (name) {
    case "Terminal":
    case "Code2":
      return <Terminal className={className} />;
    case "Coins":
    case "Landmark":
      return <Coins className={className} />;
    case "Scissors":
    case "Factory":
      return <Scissors className={className} />;
    case "Rocket":
    case "TrendingUp":
      return <Rocket className={className} />;
    case "DraftingCompass":
    case "Wrench":
      return <DraftingCompass className={className} />;
    case "Satellite":
    case "RadioTower":
      return <Satellite className={className} />;
    case "Activity":
    case "Stethoscope":
      return <Activity className={className} />;
    case "Palmtree":
    case "Hotel":
      return <Palmtree className={className} />;
    default:
      return <Compass className={className} />;
  }
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"all" | "tech" | "banking" | "apparel" | "urgent">("all");
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "split">("grid");
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || "");
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());
  const { success } = useToast();

  const handleBookmarkToggle = (e: React.MouseEvent, job: Job) => {
    e.preventDefault();
    e.stopPropagation();
    const next = new Set(savedJobIds);
    if (next.has(job.id)) {
      next.delete(job.id);
      setSavedJobIds(next);
      success("Bookmark Removed", `${job.title} removed from saved jobs.`);
    } else {
      next.add(job.id);
      setSavedJobIds(next);
      success("Job Saved", `${job.title} added to your bookmarks.`);
    }
  };

  // Filter jobs based on active tab and quick chips
  const displayedJobs = useMemo(() => {
    let list = jobs;

    // Quick filter chips
    if (selectedQuickFilter) {
      if (selectedQuickFilter === "urgent") {
        list = list.filter((j) => calculateDaysRemaining(j.deadline).days <= 5 || j.isUrgent);
      } else if (selectedQuickFilter === "remote") {
        list = list.filter((j) => j.location.isRemote);
      } else if (selectedQuickFilter === "dialog") {
        list = list.filter((j) => j.company.slug === "dialog-axiata");
      } else if (selectedQuickFilter === "mas") {
        list = list.filter((j) => j.company.slug === "mas-holdings");
      } else if (selectedQuickFilter === "wso2") {
        list = list.filter((j) => j.company.slug === "wso2");
      }
    }

    // Category Tabs
    if (activeTab === "tech") {
      list = list.filter(
        (j) =>
          j.categoryId === "cat-software-it" ||
          j.industry.toLowerCase().includes("tech") ||
          j.industry.toLowerCase().includes("telecom")
      );
    } else if (activeTab === "banking") {
      list = list.filter(
        (j) =>
          j.categoryId === "cat-banking-finance" ||
          j.industry.toLowerCase().includes("bank") ||
          j.industry.toLowerCase().includes("finance")
      );
    } else if (activeTab === "apparel") {
      list = list.filter(
        (j) =>
          j.categoryId === "cat-manufacturing-apparel" ||
          j.industry.toLowerCase().includes("apparel") ||
          j.industry.toLowerCase().includes("textil")
      );
    } else if (activeTab === "urgent") {
      list = list.filter((j) => calculateDaysRemaining(j.deadline).days <= 5 || j.isUrgent);
    }

    return list.slice(0, 10);
  }, [activeTab, selectedQuickFilter]);

  // Selected job for split preview
  const activeSelectedJob = useMemo(() => {
    return displayedJobs.find((j) => j.id === selectedJobId) || displayedJobs[0] || jobs[0];
  }, [displayedJobs, selectedJobId]);

  const topCompanies = useMemo(() => {
    return companies.filter((c) => c.featured).slice(0, 5);
  }, []);

  const popularCategories = useMemo(() => {
    return categories.slice(0, 6);
  }, []);

  const featuredRadarJobs = useMemo(() => {
    return jobs.filter((j) => j.isFeatured || j.isUrgent).slice(0, 3);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-bg text-ink-900 selection:bg-primary-100 selection:text-primary-900">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* UNIQUE ASYMMETRICAL HERO: Command Studio (Left) + Live Career Radar (Right) */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-border/80 bg-gradient-to-b from-white via-surface to-bg">
          {/* Subtle Ambient Blueprint Grid & Glow Effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
          <div className="absolute -top-32 -left-24 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -right-24 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* LEFT COLUMN: Editorial Narrative, Dual-Mode Search Console & Seeker Guarantees (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                {/* Live Activity Beacon Pill */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface border border-border shadow-sm mb-5 text-xs font-semibold text-ink-700">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-mono text-[11px] font-bold text-emerald-700 uppercase tracking-wide">Live Dispatch Radar</span>
                  <span className="text-ink-300">•</span>
                  <span className="text-ink-600 font-medium">Sri Lanka TopJobs™ Indexed</span>
                </div>

                {/* High-Impact Editorial Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black text-ink-900 tracking-tight font-heading leading-[1.12]">
                  The Definitive Career{" "}
                  <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-indigo-600 bg-clip-text text-transparent">
                    Compass
                  </span>{" "}
                  for Sri Lanka.
                </h1>

                {/* Understated Value Proposition */}
                <p className="mt-4 text-base sm:text-lg text-ink-500 max-w-xl leading-relaxed">
                  Discover verified vacancies from premier conglomerates and fast-scaling tech companies. Apply directly with zero login barriers, tracked via authentic TopJobs reference codes.
                </p>

                {/* Precision Search Console */}
                <div className="mt-6 sm:mt-8 w-full">
                  <SearchBar className="max-w-none mx-0" />
                </div>

                {/* Zero-Login Candidate Trust Guarantee Badges */}
                <div className="mt-6 pt-5 border-t border-border/80 w-full flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-ink-600">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-medium"><strong className="text-ink-800">Zero Sign-In</strong> for Job Seekers</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center text-primary-600 shrink-0">
                      <BadgeCheck className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-medium"><strong className="text-ink-800">100% Verified</strong> Corporate Employers</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                      <Fingerprint className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-medium"><strong className="text-ink-800">Official REF-IDs</strong> TopJobs Standard</span>
                  </div>
                </div>

                {/* Quick Filter Tag Row */}
                <div className="mt-4 flex items-center flex-wrap gap-2 text-xs">
                  <span className="text-ink-400 font-medium mr-1">Quick Filters:</span>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedQuickFilter(selectedQuickFilter === "urgent" ? null : "urgent")
                    }
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                      selectedQuickFilter === "urgent"
                        ? "bg-red-50 text-accent-danger border-red-200 font-bold"
                        : "bg-surface text-ink-600 border-border hover:border-ink-300"
                    }`}
                  >
                    <Flame className="h-3.5 w-3.5 text-amber-500" />
                    Urgent Deadlines
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedQuickFilter(selectedQuickFilter === "remote" ? null : "remote")
                    }
                    className={`px-3 py-1 rounded-full border transition-all ${
                      selectedQuickFilter === "remote"
                        ? "bg-primary-50 text-primary-700 border-primary-200 font-bold"
                        : "bg-surface text-ink-600 border-border hover:border-ink-300"
                    }`}
                  >
                    Remote Friendly
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedQuickFilter(selectedQuickFilter === "dialog" ? null : "dialog")
                    }
                    className={`px-3 py-1 rounded-full border transition-all ${
                      selectedQuickFilter === "dialog"
                        ? "bg-primary-50 text-primary-700 border-primary-200 font-bold"
                        : "bg-surface text-ink-600 border-border hover:border-ink-300"
                    }`}
                  >
                    Dialog Axiata
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedQuickFilter(selectedQuickFilter === "mas" ? null : "mas")
                    }
                    className={`px-3 py-1 rounded-full border transition-all ${
                      selectedQuickFilter === "mas"
                        ? "bg-primary-50 text-primary-700 border-primary-200 font-bold"
                        : "bg-surface text-ink-600 border-border hover:border-ink-300"
                    }`}
                  >
                    MAS Holdings
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedQuickFilter(selectedQuickFilter === "wso2" ? null : "wso2")
                    }
                    className={`px-3 py-1 rounded-full border transition-all ${
                      selectedQuickFilter === "wso2"
                        ? "bg-primary-50 text-primary-700 border-primary-200 font-bold"
                        : "bg-surface text-ink-600 border-border hover:border-ink-300"
                    }`}
                  >
                    WSO2
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: Live Vacancy Dispatch Board & Market Radar (5 Cols) */}
              <div className="lg:col-span-5 relative mt-4 lg:mt-0">
                {/* Decorative corner glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-75 -z-10" />

                {/* Dispatch Board Container */}
                <div className="bg-surface/95 backdrop-blur-md rounded-3xl border border-border shadow-2xl p-5 sm:p-6 text-left">
                  {/* Board Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-xl bg-primary-50 border border-primary-200 flex items-center justify-center text-primary-600">
                        <Radio className="h-4 w-4 animate-pulse" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-xs font-black uppercase tracking-wider text-ink-900 font-heading">
                            Live Opportunity Dispatch
                          </h3>
                        </div>
                        <p className="text-[11px] text-ink-400 font-mono">
                          Real-time Sri Lanka vacancies
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{jobs.length} Active</span>
                    </div>
                  </div>

                  {/* Micro Vacancy Cards Stream */}
                  <div className="mt-4 space-y-3">
                    {featuredRadarJobs.map((job) => {
                      const daysInfo = calculateDaysRemaining(job.deadline);
                      return (
                        <Link
                          key={job.id}
                          href={`/find-jobs/${job.slug}`}
                          className="group block p-3 rounded-2xl bg-bg/70 hover:bg-white border border-border/80 hover:border-primary-300 hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex items-start justify-between gap-2.5">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <Avatar
                                src={job.company.logo}
                                alt={job.company.name}
                                size="sm"
                                verified={job.company.verified}
                                className="rounded-lg shrink-0"
                              />
                              <div className="min-w-0">
                                <div className="flex items-center gap-1">
                                  <span className="text-[11px] font-semibold text-ink-600 truncate">
                                    {job.company.name}
                                  </span>
                                  {job.company.verified && (
                                    <BadgeCheck className="h-3 w-3 text-primary-600 shrink-0" />
                                  )}
                                </div>
                                <h4 className="text-xs font-bold text-ink-900 group-hover:text-primary-600 transition-colors truncate">
                                  {job.title}
                                </h4>
                              </div>
                            </div>

                            <ArrowUpRight className="h-3.5 w-3.5 text-ink-400 group-hover:text-primary-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                          </div>

                          {/* Meta Tags Row */}
                          <div className="mt-2.5 flex items-center justify-between text-[11px] pt-2 border-t border-border/60">
                            <span className="font-mono font-bold text-primary-700 bg-primary-50 px-1.5 py-0.5 rounded text-[10px] border border-primary-100">
                              {job.referenceNumber}
                            </span>

                            <div className="flex items-center gap-2 text-ink-500 font-medium">
                              <span>{job.location.city}</span>
                              <span>&bull;</span>
                              <span className="font-bold text-ink-800">
                                {formatSalaryRange(job.minSalary, job.maxSalary, job.salaryPeriod)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Market Telemetry Strip */}
                  <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-xl bg-bg/50 border border-border/60">
                      <p className="text-[10px] text-ink-400 uppercase font-semibold">Avg Response</p>
                      <p className="text-xs font-black text-ink-900 font-heading mt-0.5">&lt; 24h</p>
                    </div>
                    <div className="p-2 rounded-xl bg-bg/50 border border-border/60">
                      <p className="text-[10px] text-ink-400 uppercase font-semibold">Candidate Fee</p>
                      <p className="text-xs font-black text-emerald-600 font-heading mt-0.5">Free (0/-)</p>
                    </div>
                    <div className="p-2 rounded-xl bg-bg/50 border border-border/60">
                      <p className="text-[10px] text-ink-400 uppercase font-semibold">Verification</p>
                      <p className="text-xs font-black text-primary-600 font-heading mt-0.5">100% TopJobs</p>
                    </div>
                  </div>

                  {/* Direct Seeker Link */}
                  <div className="mt-3 text-center">
                    <Link
                      href="/find-jobs"
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <span>Explore all {jobs.length} verified vacancies</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                {/* Floating Activity Accent Badge */}
                <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-ink-900 text-white text-xs shadow-xl border border-ink-700 absolute -bottom-4 -left-6 z-10 animate-pulse">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-[11px] text-emerald-400 font-bold">RECENT DISPATCH:</span>
                  <span className="text-ink-200 text-[11px]">Senior Automation Engineer (MAS)</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* OPEN VACANCIES SECTION (Modular Grid, Table List & Interactive Split Preview) */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header: Title, Category Tabs, and View Mode Switcher */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 mb-6 border-b border-border">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-bold text-ink-900 font-heading">
                  Open Vacancies
                </h2>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-100">
                  {displayedJobs.length} active
                </span>
              </div>
              <p className="text-xs text-ink-500 mt-1">
                Verified corporate career opportunities across Sri Lanka
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-3">
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none bg-surface p-1 rounded-xl border border-border shadow-sm">
                {[
                  { id: "all", label: "All Roles" },
                  { id: "tech", label: "Software & IT" },
                  { id: "banking", label: "Banking" },
                  { id: "apparel", label: "Apparel" },
                  { id: "urgent", label: "Closing Soon" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? "bg-ink-900 text-white shadow-sm font-bold"
                        : "text-ink-600 hover:text-ink-900 hover:bg-bg"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* View Mode Switcher */}
              <div className="inline-flex items-center bg-surface p-1 rounded-xl border border-border shadow-sm">
                <button
                  type="button"
                  title="Grid View (2-Column Cards)"
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium ${
                    viewMode === "grid"
                      ? "bg-primary-50 text-primary-700 font-bold"
                      : "text-ink-500 hover:text-ink-900 hover:bg-bg"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span className="hidden sm:inline">Grid</span>
                </button>

                <button
                  type="button"
                  title="List View (Compact Rows)"
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium ${
                    viewMode === "list"
                      ? "bg-primary-50 text-primary-700 font-bold"
                      : "text-ink-500 hover:text-ink-900 hover:bg-bg"
                  }`}
                >
                  <ListIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">List</span>
                </button>

                <button
                  type="button"
                  title="Split Preview (Live Inspector)"
                  onClick={() => setViewMode("split")}
                  className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium ${
                    viewMode === "split"
                      ? "bg-primary-50 text-primary-700 font-bold"
                      : "text-ink-500 hover:text-ink-900 hover:bg-bg"
                  }`}
                >
                  <Columns2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Split Preview</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Quick Filter Pill Notification */}
          {selectedQuickFilter && (
            <div className="mb-6 flex items-center justify-between text-xs bg-primary-50 text-primary-800 px-4 py-2.5 rounded-xl border border-primary-200">
              <span className="font-medium">
                Active Filter: <strong className="uppercase font-mono">{selectedQuickFilter}</strong>
              </span>
              <button
                type="button"
                onClick={() => setSelectedQuickFilter(null)}
                className="text-primary-700 hover:underline font-bold"
              >
                Clear Filter &times;
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* LAYOUT 1: MODERN 2-COLUMN CARD GRID (Default) */}
          {/* ========================================================================= */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {displayedJobs.map((job) => {
                const daysInfo = calculateDaysRemaining(job.deadline);
                const isSaved = savedJobIds.has(job.id);

                return (
                  <div
                    key={job.id}
                    className="bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-primary-300 transition-all flex flex-col justify-between text-left group"
                  >
                    <div>
                      {/* Top Bar: Company Logo, Name, and Urgency Badge */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={job.company.logo}
                            alt={job.company.name}
                            size="md"
                            verified={job.company.verified}
                            className="rounded-xl shrink-0"
                          />
                          <div>
                            <Link
                              href={`/company/${job.company.slug}`}
                              className="text-xs font-semibold text-ink-700 hover:text-primary-600 transition-colors flex items-center gap-1"
                            >
                              <span>{job.company.name}</span>
                              {job.company.verified && (
                                <BadgeCheck className="h-3.5 w-3.5 text-primary-600 shrink-0" />
                              )}
                            </Link>
                            <span className="text-[11px] text-ink-400">
                              {formatRelativeTime(job.postedAt)}
                            </span>
                          </div>
                        </div>

                        {daysInfo.isExpiringSoon && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-accent-danger bg-red-50 px-2 py-0.5 rounded-md border border-red-200 shrink-0">
                            <Timer className="h-3 w-3" />
                            {daysInfo.days === 0 ? "Today" : `${daysInfo.days}d left`}
                          </span>
                        )}
                      </div>

                      {/* Job Title */}
                      <Link href={`/find-jobs/${job.slug}`} className="block mt-4 mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-ink-900 group-hover:text-primary-600 transition-colors leading-snug flex items-center justify-between">
                          <span className="line-clamp-1">{job.title}</span>
                          <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all text-primary-600 shrink-0 ml-2" />
                        </h3>
                      </Link>

                      {/* Meta Pills: Ref Code, Location, Work Type */}
                      <div className="flex items-center flex-wrap gap-2 text-xs text-ink-500 mb-3.5">
                        <span className="font-mono text-[11px] font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-md border border-primary-100">
                          {job.referenceNumber}
                        </span>
                        <span className="flex items-center gap-1">
                          <Navigation className="h-3 w-3 text-ink-400" />
                          {job.location.city}
                          {job.location.isRemote && " (Hybrid)"}
                        </span>
                        <span>&bull;</span>
                        <span>{job.jobType}</span>
                      </div>

                      {/* Skills Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {job.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-bg text-ink-600 border border-border"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 3 && (
                          <span className="text-[10px] text-ink-400 self-center">
                            +{job.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer: Salary, Bookmark & Direct View Button */}
                    <div className="pt-3.5 border-t border-border flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-ink-400 tracking-wider">
                          Compensation
                        </p>
                        <p className="text-sm font-extrabold text-ink-900 font-heading">
                          {formatSalaryRange(job.minSalary, job.maxSalary, job.salaryPeriod)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleBookmarkToggle(e, job)}
                          className="p-2 rounded-xl text-ink-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                          title={isSaved ? "Remove Bookmark" : "Save Job"}
                        >
                          <Bookmark
                            className="h-4 w-4"
                            fill={isSaved ? "#1D4ED8" : "none"}
                            color={isSaved ? "#1D4ED8" : "currentColor"}
                          />
                        </button>
                        <Link href={`/find-jobs/${job.slug}`}>
                          <Button variant="outline" size="sm" className="font-semibold text-xs">
                            Details &rarr;
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ========================================================================= */}
          {/* LAYOUT 2: COMPACT ROW LIST VIEW */}
          {/* ========================================================================= */}
          {viewMode === "list" && (
            <div className="space-y-3">
              {displayedJobs.map((job) => {
                const daysInfo = calculateDaysRemaining(job.deadline);
                const isSaved = savedJobIds.has(job.id);

                return (
                  <div
                    key={job.id}
                    className="bg-surface rounded-xl border border-border p-4 hover:border-primary-300 hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left group"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                      <Avatar
                        src={job.company.logo}
                        alt={job.company.name}
                        size="md"
                        verified={job.company.verified}
                        className="rounded-xl shrink-0"
                      />
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link
                            href={`/find-jobs/${job.slug}`}
                            className="text-base font-bold text-ink-900 group-hover:text-primary-600 transition-colors truncate"
                          >
                            {job.title}
                          </Link>
                          <span className="font-mono text-[10px] font-bold text-primary-700 bg-primary-50 px-1.5 py-0.5 rounded border border-primary-100">
                            {job.referenceNumber}
                          </span>
                          {daysInfo.isExpiringSoon && (
                            <span className="text-[10px] font-bold text-accent-danger bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                              {daysInfo.days === 0 ? "Today" : `${daysInfo.days}d left`}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-ink-500 flex-wrap">
                          <span className="font-medium text-ink-700">{job.company.name}</span>
                          <span>&bull;</span>
                          <span>{job.location.city}</span>
                          <span>&bull;</span>
                          <span>{job.jobType}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
                      <div className="text-left sm:text-right">
                        <p className="text-xs font-bold text-ink-900">
                          {formatSalaryRange(job.minSalary, job.maxSalary, job.salaryPeriod)}
                        </p>
                        <p className="text-[11px] text-ink-400">
                          {formatRelativeTime(job.postedAt)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleBookmarkToggle(e, job)}
                          className="p-2 rounded-xl text-ink-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        >
                          <Bookmark
                            className="h-4 w-4"
                            fill={isSaved ? "#1D4ED8" : "none"}
                            color={isSaved ? "#1D4ED8" : "currentColor"}
                          />
                        </button>
                        <Link href={`/find-jobs/${job.slug}`}>
                          <Button variant="outline" size="sm" className="font-semibold text-xs">
                            View &rarr;
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ========================================================================= */}
          {/* LAYOUT 3: INTERACTIVE SPLIT-VIEW (MASTER-DETAIL INSPECTOR) */}
          {/* ========================================================================= */}
          {viewMode === "split" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Master List (5 cols) */}
              <div className="lg:col-span-5 space-y-3 max-h-[820px] overflow-y-auto pr-1">
                {displayedJobs.map((job) => {
                  const isSelected = activeSelectedJob?.id === job.id;
                  const daysInfo = calculateDaysRemaining(job.deadline);

                  return (
                    <button
                      key={job.id}
                      type="button"
                      onClick={() => setSelectedJobId(job.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                        isSelected
                          ? "bg-primary-50/50 border-primary-500 shadow-sm ring-1 ring-primary-500/30"
                          : "bg-surface border-border hover:border-primary-200"
                      }`}
                    >
                      <Avatar
                        src={job.company.logo}
                        alt={job.company.name}
                        size="sm"
                        className="rounded-lg shrink-0 mt-0.5"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[10px] font-bold text-primary-700 bg-primary-100/60 px-1.5 py-0.5 rounded">
                            {job.referenceNumber}
                          </span>
                          {daysInfo.isExpiringSoon && (
                            <span className="text-[10px] font-bold text-accent-danger">
                              {daysInfo.days}d left
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-ink-900 truncate mt-1">
                          {job.title}
                        </h4>
                        <p className="text-xs text-ink-500 truncate">{job.company.name}</p>
                        <p className="text-xs font-bold text-ink-900 font-heading mt-1.5">
                          {formatSalaryRange(job.minSalary, job.maxSalary, job.salaryPeriod)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Sticky Detail Preview Pane (7 cols) */}
              <div className="lg:col-span-7 sticky top-20">
                {activeSelectedJob && (
                  <div className="bg-surface rounded-2xl border border-border p-6 shadow-md text-left space-y-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
                      <div className="flex items-center gap-3.5">
                        <Avatar
                          src={activeSelectedJob.company.logo}
                          alt={activeSelectedJob.company.name}
                          size="lg"
                          verified={activeSelectedJob.company.verified}
                          className="rounded-xl shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-md border border-primary-100">
                              {activeSelectedJob.referenceNumber}
                            </span>
                            <span className="text-xs text-ink-500">
                              {activeSelectedJob.categoryName}
                            </span>
                          </div>
                          <h3 className="text-xl font-extrabold text-ink-900 font-heading mt-1">
                            {activeSelectedJob.title}
                          </h3>
                          <p className="text-sm text-ink-600 font-medium">
                            {activeSelectedJob.company.name}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-xs text-ink-400 uppercase font-bold">Salary Range</p>
                        <p className="text-base font-extrabold text-ink-900 font-heading">
                          {formatSalaryRange(
                            activeSelectedJob.minSalary,
                            activeSelectedJob.maxSalary,
                            activeSelectedJob.salaryPeriod
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Quick Specs Badges */}
                    <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-bg border border-border text-center">
                      <div>
                        <p className="text-[10px] text-ink-400 uppercase font-bold">Location</p>
                        <p className="text-xs font-semibold text-ink-900">
                          {activeSelectedJob.location.city}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-ink-400 uppercase font-bold">Job Type</p>
                        <p className="text-xs font-semibold text-ink-900">
                          {activeSelectedJob.jobType}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-ink-400 uppercase font-bold">Experience</p>
                        <p className="text-xs font-semibold text-ink-900">
                          {activeSelectedJob.experienceLevel}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-ink-400 mb-2">
                        Role Overview
                      </h4>
                      <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
                        {activeSelectedJob.description}
                      </p>
                    </div>

                    {/* Responsibilities */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-ink-400 mb-2">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-1.5 text-xs text-ink-600">
                        {activeSelectedJob.responsibilities.slice(0, 4).map((resp, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary-600 mt-1.5 shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions CTA */}
                    <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/find-jobs/${activeSelectedJob.slug}?apply=true`}>
                          <Button variant="primary" size="md" className="font-bold px-6">
                            Apply for Role &rarr;
                          </Button>
                        </Link>
                        <Link href={`/find-jobs/${activeSelectedJob.slug}`}>
                          <Button variant="outline" size="md" className="font-semibold text-xs">
                            Full Page View
                          </Button>
                        </Link>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleBookmarkToggle(e, activeSelectedJob)}
                        className="p-2.5 rounded-xl border border-border hover:bg-bg transition-colors"
                        title="Save Job"
                      >
                        <Bookmark
                          className="h-4 w-4"
                          fill={savedJobIds.has(activeSelectedJob.id) ? "#1D4ED8" : "none"}
                          color={savedJobIds.has(activeSelectedJob.id) ? "#1D4ED8" : "currentColor"}
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Empty State */}
          {displayedJobs.length === 0 && (
            <div className="bg-surface rounded-2xl border border-border p-12 text-center">
              <Compass className="h-8 w-8 text-ink-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-ink-900">No vacancies match this filter</h3>
              <p className="text-xs text-ink-500 mt-1">
                Try resetting your filter to explore other verified opportunities.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setActiveTab("all");
                  setSelectedQuickFilter(null);
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}

          {/* Bottom Browse Complete Archive CTA */}
          <div className="mt-8 text-center">
            <Link href="/find-jobs">
              <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold px-8">
                Browse All {jobs.length} Positions in Sri Lanka &rarr;
              </Button>
            </Link>
          </div>
        </section>

        {/* COMPANION SECTION: TOP EMPLOYERS & RECRUITER DESK (Balanced 2-Column Spotlight) */}
        <section className="py-12 bg-surface border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left 7 Cols: Top Hiring Companies Spotlight */}
              <div className="lg:col-span-7 bg-bg/50 rounded-2xl border border-border p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
                    <div className="flex items-center gap-2">
                      <Crown className="h-4 w-4 text-primary-600" />
                      <h3 className="text-sm font-bold text-ink-900 font-heading">
                        Top Companies Actively Hiring
                      </h3>
                    </div>
                    <Link
                      href="/company"
                      className="text-xs font-semibold text-primary-600 hover:underline"
                    >
                      View All Companies &rarr;
                    </Link>
                  </div>

                  <div className="space-y-2.5">
                    {topCompanies.map((comp) => (
                      <Link
                        key={comp.id}
                        href={`/company/${comp.slug}`}
                        className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-surface border border-border/80 hover:border-primary-300 hover:shadow-sm transition-all group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Avatar
                            src={comp.logo}
                            alt={comp.name}
                            size="sm"
                            className="rounded-lg shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-ink-900 group-hover:text-primary-600 transition-colors truncate">
                              {comp.name}
                            </p>
                            <p className="text-[11px] text-ink-500 truncate">{comp.industry}</p>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 shrink-0">
                          {comp.openVacanciesCount} roles
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-ink-400 mt-4 pt-3 border-t border-border">
                  Multinational enterprises, commercial banks, and apparel conglomerates.
                </p>
              </div>

              {/* Right 5 Cols: Recruiter & Employer Desk */}
              <div className="lg:col-span-5 bg-ink-900 text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-ink-800 text-primary-300 text-xs font-bold uppercase tracking-wider border border-ink-700">
                    <SendHorizontal className="h-3.5 w-3.5" />
                    <span>For Recruiters & HR</span>
                  </div>

                  <h3 className="text-xl font-bold leading-snug font-heading">
                    Publish your vacancy to over 160,000 verified professionals.
                  </h3>

                  <p className="text-xs text-ink-300 leading-relaxed">
                    Automated TopJobs reference code generation (`REF-XXX-YYYY-ZZZ`), candidate CV
                    tracking, and direct interview workflow management.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-ink-800 space-y-3">
                  <Link href="/post-job" className="block">
                    <Button variant="primary" size="lg" className="w-full font-bold shadow-sm">
                      + Post a Vacancy (Login Required)
                    </Button>
                  </Link>
                  <p className="text-[11px] text-ink-400 text-center">
                    Authentication protects candidates against unauthorized listings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPLORE BY SECTOR (Clean & Minimalist 6-Card Grid) */}
        <section className="py-12 bg-surface border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-ink-900 font-heading">
                  Explore by Industry
                </h2>
                <p className="text-xs sm:text-sm text-ink-500 mt-1">
                  Browse opportunities tailored to your professional specialization
                </p>
              </div>
              <Link
                href="/find-jobs"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:underline"
              >
                <span>All sectors</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/find-jobs?category=${cat.slug}`}
                  className="p-4 rounded-xl border border-border bg-bg/50 hover:bg-white hover:border-primary-300 hover:shadow-sm transition-all group flex flex-col justify-between"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors mb-3">
                    <CategoryIcon name={cat.iconName} className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-ink-900 group-hover:text-primary-600 transition-colors truncate">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-ink-500 mt-0.5 font-mono">{cat.jobCount} roles</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
