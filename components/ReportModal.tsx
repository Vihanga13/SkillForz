"use client";

import React, { useState } from "react";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Select } from "./ui/Select";
import { Textarea } from "./ui/Textarea";
import { Input } from "./ui/Input";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useToast } from "./ui/Toast";
import { ReportReason } from "@/types";

export interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: "job" | "company" | "user";
  targetTitle: string;
  targetId: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetType,
  targetTitle,
  targetId,
}) => {
  const { success } = useToast();
  const [reason, setReason] = useState<ReportReason>("fake_job");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    success("Report Submitted", "Thank you for reporting. Our moderation team will investigate.");
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  const reasonOptions = [
    { label: "Fake or Non-Existent Vacancy", value: "fake_job" },
    { label: "Scam, Fraud, or Money Request", value: "scam_or_fraud" },
    { label: "Inappropriate or Discriminatory Content", value: "inappropriate_content" },
    { label: "Expired Vacancy / Filled Position", value: "expired_vacancy" },
    { label: "Other Policy Violation", value: "other" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2 text-accent-danger">
          <AlertTriangle className="h-5 w-5" />
          <span>Report {targetType === "job" ? "Vacancy" : "Company"}</span>
        </div>
      }
      description={`Reporting: "${targetTitle}"`}
    >
      {isSubmitted ? (
        <div className="py-8 text-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-accent-success mx-auto">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h4 className="font-bold text-ink-900">Report Received</h4>
          <p className="text-xs text-ink-500">
            Our trust and safety team will review this notice within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Reason for reporting"
            options={reasonOptions}
            value={reason}
            onChange={(e) => setReason(e.target.value as ReportReason)}
            required
          />

          <Input
            label="Your Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            helperText="We may follow up if additional evidence is needed."
          />

          <Textarea
            label="Additional Details"
            placeholder="Please describe why this listing violates safety guidelines..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
            rows={4}
          />

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="danger" size="sm">
              Submit Report
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
