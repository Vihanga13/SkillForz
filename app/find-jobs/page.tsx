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
  const [sortBy, setSortBy] = useState<"newest" | "relevance">(paramSort as "newest" | "relevance");
  const [isLoading, setIsLoading] = useState(false);

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
    if (sortBy === "newest") {
      return list.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
    }
    // Relevance / Hot
    return list.sort((a, b) => (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0));
  }, [filteredJobs, sortBy]);

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
                      const next = e.target.value as "newest" | "relevance";
                      setSortBy(next);
                      updateURL(filters, keywordInput, next);
                    }}
                    className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-semibold text-ink-900 focus:outline-none focus:border-primary-600 cursor-pointer shadow-sm"
                  >
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
                    <JobCard key={job.id} job={job} />
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
