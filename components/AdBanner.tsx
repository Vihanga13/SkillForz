import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AdBannerProps {
  variant?: "leaderboard" | "sidebar" | "inline";
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  companyName?: string;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  variant = "leaderboard",
  title = "Looking to hire top software engineers & finance leaders in Sri Lanka?",
  subtitle = "Reach 120,000+ verified professionals on SkillForz. Post your first vacancy for free today.",
  ctaText = "Post Vacancy Free",
  ctaHref = "/post-job",
  companyName = "SkillForz Enterprise",
  className,
}) => {
  if (variant === "sidebar") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-800 p-6 text-white shadow-md text-left",
          className
        )}
      >
        <div className="absolute top-0 right-0 -mr-6 -mt-6 h-28 w-28 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white mb-3">
          <Sparkles className="h-3 w-3" /> Featured Partner
        </span>
        <h4 className="text-base font-bold leading-snug">{title}</h4>
        <p className="mt-2 text-xs text-primary-100 leading-relaxed">{subtitle}</p>
        <div className="mt-5">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-xl bg-surface px-4 py-2.5 text-xs font-bold text-primary-700 shadow-sm hover:bg-primary-50 transition-all hover:gap-2.5"
          >
            <span>{ctaText}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-primary-200 bg-gradient-to-r from-primary-50 via-white to-primary-50/60 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-left",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm sm:text-base font-bold text-ink-900">{title}</h4>
              <span className="text-[10px] uppercase font-bold text-primary-600 px-1.5 py-0.5 rounded bg-primary-100">
                PROMO
              </span>
            </div>
            <p className="text-xs text-ink-500 mt-0.5">{subtitle}</p>
          </div>
        </div>
        <Link
          href={ctaHref}
          className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors"
        >
          <span>{ctaText}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  // Leaderboard default variant (large banner)
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-primary-200 bg-gradient-to-r from-primary-600 via-primary-700 to-indigo-900 p-8 text-white shadow-lg text-left",
        className
      )}
    >
      <div className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
              Employer Spotlight
            </span>
            <span className="text-xs text-primary-200">&bull; {companyName}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{title}</h3>
          <p className="mt-2 text-sm text-primary-100 max-w-xl leading-relaxed">{subtitle}</p>
        </div>
        <div className="shrink-0">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2.5 rounded-xl bg-surface px-6 py-3.5 text-sm font-bold text-primary-600 shadow-md hover:bg-primary-50 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <span>{ctaText}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
