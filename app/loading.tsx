import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 shadow-sm animate-pulse">
        <Loader2 className="h-7 w-7 animate-spin text-primary-600" />
      </div>
      <p className="text-sm font-semibold text-ink-500">Loading SkillForz...</p>
    </div>
  );
}
