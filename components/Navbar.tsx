"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Menu,
  Bell,
  User,
  FileText,
  Bookmark,
  ChevronDown,
  X,
  Sparkles,
  SendHorizontal,
  LogOut,
  BadgeCheck,
} from "lucide-react";
import { Button } from "./ui/Button";
import { Drawer } from "./ui/Drawer";
import { Avatar } from "./ui/Avatar";
import { cn } from "@/lib/utils";
import { mockNotifications } from "@/lib/data/notifications";
import { getStoredNotifications } from "@/lib/ai/notificationService";
import { Notification } from "@/types";
import { useAuth } from "@/components/AuthProvider";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, isLoggedIn, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  useEffect(() => {
    setNotifications(getStoredNotifications());

    const handleNewNotif = () => {
      setNotifications(getStoredNotifications());
    };
    window.addEventListener("skillforz:notification", handleNewNotif);
    return () => window.removeEventListener("skillforz:notification", handleNewNotif);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setNotifDropdownOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Find Jobs", href: "/find-jobs" },
    { label: "Company", href: "/company" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full bg-surface/95 backdrop-blur-md transition-all duration-200 border-b border-border/80",
          isScrolled ? "shadow-md shadow-ink-900/5 py-2.5" : "py-3.5"
        )}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm shadow-primary-600/30 group-hover:scale-105 transition-transform duration-200">
            <Compass className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-xl font-black tracking-tight text-ink-900 font-heading">
                Skill<span className="text-primary-600">Forz</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-primary-50 text-primary-600 border border-primary-100">
                LK
              </span>
            </div>
            <span className="text-[10px] text-ink-500 font-medium -mt-1 hidden sm:block">
              Sri Lanka Premier Job Portal
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-150 relative",
                  isActive
                    ? "text-primary-600 font-semibold bg-primary-50/70"
                    : "text-ink-700 hover:text-primary-600 hover:bg-bg"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / User Tools */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotifDropdownOpen(!notifDropdownOpen);
                setUserDropdownOpen(false);
              }}
              className="relative p-2 rounded-xl text-ink-500 hover:text-primary-600 hover:bg-bg transition-colors"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-accent-danger ring-2 ring-surface" />
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-sm rounded-2xl border border-border bg-surface p-4 shadow-xl z-50 text-left">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <span className="text-sm font-bold text-ink-900">Notifications</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-600 font-semibold">
                    {unreadCount} New
                  </span>
                </div>
                <div className="divide-y divide-border/60 max-h-80 overflow-y-auto mt-2">
                  {notifications.slice(0, 6).map((n) => (
                    <Link
                      key={n.id}
                      href={n.link || "/find-jobs"}
                      onClick={() => setNotifDropdownOpen(false)}
                      className="py-2.5 flex items-start gap-3 hover:bg-bg/80 p-2 rounded-xl transition-colors block text-left"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary-600 mt-1.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-ink-900 line-clamp-1">{n.title}</p>
                        <p className="text-xs text-ink-500 mt-0.5 line-clamp-2 leading-relaxed">{n.message}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="pt-2 border-t border-border mt-2 text-center">
                  <Link
                    href="/seeker/applications"
                    onClick={() => setNotifDropdownOpen(false)}
                    className="text-xs font-semibold text-primary-600 hover:underline"
                  >
                    View All in Dashboard &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* AI CV Matcher Button */}
          <Link
            href="/find-jobs?aiMatch=true"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-primary-700 bg-primary-50 hover:bg-primary-100 border border-primary-200 transition-all shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary-600 animate-pulse" />
            <span>AI CV Match</span>
          </Link>

          {/* Post a Vacancy Button */}
          <Link href="/post-job">
            <Button
              variant="primary"
              size="sm"
              className="font-bold hidden sm:inline-flex items-center gap-1.5 shadow-sm"
              leftIcon={<SendHorizontal className="h-4 w-4" />}
            >
              Post a Vacancy
            </Button>
          </Link>

          {isLoggedIn && user ? (
            /* User Account Menu */
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setUserDropdownOpen(!userDropdownOpen);
                  setNotifDropdownOpen(false);
                }}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-border bg-bg hover:bg-primary-50/50 hover:border-primary-200 transition-all text-xs font-semibold text-ink-900"
              >
                <Avatar
                  src={user.avatar}
                  name={user.name}
                  size="sm"
                />
                <span className="hidden lg:inline text-ink-900 font-medium truncate max-w-[140px]">
                  {user.company || user.name.split(" ")[0]}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-ink-500" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-surface p-2 shadow-xl z-50 text-left">
                  <div className="px-3 py-2 border-b border-border mb-1">
                    <p className="text-xs font-bold text-ink-900 truncate">
                      {user.company || user.name}
                    </p>
                    <p className="text-[11px] text-ink-500 truncate">{user.email}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-accent-success bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 mt-1">
                      Verified Employer
                    </span>
                  </div>
                  <Link
                    href="/post-job"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    <SendHorizontal className="h-4 w-4 text-primary-600" />
                    <span>Post a Vacancy</span>
                  </Link>
                  <div className="border-t border-border mt-1 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-accent-danger hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Unauthenticated Employer Sign In */
            <div className="hidden sm:flex items-center space-x-2">
              <Link href="/login?redirect=/post-job">
                <Button variant="ghost" size="sm" className="text-xs font-semibold text-ink-700 hover:text-primary-600">
                  Employer Sign In
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2.5 rounded-xl text-ink-600 hover:bg-bg hover:text-ink-900 transition-colors cursor-pointer touch-manipulation focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            title={mobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </header>

    {/* Slide-in Mobile Drawer */}
    <Drawer
      isOpen={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      side="left"
      width="sm"
      title={
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-primary-600" />
          <span className="font-bold text-ink-900">SkillForz Menu</span>
        </div>
      }
    >
      <div className="flex flex-col h-full justify-between">
        <div className="space-y-1 py-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-colors",
                  isActive
                    ? "bg-primary-50 text-primary-600"
                    : "text-ink-700 hover:bg-bg hover:text-ink-900"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-border mt-4 space-y-2">
            <Link
              href="/find-jobs?aiMatch=true"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-xl border border-primary-200"
            >
              <Sparkles className="h-4 w-4 text-primary-600 animate-pulse" />
              <span>AI CV Matcher & Alerts</span>
            </Link>

            <Link
              href="/post-job"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-sm"
            >
              <SendHorizontal className="h-4 w-4" />
              Post a Vacancy
            </Link>

            {isLoggedIn && user ? (
              <>
                <p className="text-xs uppercase font-bold text-ink-500 px-4 pt-3 pb-1 tracking-wider">
                  Verified Employer ({user.company || user.name})
                </p>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-accent-danger hover:bg-red-50 rounded-xl text-left"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="pt-4 space-y-3">
                <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950">
                  <span className="font-bold flex items-center gap-1.5 text-accent-success">
                    <BadgeCheck className="h-4 w-4 shrink-0" /> Job Seekers: No Sign-In Needed
                  </span>
                  <p className="text-[11px] text-emerald-800 mt-1 leading-relaxed">
                    You can browse all vacancies and apply directly to any employer without creating an account.
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase font-bold text-ink-400 px-1 pb-1.5 tracking-wider">
                    For Companies & Recruiters
                  </p>
                  <Link href="/login?redirect=/post-job" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                    <Button variant="outline" className="w-full text-xs font-semibold">
                      Employer Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  </>
  );
};
