"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ScanSearch, LocateFixed, Boxes, Fingerprint, ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

export interface SearchBarProps {
  initialKeyword?: string;
  initialLocation?: string;
  initialCategory?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialKeyword = "",
  initialLocation = "",
  initialCategory = "",
  className,
}) => {
  const router = useRouter();
  const [activeMode, setActiveMode] = useState<"standard" | "reference">("standard");
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);
  const [category, setCategory] = useState(initialCategory);
  const [referenceNumber, setReferenceNumber] = useState("");

  const handleStandardSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    if (location && location !== "all") params.set("location", location);
    if (category && category !== "all") params.set("category", category);

    router.push(`/find-jobs?${params.toString()}`);
  };

  const handleReferenceSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceNumber.trim()) return;
    router.push(`/find-jobs?ref=${encodeURIComponent(referenceNumber.trim().toUpperCase())}`);
  };

  const sriLankanCities = [
    { label: "All Cities", value: "all" },
    { label: "Colombo (Western)", value: "Colombo" },
    { label: "Kandy (Central)", value: "Kandy" },
    { label: "Galle (Southern)", value: "Galle" },
    { label: "Jaffna (Northern)", value: "Jaffna" },
    { label: "Gampaha / Negombo", value: "Gampaha" },
    { label: "Remote / Hybrid", value: "Remote" },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-2 mb-2.5">
        <button
          type="button"
          onClick={() => setActiveMode("standard")}
          className={cn(
            "text-xs font-bold px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 shadow-sm",
            activeMode === "standard"
              ? "bg-primary-600 text-white shadow-primary-600/30"
              : "bg-surface text-ink-700 hover:bg-primary-50 border border-border"
          )}
        >
          <ScanSearch className="h-3.5 w-3.5" />
          <span>Search Vacancies</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveMode("reference")}
          className={cn(
            "text-xs font-bold px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 shadow-sm",
            activeMode === "reference"
              ? "bg-primary-600 text-white shadow-primary-600/30"
              : "bg-surface text-ink-700 hover:bg-primary-50 border border-border"
          )}
        >
          <Fingerprint className="h-3.5 w-3.5" />
          <span>Search by Reference No. (TopJobs style)</span>
        </button>
      </div>

      {/* Main Search Panel */}
      {activeMode === "standard" ? (
        <form
          onSubmit={handleStandardSearch}
          className="bg-surface p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-border shadow-xl flex flex-col md:flex-row items-stretch gap-2.5 text-left"
        >
          {/* Keyword Field */}
          <div className="flex-1 flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-bg/60 border border-transparent focus-within:border-primary-300 focus-within:bg-white transition-all">
            <ScanSearch className="h-5 w-5 text-primary-600 shrink-0" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Job title, skill, or company (e.g. React, Dialog)"
              className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-500/70 focus:outline-none"
            />
          </div>

          {/* Location Select */}
          <div className="flex-1 flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-bg/60 border border-transparent focus-within:border-primary-300 focus-within:bg-white transition-all">
            <LocateFixed className="h-5 w-5 text-primary-600 shrink-0" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-sm text-ink-900 focus:outline-none cursor-pointer"
            >
              <option value="" disabled selected={!location}>
                Select City / Location
              </option>
              {sriLankanCities.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Select */}
          <div className="flex-1 flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-bg/60 border border-transparent focus-within:border-primary-300 focus-within:bg-white transition-all">
            <Boxes className="h-5 w-5 text-primary-600 shrink-0" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent text-sm text-ink-900 focus:outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            variant="primary"
            className="md:px-8 shrink-0 rounded-xl sm:rounded-2xl"
          >
            Find Jobs
          </Button>
        </form>
      ) : (
        <form
          onSubmit={handleReferenceSearch}
          className="bg-surface p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-border shadow-xl flex flex-col sm:flex-row items-stretch gap-2.5 text-left"
        >
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl sm:rounded-2xl bg-bg/60 border border-transparent focus-within:border-primary-300 focus-within:bg-white transition-all">
            <Fingerprint className="h-5 w-5 text-primary-600 shrink-0" />
            <input
              type="text"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              placeholder="Enter Ref Code (e.g. REF-MAS-2024-089 or REF-DIA-2024-045)"
              className="w-full bg-transparent font-mono text-sm uppercase text-ink-900 placeholder:text-ink-500/70 focus:outline-none"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            variant="primary"
            className="sm:px-8 shrink-0 rounded-xl sm:rounded-2xl"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Lookup Vacancy
          </Button>
        </form>
      )}

      {/* Suggested Search Terms */}
      <div className="mt-3 flex items-center flex-wrap gap-2 text-xs text-ink-500 px-2">
        <span className="font-semibold text-ink-700">Popular:</span>
        {["Software Engineer", "Cloud Architect", "MAS Holdings", "Remote", "CIMA Intern"].map(
          (term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setKeyword(term);
                router.push(`/find-jobs?q=${encodeURIComponent(term)}`);
              }}
              className="hover:text-primary-600 hover:underline transition-colors"
            >
              {term}
            </button>
          )
        )}
      </div>
    </div>
  );
};
