import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation, Compass, Star, CheckCircle } from "lucide-react";
import { Company } from "@/types";
import { Avatar } from "./ui/Avatar";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";

export interface CompanyCardProps {
  company: Company;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <Card hoverEffect className="relative overflow-hidden p-0 transition-card group text-left">
      {/* Cover Image */}
      <div className="relative h-24 sm:h-28 w-full bg-ink-100 overflow-hidden">
        {company.coverImage ? (
          <Image
            src={company.coverImage}
            alt={company.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-primary-600 to-indigo-700" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {company.featured && (
          <span className="absolute top-2.5 right-2.5 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/90 text-primary-600 shadow-sm backdrop-blur-sm">
            Top Employer
          </span>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 sm:p-6 pt-0 relative">
        {/* Overlapping Avatar */}
        <div className="-mt-8 mb-3 flex items-end justify-between">
          <Avatar
            src={company.logo}
            alt={company.name}
            size="lg"
            verified={company.verified}
            className="ring-4 ring-white shadow-sm"
          />
          <div className="flex items-center gap-1 text-xs font-semibold text-ink-700 bg-bg px-2 py-1 rounded-lg border border-border">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{company.rating.toFixed(1)}</span>
            <span className="text-ink-300 font-normal">({company.reviewCount})</span>
          </div>
        </div>

        {/* Name and Industry */}
        <Link href={`/company/${company.slug}`} className="block group-hover:text-primary-600 transition-colors">
          <h4 className="text-base font-bold text-ink-900 tracking-tight truncate flex items-center gap-1">
            <span>{company.name}</span>
          </h4>
        </Link>
        <p className="text-xs text-ink-500 truncate mt-0.5">{company.industry}</p>

        {/* Location & Employees */}
        <div className="mt-3 flex items-center justify-between text-xs text-ink-500 pt-3 border-t border-border">
          <div className="flex items-center gap-1">
            <Navigation className="h-3.5 w-3.5 text-primary-600" />
            <span>{company.location.city}</span>
          </div>
          <span>{company.companySize}</span>
        </div>

        {/* Vacancies CTA */}
        <div className="mt-4">
          <Link
            href={`/company/${company.slug}`}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary-50 py-2.5 text-xs font-bold text-primary-600 hover:bg-primary-600 hover:text-white transition-all shadow-sm"
          >
            <Compass className="h-3.5 w-3.5" />
            <span>{company.openVacanciesCount} Open Vacancies</span>
          </Link>
        </div>
      </div>
    </Card>
  );
};
