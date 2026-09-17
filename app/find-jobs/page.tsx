"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ScanSearch,
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  MapPin,
  Building,
  Layers,
  Bell,
  CheckCircle2,
  Compass,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JobCard } from "@/components/JobCard";
import { FilterSidebar, FilterState } from "@/components/FilterSidebar";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { jobs } from "@/lib/data/jobs";
import { categories } from "@/lib/data/categories";
import { AICVMatcherModal } from "@/components/AICVMatcherModal";
import { ParsedCV, JobMatchResult } from "@/lib/ai/cvMatcher";

function FindJobsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL state synchronization
  const paramKeyword = searchParams.get("q") || "";
  const paramRef = searchParams.get("ref") || "";
  const paramLocation = searchParams.get("location") || "";
  const paramCategory = searchParams.get("category") || "";
  const paramJobType = searchParams.get("jobType") ? searchParams.get("jobType")!.split(",") : [];
  const paramExp = searchParams.get("exp") ? searchParams.get("exp")!.split(",") : [];
  const paramMinSalary = Number(searchParams.get("minSalary")) || 50000;
  const paramDate = searchParams.get("date") || "anytime";
  const paramSort = searchParams.get("sort") || "newest";

  const [keywordInput, setKeywordInput] = useState(paramKeyword || paramRef);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"newest" | "relevance" | "ai-match">(
    (paramSort as any) || "newest"
  );
  const [isLoading, setIsLoading] = useState(false);

  // AI CV Matcher state
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [activeCV, setActiveCV] = useState<ParsedCV | null>(null);
  const [jobMatchMap, setJobMatchMap] = useState<Record<string, JobMatchResult>>({});

  useEffect(() => {
    if (searchParams.get("aiMatch") === "true") {
      setIsAIModalOpen(true);
    }
  }, [searchParams]);

  const handleApplyAIFilter = (cv: ParsedCV, matches: JobMatchResult[]) => {
    setActiveCV(cv);
    const map: Record<string, JobMatchResult> = {};
    matches.forEach((m) => {
      map[m.job.id] = m;
    });
    setJobMatchMap(map);
    setSortBy("ai-match");
    setCurrentPage(1);
  };

  const handleClearAIFilter = () => {
    setActiveCV(null);
    setJobMatchMap({});
    setSortBy("newest");
  };

  const [filters, setFilters] = useState<FilterState>({
    jobTypes: paramJobType,
    experienceLevels: paramExp,
    category: paramCategory,
    minSalary: paramMinSalary,
    datePosted: paramDate,
  });

  // Update URL search params when state changes
  const updateURL = (newFilters: FilterState, kw: string, sort: string) => {
    const params = new URLSearchParams();
    if (kw.trim()) {
      if (kw.toUpperCase().startsWith("REF-")) {
        params.set("ref", kw.trim().toUpperCase());
      } else {
        params.set("q", kw.trim());
      }
    }
    if (newFilters.category) params.set("category", newFilters.category);
    if (newFilters.jobTypes.length > 0) params.set("jobType", newFilters.jobTypes.join(","));
    if (newFilters.experienceLevels.length > 0) params.set("exp", newFilters.experienceLevels.join(","));
    if (newFilters.minSalary > 50000) params.set("minSalary", String(newFilters.minSalary));
    if (newFilters.datePosted !== "anytime") params.set("date", newFilters.datePosted);
    if (sort !== "newest") params.set("sort", sort);

    router.replace(`/find-jobs?${params.toString()}`, { scroll: false });
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 200);
    updateURL(newFilters, keywordInput, sortBy);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 200);
    updateURL(filters, keywordInput, sortBy);
  };

  const handleResetFilters = () => {
    const reset: FilterState = {
      jobTypes: [],
      experienceLevels: [],
      category: "",
      minSalary: 50000,
      datePosted: "anytime",
    };
    setFilters(reset);
    setKeywordInput("");
    setCurrentPage(1);
    router.replace("/find-jobs", { scroll: false });
  };

  // Filter calculations
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Reference code match
      if (paramRef) {
        return job.referenceNumber.toLowerCase() === paramRef.toLowerCase();
      }

      // Keyword match (title, skills, description, company)
      if (keywordInput.trim()) {
        const query = keywordInput.toLowerCase().trim();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.name.toLowerCase().includes(query);
        const matchesRef = job.referenceNumber.toLowerCase().includes(query);
        const matchesSkill = job.skills.some((s) => s.toLowerCase().includes(query));
        const matchesCity = job.location.city.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCompany && !matchesRef && !matchesSkill && !matchesCity) {
          return false;
        }
      }

      // Category match
      if (filters.category && job.categoryId !== filters.category) {
        const catObj = categories.find((c) => c.slug === filters.category);
        if (catObj && job.categoryId !== catObj.id) {
          return false;
        }
      }

      // Job Types
      if (filters.jobTypes.length > 0 && !filters.jobTypes.includes(job.jobType)) {
        return false;
      }

      // Experience Levels
      if (
        filters.experienceLevels.length > 0 &&
        !filters.experienceLevels.includes(job.experienceLevel)
      ) {
        return false;
      }

      // Minimum Salary
      if (filters.minSalary > 50000) {
        if (!job.maxSalary || job.maxSalary < filters.minSalary) {
          return false;
        }
      }

      // Date posted
      if (filters.datePosted !== "anytime") {
        const postDate = new Date(job.postedAt).getTime();
        const now = new Date().getTime();
        const diffHours = (now - postDate) / (1000 * 60 * 60);

        if (filters.datePosted === "24h" && diffHours > 24) return false;
        if (filters.datePosted === "week" && diffHours > 24 * 7) return false;
        if (filters.datePosted === "month" && diffHours > 24 * 30) return false;
      }

      return true;
    });
  }, [keywordInput, paramRef, filters]);

  // Sorting
  const sortedJobs = useMemo(() => {
    const list = [...filteredJobs];
    if (sortBy === "ai-match" && activeCV) {
      return list.sort(
        (a, b) => (jobMatchMap[b.id]?.score || 0) - (jobMatchMap[a.id]?.score || 0)
      );
    }
    if (sortBy === "newest") {
      return list.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
    }
    // Relevance / Hot
    return list.sort((a, b) => (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0));
  }, [filteredJobs, sortBy, activeCV, jobMatchMap]);

  // Pagination (6 per page)
  const itemsPerPage = 6;
  const totalPages = Math.ceil(sortedJobs.length / itemsPerPage);
  const paginatedJobs = sortedJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Active filter count for badge
  const activeFilterCount =
    filters.jobTypes.length +
    filters.experienceLevels.length +
    (filters.category ? 1 : 0) +
    (filters.minSalary > 50000 ? 1 : 0) +
    (filters.datePosted !== "anytime" ? 1 : 0) +
    (keywordInput ? 1 : 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-bg py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-4">
            <Breadcrumb items={[{ label: "Find Jobs" }]} />
          </div>

          {/* SEO Heading & Introduction */}
          <div className="mb-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold mb-3 border border-primary-100">
              <Sparkles className="h-3.5 w-3.5 text-primary-600" />
              <span>Verified Career Opportunities in Sri Lanka</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-ink-900 tracking-tight font-heading leading-tight">
              Find Jobs & Vacancies in Sri Lanka
            </h1>
            <p className="text-xs sm:text-sm text-ink-500 mt-2 max-w-3xl leading-relaxed">
              Explore verified employment openings across Colombo, Kandy, Galle, and islandwide. Search high-growth tech careers, commercial banking vacancies, apparel manufacturing roles, and remote job opportunities with authentic TopJobs reference codes.
            </p>

            {/* Popular SEO Search Terms */}
            <div className="mt-3.5 flex items-center flex-wrap gap-1.5 text-xs">
              <span className="text-ink-400 font-medium mr-1">Popular Searches:</span>
              {[
                { label: "Software Engineer", query: "Software Engineer" },
                { label: "Jobs in Colombo", query: "Colombo" },
                { label: "Remote Jobs", query: "Remote" },
                { label: "Banking Careers", category: "cat-banking-finance" },
                { label: "Apparel & Textiles", category: "cat-manufacturing-apparel" },
                { label: "Dialog Axiata", query: "Dialog" },
                { label: "MAS Holdings", query: "MAS Holdings" },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    if (item.query) {
                      setKeywordInput(item.query);
                      updateURL(filters, item.query, sortBy);
                    } else if (item.category) {
                      handleFilterChange({ ...filters, category: item.category });
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg bg-surface border border-border text-ink-600 hover:text-primary-600 hover:border-primary-300 hover:bg-primary-50/50 transition-colors font-medium text-[11px]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Top Search Bar */}
          <div className="bg-surface rounded-2xl border border-border p-4 shadow-sm mb-6">
            <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center gap-3">
              <div className="flex-1 w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-bg border border-border focus-within:border-primary-600 focus-within:bg-white transition-all">
                <ScanSearch className="h-4 w-4 text-ink-500 shrink-0" />
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="Search by job title, skill, reference code (e.g. REF-MAS-2024-089)"
                  className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-500/70 focus:outline-none"
                />
                {keywordInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setKeywordInput("");
                      updateURL(filters, "", sortBy);
                    }}
                    className="text-ink-300 hover:text-ink-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <Button type="submit" variant="primary" className="flex-1 md:flex-initial">
                  Search
                </Button>
                {/* AI CV Matcher Trigger */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAIModalOpen(true)}
                  className="border-primary-200 text-primary-700 bg-primary-50/70 hover:bg-primary-100 flex items-center gap-1.5 shrink-0"
                  leftIcon={<Sparkles className="h-4 w-4 text-primary-600 animate-pulse" />}
                >
                  <span>AI CV Match</span>
                </Button>
                {/* Mobile Filter Drawer Trigger */}
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="md:hidden flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-surface text-ink-700 text-sm font-semibold shadow-sm"
                >
                  <SlidersHorizontal className="h-4 w-4 text-primary-600" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="h-5 w-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* AI SMART MATCH BANNER */}
          {!activeCV ? (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-ink-900 via-primary-950 to-ink-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl border border-primary-700/40 relative overflow-hidden text-left">
              <div className="absolute right-0 top-0 w-64 h-64 bg-primary-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 flex items-start sm:items-center gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-primary-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black tracking-tight font-heading">
                      AI CV Matcher & Precision Filter
                    </h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      Live Radar
                    </span>
                  </div>
                  <p className="text-xs text-primary-200 mt-0.5 max-w-xl leading-relaxed">
                    Upload or paste your CV to rank all {jobs.length} vacancies by semantic skill compatibility, identify qualification gaps, and activate instant match alerts.
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsAIModalOpen(true)}
                className="relative z-10 bg-white text-primary-700 hover:bg-primary-50 font-bold shrink-0 text-xs shadow-md"
                leftIcon={<Sparkles className="h-3.5 w-3.5 text-primary-600" />}
              >
                Match with My CV
              </Button>
            </div>
          ) : (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm text-left">
              <div className="flex items-start sm:items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-emerald-950 font-heading">
                      AI Match Filter Active: {activeCV.name} ({activeCV.title})
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {Object.keys(jobMatchMap).length} Roles Ranked by Match %
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Vacancies are sorted by candidate skill overlap & experience level. Real-time alert notifications dispatched.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAIModalOpen(true)}
                  className="text-xs font-bold text-emerald-800 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-sm"
                >
                  Rescan / Change CV
                </button>
                <button
                  type="button"
                  onClick={handleClearAIFilter}
                  className="text-xs font-bold text-ink-500 hover:text-accent-danger px-2 py-1.5 transition-colors"
                >
                  Clear AI Filter &times;
                </button>
              </div>
            </div>
          )}

          {/* Active Filter Chips Strip */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs font-bold text-ink-500 uppercase tracking-wider mr-1">
                Active:
              </span>
              {keywordInput && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
                  Query: &quot;{keywordInput}&quot;
                  <button
                    type="button"
                    onClick={() => {
                      setKeywordInput("");
                      updateURL(filters, "", sortBy);
                    }}
                  >
                    <X className="h-3.5 w-3.5 hover:text-accent-danger" />
                  </button>
                </span>
              )}
              {filters.category && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
                  Category: {filters.category}
                  <button
                    type="button"
                    onClick={() => handleFilterChange({ ...filters, category: "" })}
                  >
                    <X className="h-3.5 w-3.5 hover:text-accent-danger" />
                  </button>
                </span>
              )}
              {filters.jobTypes.map((jt) => (
                <span
                  key={jt}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100"
                >
                  {jt}
                  <button
                    type="button"
                    onClick={() =>
                      handleFilterChange({
                        ...filters,
                        jobTypes: filters.jobTypes.filter((t) => t !== jt),
                      })
                    }
                  >
                    <X className="h-3.5 w-3.5 hover:text-accent-danger" />
                  </button>
                </span>
              ))}
              {filters.experienceLevels.map((exp) => (
                <span
                  key={exp}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100"
                >
                  {exp}
                  <button
                    type="button"
                    onClick={() =>
                      handleFilterChange({
                        ...filters,
                        experienceLevels: filters.experienceLevels.filter((e) => e !== exp),
                      })
                    }
                  >
                    <X className="h-3.5 w-3.5 hover:text-accent-danger" />
                  </button>
                </span>
              ))}
              {filters.minSalary > 50000 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
                  Min LKR {filters.minSalary.toLocaleString()}
                  <button
                    type="button"
                    onClick={() => handleFilterChange({ ...filters, minSalary: 50000 })}
                  >
                    <X className="h-3.5 w-3.5 hover:text-accent-danger" />
                  </button>
                </span>
              )}
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-bold text-accent-danger hover:underline ml-2"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* TWO COLUMN LAYOUT: Sticky Filter Sidebar + Results List */}
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden md:block">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </div>

            {/* Results Column */}
            <div className="flex-1 w-full space-y-4">
              {/* Results Topbar: Count + Sort */}
              <div className="flex items-center justify-between pb-2">
                <p className="text-sm text-ink-500 font-medium">
                  Showing{" "}
                  <span className="font-bold text-ink-900">{sortedJobs.length}</span> vacancies in
                  Sri Lanka
                </p>

                <div className="flex items-center gap-2 text-xs font-medium text-ink-700">
                  <span>Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      const next = e.target.value as "newest" | "relevance" | "ai-match";
                      setSortBy(next);
                      updateURL(filters, keywordInput, next);
                    }}
                    className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-semibold text-ink-900 focus:outline-none focus:border-primary-600 cursor-pointer shadow-sm"
                  >
                    {activeCV && <option value="ai-match">✨ AI Match Score (Highest)</option>}
                    <option value="newest">Newest First</option>
                    <option value="relevance">Relevance / Hot</option>
                  </select>
                </div>
              </div>

              {/* Loading Skeletons */}
              {isLoading && (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} variant="card" className="h-44 rounded-2xl" />
                  ))}
                </div>
              )}

              {/* Result List */}
              {!isLoading && paginatedJobs.length > 0 && (
                <div className="space-y-4">
                  {paginatedJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      matchScore={jobMatchMap[job.id]?.score}
                      matchedSkills={jobMatchMap[job.id]?.matchedSkills}
                    />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!isLoading && sortedJobs.length === 0 && (
                <EmptyState
                  title="No Matching Vacancies Found"
                  description="We couldn't find any job vacancies matching your active criteria. Try broadening your search or resetting filters."
                  actionLabel="Clear All Filters"
                  onAction={handleResetFilters}
                  suggestions={[
                    "Software & IT",
                    "Colombo",
                    "MAS Holdings",
                    "Dialog Axiata",
                    "Full-time",
                  ]}
                  onSuggestionClick={(term) => {
                    setKeywordInput(term);
                    updateURL(filters, term, sortBy);
                  }}
                />
              )}

              {/* Pagination */}
              {!isLoading && totalPages > 1 && (
                <div className="pt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* SEO CAREER GUIDE & INDUSTRY DIRECTORY */}
          <section className="mt-14 pt-10 border-t border-border text-left">
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-ink-900 font-heading">
                Sri Lanka Career Directory & Employment Insights
              </h2>
              <p className="text-xs text-ink-500 mt-1">
                Helpful guides for navigating the Sri Lankan corporate employment landscape and TopJobs vacancy reference standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-surface border border-border">
                <h3 className="text-sm font-bold text-ink-900 font-heading mb-2 flex items-center gap-2">
                  <Compass className="h-4 w-4 text-primary-600 shrink-0" />
                  <span>Leading Hiring Sectors in Sri Lanka</span>
                </h3>
                <p className="text-xs text-ink-500 leading-relaxed">
                  Discover open vacancies across major Sri Lankan economic pillars: Software Development, Cloud Architecture, Commercial Banking, Apparel Manufacturing (MAS, Brandix), and Telecommunications (Dialog Axiata).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface border border-border">
                <h3 className="text-sm font-bold text-ink-900 font-heading mb-2 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>TopJobs Reference Verification</span>
                </h3>
                <p className="text-xs text-ink-500 leading-relaxed">
                  Every listed role includes an authentic employer reference number (e.g. <code>REF-DIA-2024-045</code>), allowing job seekers to trace official vacancies published by verified Sri Lankan corporate entities.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface border border-border">
                <h3 className="text-sm font-bold text-ink-900 font-heading mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-indigo-600 shrink-0" />
                  <span>Zero-Login Direct Application</span>
                </h3>
                <p className="text-xs text-ink-500 leading-relaxed">
                  Candidates can browse full job specifications and submit direct applications with their CV without mandatory account registration. Use our AI CV Matcher to rank vacancies by compatibility score.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Drawer Filter */}
      <Drawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        side="left"
        width="md"
        title="Filter Vacancies"
      >
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          isMobile
          onCloseMobile={() => setMobileFilterOpen(false)}
        />
      </Drawer>

      <Footer />
      {/* AICVMatcherModal */}
      <AICVMatcherModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onApplyAIFilter={handleApplyAIFilter}
        initialCV={activeCV}
      />
    </div>
  );
}

export default function FindJobsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg flex items-center justify-center">
          <Skeleton variant="card" className="max-w-md h-60" />
        </div>
      }
    >
      <FindJobsContent />
    </Suspense>
  );
}
