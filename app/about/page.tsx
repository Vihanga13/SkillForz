import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Target,
  ShieldCheck,
  Zap,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  HeartHandshake,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card } from "@/components/ui/Card";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dhanushka Wickramasinghe",
      role: "Chief Executive Officer & Co-Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Former VP of Talent at Dialog Axiata with 15+ years in South Asian human capital development.",
    },
    {
      name: "Sashini Jayawardena",
      role: "Head of Product & Experience",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Ex-WSO2 product lead passionate about candidate accessibility and modern recruitment UX.",
    },
    {
      name: "Nuwan Samarasekara",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Distributed systems engineer building hyper-scale search engines and AI matching models.",
    },
    {
      name: "Dilini Ratnayake",
      role: "Head of Corporate Partnerships",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Connecting MAS, John Keells, and top tech firms with Sri Lanka's next generation of graduates.",
    },
  ];

  const values = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary-600" />,
      title: "Integrity & Verified Trust",
      description: "Every employer is manually verified to eliminate predatory fake jobs, scams, and deceptive job ads.",
    },
    {
      icon: <Zap className="h-6 w-6 text-primary-600" />,
      title: "Radical Transparency",
      description: "We pioneer authentic LKR salary transparency, genuine reference codes, and fast application tracking.",
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-primary-600" />,
      title: "Sri Lankan Talent First",
      description: "Championing local talent on both national and international remote stages to fuel national economic prosperity.",
    },
    {
      icon: <Target className="h-6 w-6 text-primary-600" />,
      title: "Precision Matching",
      description: "Equipping candidates with skills benchmarks and employers with side-by-side screening comparison tools.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-bg text-left">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary-50 to-bg py-16 sm:py-20 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Breadcrumb items={[{ label: "About SkillForz" }]} className="justify-center mb-6" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
              Our Mission & Heritage
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-ink-900 tracking-tight mt-2 font-heading max-w-3xl mx-auto">
              Reinventing How Sri Lanka Hires & Builds Careers
            </h1>
            <p className="mt-4 text-base sm:text-lg text-ink-500 max-w-2xl mx-auto leading-relaxed">
              SkillForz is built to honor the trusted reference tradition of TopJobs.lk while delivering
              the speed, design elegance, and transparency modern Sri Lankan professionals demand.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
                The Origin Story
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 font-heading">
                Bridging Island Talent with Global Standards
              </h2>
              <p className="text-sm text-ink-700 leading-relaxed">
                For over two decades, job seekers in Sri Lanka relied on print classifieds and early digital
                bulletin boards. While functional, the hiring landscape shifted: software developers,
                fashion technologists, and corporate accountants needed instant application pipelines,
                salary benchmarks, and verified corporate perks.
              </p>
              <p className="text-sm text-ink-700 leading-relaxed">
                SkillForz was conceived by a team of Colombo-based engineers and talent leaders who
                believed Sri Lankan candidates deserved a world-class platform with sub-second page loads,
                interactive tracking steppers, and transparent communication.
              </p>
              <div className="pt-4">
                <Link href="/find-jobs">
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Explore Open Opportunities
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-border shadow-xl h-80 sm:h-96">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&h=700&q=80"
                alt="SkillForz Colombo Team Collaboration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Stats Band */}
        <section className="bg-primary-600 py-16 text-white text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold font-heading">160,000+</p>
              <p className="text-xs sm:text-sm text-primary-100 mt-1">Verified Candidates</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold font-heading">1,850+</p>
              <p className="text-xs sm:text-sm text-primary-100 mt-1">Corporate Employers</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold font-heading">12,400+</p>
              <p className="text-xs sm:text-sm text-primary-100 mt-1">Vacancies Facilitated</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold font-heading">25 Districts</p>
              <p className="text-xs sm:text-sm text-primary-100 mt-1">Island-wide Coverage</p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
              Our Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight mt-1 font-heading">
              The Values That Drive Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-border bg-surface shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 mb-4">
                  {val.icon}
                </div>
                <h3 className="font-bold text-ink-900 text-base mb-2">{val.title}</h3>
                <p className="text-xs text-ink-500 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 bg-bg border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
                Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight mt-1 font-heading">
                Meet the Team Behind SkillForz
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-surface p-5 shadow-sm overflow-hidden"
                >
                  <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 bg-ink-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-ink-900 text-base">{member.name}</h4>
                  <p className="text-xs text-primary-600 font-semibold mb-2">{member.role}</p>
                  <p className="text-xs text-ink-500 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
