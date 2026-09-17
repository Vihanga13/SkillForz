"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ScanSearch, LocateFixed, Boxes } from "lucide-react";
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
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);
  const [category, setCategory] = useState(initialCategory);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    const trimmed = keyword.trim();
    if (trimmed) {
      if (trimmed.toUpperCase().startsWith("REF-")) {
        params.set("ref", trimmed.toUpperCase());
      } else {
        params.set("q", trimmed);
      }
    }
    if (location && location !== "all") params.set("location", location);
    if (category && category !== "all") params.set("category", category);

    router.push(`/find-jobs?${params.toString()}`);
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
      {/* Main Search Panel */}
      <form
        onSubmit={handleSearch}
        className="bg-surface p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-border shadow-xl flex flex-col md:flex-row items-stretch gap-2.5 text-left"
      >
        {/* Keyword Field */}
        <div className="flex-1 flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-bg/60 border border-transparent focus-within:border-primary-300 focus-within:bg-white transition-all">
          <ScanSearch className="h-5 w-5 text-primary-600 shrink-0" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Job title, skill, company, or REF code (e.g. React, Dialog, REF-MAS-089)"
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
