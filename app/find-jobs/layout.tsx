import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Jobs in Sri Lanka | Latest Vacancies & Careers — SkillForz",
  description:
    "Explore 140+ verified job vacancies in Sri Lanka across IT, software engineering, banking, apparel manufacturing, and remote work. Search by TopJobs reference codes with zero-login direct applications.",
  keywords: [
    "Jobs in Sri Lanka",
    "Vacancies in Sri Lanka",
    "Top jobs lk",
    "Careers in Colombo",
    "Software engineer jobs Sri Lanka",
    "Banking vacancies Colombo",
    "MAS Holdings careers",
    "Dialog Axiata jobs",
    "WSO2 careers",
    "Remote jobs Sri Lanka",
    "Job portal Sri Lanka",
    "TopJobs reference search",
  ],
  openGraph: {
    title: "Find Jobs in Sri Lanka — SkillForz",
    description:
      "Explore verified Sri Lankan corporate vacancies, TopJobs reference codes, and instant AI CV matching.",
    url: "https://skillforz.lk/find-jobs",
    siteName: "SkillForz",
    locale: "en_LK",
    type: "website",
  },
  alternates: {
    canonical: "https://skillforz.lk/find-jobs",
  },
};

export default function FindJobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
