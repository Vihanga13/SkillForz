"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Avatar } from "@/components/ui/Avatar";
import { blogPosts } from "@/lib/data/blogs";

export default function BlogDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    blogPosts.forEach((b) => set.add(b.category));
    return Array.from(set);
  }, []);

  const featuredPost = blogPosts[0];

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") return blogPosts;
    return blogPosts.filter((b) => b.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-bg py-8 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb items={[{ label: "Career Advice & Blog" }]} />
          </div>

          <div className="text-left mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
              Insights & Advice
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-ink-900 tracking-tight mt-1 font-heading">
              Sri Lankan Tech, Salaries & Career Growth
            </h1>
            <p className="text-sm text-ink-500 mt-2 max-w-2xl leading-relaxed">
              Actionable guides on salary negotiation in LKR, technical interview preparation, and
              market trends across Colombo&apos;s corporate landscape.
            </p>
          </div>

          {/* Featured Post Hero */}
          {featuredPost && (
            <div className="mb-12 rounded-3xl border border-border bg-surface overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 sm:h-80 lg:h-full w-full bg-ink-100 overflow-hidden">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary-600 text-white shadow-sm">
                    Featured Insight
                  </span>
                </div>

                <div className="p-6 sm:p-10 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-ink-500">
                      <span className="font-semibold text-primary-600">{featuredPost.category}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {featuredPost.readingTimeMinutes} min read
                      </span>
                    </div>

                    <Link href={`/blog/${featuredPost.slug}`} className="block group-hover:text-primary-600 transition-colors">
                      <h2 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight leading-snug">
                        {featuredPost.title}
                      </h2>
                    </Link>

                    <p className="text-sm text-ink-500 leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={featuredPost.author.avatar}
                        name={featuredPost.author.name}
                        size="md"
                      />
                      <div>
                        <p className="text-xs font-bold text-ink-900">{featuredPost.author.name}</p>
                        <p className="text-[11px] text-ink-500">{featuredPost.author.role}</p>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-700"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-primary-600 text-white shadow-sm"
                  : "bg-surface text-ink-700 hover:bg-primary-50 border border-border"
              }`}
            >
              All Articles ({blogPosts.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-primary-600 text-white shadow-sm"
                    : "bg-surface text-ink-700 hover:bg-primary-50 border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full bg-ink-100 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 text-primary-700 backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-ink-500">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{post.readingTimeMinutes} min read</span>
                      <span>&bull;</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="block group-hover:text-primary-600 transition-colors">
                      <h3 className="text-base font-bold text-ink-900 tracking-tight line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-ink-500 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-border/60 mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 pt-3">
                    <Avatar src={post.author.avatar} name={post.author.name} size="sm" />
                    <span className="text-xs font-semibold text-ink-700">{post.author.name}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="pt-3 text-xs font-bold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
