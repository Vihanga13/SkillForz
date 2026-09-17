"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  LayoutDashboard,
  User,
  FileCheck2,
  Bookmark,
  Bell,
  Home,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Drawer } from "@/components/ui/Drawer";
import { mockJobSeeker } from "@/lib/data/mockUsers";
import { cn } from "@/lib/utils";

export default function SeekerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/seeker", icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: "My Profile", href: "/seeker/profile", icon: <User className="h-4 w-4" /> },
    {
      label: "Applications",
      href: "/seeker/applications",
      icon: <FileCheck2 className="h-4 w-4" />,
      badge: "5",
    },
    { label: "Saved Jobs", href: "/seeker/saved", icon: <Bookmark className="h-4 w-4" /> },
    { label: "Job Alerts", href: "/seeker/alerts", icon: <Bell className="h-4 w-4" /> },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-5 text-left">
      <div className="space-y-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
            <Briefcase className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-ink-900 font-heading">
              Skill<span className="text-primary-600">Forz</span>
            </span>
            <span className="text-[10px] text-primary-600 font-bold -mt-1 uppercase tracking-wider">
              Seeker Portal
            </span>
          </div>
        </Link>

        {/* User Mini Profile */}
        <div className="p-3.5 rounded-2xl bg-bg border border-border flex items-center gap-3">
          <Avatar src={mockJobSeeker.avatar} name={mockJobSeeker.fullName} size="md" />
          <div className="truncate">
            <p className="text-xs font-bold text-ink-900 truncate">{mockJobSeeker.fullName}</p>
            <p className="text-[11px] text-ink-500 truncate">{mockJobSeeker.headline}</p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors",
                  isActive
                    ? "bg-primary-600 text-white shadow-sm"
                    : "text-ink-700 hover:bg-bg hover:text-primary-600"
                )}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-bold",
                      isActive ? "bg-white/20 text-white" : "bg-primary-100 text-primary-700"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Shortcuts */}
      <div className="space-y-2 pt-6 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-ink-700 hover:text-primary-600 hover:bg-bg rounded-xl transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>Back to Home Site</span>
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-accent-danger hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-bg text-ink-900">
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-surface border-r border-border shrink-0 fixed inset-y-0 z-30">
        {sidebarContent}
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        {/* Mobile Header Bar */}
        <header className="md:hidden sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-surface border-b border-border shadow-sm">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
              <Briefcase className="h-4 w-4" />
            </div>
            <span className="font-bold text-ink-900 text-sm">SkillForz Seeker</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="p-2 rounded-lg text-ink-500 hover:bg-bg"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        {/* Page Children */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-6xl w-full mx-auto">{children}</main>
      </div>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        side="left"
        width="sm"
      >
        {sidebarContent}
      </Drawer>
    </div>
  );
}
