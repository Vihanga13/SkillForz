"use client";

import React, { useState, useMemo } from "react";
import { Search, Building2, MapPin, CheckCircle, SlidersHorizontal } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CompanyCard } from "@/components/CompanyCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { EmptyState } from "@/components/ui/EmptyState";
import { companies } from "@/lib/data/companies";

export default function CompanyDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");

  const industries = useMemo(() => {
    const set = new Set<string>();
    companies.forEach((c) => set.add(c.industry));
    return Array.from(set);
  }, []);

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesCity = c.location.city.toLowerCase().includes(q);
        const matchesDesc = c.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCity && !matchesDesc) return false;
      }
      if (selectedIndustry !== "all" && c.industry !== selectedIndustry) {
        return false;
      }
      return true;
    });
  }, [searchQuery, selectedIndustry]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-bg py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-4">
            <Breadcrumb items={[{ label: "Companies" }]} />
          </div>

          {/* Header Banner */}
          <div className="text-left mb-8">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-ink-900 tracking-tight font-heading">
              Top Employers & Conglomerates in Sri Lanka
            </h1>
            <p className="text-sm text-ink-500 mt-2 max-w-2xl leading-relaxed">
              Explore leading multinational tech companies, apparel conglomerates, and financial
              institutions hiring in Colombo and across the island.
            </p>
          </div>

          {/* Search & Industry Filter Bar */}
          <div className="bg-surface rounded-2xl border border-border p-4 shadow-sm mb-8 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-bg border border-border focus-within:border-primary-600 focus-within:bg-white transition-all">
              <Search className="h-4 w-4 text-ink-500 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search companies by name, location, or keyword (e.g. MAS, Dialog)..."
                className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-500/70 focus:outline-none"
              />
            </div>

            <div className="w-full sm:w-64">
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-primary-600 cursor-pointer shadow-sm"
              >
                <option value="all">All Industries ({companies.length})</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Company Grid */}
          {filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Companies Found"
              description="No employers match your search keyword or selected industry filter."
              actionLabel="Clear Search"
              onAction={() => {
                setSearchQuery("");
                setSelectedIndustry("all");
              }}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
