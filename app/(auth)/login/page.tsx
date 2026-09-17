"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Briefcase,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  Building2,
  User,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/components/AuthProvider";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/post-job";
  const isPostJobRedirect = redirectUrl.includes("post-job");

  const { success } = useToast();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const isEmployer = true;

      login(
        email,
        email.includes("dialog") ? "Dialog Talent Acquisition" : "Recruitment Manager",
        email.includes("dialog") ? "Dialog Axiata PLC" : "Corporate Employer"
      );

      success(
        "Logged In Successfully",
        "Redirecting to Vacancy Posting Creator..."
      );
      router.push(redirectUrl);
    }, 800);
  };

  const fillCandidateDemo = () => {
    setEmail("sachithra.w@gmail.com");
    setPassword("Password123!");
    setErrors({});
  };

  const fillHiringDemo = () => {
    setEmail("talent@dialog.lk");
    setPassword("DialogRecruiter2024!");
    setErrors({});
  };

  return (
    <div className="max-w-md w-full mx-auto my-8">
      {/* Notice for Job Seekers */}
      <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left flex items-start gap-3 shadow-sm">
        <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
          <BadgeCheck className="h-4 w-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-emerald-950">
            Looking for a Job? Zero Sign-In Required!
          </h4>
          <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
            Job seekers do not need an account. You can freely browse and apply directly to all vacancies.
          </p>
          <Link
            href="/find-jobs"
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline mt-1.5"
          >
            Browse Open Vacancies & Apply Directly &rarr;
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight font-heading">
          Employer & Corporate Sign In
        </h1>
        <p className="text-sm text-ink-500 mt-1.5">
          Employers and hiring managers must be signed in to publish verified vacancies on SkillForz.
        </p>
      </div>

      {/* Contextual Notice for Job Posting */}
      {isPostJobRedirect && (
        <div className="mb-6 p-4 rounded-2xl bg-primary-50 border border-primary-200 text-left flex items-start gap-3 shadow-sm">
          <div className="p-2 rounded-xl bg-primary-600 text-white shrink-0 mt-0.5">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-ink-900">
              Verified Hiring Security
            </h4>
            <p className="text-xs text-ink-600 mt-0.5 leading-relaxed">
              To protect Sri Lankan candidates against fake jobs and unauthorized fees, all vacancies require an authenticated account.
            </p>
          </div>
        </div>
      )}

      {/* Quick Demo Pre-fill Toolbar */}
      <div className="mb-6 p-3 rounded-xl bg-bg border border-border">
        <span className="text-[11px] font-bold text-ink-500 uppercase tracking-wider block mb-2">
          One-Click Demo Logins:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={fillHiringDemo}
            className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-all flex items-center gap-1.5 ${
              isPostJobRedirect
                ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                : "bg-surface hover:bg-primary-50 text-ink-700 border-border"
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            Hiring Manager Demo (Dialog)
          </button>
          <button
            type="button"
            onClick={fillCandidateDemo}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-surface hover:bg-primary-50 text-ink-700 border border-border font-medium transition-colors flex items-center gap-1.5"
          >
            <User className="h-3.5 w-3.5" />
            Candidate Demo (Sachithra)
          </button>
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          leftIcon={<Mail className="h-4 w-4" />}
          required
        />

        <div className="space-y-1">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-ink-500 hover:text-ink-900"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            required
          />
          <div className="text-right pt-1">
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-primary-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={isLoading}
        >
          {isPostJobRedirect ? "Sign In & Continue to Post Vacancy" : "Sign In to Account"}
        </Button>
      </form>

      <p className="text-center text-xs text-ink-500 mt-6">
        Don&apos;t have an account yet?{" "}
        <Link
          href={isPostJobRedirect ? `/register?redirect=${encodeURIComponent(redirectUrl)}` : "/register"}
          className="font-bold text-primary-600 hover:underline"
        >
          Create a free account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-surface text-left">
      {/* Left Form Column */}
      <div className="flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        <div>
          {/* Brand */}
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-ink-900 font-heading">
              Skill<span className="text-primary-600">Forz</span>
            </span>
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="max-w-md w-full mx-auto my-12 text-center text-ink-500 text-sm">
              Loading authentication...
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        <div className="text-xs text-ink-300 text-center sm:text-left">
          &copy; {new Date().getFullYear()} SkillForz Sri Lanka. Secure SSL encrypted login.
        </div>
      </div>

      {/* Right Illustrative Blue Panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" /> Sri Lanka&apos;s Talent Engine
          </span>
          <span className="text-xs text-primary-200">12,400+ Verified Jobs</span>
        </div>

        <div className="relative z-10 max-w-lg space-y-6 my-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading leading-tight">
            Publish Verified Vacancies & Hire Top Sri Lankan Talent
          </h2>
          <p className="text-sm text-primary-100 leading-relaxed">
            Reach 160,000+ verified professionals across Colombo, Kandy, Galle, and Jaffna.
            Instant reference code allocation and direct applicant tracking.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-300 shrink-0" />
              <span className="text-xs font-medium">Free instant publishing with verified reference numbers</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-300 shrink-0" />
              <span className="text-xs font-medium">Real-time candidate email and resume routing</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-300 shrink-0" />
              <span className="text-xs font-medium">Anti-fraud protection & TopJobs verified partner status</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-white/20 flex items-center justify-between text-xs text-primary-200">
          <span>Trusted by 1,850+ enterprises across Colombo</span>
          <span>Ranked #1 for candidate satisfaction</span>
        </div>
      </div>
    </div>
  );
}
