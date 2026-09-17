import React from "react";
import Link from "next/link";
import { Compass, ArrowLeft, ScanSearch } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-bg text-center space-y-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-50 text-primary-600 shadow-md">
        <Compass className="h-10 w-10" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="font-mono text-xs font-bold text-primary-600 uppercase tracking-widest bg-primary-100/70 px-3 py-1 rounded-full">
          404 Error
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-ink-900 tracking-tight font-heading">
          Page Not Found
        </h1>
        <p className="text-sm text-ink-500 leading-relaxed">
          The page or vacancy listing you are looking for may have been moved, expired, or deleted.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/">
          <Button variant="primary" size="md" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Back to Home
          </Button>
        </Link>
        <Link href="/find-jobs">
          <Button variant="outline" size="md" leftIcon={<ScanSearch className="h-4 w-4" />}>
            Find Vacancies
          </Button>
        </Link>
      </div>
    </div>
  );
}
