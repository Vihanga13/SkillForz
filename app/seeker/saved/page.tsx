"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bookmark, Search, Trash2 } from "lucide-react";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { jobs } from "@/lib/data/jobs";
import { mockJobSeeker } from "@/lib/data/mockUsers";
import { useToast } from "@/components/ui/Toast";

export default function SeekerSavedJobsPage() {
  const { success } = useToast();
  const [savedIds, setSavedIds] = useState<string[]>(mockJobSeeker.savedJobIds);

  const savedJobs = jobs.filter((j) => savedIds.includes(j.id));

  const handleClearAll = () => {
    setSavedIds([]);
    success("Saved Jobs Cleared", "All bookmarked vacancies have been removed.");
  };

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900 tracking-tight font-heading">
            Saved Vacancies ({savedJobs.length})
          </h1>
          <p className="text-xs text-ink-500 mt-0.5">
            Keep track of interesting positions and submit applications before deadlines close.
          </p>
        </div>

        {savedJobs.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            leftIcon={<Trash2 className="h-3.5 w-3.5" />}
          >
            Clear All
          </Button>
        )}
      </div>

      {savedJobs.length > 0 ? (
        <div className="space-y-4">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} isBookmarkedDefault />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Bookmark className="h-8 w-8 text-primary-600" />}
          title="No Saved Jobs Yet"
          description="Click the bookmark icon on any job card to save it for later review."
          actionLabel="Explore Vacancies"
          onAction={() => (window.location.href = "/find-jobs")}
        />
      )}
    </div>
  );
}
