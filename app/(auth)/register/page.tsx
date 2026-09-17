"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Briefcase,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Inbox,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/components/AuthProvider";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/seeker";
  const isPostJobRedirect = redirectUrl.includes("post-job");

  const { success } = useToast();
  const { login } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isHiring, setIsHiring] = useState(isPostJobRedirect);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVerificationNotice, setIsVerificationNotice] = useState(false);

  // Password strength meter calculation
  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score; // 0 to 4
  };

  const strengthScore = getPasswordStrength(password);
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = [
    "bg-red-400",
    "bg-orange-400",
    "bg-amber-400",
    "bg-blue-500",
    "bg-emerald-500",
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full name is required";
    if (isHiring && !companyName.trim()) {
      errs.companyName = "Company or entity name is required";
    }
    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!password) {
      errs.password = "Password is required";
    } else if (password.length < 8) {
      errs.password = "Password must be at least 8 characters";
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }
    if (!agreeTerms) {
      errs.agreeTerms = "You must agree to the Terms of Service";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login(email, fullName, isHiring ? companyName : undefined);
      setIsVerificationNotice(true);
      success(
        "Account Created",
        "Your account has been registered successfully. Welcome to SkillForz!"
      );
    }, 1000);
  };

  return (
    <div className="max-w-md w-full mx-auto my-8">
      {/* Email Verification Notice Screen */}
      {isVerificationNotice ? (
        <div className="rounded-2xl border border-border bg-bg/50 p-8 text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto">
            <Inbox className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-ink-900 font-heading">
            Account Ready
          </h2>
          <p className="text-sm text-ink-500 max-w-sm mx-auto leading-relaxed">
            Welcome aboard, <strong className="text-ink-900">{fullName}</strong>! We&apos;ve registered your account under{" "}
            <strong className="text-ink-900">{email}</strong>.
          </p>

          <div className="pt-4 space-y-2">
            <Button
              variant="primary"
              className="w-full"
              onClick={() => router.push(redirectUrl)}
            >
              {isPostJobRedirect
                ? "Continue to Post Vacancy &rarr;"
                : "Continue to Portal &rarr;"}
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Notice for Job Seekers */}
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left flex items-start gap-3 shadow-sm">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
              <BadgeCheck className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-950">
                Job Seekers: No Registration Needed!
              </h4>
              <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
                You can freely browse all vacancies and apply directly to any employer without creating an account.
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
              Register Employer / Company Account
            </h1>
            <p className="text-sm text-ink-500 mt-1.5">
              Create your corporate profile to publish and manage verified job vacancies on SkillForz.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="e.g. Sachithra Weerasinghe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={errors.fullName}
              required
            />

            {/* Optional Hiring Checkbox */}
            <div className="p-3 rounded-xl bg-bg border border-border">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-ink-800">
                <input
                  type="checkbox"
                  checked={isHiring}
                  onChange={(e) => setIsHiring(e.target.checked)}
                  className="rounded border-border text-primary-600 focus:ring-primary-500 h-4 w-4"
                />
                <span>I am posting jobs on behalf of a company or hiring agency</span>
              </label>

              {isHiring && (
                <div className="mt-3 pt-3 border-t border-border">
                  <Input
                    label="Company Name"
                    placeholder="e.g. Dialog Axiata PLC, MAS Holdings"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    error={errors.companyName}
                    required
                  />
                </div>
              )}
            </div>

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

            <Input
              label="Mobile Number (Optional)"
              type="tel"
              placeholder="+94 77 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              leftIcon={<Phone className="h-4 w-4" />}
            />

            <div className="space-y-1.5">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
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

              {password && (
                <div className="space-y-1 pt-1">
                  <div className="flex gap-1 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    {[0, 1, 2, 3].map((idx) => (
                      <div
                        key={idx}
                        className={`flex-1 transition-all ${
                          strengthScore > idx ? strengthColors[strengthScore] : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[11px] text-ink-500">
                    <span>Password Strength</span>
                    <span className="font-semibold">{strengthLabels[strengthScore]}</span>
                  </div>
                </div>
              )}
            </div>

            <Input
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              leftIcon={<Lock className="h-4 w-4" />}
              required
            />

            <div className="pt-2">
              <label className="flex items-start gap-2 text-xs text-ink-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded border-border text-primary-600 focus:ring-primary-500 mt-0.5"
                />
                <span>
                  I agree to the{" "}
                  <Link href="/about" className="text-primary-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/about" className="text-primary-600 hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-xs text-accent-danger mt-1">{errors.agreeTerms}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
            >
              {isPostJobRedirect ? "Create Account & Post Vacancy" : "Create Free Account"}
            </Button>
          </form>

          <p className="text-center text-xs text-ink-500 mt-6">
            Already have an account?{" "}
            <Link
              href={
                isPostJobRedirect
                  ? `/login?redirect=${encodeURIComponent(redirectUrl)}`
                  : "/login"
              }
              className="font-bold text-primary-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </>
      )}
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-surface text-left">
      {/* Left Form Column */}
      <div className="flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        <div>
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
              Loading registration...
            </div>
          }
        >
          <RegisterForm />
        </Suspense>

        <div className="text-xs text-ink-300 text-center sm:text-left">
          &copy; {new Date().getFullYear()} SkillForz Sri Lanka. All rights reserved.
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
            Connect with Sri Lanka&apos;s Best Opportunities & Employers
          </h2>
          <p className="text-sm text-primary-100 leading-relaxed">
            Whether you are looking for your next career move or looking to hire elite talent in
            Colombo, Kandy, or Galle, SkillForz provides instant verified access.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-300 shrink-0" />
              <span className="text-xs font-medium">Over 20+ verified enterprise companies</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-300 shrink-0" />
              <span className="text-xs font-medium">Transparent LKR salary ranges and benefits</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-300 shrink-0" />
              <span className="text-xs font-medium">Direct resume submission with zero middleman fees</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-white/20 flex items-center justify-between text-xs text-primary-200">
          <span>Trusted by leading IT & Finance firms</span>
          <span>Fast 2-minute registration</span>
        </div>
      </div>
    </div>
  );
}
