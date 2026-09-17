"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("SkillForz Runtime Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-bg text-center space-y-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-accent-danger shadow-sm">
        <AlertTriangle className="h-8 w-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <h2 className="text-2xl font-bold text-ink-900 tracking-tight font-heading">
          Something went wrong
        </h2>
        <p className="text-xs text-ink-500 leading-relaxed">
          An unexpected error occurred while loading this page. Please try again or return to the
          homepage.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="primary" size="md" onClick={() => reset()} leftIcon={<RotateCcw className="h-4 w-4" />}>
          Try Again
        </Button>
        <Link href="/">
          <Button variant="outline" size="md" leftIcon={<Home className="h-4 w-4" />}>
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
