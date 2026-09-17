"use client";

import React from "react";
import { X, RotateCcw, Filter } from "lucide-react";
import { Checkbox } from "./ui/Checkbox";
import { RadioGroup } from "./ui/RadioGroup";
import { RangeSlider } from "./ui/RangeSlider";
import { Button } from "./ui/Button";
import { categories } from "@/lib/data/categories";

export interface FilterState {
  jobTypes: string[];
  experienceLevels: string[];
  category: string;
  minSalary: number;
  datePosted: string;
}

export interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  isMobile = false,
  onCloseMobile,
}) => {
  const jobTypeOptions = [
    { label: "Full-time", value: "Full-time" },
    { label: "Part-time", value: "Part-time" },
    { label: "Internship", value: "Internship" },
    { label: "Contract", value: "Contract" },
    { label: "Remote", value: "Remote" },
  ];

  const experienceOptions = [
    { label: "Entry Level", value: "Entry Level" },
    { label: "Mid Level", value: "Mid Level" },
    { label: "Senior Level", value: "Senior Level" },
    { label: "Lead / Principal", value: "Lead / Principal" },
    { label: "Executive", value: "Executive" },
  ];

  const datePostedOptions = [
    { label: "Anytime", value: "anytime" },
    { label: "Past 24 Hours", value: "24h" },
    { label: "Past Week (< 7 Days)", value: "week" },
    { label: "Past Month", value: "month" },
  ];

  const handleJobTypeToggle = (type: string) => {
    const updated = filters.jobTypes.includes(type)
      ? filters.jobTypes.filter((t) => t !== type)
      : [...filters.jobTypes, type];
    onFilterChange({ ...filters, jobTypes: updated });
  };

  const handleExperienceToggle = (level: string) => {
    const updated = filters.experienceLevels.includes(level)
      ? filters.experienceLevels.filter((l) => l !== level)
      : [...filters.experienceLevels, level];
    onFilterChange({ ...filters, experienceLevels: updated });
  };

  const content = (
    <div className="space-y-6 text-left">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary-600" />
          <h3 className="font-bold text-ink-900 text-sm">Filters</h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset all</span>
        </button>
      </div>

      {/* Category Dropdown */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-ink-700">
          Job Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs font-medium text-ink-900 focus:outline-none focus:border-primary-600 cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name} ({c.jobCount})
            </option>
          ))}
        </select>
      </div>

      {/* Job Types */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-ink-700">Job Type</h4>
        <div className="space-y-2">
          {jobTypeOptions.map((opt) => (
            <Checkbox
              key={opt.value}
              id={`jt-${opt.value}`}
              label={opt.label}
              checked={filters.jobTypes.includes(opt.value)}
              onChange={() => handleJobTypeToggle(opt.value)}
            />
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="space-y-3 pt-2 border-t border-border">
        <h4 className="text-xs font-bold uppercase tracking-wider text-ink-700">
          Experience Level
        </h4>
        <div className="space-y-2">
          {experienceOptions.map((opt) => (
            <Checkbox
              key={opt.value}
              id={`exp-${opt.value}`}
              label={opt.label}
              checked={filters.experienceLevels.includes(opt.value)}
              onChange={() => handleExperienceToggle(opt.value)}
            />
          ))}
        </div>
      </div>

      {/* Minimum Salary Range Slider */}
      <div className="space-y-3 pt-2 border-t border-border">
        <h4 className="text-xs font-bold uppercase tracking-wider text-ink-700">
          Min. Monthly Salary
        </h4>
        <RangeSlider
          min={50000}
          max={600000}
          step={25000}
          value={filters.minSalary}
          onChange={(val) => onFilterChange({ ...filters, minSalary: val })}
        />
      </div>

      {/* Date Posted */}
      <div className="space-y-3 pt-2 border-t border-border">
        <h4 className="text-xs font-bold uppercase tracking-wider text-ink-700">Date Posted</h4>
        <RadioGroup
          name="datePosted"
          options={datePostedOptions}
          value={filters.datePosted}
          onChange={(val) => onFilterChange({ ...filters, datePosted: val })}
        />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="p-4 space-y-4">
        {content}
        <div className="pt-4 border-t border-border">
          <Button variant="primary" className="w-full" onClick={onCloseMobile}>
            Apply Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <aside className="w-64 lg:w-72 shrink-0 bg-surface rounded-2xl border border-border p-5 shadow-sm sticky top-24 self-start">
      {content}
    </aside>
  );
};
