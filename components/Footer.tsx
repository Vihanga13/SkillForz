"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  MessageCircle,
  Mail,
  Phone,
  Navigation,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  ExternalLink,
} from "lucide-react";
import { categories } from "@/lib/data/categories";

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-surface border-t border-border pt-16 pb-12 text-ink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
                  <Compass className="h-5 w-5" />
                </div>
                <span className="text-2xl font-black tracking-tight text-ink-900 font-heading">
                  Skill<span className="text-primary-600">Forz</span>
                </span>
              </Link>
              <p className="text-sm text-ink-500 max-w-sm leading-relaxed">
                Sri Lanka&apos;s modern recruitment ecosystem bridging ambitious talent with premier conglomerates, tech unicorns, and multinational employers across the island.
              </p>
              <div className="pt-2 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-primary-600 shrink-0" />
                  <span>Level 12, West Tower, World Trade Center, Colombo 01</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary-600 shrink-0" />
                  <span>+94 11 234 5678 / +94 77 000 1234</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary-600 shrink-0" />
                  <span>support@skillforz.lk</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-ink-900">
                Explore
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/find-jobs" className="hover:text-primary-600 transition-colors">
                    Find Vacancies (Direct Apply)
                  </Link>
                </li>
                <li>
                  <Link href="/company" className="hover:text-primary-600 transition-colors">
                    Company Directory
                  </Link>
                </li>
                <li>
                  <Link href="/post-job" className="hover:text-primary-600 transition-colors">
                    Post a Vacancy (Employers)
                  </Link>
                </li>
                <li>
                  <Link href="/login?redirect=/post-job" className="hover:text-primary-600 transition-colors">
                    Employer Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-primary-600 transition-colors">
                    Career Advice & Trends
                  </Link>
                </li>
              </ul>
            </div>

            {/* Job Categories */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-ink-900">
                Categories
              </h4>
              <ul className="space-y-2 text-sm">
                {categories.slice(0, 5).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/find-jobs?category=${cat.slug}`}
                      className="hover:text-primary-600 transition-colors flex items-center justify-between"
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-ink-300">({cat.jobCount})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Company */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-ink-900">
                Company & Trust
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-primary-600 transition-colors">
                    About SkillForz
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary-600 transition-colors">
                    Contact & Support
                  </Link>
                </li>
                <li>
                  <Link href="/about#faq" className="hover:text-primary-600 transition-colors">
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link href="/contact#privacy" className="hover:text-primary-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact#terms" className="hover:text-primary-600 transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar with Socials and Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>
              &copy; {new Date().getFullYear()} SkillForz (Pvt) Ltd. All rights reserved. Made for Sri Lanka.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-bg hover:bg-primary-50 hover:text-primary-600 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-bg hover:bg-primary-50 hover:text-primary-600 transition-colors"
                title="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-bg hover:bg-primary-50 hover:text-primary-600 transition-colors"
                title="Twitter / X"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-bg hover:bg-primary-50 hover:text-primary-600 transition-colors"
                title="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Support Button */}
      <a
        href="https://wa.me/94770001234?text=Hi%20SkillForz%2C%20I%20have%20an%20inquiry%20regarding%20job%20vacancies."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 group font-medium text-sm"
        title="Chat with WhatsApp Support"
      >
        <MessageCircle className="h-5 w-5 fill-white" />
        <span className="hidden sm:inline font-semibold">Help & Support</span>
      </a>
    </>
  );
};
