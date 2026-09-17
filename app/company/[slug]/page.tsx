"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Globe,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Briefcase,
  Users,
  Calendar,
  Star,
  ExternalLink,
  Linkedin,
  Facebook,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Avatar } from "@/components/ui/Avatar";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { JobCard } from "@/components/JobCard";
import { companies } from "@/lib/data/companies";
import { jobs } from "@/lib/data/jobs";

export default function CompanyProfilePage() {
  const params = useParams();
  const slug = params.slug as string;
  const company = companies.find((c) => c.slug === slug);

  if (!company) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900">Company Not Found</h2>
          <p className="text-ink-500 mt-2">
            The company profile you are searching for does not exist in our directory.
          </p>
          <Link href="/company" className="mt-6">
            <Button variant="primary">Browse Company Directory</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const companyJobs = jobs.filter((j) => j.companyId === company.id);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-bg pb-16">
        {/* Cover Banner */}
        <div className="relative h-60 sm:h-80 w-full bg-ink-900 overflow-hidden">
          {company.coverImage ? (
            <Image
              src={company.coverImage}
              alt={company.name}
              fill
              priority
              className="object-cover opacity-80"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-primary-700 to-indigo-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 relative z-10 text-left">
          {/* Header Card */}
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-6 border-b border-border">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                <Avatar
                  src={company.logo}
                  alt={company.name}
                  size="xl"
                  verified={company.verified}
                  className="h-24 w-24 sm:h-28 sm:w-28 text-2xl ring-4 ring-surface shadow-lg"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight font-heading">
                      {company.name}
                    </h1>
                    {company.verified && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-50 text-primary-600 border border-primary-100">
                        <CheckCircle className="h-3 w-3 fill-primary-600 text-white" />
                        Verified Employer
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-primary-600">{company.tagline}</p>
                  <p className="text-xs text-ink-500">{company.industry}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial"
                >
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full"
                    rightIcon={<ExternalLink className="h-3.5 w-3.5" />}
                  >
                    Visit Website
                  </Button>
                </a>
                <a href={`mailto:${company.email}`} className="flex-1 sm:flex-initial">
                  <Button variant="primary" size="md" className="w-full" leftIcon={<Mail className="h-4 w-4" />}>
                    Contact HR
                  </Button>
                </a>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-sm text-ink-700">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-ink-500">Live Vacancies</span>
                  <p className="font-bold text-ink-900">{companyJobs.length} Openings</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-ink-500">Company Size</span>
                  <p className="font-bold text-ink-900">{company.companySize}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-ink-500">Founded Year</span>
                  <p className="font-bold text-ink-900">{company.foundedYear}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <span className="text-xs text-ink-500">Employee Rating</span>
                  <p className="font-bold text-ink-900">
                    {company.rating.toFixed(1)} / 5.0 ({company.reviewCount})
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TWO COLUMN CONTENT: Left Details + Right Live Vacancies */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Rail: Company Info & Perks */}
            <div className="space-y-6">
              {/* About Box */}
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-ink-900 text-base">About {company.name}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{company.description}</p>
              </div>

              {/* Office & Contact Info */}
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-3 text-sm">
                <h3 className="font-bold text-ink-900 text-base mb-2">Office & Contact Details</h3>
                <div className="flex items-start gap-2.5 text-ink-700">
                  <MapPin className="h-4 w-4 text-primary-600 shrink-0 mt-0.5" />
                  <span>{company.location.address}</span>
                </div>
                <div className="flex items-center gap-2.5 text-ink-700">
                  <Globe className="h-4 w-4 text-primary-600 shrink-0" />
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary-600 truncate"
                  >
                    {company.website}
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-ink-700">
                  <Mail className="h-4 w-4 text-primary-600 shrink-0" />
                  <span>{company.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-ink-700">
                  <Phone className="h-4 w-4 text-primary-600 shrink-0" />
                  <span>{company.phone}</span>
                </div>
              </div>

              {/* Employee Perks */}
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-3">
                <h3 className="font-bold text-ink-900 text-base">Perks & Benefits</h3>
                <ul className="space-y-2 text-xs text-ink-700">
                  {company.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent-success shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Live Vacancies List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between pb-2">
                <h3 className="text-xl font-bold text-ink-900">
                  Live Vacancies at {company.name} ({companyJobs.length})
                </h3>
              </div>

              {companyJobs.length > 0 ? (
                <div className="space-y-4">
                  {companyJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
                  <Briefcase className="h-10 w-10 text-ink-300 mx-auto mb-3" />
                  <h4 className="font-bold text-ink-900">No Active Vacancies Right Now</h4>
                  <p className="text-xs text-ink-500 mt-1">
                    {company.name} is not currently hiring for open public roles. Check back soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
