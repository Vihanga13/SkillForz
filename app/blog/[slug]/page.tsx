"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowLeft, Share2, Tag, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Avatar } from "@/components/ui/Avatar";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { blogPosts } from "@/lib/data/blogs";
import { useToast } from "@/components/ui/Toast";

export default function BlogPostDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts.find((b) => b.slug === slug);
  const { success } = useToast();

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900">Article Not Found</h2>
          <p className="text-ink-500 mt-2">The career article you requested does not exist.</p>
          <Link href="/blog" className="mt-6">
            <Button variant="primary">Return to Career Blog</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((b) => b.id !== post.id).slice(0, 3);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      success("Link Copied", "Article URL copied to clipboard.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-bg py-8 text-left">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "Blog", href: "/blog" },
                { label: post.category, href: "/blog" },
                { label: post.title },
              ]}
            />
          </div>

          {/* Article Header */}
          <header className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-full font-bold uppercase tracking-wider bg-primary-50 text-primary-600 border border-primary-100">
                {post.category}
              </span>
              <span className="text-ink-500 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTimeMinutes} min read
              </span>
              <span className="text-ink-500">&bull;</span>
              <span className="text-ink-500 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.publishedAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-ink-900 tracking-tight leading-tight font-heading">
              {post.title}
            </h1>

            {/* Author Box + Share */}
            <div className="pt-4 border-t border-border flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <Avatar src={post.author.avatar} name={post.author.name} size="md" />
                <div>
                  <p className="text-sm font-bold text-ink-900">{post.author.name}</p>
                  <p className="text-xs text-ink-500">{post.author.role}</p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                leftIcon={<Share2 className="h-4 w-4" />}
              >
                Share Article
              </Button>
            </div>
          </header>

          {/* Hero Cover Image */}
          <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden mb-10 shadow-md bg-ink-100">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Article Body */}
          <article className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-ink-900 prose-p:text-ink-700 prose-p:leading-relaxed prose-li:text-ink-700 text-sm sm:text-base space-y-6">
            <div className="whitespace-pre-line leading-relaxed text-ink-700 font-sans">
              {post.content}
            </div>
          </article>

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-border flex items-center gap-2 flex-wrap">
            <Tag className="h-4 w-4 text-ink-500" />
            <span className="text-xs font-bold text-ink-500 uppercase mr-1">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 rounded-lg bg-surface text-ink-700 border border-border"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-10 border-t border-border">
            <h3 className="text-xl font-bold text-ink-900 mb-6">Related Career Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  href={`/blog/${rPost.slug}`}
                  className="rounded-xl border border-border bg-surface p-4 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-primary-600 uppercase tracking-wider">
                      {rPost.category}
                    </span>
                    <h4 className="text-sm font-bold text-ink-900 mt-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {rPost.title}
                    </h4>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-ink-500 pt-2 border-t border-border/60">
                    <span>{rPost.readingTimeMinutes} min read</span>
                    <span className="font-semibold text-primary-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Read &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
