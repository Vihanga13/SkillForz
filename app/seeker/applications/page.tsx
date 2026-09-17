"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  ExternalLink,
  Calendar,
  MessageSquare,
  AlertCircle,
  Eye,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { ApplicationStatusStepper } from "@/components/ApplicationStatusStepper";
import { Drawer } from "@/components/ui/Drawer";
import { mockApplications } from "@/lib/data/applications";
import { Application } from "@/types";

export default function SeekerApplicationsPage() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredApps =
    filterStatus === "all"
      ? mockApplications
      : mockApplications.filter((a) => a.status === filterStatus);

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900 tracking-tight font-heading">
            My Job Applications
          </h1>
          <p className="text-xs text-ink-500 mt-0.5">
            Track real-time hiring stages, interview invitations, and status updates across Sri Lanka.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { label: "All (5)", value: "all" },
            { label: "Under Review", value: "under_review" },
            { label: "Shortlisted", value: "shortlisted" },
            { label: "Interview", value: "interview" },
            { label: "Selected", value: "selected" },
          ].map((pill) => (
            <button
              key={pill.value}
              type="button"
              onClick={() => setFilterStatus(pill.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                filterStatus === pill.value
                  ? "bg-primary-600 text-white shadow-sm"
                  : "bg-surface text-ink-700 hover:bg-bg border border-border"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Cards List */}
      <div className="space-y-4">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow space-y-6"
          >
            {/* Top Row: Job Info + Status Pill */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
              <div className="flex items-start gap-4">
                <Avatar
                  src={app.job?.company.logo}
                  alt={app.job?.company.name}
                  size="lg"
                  verified={app.job?.company.verified}
                />
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-mono text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded border border-primary-100">
                      {app.job?.referenceNumber}
                    </span>
                    <span className="text-xs text-ink-500">{app.job?.categoryName}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-ink-900 tracking-tight">
                    {app.job?.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-ink-500 mt-1">
                    <span className="font-semibold text-ink-700">{app.job?.company.name}</span>
                    <span>&bull;</span>
                    <span>Applied on {new Date(app.appliedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                <StatusPill status={app.status} />
                <button
                  type="button"
                  onClick={() => setSelectedApplication(app)}
                  className="text-xs font-semibold text-primary-600 hover:underline flex items-center gap-1 mt-1"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>View Details</span>
                </button>
              </div>
            </div>

            {/* Middle Row: 5-Stage Visual Status Pipeline Stepper */}
            <div className="pt-2 px-2 sm:px-6">
              <ApplicationStatusStepper status={app.status} />
            </div>

            {/* Bottom Row: Employer Notes or Next Steps if present */}
            {app.employerNotes && (
              <div className="p-3.5 rounded-xl bg-primary-50/70 border border-primary-200/80 text-xs text-primary-900 flex items-start gap-2.5">
                <MessageSquare className="h-4 w-4 text-primary-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Employer Message:</strong> {app.employerNotes}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Application Detail Drawer */}
      {selectedApplication && (
        <Drawer
          isOpen={Boolean(selectedApplication)}
          onClose={() => setSelectedApplication(null)}
          title="Application Record"
          width="md"
        >
          <div className="space-y-6 text-left">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                {selectedApplication.job?.referenceNumber}
              </span>
              <h3 className="text-lg font-bold text-ink-900 mt-1">
                {selectedApplication.job?.title}
              </h3>
              <p className="text-xs text-ink-500">{selectedApplication.job?.company.name}</p>
            </div>

            <div className="p-4 rounded-xl bg-bg border border-border space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-ink-500">Status:</span>
                <StatusPill status={selectedApplication.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Applied Date:</span>
                <span className="font-semibold text-ink-900">
                  {new Date(selectedApplication.appliedDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Resume Attached:</span>
                <span className="font-semibold text-ink-900">
                  {selectedApplication.cvFileName || "Sachithra_CV_2024.pdf"}
                </span>
              </div>
            </div>

            {selectedApplication.coverLetter && (
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-ink-700">
                  Cover Letter Submitted
                </h4>
                <p className="text-xs text-ink-500 p-4 rounded-xl bg-bg border border-border leading-relaxed whitespace-pre-line">
                  {selectedApplication.coverLetter}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-border">
              <Link href={`/find-jobs/${selectedApplication.job?.slug}`} className="block">
                <Button variant="outline" size="sm" className="w-full">
                  Open Vacancy Description &rarr;
                </Button>
              </Link>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
}
