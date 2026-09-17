"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Fingerprint,
  ShieldCheck,
  Building2,
  Boxes,
  LocateFixed,
  Timer,
  Flame,
  BadgeCheck,
  MoveRight,
  MoveLeft,
  Coins,
  Plus,
  Trash2,
  ScanSearch,
  AlertCircle,
  LogIn,
  UserCheck,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Stepper } from "@/components/ui/Stepper";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/components/AuthProvider";
import { categories } from "@/lib/data/categories";
import { formatSalaryRange } from "@/lib/utils";

// Authentication-gated vacancy posting page for SkillForz
export default function PostJobPage() {
  const router = useRouter();
  const { user, isLoggedIn, login, logout } = useAuth();
  const { success, error: toastError } = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [publishedRef, setPublishedRef] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState(user?.company || "Dialog Axiata PLC");
  const [category, setCategory] = useState("software-it");
  const [location, setLocation] = useState("Colombo 02, Western Province");
  const [jobType, setJobType] = useState<"full_time" | "part_time" | "contract" | "internship" | "remote">("full_time");
  const [experience, setExperience] = useState<"entry" | "mid" | "senior" | "lead">("mid");
  const [salaryMin, setSalaryMin] = useState("250000");
  const [salaryMax, setSalaryMax] = useState("400000");
  const [deadline, setDeadline] = useState("2026-10-31");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState<string[]>([
    "Bachelor's Degree in Computer Science, Software Engineering, or equivalent practical experience.",
    "3+ years of professional development experience with modern web platforms.",
    "Solid understanding of cloud microservices, APIs, and relational databases.",
  ]);
  const [newReq, setNewReq] = useState("");
  const [benefits, setBenefits] = useState<string[]>([
    "Comprehensive OPD & Hospitalization Insurance for Employee & Family",
    "Hybrid / Flexible Remote Working Arrangement",
    "Annual Performance Bonus & Professional Development Allowance",
  ]);
  const [newBenefit, setNewBenefit] = useState("");
  const [contactEmail, setContactEmail] = useState(user?.email || "careers@dialog.lk");
  const [applyUrl, setApplyUrl] = useState("");

  const steps = [
    { id: 1, title: "Role Basics", description: "Title, Company & Location" },
    { id: 2, title: "Description", description: "Duties & Qualifications" },
    { id: 3, title: "Compensation", description: "Salary & Final Submission" },
  ];

  const handleAddRequirement = () => {
    if (!newReq.trim()) return;
    setRequirements((prev) => [...prev, newReq.trim()]);
    setNewReq("");
  };

  const handleRemoveRequirement = (idx: number) => {
    setRequirements((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddBenefit = () => {
    if (!newBenefit.trim()) return;
    setBenefits((prev) => [...prev, newBenefit.trim()]);
    setNewBenefit("");
  };

  const handleRemoveBenefit = (idx: number) => {
    setBenefits((prev) => prev.filter((_, i) => i !== idx));
  };

  const executePublish = (customCompany?: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const companyToUse = customCompany || companyName || "SKF";
      const cleanPrefix = companyToUse.replace(/[^a-zA-Z]/g, "").substring(0, 3).toUpperCase() || "JOB";
      const generatedRef = `REF-${cleanPrefix}-2026-${Math.floor(100 + Math.random() * 900)}`;
      setPublishedRef(generatedRef);
      setSuccessModalOpen(true);
      success("Vacancy Published!", `Official TopJobs Reference: ${generatedRef}`);
    }, 1200);
  };

  const handlePublishClick = () => {
    if (!title.trim()) {
      toastError("Job Title Required", "Please enter a vacancy title before publishing.");
      setCurrentStep(0);
      return;
    }
    if (!description.trim()) {
      toastError("Description Required", "Please provide a brief job description.");
      setCurrentStep(1);
      return;
    }

    // AUTHENTICATION CHECK: Must be logged in to publish
    if (!isLoggedIn) {
      setAuthModalOpen(true);
      return;
    }

    executePublish();
  };

  const handleDemoLoginAndPublish = () => {
    login("talent@dialog.lk", "Dialog Talent Team", "Dialog Axiata PLC");
    setCompanyName("Dialog Axiata PLC");
    setContactEmail("talent@dialog.lk");
    setAuthModalOpen(false);
    success("Signed in as Recruiter", "Dialog Axiata PLC authenticated!");
    executePublish("Dialog Axiata PLC");
  };

  const currentCategoryName =
    categories.find((c) => c.slug === category)?.name || "Software & IT";

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* AUTH STATUS HEADER BANNER */}
          {!isLoggedIn ? (
            <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-start sm:items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Fingerprint className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                    Employer Sign-In Required Before Publishing
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200/70 text-amber-900">
                      Draft Mode
                    </span>
                  </h2>
                  <p className="text-xs text-amber-800/90 mt-0.5">
                    You can compose and preview your vacancy below. To prevent unauthorized postings, signing in is required to publish and generate a TopJobs reference code.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    login("talent@dialog.lk", "Dialog Talent Team", "Dialog Axiata PLC");
                    setCompanyName("Dialog Axiata PLC");
                    setContactEmail("talent@dialog.lk");
                    success("Logged in as Recruiter", "Dialog Axiata PLC verified!");
                  }}
                  className="flex items-center gap-1.5 text-xs whitespace-nowrap"
                >
                  <UserCheck className="h-3.5 w-3.5" />
                  1-Click Recruiter Demo
                </Button>
                <Link href="/login?redirect=/post-job">
                  <Button size="sm" variant="outline" className="text-xs whitespace-nowrap">
                    <LogIn className="h-3.5 w-3.5 mr-1" />
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                    Authenticated Employer
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-200/70 text-emerald-900">
                      Verified Publisher
                    </span>
                  </h2>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Posting as <strong className="font-semibold">{user?.name}</strong> ({user?.company || "Dialog Axiata PLC"}). Direct candidates will be routed to your account.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  logout();
                  success("Signed Out", "Switched to guest draft mode.");
                }}
                className="text-xs font-semibold text-ink-500 hover:text-accent-danger flex items-center gap-1 shrink-0 self-end sm:self-auto cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>
          )}

          {/* PAGE TITLE & TOP ACTION BAR */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200">
                  <Flame className="h-3.5 w-3.5" /> TopJobs-Compatible Vacancy Portal
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-900 font-heading tracking-tight">
                Post a Sri Lankan Job Vacancy
              </h1>
              <p className="text-xs sm:text-sm text-ink-500 mt-1">
                Fill out the role specifications below. The live TopJobs card preview automatically synchronizes in real-time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => router.push("/find-jobs")}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handlePublishClick}
                isLoading={isSubmitting}
                rightIcon={<Sparkles className="h-4 w-4" />}
              >
                Publish Vacancy
              </Button>
            </div>
          </div>

          {/* VISUAL STEPPER */}
          <div className="max-w-2xl mx-auto py-6">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              onStepClick={(s) => setCurrentStep(s)}
            />
          </div>

          {/* MAIN FORM + PREVIEW GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT FORM COLUMN (7 cols) */}
            <div className="lg:col-span-7 bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-sm space-y-6 text-left">
              
              {/* STEP 0: Role Basics */}
              {currentStep === 0 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h2 className="text-base font-bold text-ink-900 flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary-600" />
                      1. Vacancy Core Overview
                    </h2>
                    <span className="text-xs text-ink-400">Step 1 of 3</span>
                  </div>

                  <Input
                    label="Job Title / Vacancy Name"
                    placeholder="e.g. Senior Full-Stack Cloud Engineer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    helperText="Use an industry-standard title for maximum applicant discoverability."
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Hiring Organization / Company"
                      placeholder="e.g. Dialog Axiata PLC"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />

                    <Select
                      label="Industry Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      options={categories.map((c) => ({
                        value: c.slug,
                        label: c.name,
                      }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Primary Work Location"
                      placeholder="e.g. Colombo 02 / Kandy / Remote"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      leftIcon={<LocateFixed className="h-4 w-4" />}
                      required
                    />

                    <Select
                      label="Employment Arrangement"
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value as any)}
                      options={[
                        { value: "full_time", label: "Full Time (Permanent)" },
                        { value: "contract", label: "Contract / Project" },
                        { value: "part_time", label: "Part Time" },
                        { value: "internship", label: "Internship" },
                        { value: "remote", label: "100% Remote" },
                      ]}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Experience Level Required"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value as any)}
                      options={[
                        { value: "entry", label: "Entry Level (0-2 years)" },
                        { value: "mid", label: "Mid Level (2-5 years)" },
                        { value: "senior", label: "Senior Level (5-8 years)" },
                        { value: "lead", label: "Lead / Executive (8+ years)" },
                      ]}
                    />

                    <Input
                      label="Application Closing Deadline"
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      leftIcon={<Timer className="h-4 w-4" />}
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button
                      variant="primary"
                      onClick={() => {
                        if (!title.trim()) {
                          toastError("Missing Title", "Please enter the job vacancy title.");
                          return;
                        }
                        setCurrentStep(1);
                      }}
                      rightIcon={<MoveRight className="h-4 w-4" />}
                    >
                      Continue to Description & Skills
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 1: Description & Requirements */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h2 className="text-base font-bold text-ink-900 flex items-center gap-2">
                      <Boxes className="h-4 w-4 text-primary-600" />
                      2. Role Responsibilities & Requirements
                    </h2>
                    <span className="text-xs text-ink-400">Step 2 of 3</span>
                  </div>

                  <Textarea
                    label="Vacancy Description"
                    placeholder="Detail key responsibilities, corporate mission, engineering stack, and day-to-day workflow..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    required
                  />

                  {/* Requirements List Builder */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-ink-900 block">
                      Key Qualifications & Competencies (Add Items)
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g. 3+ years experience with Next.js and TypeScript"
                        value={newReq}
                        onChange={(e) => setNewReq(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddRequirement();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleAddRequirement}
                        leftIcon={<Plus className="h-4 w-4" />}
                      >
                        Add
                      </Button>
                    </div>

                    <div className="space-y-2 pt-1">
                      {requirements.map((req, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-bg border border-border text-xs text-ink-800"
                        >
                          <div className="flex items-center gap-2">
                            <BadgeCheck className="h-3.5 w-3.5 text-primary-600 shrink-0" />
                            <span>{req}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveRequirement(i)}
                            className="text-ink-400 hover:text-accent-danger p-1"
                            title="Remove requirement"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits List Builder */}
                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-bold text-ink-900 block">
                      Corporate Benefits & Employee Perks (Add Items)
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g. Comprehensive OPD/Dental coverage & Transport"
                        value={newBenefit}
                        onChange={(e) => setNewBenefit(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddBenefit();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleAddBenefit}
                        leftIcon={<Plus className="h-4 w-4" />}
                      >
                        Add
                      </Button>
                    </div>

                    <div className="space-y-2 pt-1">
                      {benefits.map((b, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-bg border border-border text-xs text-ink-800"
                        >
                          <div className="flex items-center gap-2">
                            <Flame className="h-3.5 w-3.5 text-accent-success shrink-0" />
                            <span>{b}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveBenefit(i)}
                            className="text-ink-400 hover:text-accent-danger p-1"
                            title="Remove perk"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(0)}
                      leftIcon={<MoveLeft className="h-4 w-4" />}
                    >
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setCurrentStep(2)}
                      rightIcon={<MoveRight className="h-4 w-4" />}
                    >
                      Continue to Compensation
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 2: Compensation & Application Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h2 className="text-base font-bold text-ink-900 flex items-center gap-2">
                      <Coins className="h-4 w-4 text-primary-600" />
                      3. Compensation & Application Method
                    </h2>
                    <span className="text-xs text-ink-400">Step 3 of 3</span>
                  </div>

                  {/* Salary Range */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Minimum Monthly Salary (LKR)"
                      type="number"
                      placeholder="250000"
                      value={salaryMin}
                      onChange={(e) => setSalaryMin(e.target.value)}
                      leftIcon={<Coins className="h-4 w-4" />}
                    />
                    <Input
                      label="Maximum Monthly Salary (LKR)"
                      type="number"
                      placeholder="450000"
                      value={salaryMax}
                      onChange={(e) => setSalaryMax(e.target.value)}
                      leftIcon={<Coins className="h-4 w-4" />}
                    />
                  </div>
                  <p className="text-xs text-ink-500 -mt-3">
                    Preview on vacancy card:{" "}
                    <strong className="text-primary-700 font-mono font-bold">
                      {formatSalaryRange(Number(salaryMin), Number(salaryMax))}
                    </strong>
                  </p>

                  <Input
                    label="Direct Application Email Address"
                    type="email"
                    placeholder="careers@dialog.lk"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                    helperText="Candidate CVs submitted through SkillForz will be instantly routed to this inbox."
                  />

                  <Input
                    label="External ATS / Careers URL (Optional)"
                    placeholder="https://dialog.lk/careers/apply/1234"
                    value={applyUrl}
                    onChange={(e) => setApplyUrl(e.target.value)}
                    helperText="Optional direct link to your enterprise recruitment system."
                  />

                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Sri Lanka Fair Recruitment & Candidate Protection</p>
                      <p className="mt-0.5 text-amber-800 leading-relaxed">
                        By publishing this vacancy, you confirm that no candidate fees, recruitment charges, or training expenses are demanded at any stage of hiring.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      leftIcon={<MoveLeft className="h-4 w-4" />}
                    >
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handlePublishClick}
                      isLoading={isSubmitting}
                      rightIcon={<Sparkles className="h-4 w-4" />}
                    >
                      {isLoggedIn ? "Confirm & Publish Vacancy" : "Publish Vacancy (Sign In)"}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: LIVE TOPJOBS CARD PREVIEW (5 cols) */}
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24 text-left">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-600 flex items-center gap-1.5">
                  <ScanSearch className="h-4 w-4 text-primary-600" />
                  Live Vacancy Preview
                </span>
                <span className="text-[11px] font-semibold text-accent-success bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <BadgeCheck className="h-3 w-3" /> TopJobs Format
                </span>
              </div>

              {/* Simulated Card */}
              <Card hoverEffect={false} className="border-primary-200 shadow-md">
                <div className="space-y-4">
                  {/* Top Meta */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-primary-600 text-white flex items-center justify-center font-bold text-lg font-heading shadow-sm">
                        {companyName ? companyName.substring(0, 2).toUpperCase() : "SK"}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-ink-500">
                          {companyName || "Your Company Name"}
                        </p>
                        <h3 className="text-base font-bold text-ink-900 leading-snug font-heading">
                          {title || "Job Title Will Appear Here"}
                        </h3>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold border border-slate-200 shrink-0">
                      REF-PREVIEW
                    </span>
                  </div>

                  {/* Location & Tags */}
                  <div className="flex flex-wrap gap-2 text-xs text-ink-600">
                    <span className="inline-flex items-center gap-1">
                      <LocateFixed className="h-3.5 w-3.5 text-ink-400" />
                      {location || "Colombo, Sri Lanka"}
                    </span>
                    <span className="text-ink-300">•</span>
                    <span className="inline-flex items-center gap-1">
                      <Boxes className="h-3.5 w-3.5 text-ink-400" />
                      {jobType === "full_time"
                        ? "Full Time"
                        : jobType === "contract"
                        ? "Contract"
                        : jobType === "part_time"
                        ? "Part Time"
                        : jobType === "internship"
                        ? "Internship"
                        : "Remote"}
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <Badge variant="primary">
                      {currentCategoryName}
                    </Badge>
                    <Badge variant="neutral">
                      {experience.toUpperCase()} LEVEL
                    </Badge>
                  </div>

                  {/* Salary & Deadline */}
                  <div className="p-3 rounded-xl bg-primary-50/60 border border-primary-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-ink-500 uppercase tracking-wider block font-semibold">
                        Offered Compensation
                      </span>
                      <span className="font-bold text-primary-700 font-mono">
                        {formatSalaryRange(Number(salaryMin), Number(salaryMax))}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-ink-500 uppercase tracking-wider block font-semibold">
                        Closing Date
                      </span>
                      <span className="font-semibold text-ink-800">
                        {deadline || "30 Days"}
                      </span>
                    </div>
                  </div>

                  {/* Description Snippet */}
                  <p className="text-xs text-ink-600 line-clamp-3 leading-relaxed">
                    {description ||
                      "A complete outline of core responsibilities, qualifications, and workplace culture will be showcased to top Sri Lankan job seekers here."}
                  </p>

                  <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-ink-400">Applications routed to:</span>
                    <span className="font-mono font-medium text-ink-700 truncate max-w-[200px]">
                      {contactEmail}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* AUTHENTICATION REQUIRED MODAL (TRIGGERED ON PUBLISH CLICK IF GUEST) */}
      <Modal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="Sign In to Publish Vacancy"
      >
        <div className="space-y-5 text-center py-2">
          <div className="h-16 w-16 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center mx-auto shadow-inner">
            <Fingerprint className="h-8 w-8" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-ink-900 font-heading">
              Authentication Required
            </h3>
            <p className="text-xs text-ink-600 mt-1 max-w-sm mx-auto leading-relaxed">
              Your vacancy draft <strong>"{title || 'Untitled Vacancy'}"</strong> is completely preserved! To publish it live and generate your official reference code, please sign in.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-bg border border-border text-left space-y-2">
            <div className="flex items-center gap-2 text-xs text-ink-700">
              <BadgeCheck className="h-4 w-4 text-accent-success shrink-0" />
              <span>Official TopJobs reference code generated instantly</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-700">
              <BadgeCheck className="h-4 w-4 text-accent-success shrink-0" />
              <span>Protects candidates from unauthorized postings</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-700">
              <BadgeCheck className="h-4 w-4 text-accent-success shrink-0" />
              <span>Direct applicant CVs forwarded to your verified email</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Button
              variant="primary"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleDemoLoginAndPublish}
            >
              <UserCheck className="h-4 w-4" />
              Instant 1-Click Recruiter Sign-In & Publish &rarr;
            </Button>

            <div className="flex gap-2">
              <Link href="/login?redirect=/post-job" className="flex-1">
                <Button variant="outline" className="w-full text-xs">
                  <LogIn className="h-3.5 w-3.5 mr-1" />
                  Sign In with Password
                </Button>
              </Link>
              <Link href="/register?redirect=/post-job" className="flex-1">
                <Button variant="outline" className="w-full text-xs">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Modal>

      {/* CELEBRATORY SUCCESS MODAL */}
      <Modal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        title="Vacancy Published Successfully!"
      >
        <div className="space-y-5 text-center py-2">
          <div className="h-16 w-16 rounded-full bg-emerald-100 text-accent-success flex items-center justify-center mx-auto">
            <BadgeCheck className="h-8 w-8" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-ink-900 font-heading">
              Your Listing is Now Live on SkillForz
            </h3>
            <p className="text-xs text-ink-500 mt-1 max-w-sm mx-auto leading-relaxed">
              Job seekers in Sri Lanka can now discover and apply for this vacancy using your allocated TopJobs-style reference number.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-bg border border-border inline-block text-left w-full max-w-xs">
            <span className="text-[11px] font-bold text-ink-500 uppercase tracking-wider block mb-1">
              TopJobs Reference Code:
            </span>
            <span className="text-lg font-mono font-black text-primary-700">
              {publishedRef}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Link href="/find-jobs" className="flex-1">
              <Button variant="primary" className="w-full">
                View in Find Jobs &rarr;
              </Button>
            </Link>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setSuccessModalOpen(false);
                setTitle("");
                setDescription("");
                setCurrentStep(0);
              }}
            >
              Post Another Vacancy
            </Button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}
