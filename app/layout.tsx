import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillForz — Sri Lanka's Premier Modern Job Portal",
  description:
    "Discover top career opportunities across Colombo, Kandy, Galle, and Jaffna. Explore verified software, banking, apparel, and corporate vacancies in Sri Lanka.",
  keywords: [
    "Sri Lanka jobs",
    "top jobs lk",
    "vacancies in Colombo",
    "software engineer jobs Sri Lanka",
    "banking jobs Colombo",
    "MAS holdings careers",
    "Dialog careers",
    "WSO2 jobs",
  ],
  authors: [{ name: "SkillForz" }],
  openGraph: {
    title: "SkillForz — Modern Sri Lankan Job Portal",
    description: "Find verified jobs, TopJobs reference codes, and top employers in Sri Lanka.",
    url: "https://skillforz.lk",
    siteName: "SkillForz",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-bg text-ink-900 font-sans antialiased flex flex-col selection:bg-primary-100 selection:text-primary-700">
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
