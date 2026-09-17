import { User, JobSeeker } from "@/types";

export const mockUsers: User[] = [
  {
    id: "user-seeker-01",
    name: "Sachithra Weerasinghe",
    email: "sachithra.w@gmail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80",
    role: "seeker",
    phone: "+94 77 1234567",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "user-employer-01",
    name: "Kavindu Jayawardena",
    email: "talent@dialog.lk",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
    role: "employer",
    phone: "+94 11 7100100",
    status: "active",
    createdAt: "2023-11-20",
  },
];

export const mockJobSeeker: JobSeeker = {
  id: "seeker-01",
  userId: "user-seeker-01",
  fullName: "Sachithra Weerasinghe",
  headline: "Senior Cloud & Full-Stack Engineer | AWS & Next.js Enthusiast",
  summary: "Results-driven Software Engineer with 5+ years of experience designing scalable microservices, cloud-native architectures on AWS, and modern responsive web applications using React and Next.js.",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80",
  phone: "+94 77 1234567",
  email: "sachithra.w@gmail.com",
  location: {
    city: "Colombo",
    country: "Sri Lanka",
  },
  profileCompletionPercentage: 85,
  cvUrl: "/sample-cv-sachithra.pdf",
  cvFileName: "Sachithra_Weerasinghe_CV_2024.pdf",
  cvUploadedAt: "2024-08-12",
  certificates: [
    {
      id: "cert-01",
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services (AWS)",
      issueDate: "2023-06-15",
    },
    {
      id: "cert-02",
      name: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation (CNCF)",
      issueDate: "2023-11-20",
    },
  ],
  education: [
    {
      id: "edu-01",
      degree: "B.Sc. (Hons) in Computer Science & Engineering",
      institution: "University of Moratuwa",
      fieldOfStudy: "Computer Science",
      startYear: "2016",
      endYear: "2020",
      isCurrent: false,
    },
  ],
  experience: [
    {
      id: "exp-01",
      title: "Senior Software Engineer",
      company: "WSO2 Sri Lanka",
      location: "Colombo, Sri Lanka",
      startDate: "2022-01",
      isCurrent: true,
      description: "Designed and implemented cloud-native integration microservices, optimized REST/gRPC gateways, and mentored 4 junior developers.",
    },
    {
      id: "exp-02",
      title: "Software Engineer",
      company: "Virtusa Sri Lanka",
      location: "Colombo, Sri Lanka",
      startDate: "2020-03",
      endDate: "2021-12",
      isCurrent: false,
      description: "Built financial client portals using React, TypeScript, and Spring Boot with automated CI/CD deployments.",
    },
  ],
  skills: [
    { name: "TypeScript", level: "Expert" },
    { name: "React / Next.js", level: "Expert" },
    { name: "Node.js", level: "Expert" },
    { name: "AWS (EKS, S3, RDS)", level: "Intermediate" },
    { name: "Docker & Kubernetes", level: "Intermediate" },
    { name: "PostgreSQL", level: "Expert" },
  ],
  languages: [
    { language: "English", proficiency: "Fluent" },
    { language: "Sinhala", proficiency: "Native" },
  ],
  projects: [
    {
      id: "proj-01",
      title: "Open-Source API Rate Limiter for Next.js",
      description: "A lightweight Redis-backed sliding window rate limiter package with over 50,000 monthly downloads.",
      link: "https://github.com",
    },
  ],
  savedJobIds: ["job-001", "job-002", "job-004", "job-008"],
  jobAlerts: [
    {
      id: "alert-01",
      title: "Cloud & DevOps Jobs in Colombo",
      category: "Software & IT",
      location: "Colombo",
      frequency: "daily",
    },
  ],
};
