"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Bell,
  ArrowRight,
  RotateCcw,
  BadgeCheck,
  ChevronRight,
  Filter,
  Check,
  Zap,
  Radio,
  SendHorizontal,
  Mail,
  Smartphone,
  Info,
} from "lucide-react";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Avatar } from "./ui/Avatar";
import { useToast } from "./ui/Toast";
import {
  ParsedCV,
  JobMatchResult,
  CANDIDATE_PRESETS,
  CandidatePreset,
  parseCVFromText,
  matchCVAgainstJobs,
} from "@/lib/ai/cvMatcher";
import {
  dispatchAIMatchNotification,
  saveAlertConfig,
  MatchAlertConfig,
} from "@/lib/ai/notificationService";
import { formatSalaryRange } from "@/lib/utils";

export interface AICVMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyAIFilter?: (cv: ParsedCV, matches: JobMatchResult[]) => void;
  initialCV?: ParsedCV | null;
}

export const AICVMatcherModal: React.FC<AICVMatcherModalProps> = ({
  isOpen,
  onClose,
  onApplyAIFilter,
  initialCV = null,
}) => {
  const { success, info } = useToast();
  const [step, setStep] = useState<"input" | "scanning" | "results" | "setup-alert">("input");
  const [activeTab, setActiveTab] = useState<"upload" | "paste" | "presets">("presets");
  const [cvText, setCvText] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<CandidatePreset>(CANDIDATE_PRESETS[0]);
  const [parsedCV, setParsedCV] = useState<ParsedCV | null>(initialCV);
  const [matchResults, setMatchResults] = useState<JobMatchResult[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStage, setScanStage] = useState("");

  // Alert setup form state
  const [alertEmail, setAlertEmail] = useState("vihaax23@gmail.com");
  const [alertPhone, setAlertPhone] = useState("+94 77 123 4567");
  const [alertThreshold, setAlertThreshold] = useState(80);
  const [alertChannel, setAlertChannel] = useState<"email" | "whatsapp" | "both">("both");
  const [alertFrequency, setAlertFrequency] = useState<"instant" | "daily">("instant");

  // Run AI matching process
  const triggerMatching = (cv: ParsedCV) => {
    setParsedCV(cv);
    setStep("scanning");
    setScanProgress(15);
    setScanStage("Analyzing candidate skills, experience level, and domain keywords...");

    setTimeout(() => {
      setScanProgress(55);
      setScanStage("Cross-referencing 140+ Sri Lankan corporate job descriptions & TopJobs REF-IDs...");
    }, 450);

    setTimeout(() => {
      setScanProgress(90);
      setScanStage("Computing semantic compatibility scores and skill gap recommendations...");
    }, 900);

    setTimeout(() => {
      const results = matchCVAgainstJobs(cv);
      setMatchResults(results);
      setScanProgress(100);
      setStep("results");

      // Dispatch real-time notification to user feed
      const notif = dispatchAIMatchNotification(results, cv.name);
      success(
        "✨ AI Matching Complete!",
        `Found ${results.filter((r) => r.score >= 75).length} high-compatibility vacancies matching your CV. Notification dispatched!`
      );
    }, 1300);
  };

  const handleSelectPreset = (preset: CandidatePreset) => {
    setSelectedPreset(preset);
    const cv: ParsedCV = {
      name: preset.name,
      email: "candidate@skillforz.lk",
      title: preset.title,
      seniority: preset.seniority,
      summary: preset.summary,
      skills: preset.skills,
      industries: preset.industries,
      rawText: `${preset.summary} Skills: ${preset.skills.join(", ")}`,
    };
    triggerMatching(cv);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    // Simulate parsing real resume text based on filename
    const simulatedText = `Candidate: Vihanga Nilusha\nTitle: Senior Cloud Solutions Engineer\nExperienced Software Engineer with deep expertise in AWS, React, Next.js, Docker, Kubernetes, Terraform, TypeScript, Node.js, and CI/CD pipelines.\nLocation: Colombo, Sri Lanka.`;
    const cv = parseCVFromText(simulatedText);
    cv.name = "Vihanga Nilusha";
    triggerMatching(cv);
  };

  const handlePasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvText.trim()) return;
    const cv = parseCVFromText(cvText);
    triggerMatching(cv);
  };

  const handleSaveAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parsedCV) return;

    saveAlertConfig({
      candidateName: parsedCV.name,
      candidateTitle: parsedCV.title,
      email: alertEmail,
      phone: alertPhone,
      threshold: alertThreshold,
      channel: alertChannel,
      frequency: alertFrequency,
      active: true,
    });

    success(
      "🔔 AI Match Alert Activated!",
      `You will receive ${alertFrequency} notifications via ${alertChannel} whenever a vacancy matches $\\ge${alertThreshold}%$.`
    );
    setStep("results");
  };

  const handleApplyFiltersToPage = () => {
    if (parsedCV && onApplyAIFilter) {
      onApplyAIFilter(parsedCV, matchResults);
      onClose();
      info(
        "AI Filter Active",
        `Job directory is now filtered and ranked by your CV compatibility.`
      );
    }
  };

  const handleReset = () => {
    setStep("input");
    setScanProgress(0);
    setCvText("");
    setUploadedFileName(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      title={
        <div className="flex items-center gap-2 text-left">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-primary-500/20">
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-ink-900 font-heading">
              AI CV Matcher & Vacancy Radar
            </h2>
            <p className="text-xs text-ink-500 font-normal">
              Intelligent skill & job description matching with real-time alerts
            </p>
          </div>
        </div>
      }
    >
      <div className="text-left mt-2">
        {/* ========================================================================= */}
        {/* STEP 1: INGESTION (Upload, Paste, or Presets) */}
        {/* ========================================================================= */}
        {step === "input" && (
          <div className="space-y-5">
            {/* Zero-Login Banner */}
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-xs text-emerald-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Zero-Login Required:</strong> Upload or test your CV freely. Matches and alerts work without creating an account.
                </span>
              </div>
            </div>

            {/* Ingestion Tabs */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-bg border border-border text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab("presets")}
                className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "presets"
                    ? "bg-surface text-primary-600 shadow-sm font-bold border border-border"
                    : "text-ink-600 hover:text-ink-900"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>1-Click Candidate Presets</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("upload")}
                className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "upload"
                    ? "bg-surface text-primary-600 shadow-sm font-bold border border-border"
                    : "text-ink-600 hover:text-ink-900"
                }`}
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Upload CV Document</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("paste")}
                className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "paste"
                    ? "bg-surface text-primary-600 shadow-sm font-bold border border-border"
                    : "text-ink-600 hover:text-ink-900"
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Paste CV Text</span>
              </button>
            </div>

            {/* TAB 1: PRESETS */}
            {activeTab === "presets" && (
              <div className="space-y-3">
                <p className="text-xs text-ink-500 font-medium">
                  Select a pre-built Sri Lankan candidate profile to immediately test the AI matching algorithm:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CANDIDATE_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className="p-4 rounded-2xl border border-border bg-surface hover:border-primary-400 hover:shadow-md transition-all text-left flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-ink-900 group-hover:text-primary-600 transition-colors">
                            {preset.label}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-100">
                            {preset.seniority}
                          </span>
                        </div>

                        <p className="text-[11px] text-ink-500 mt-1.5 line-clamp-2 leading-relaxed">
                          {preset.summary}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between text-[11px]">
                        <div className="flex flex-wrap gap-1">
                          {preset.skills.slice(0, 3).map((s) => (
                            <span key={s} className="px-1.5 py-0.5 rounded bg-bg text-ink-600 text-[10px] border border-border">
                              {s}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center text-primary-600 font-bold group-hover:translate-x-1 transition-transform">
                          Match <ArrowRight className="h-3 w-3 ml-1" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: UPLOAD */}
            {activeTab === "upload" && (
              <div className="border-2 border-dashed border-border hover:border-primary-400 rounded-3xl p-8 text-center transition-colors bg-bg/50">
                <div className="h-12 w-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <Upload className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-bold text-ink-900">
                  {uploadedFileName ? uploadedFileName : "Upload your CV / Resume"}
                </h4>
                <p className="text-xs text-ink-500 mt-1 max-w-sm mx-auto">
                  Drag and drop your PDF, DOCX, or DOC file. Our AI will automatically parse your skills and match you with active jobs.
                </p>

                <label className="inline-block mt-4">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="sr-only"
                  />
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 text-white text-xs font-bold hover:bg-primary-700 transition-colors cursor-pointer shadow-md shadow-primary-600/20">
                    <FileText className="h-4 w-4" />
                    Browse CV File
                  </span>
                </label>
              </div>
            )}

            {/* TAB 3: PASTE */}
            {activeTab === "paste" && (
              <form onSubmit={handlePasteSubmit} className="space-y-3">
                <textarea
                  rows={6}
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  placeholder="Paste your resume summary, work experience, and skills here... (e.g. Senior Frontend Engineer with 5 years experience in React, Next.js, TypeScript, AWS, Docker)"
                  className="w-full p-3.5 rounded-2xl border border-border bg-surface text-xs text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-primary-500 transition-colors"
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={!cvText.trim()}
                    rightIcon={<Sparkles className="h-3.5 w-3.5" />}
                  >
                    Analyze & Match Jobs
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: SCANNING ANIMATION */}
        {/* ========================================================================= */}
        {step === "scanning" && (
          <div className="py-12 px-4 text-center space-y-6">
            <div className="relative inline-flex items-center justify-center">
              <div className="h-20 w-20 rounded-3xl bg-primary-50 border-2 border-primary-200 flex items-center justify-center text-primary-600 shadow-xl">
                <Sparkles className="h-9 w-9 animate-spin [animation-duration:3s]" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
              </span>
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-base font-black text-ink-900 font-heading">
                AI Match Engine in Progress...
              </h3>
              <p className="text-xs text-ink-500 leading-relaxed font-mono">
                {scanStage}
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="w-full bg-bg h-2.5 rounded-full overflow-hidden border border-border">
                <div
                  className="bg-gradient-to-r from-primary-600 via-indigo-600 to-emerald-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-ink-400 font-mono mt-1.5">
                <span>Phase: Deep Description Analysis</span>
                <span>{scanProgress}%</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: MATCH RESULTS */}
        {/* ========================================================================= */}
        {step === "results" && parsedCV && (
          <div className="space-y-5">
            {/* Notification Confirmation Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-900">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold">
                    Notification Dispatched to your Navbar Bell & Feed!
                  </p>
                  <p className="text-emerald-700 text-[11px]">
                    Identified {matchResults.filter((r) => r.score >= 75).length} strong matches. You can also configure recurring email / WhatsApp alerts.
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setStep("setup-alert")}
                className="bg-white border-emerald-300 text-emerald-800 hover:bg-emerald-100 shrink-0 text-xs"
                leftIcon={<Zap className="h-3.5 w-3.5 text-emerald-600" />}
              >
                Setup Continuous Alerts
              </Button>
            </div>

            {/* Candidate Profile Summary */}
            <div className="p-4 rounded-2xl bg-bg border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-ink-900">{parsedCV.name}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-100">
                    {parsedCV.seniority}
                  </span>
                </div>
                <p className="text-xs text-ink-500 mt-0.5">{parsedCV.title}</p>

                <div className="flex flex-wrap gap-1 mt-2.5">
                  {parsedCV.skills.slice(0, 6).map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white text-ink-700 border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                  {parsedCV.skills.length > 6 && (
                    <span className="text-[10px] text-ink-400 self-center">
                      +{parsedCV.skills.length - 6} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-semibold text-ink-500 hover:text-ink-800 flex items-center gap-1 transition-colors px-2 py-1"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Scan Another CV</span>
                </button>
              </div>
            </div>

            {/* Top Matched Jobs Stream */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              <div className="flex items-center justify-between text-xs text-ink-500 pb-1 border-b border-border">
                <span className="font-bold text-ink-900">
                  Top Ranked Vacancies ({matchResults.length} analyzed)
                </span>
                <span>Sorted by AI Compatibility</span>
              </div>

              {matchResults.slice(0, 6).map((result) => {
                const { job, score, matchLevel, matchedSkills, missingSkills, aiExplanation } = result;

                // Color badge based on score
                let scoreBg = "bg-emerald-50 text-emerald-700 border-emerald-200";
                if (score < 80 && score >= 68) {
                  scoreBg = "bg-primary-50 text-primary-700 border-primary-200";
                } else if (score < 68) {
                  scoreBg = "bg-amber-50 text-amber-700 border-amber-200";
                }

                return (
                  <div
                    key={job.id}
                    className="p-4 rounded-2xl border border-border bg-surface hover:border-primary-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar
                          src={job.company.logo}
                          alt={job.company.name}
                          size="md"
                          verified={job.company.verified}
                          className="rounded-xl shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-semibold text-ink-700 truncate">
                              {job.company.name}
                            </span>
                            {job.company.verified && (
                              <BadgeCheck className="h-3.5 w-3.5 text-primary-600 shrink-0" />
                            )}
                            <span className="font-mono text-[10px] font-bold text-primary-700 bg-primary-50 px-1.5 py-0.2 rounded border border-primary-100">
                              {job.referenceNumber}
                            </span>
                          </div>

                          <Link
                            href={`/find-jobs/${job.slug}`}
                            onClick={onClose}
                            className="text-sm font-bold text-ink-900 hover:text-primary-600 transition-colors line-clamp-1 mt-0.5"
                          >
                            {job.title}
                          </Link>
                        </div>
                      </div>

                      {/* Score Badge */}
                      <div className={`px-2.5 py-1 rounded-full border text-xs font-black shrink-0 ${scoreBg}`}>
                        {score}% Match
                      </div>
                    </div>

                    {/* AI Explanation Note */}
                    <p className="text-[11px] text-ink-600 bg-bg/80 p-2.5 rounded-xl border border-border/70 mt-2.5 leading-relaxed">
                      <strong className="text-primary-700">AI Insight:</strong> {aiExplanation}
                    </p>

                    {/* Matched & Gap Skills */}
                    <div className="mt-2.5 flex items-center justify-between text-xs flex-wrap gap-2 pt-2 border-t border-border/60">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold text-ink-400">Matched:</span>
                        {matchedSkills.slice(0, 3).map((ms) => (
                          <span
                            key={ms}
                            className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100"
                          >
                            ✓ {ms}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-ink-800">
                          {formatSalaryRange(job.minSalary, job.maxSalary, job.salaryPeriod)}
                        </span>

                        <Link
                          href={`/find-jobs/${job.slug}`}
                          onClick={onClose}
                          className="text-xs font-bold text-primary-600 hover:underline inline-flex items-center"
                        >
                          View Vacancy &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-3 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-ink-500">
                Found {matchResults.length} matching opportunities in Sri Lanka.
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="flex-1 sm:flex-initial text-xs"
                >
                  Close
                </Button>

                {onApplyAIFilter && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleApplyFiltersToPage}
                    className="flex-1 sm:flex-initial text-xs"
                    leftIcon={<Filter className="h-3.5 w-3.5" />}
                  >
                    Filter & Rank All Vacancies
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: SETUP CONTINUOUS ALERT */}
        {/* ========================================================================= */}
        {step === "setup-alert" && parsedCV && (
          <form onSubmit={handleSaveAlert} className="space-y-4">
            <div className="p-4 rounded-2xl bg-primary-50 border border-primary-200 text-xs text-primary-900">
              <div className="flex items-center gap-2 font-bold mb-1">
                <Radio className="h-4 w-4 text-primary-600 animate-pulse" />
                <span>Automated AI Match Alert Radar</span>
              </div>
              <p className="text-primary-700 leading-relaxed text-[11px]">
                Whenever a verified Sri Lankan employer posts a job matching your CV profile (<strong>{parsedCV.title}</strong>), our system will automatically dispatch a notification to you.
              </p>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-ink-800 mb-1">
                Email Notification Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={alertEmail}
                  onChange={(e) => setAlertEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-border text-xs text-ink-900 focus:outline-none focus:border-primary-500"
                />
                <Mail className="h-4 w-4 text-ink-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* WhatsApp Field */}
            <div>
              <label className="block text-xs font-bold text-ink-800 mb-1">
                WhatsApp / Mobile Alert Number (Optional)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={alertPhone}
                  onChange={(e) => setAlertPhone(e.target.value)}
                  placeholder="+94 77 123 4567"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-border text-xs text-ink-900 focus:outline-none focus:border-primary-500"
                />
                <Smartphone className="h-4 w-4 text-ink-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Threshold Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-ink-800 mb-1">
                <span>Minimum Match Score Threshold</span>
                <span className="text-primary-600 font-mono">{alertThreshold}%+ Match</span>
              </div>
              <input
                type="range"
                min="65"
                max="95"
                step="5"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(Number(e.target.value))}
                className="w-full accent-primary-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ink-400 mt-1">
                <span>65% (Broader)</span>
                <span>80% (Recommended)</span>
                <span>95% (Exact Skill Match)</span>
              </div>
            </div>

            {/* Alert Channel */}
            <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
              {[
                { id: "both", label: "Email + WhatsApp" },
                { id: "email", label: "Email Only" },
                { id: "whatsapp", label: "WhatsApp Only" },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setAlertChannel(c.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    alertChannel === c.id
                      ? "bg-primary-50 border-primary-300 text-primary-700 font-bold"
                      : "bg-surface border-border text-ink-600 hover:bg-bg"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Submit Actions */}
            <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep("results")}
                className="text-xs font-semibold text-ink-500 hover:underline"
              >
                &larr; Back to Results
              </button>

              <Button
                type="submit"
                variant="primary"
                size="sm"
                leftIcon={<Bell className="h-3.5 w-3.5" />}
              >
                Save Alert Subscription
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
