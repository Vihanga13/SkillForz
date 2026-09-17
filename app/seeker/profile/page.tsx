"use client";

import React, { useState } from "react";
import {
  User,
  GraduationCap,
  Briefcase,
  Award,
  Languages,
  FolderGit2,
  FileText,
  Upload,
  Download,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Camera,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { FileUpload } from "@/components/ui/FileUpload";
import { Avatar } from "@/components/ui/Avatar";
import { useToast } from "@/components/ui/Toast";
import { mockJobSeeker } from "@/lib/data/mockUsers";
import {
  EducationItem,
  ExperienceItem,
  SkillItem,
  CertificateItem,
  LanguageItem,
  ProjectItem,
} from "@/types";

export default function SeekerProfileEditorPage() {
  const { success } = useToast();

  // Profile Form States
  const [fullName, setFullName] = useState(mockJobSeeker.fullName);
  const [headline, setHeadline] = useState(mockJobSeeker.headline);
  const [summary, setSummary] = useState(mockJobSeeker.summary);
  const [city, setCity] = useState(mockJobSeeker.location.city);
  const [phone, setPhone] = useState(mockJobSeeker.phone);
  const [email, setEmail] = useState(mockJobSeeker.email);

  // Repeatable sections
  const [education, setEducation] = useState<EducationItem[]>(mockJobSeeker.education);
  const [experience, setExperience] = useState<ExperienceItem[]>(mockJobSeeker.experience);
  const [skills, setSkills] = useState<SkillItem[]>(mockJobSeeker.skills);
  const [certificates, setCertificates] = useState<CertificateItem[]>(mockJobSeeker.certificates);
  const [languages, setLanguages] = useState<LanguageItem[]>(mockJobSeeker.languages);
  const [projects, setProjects] = useState<ProjectItem[]>(mockJobSeeker.projects);

  // Temp state for new skill input
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState<"Beginner" | "Intermediate" | "Expert">("Intermediate");

  const [isSaving, setIsSaving] = useState(false);

  // Education handlers
  const handleAddEducation = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: "B.Sc. in Information Technology",
      institution: "SLIIT / University of Colombo",
      fieldOfStudy: "Computing",
      startYear: "2018",
      endYear: "2022",
      isCurrent: false,
    };
    setEducation([...education, newItem]);
  };

  const handleRemoveEducation = (id: string) => {
    setEducation(education.filter((e) => e.id !== id));
  };

  // Experience handlers
  const handleAddExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      title: "Software Engineer",
      company: "New Tech Company Colombo",
      location: "Colombo, Sri Lanka",
      startDate: "2022-01",
      isCurrent: true,
      description: "Implemented client microservices and contributed to cloud migration.",
    };
    setExperience([...experience, newItem]);
  };

  const handleRemoveExperience = (id: string) => {
    setExperience(experience.filter((e) => e.id !== id));
  };

  // Skills handlers
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    setSkills([...skills, { name: newSkillName.trim(), level: newSkillLevel }]);
    setNewSkillName("");
  };

  const handleRemoveSkill = (skillName: string) => {
    setSkills(skills.filter((s) => s.name !== skillName));
  };

  // Save changes
  const handleSaveAll = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      success("Profile Saved", "Your candidate profile and resume have been updated successfully.");
    }, 1000);
  };

  return (
    <div className="space-y-8 text-left max-w-5xl mx-auto pb-12">
      {/* Header with Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900 tracking-tight font-heading">
            Manage Candidate Profile
          </h1>
          <p className="text-xs text-ink-500 mt-0.5">
            Keep your experience, education, and resume up to date to attract top Sri Lankan employers.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={handleSaveAll}
          isLoading={isSaving}
          leftIcon={<Save className="h-4 w-4" />}
        >
          Save All Changes
        </Button>
      </div>

      {/* 1. PERSONAL INFORMATION & PHOTO */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-ink-900 flex items-center gap-2">
          <User className="h-5 w-5 text-primary-600" />
          <span>Personal Information</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-6 pb-4 border-b border-border">
          <div className="relative group">
            <Avatar src={mockJobSeeker.avatar} name={fullName} size="xl" className="h-24 w-24 text-2xl" />
            <button
              type="button"
              className="absolute bottom-0 right-0 p-2 rounded-full bg-primary-600 text-white shadow-md hover:bg-primary-500 transition-colors"
              title="Change Profile Photo"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-ink-900 text-sm">{fullName}</h3>
            <p className="text-xs text-ink-500">JPG, PNG or GIF up to 2MB. 400x400 recommended.</p>
            <Button variant="outline" size="sm" className="mt-2 text-xs">
              Upload New Photo
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <Input
            label="Professional Headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="e.g. Senior Software Engineer | AWS Architect"
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Input
            label="City / Location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Colombo 05"
            required
          />
        </div>

        <Textarea
          label="Professional Bio / Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={4}
        />
      </div>

      {/* 2. CV / RESUME UPLOAD & DOWNLOAD */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary-600" />
            <span>Curriculum Vitae (CV)</span>
          </h2>
          <span className="text-xs font-semibold text-accent-success flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> Verified Document
          </span>
        </div>

        {/* Existing CV Card */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-primary-200 bg-primary-50/50">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-ink-900">{mockJobSeeker.cvFileName}</p>
              <p className="text-xs text-ink-500">
                Uploaded on {mockJobSeeker.cvUploadedAt} &bull; 1.4 MB PDF
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                success("Downloading CV", `Downloading ${mockJobSeeker.cvFileName}...`);
              }}
              className="flex-1 sm:flex-initial"
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                leftIcon={<Download className="h-3.5 w-3.5" />}
              >
                Download CV
              </Button>
            </a>
          </div>
        </div>

        <div className="pt-2">
          <FileUpload
            label="Upload Updated Resume / CV"
            helperText="Upload an updated PDF or DOCX file (Max 5MB). This will replace your current primary CV."
          />
        </div>
      </div>

      {/* 3. WORK EXPERIENCE (Repeatable) */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink-900 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary-600" />
            <span>Work Experience</span>
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddExperience}
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            Add Position
          </Button>
        </div>

        <div className="space-y-4">
          {experience.map((exp, index) => (
            <div key={exp.id} className="p-4 rounded-xl border border-border bg-bg/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">
                  Experience #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveExperience(exp.id)}
                  className="text-ink-300 hover:text-accent-danger p-1"
                  title="Remove this experience"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Job Title"
                  value={exp.title}
                  onChange={(e) => {
                    const updated = [...experience];
                    updated[index].title = e.target.value;
                    setExperience(updated);
                  }}
                  required
                />
                <Input
                  label="Company Name"
                  value={exp.company}
                  onChange={(e) => {
                    const updated = [...experience];
                    updated[index].company = e.target.value;
                    setExperience(updated);
                  }}
                  required
                />
                <Input
                  label="Location"
                  value={exp.location}
                  onChange={(e) => {
                    const updated = [...experience];
                    updated[index].location = e.target.value;
                    setExperience(updated);
                  }}
                />
                <Input
                  label="Start Date"
                  placeholder="YYYY-MM"
                  value={exp.startDate}
                  onChange={(e) => {
                    const updated = [...experience];
                    updated[index].startDate = e.target.value;
                    setExperience(updated);
                  }}
                />
              </div>

              <Textarea
                label="Responsibilities & Achievements"
                value={exp.description}
                onChange={(e) => {
                  const updated = [...experience];
                  updated[index].description = e.target.value;
                  setExperience(updated);
                }}
                rows={3}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. EDUCATION (Repeatable) */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink-900 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary-600" />
            <span>Education & Degrees</span>
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddEducation}
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            Add Degree
          </Button>
        </div>

        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={edu.id} className="p-4 rounded-xl border border-border bg-bg/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">
                  Education #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveEducation(edu.id)}
                  className="text-ink-300 hover:text-accent-danger p-1"
                  title="Remove this degree"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Degree / Qualification"
                  value={edu.degree}
                  onChange={(e) => {
                    const updated = [...education];
                    updated[index].degree = e.target.value;
                    setEducation(updated);
                  }}
                  required
                />
                <Input
                  label="Institution / University"
                  value={edu.institution}
                  onChange={(e) => {
                    const updated = [...education];
                    updated[index].institution = e.target.value;
                    setEducation(updated);
                  }}
                  required
                />
                <Input
                  label="Field of Study"
                  value={edu.fieldOfStudy}
                  onChange={(e) => {
                    const updated = [...education];
                    updated[index].fieldOfStudy = e.target.value;
                    setEducation(updated);
                  }}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="Start Year"
                    value={edu.startYear}
                    onChange={(e) => {
                      const updated = [...education];
                      updated[index].startYear = e.target.value;
                      setEducation(updated);
                    }}
                  />
                  <Input
                    label="End Year"
                    value={edu.endYear || ""}
                    onChange={(e) => {
                      const updated = [...education];
                      updated[index].endYear = e.target.value;
                      setEducation(updated);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. SKILLS & COMPETENCIES */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-ink-900 flex items-center gap-2">
          <Award className="h-5 w-5 text-primary-600" />
          <span>Skills & Competencies</span>
        </h2>

        {/* Existing Skills Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {skills.map((skill) => (
            <span
              key={skill.name}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary-50 text-primary-700 font-semibold text-xs border border-primary-100 shadow-sm"
            >
              <span>{skill.name}</span>
              <span className="text-[10px] font-normal text-primary-500">({skill.level})</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill.name)}
                className="hover:text-accent-danger ml-1"
              >
                &times;
              </button>
            </span>
          ))}
        </div>

        {/* Add Skill Form */}
        <form onSubmit={handleAddSkill} className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-border">
          <div className="flex-1 w-full">
            <Input
              placeholder="Skill name (e.g. Next.js, Docker, CIMA, Financial Modeling)"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-44">
            <Select
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(e.target.value as "Beginner" | "Intermediate" | "Expert")}
              options={[
                { label: "Beginner", value: "Beginner" },
                { label: "Intermediate", value: "Intermediate" },
                { label: "Expert", value: "Expert" },
              ]}
            />
          </div>
          <Button type="submit" variant="secondary" size="md" className="w-full sm:w-auto shrink-0">
            Add Skill
          </Button>
        </form>
      </div>

      {/* Bottom Floating Save Bar */}
      <div className="sticky bottom-4 z-20 rounded-2xl bg-surface/95 backdrop-blur-md border border-border p-4 shadow-xl flex items-center justify-between">
        <p className="text-xs text-ink-500 font-medium">Unsaved changes will be stored locally.</p>
        <Button
          variant="primary"
          size="md"
          onClick={handleSaveAll}
          isLoading={isSaving}
          leftIcon={<Save className="h-4 w-4" />}
        >
          Save All Profile Changes
        </Button>
      </div>
    </div>
  );
}
