"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { useToast } from "@/components/ui/Toast";

export default function ContactPage() {
  const { success } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      success("Message Sent", "Thank you for contacting SkillForz. We will reply within 24 hours.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1000);
  };

  const faqItems = [
    {
      id: "faq-1",
      title: "How do I find a job using a TopJobs-style reference number?",
      content:
        "On the homepage or Find Jobs page, simply switch to 'Search by Reference No.' and enter the code (e.g. REF-MAS-2024-089). You will be navigated directly to that specific vacancy.",
    },
    {
      id: "faq-2",
      title: "Are all employer vacancies on SkillForz verified?",
      content:
        "Yes. We conduct strict verification of corporate registration documents and official company email domains before approving any employer account or public job posting.",
    },
    {
      id: "faq-3",
      title: "Is it free for job seekers to apply for vacancies?",
      content:
        "SkillForz is 100% free for all candidates. You can build your profile, upload your resume, and submit unlimited applications without any fees.",
    },
    {
      id: "faq-4",
      title: "How do employers post vacancies on SkillForz?",
      content:
        "Employers can register for a corporate account, switch to the Employer Dashboard, and use our guided multi-step form to post vacancies with live preview and candidate tracking.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-bg py-8 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb items={[{ label: "Contact Us" }]} />
          </div>

          <div className="text-left mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
              Get In Touch
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-ink-900 tracking-tight mt-1 font-heading">
              We&apos;re Here to Help Your Hiring & Career Growth
            </h1>
            <p className="text-sm text-ink-500 mt-2 max-w-2xl leading-relaxed">
              Have questions about listing vacancies, candidate matching, or enterprise partnerships?
              Reach out to our Colombo headquarters.
            </p>
          </div>

          {/* TWO COLUMN: Contact Form + Office Details & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Form Column */}
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-ink-900 mb-2">Send Us a Message</h2>
              <p className="text-xs text-ink-500 mb-6">
                Our support desk operates Monday through Friday, 8:30 AM to 5:30 PM (Sri Lanka time).
              </p>

              {isSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-accent-success">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <p className="text-xs font-semibold">
                    Thank you! Your message has been received. A support specialist will respond shortly.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    placeholder="e.g. Kasun Fernando"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="kasun@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Input
                  label="Subject"
                  placeholder="e.g. Employer Listing Inquiry / Candidate Support"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />

                <Textarea
                  label="Message"
                  placeholder="How can our team assist you today?..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                  isLoading={isSubmitting}
                  rightIcon={<Send className="h-4 w-4" />}
                >
                  Send Inquiry
                </Button>
              </form>
            </div>

            {/* Office Details & Map Placeholder */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-ink-900">Colombo Operations Center</h2>

                <div className="space-y-4 text-sm text-ink-700">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-ink-900">Head Office Location</p>
                      <p className="text-xs text-ink-500 mt-0.5">
                        Level 12, West Tower, World Trade Center, Echelon Square, Colombo 01, Sri Lanka
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-ink-900">Direct Telephone</p>
                      <p className="text-xs text-ink-500 mt-0.5">+94 11 234 5678 / +94 77 000 1234</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-ink-900">General Support Email</p>
                      <p className="text-xs text-ink-500 mt-0.5">support@skillforz.lk / careers@skillforz.lk</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-ink-900">Support Hours</p>
                      <p className="text-xs text-ink-500 mt-0.5">
                        Monday – Friday: 8:30 AM – 5:30 PM (Closed on Mercantile Holidays)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embedded Map Graphic Card */}
              <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm overflow-hidden text-center relative h-56 flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 via-slate-50 to-primary-100/50">
                <div className="absolute inset-0 bg-grid-pattern opacity-60" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-md mb-2">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-ink-900 text-sm">World Trade Center, Colombo</h4>
                  <p className="text-xs text-ink-500 mt-0.5">6°56&apos;04.2&quot;N 79°50&apos;37.8&quot;E</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary-600 hover:underline"
                  >
                    Open in Google Maps &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion Section */}
          <div className="pt-8 border-t border-border" id="faq">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
                Got Questions?
              </span>
              <h2 className="text-2xl font-bold text-ink-900 tracking-tight mt-1 font-heading">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="max-w-4xl">
              <Accordion items={faqItems} defaultExpandedIds={["faq-1"]} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
