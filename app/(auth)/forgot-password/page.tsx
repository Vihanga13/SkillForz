"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Compass, Mail, ArrowLeft, CheckCircle2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

export default function ForgotPasswordPage() {
  const { success } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      success("Reset Link Sent", "Check your inbox for instructions to reset your password.");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 sm:p-12 bg-bg text-left">
      <div>
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
            <Compass className="h-5 w-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-ink-900 font-heading">
            Skill<span className="text-primary-600">Forz</span>
          </span>
        </Link>
      </div>

      <div className="max-w-md w-full mx-auto my-12 rounded-3xl border border-border bg-surface p-8 shadow-xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 mb-6">
          <KeyRound className="h-6 w-6" />
        </div>

        {isSubmitted ? (
          <div className="space-y-4 text-center">
            <div className="h-14 w-14 rounded-full bg-emerald-50 text-accent-success flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold text-ink-900 font-heading">Reset Link Sent</h2>
            <p className="text-xs text-ink-500 leading-relaxed">
              We&apos;ve sent password reset instructions to <strong className="text-ink-900">{email}</strong>.
              Please check your spam or promotions folder if you don&apos;t see it shortly.
            </p>
            <div className="pt-4">
              <Link href="/login" className="block w-full">
                <Button variant="primary" className="w-full">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-ink-900 tracking-tight font-heading">
              Forgot Your Password?
            </h1>
            <p className="text-xs text-ink-500 mt-1.5 leading-relaxed">
              Enter your registered email address and we&apos;ll send you a link to reset your
              credentials securely.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Input
                label="Registered Email Address"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
                leftIcon={<Mail className="h-4 w-4" />}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Send Reset Link
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-border text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </>
        )}
      </div>

      <div className="text-xs text-ink-300 text-center">
        &copy; {new Date().getFullYear()} SkillForz Sri Lanka.
      </div>
    </div>
  );
}
