import { Job, ExperienceLevel } from "@/types";
import { jobs } from "@/lib/data/jobs";

export interface ParsedCV {
  name: string;
  email: string;
  phone?: string;
  title: string;
  seniority: ExperienceLevel;
  summary: string;
  skills: string[];
  industries: string[];
  rawText?: string;
}

export interface JobMatchResult {
  job: Job;
  score: number; // 0 to 100
  matchLevel: "Exceptional Match" | "Strong Match" | "Good Match" | "Moderate Match";
  matchedSkills: string[];
  missingSkills: string[];
  experienceFit: boolean;
  aiExplanation: string;
}

export interface CandidatePreset {
  id: string;
  name: string;
  label: string;
  title: string;
  category: string;
  seniority: ExperienceLevel;
  summary: string;
  skills: string[];
  industries: string[];
}

export const CANDIDATE_PRESETS: CandidatePreset[] = [
  {
    id: "preset-cloud",
    name: "Kasun Jayasuriya",
    label: "Senior Cloud & DevOps Architect",
    title: "Senior Cloud Solutions Engineer",
    category: "Software & IT",
    seniority: "Lead / Principal",
    summary:
      "Enterprise Cloud Architect with 8+ years designing scalable AWS and Azure multi-region infrastructures, Kubernetes cluster governance, and Infrastructure-as-Code with Terraform and Ansible.",
    skills: ["AWS", "Azure", "Kubernetes", "Docker", "Terraform", "Ansible", "CI/CD", "DevOps", "Python", "Linux"],
    industries: ["Telecommunications & Digital Services", "Software & Technology", "Cloud Infrastructure"],
  },
  {
    id: "preset-react",
    name: "Shenali Perera",
    label: "Lead Full-Stack / React Engineer",
    title: "Senior Full-Stack Developer",
    category: "Software & IT",
    seniority: "Senior Level",
    summary:
      "Full-stack web engineer with 6+ years specializing in Next.js, React, TypeScript, Node.js, and high-performance microservices. Experience with Redis caching, PostgreSQL, and GraphQL APIs.",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "JavaScript", "PostgreSQL", "GraphQL", "Tailwind CSS", "Docker", "REST APIs"],
    industries: ["Software & Technology", "Financial Technology", "E-Commerce"],
  },
  {
    id: "preset-apparel",
    name: "Dinesh Fernando",
    label: "Apparel Lean Manufacturing Lead",
    title: "Operations & Apparel Production Lead",
    category: "Apparel & Manufacturing",
    seniority: "Senior Level",
    summary:
      "Operations lead with 7 years managing high-volume apparel manufacturing plants in Sri Lanka. Proven record in Six Sigma Black Belt methodologies, lean workflow optimization, and ERP supply chain tracking.",
    skills: ["Lean Manufacturing", "Six Sigma", "Supply Chain", "Quality Assurance", "ERP Systems", "Production Planning", "Kaizen"],
    industries: ["Apparel & Textiles", "Manufacturing & Operations", "Export Logistics"],
  },
  {
    id: "preset-banking",
    name: "Anoma Weerasinghe",
    label: "Financial Risk & Credit Specialist",
    title: "Senior Credit & Risk Analyst",
    category: "Banking & Finance",
    seniority: "Mid Level",
    summary:
      "CIMA passed finalist with 4 years in corporate credit underwriting, loan portfolio stress testing, and Basel III regulatory compliance across Sri Lankan commercial banking institutions.",
    skills: ["Financial Modeling", "Credit Risk", "CIMA", "Basel III", "Financial Analysis", "Auditing", "Excel (VBA)"],
    industries: ["Banking & Financial Services", "Corporate Finance", "Investment Management"],
  },
];

// Normalize strings for fuzzy keyword matching
const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, " ").trim();

export function parseCVFromText(text: string): ParsedCV {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const rawNormalized = normalize(text);

  // Common skills dictionary for Sri Lankan job sectors
  const knownSkills = [
    "react", "next.js", "typescript", "javascript", "node.js", "python", "aws", "azure", "kubernetes",
    "docker", "terraform", "ansible", "ci/cd", "devops", "linux", "postgresql", "mysql", "mongodb",
    "graphql", "rest apis", "microservices", "java", "spring boot", "c#", ".net", "tailwind css",
    "lean manufacturing", "six sigma", "supply chain", "quality assurance", "erp systems", "production planning",
    "kaizen", "apparel", "textile", "financial modeling", "credit risk", "cima", "acca", "basel iii",
    "auditing", "risk management", "marketing", "seo", "social media", "growth marketing", "ui/ux", "figma"
  ];

  const extractedSkills: string[] = [];
  knownSkills.forEach((skill) => {
    if (rawNormalized.includes(skill)) {
      extractedSkills.push(skill.toUpperCase());
    }
  });

  // Seniority detection
  let seniority: ExperienceLevel = "Mid Level";
  if (rawNormalized.includes("lead") || rawNormalized.includes("principal") || rawNormalized.includes("architect")) {
    seniority = "Lead / Principal";
  } else if (rawNormalized.includes("senior") || rawNormalized.includes("head") || rawNormalized.includes("manager")) {
    seniority = "Senior Level";
  } else if (rawNormalized.includes("intern") || rawNormalized.includes("trainee") || rawNormalized.includes("junior") || rawNormalized.includes("entry")) {
    seniority = "Entry Level";
  } else if (rawNormalized.includes("director") || rawNormalized.includes("vice president") || rawNormalized.includes("executive")) {
    seniority = "Executive";
  }

  // Extract candidate name fallback
  const candidateName = lines[0] && lines[0].length < 40 ? lines[0] : "Job Seeker";
  const title = lines[1] && lines[1].length < 50 ? lines[1] : `${seniority} Professional`;

  return {
    name: candidateName,
    email: "candidate@skillforz.lk",
    title,
    seniority,
    summary: text.slice(0, 300) + (text.length > 300 ? "..." : ""),
    skills: extractedSkills.length > 0 ? extractedSkills : ["Team Leadership", "Problem Solving", "Agile Execution"],
    industries: ["Software & Technology", "Banking & Finance", "Apparel & Textiles"],
    rawText: text,
  };
}

export function matchCVAgainstJobs(cv: ParsedCV, jobList: Job[] = jobs): JobMatchResult[] {
  const cvSkillsLower = cv.skills.map((s) => s.toLowerCase());
  const cvText = normalize(`${cv.title} ${cv.summary} ${cv.skills.join(" ")} ${cv.rawText || ""}`);

  const results: JobMatchResult[] = jobList.map((job) => {
    // 1. Skill Overlap Calculation (45% Weight)
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];

    job.skills.forEach((skill) => {
      const sLower = skill.toLowerCase();
      const hasSkill =
        cvSkillsLower.some((cs) => cs.includes(sLower) || sLower.includes(cs)) ||
        cvText.includes(sLower);

      if (hasSkill) {
        matchedSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    });

    const skillScore = job.skills.length > 0 ? (matchedSkills.length / job.skills.length) * 100 : 70;

    // 2. Experience Level Compatibility (25% Weight)
    let expScore = 70;
    const seniorityRanks: Record<ExperienceLevel, number> = {
      "Entry Level": 1,
      "Mid Level": 2,
      "Senior Level": 3,
      "Lead / Principal": 4,
      "Executive": 5,
    };
    const cvRank = seniorityRanks[cv.seniority] || 2;
    const jobRank = seniorityRanks[job.experienceLevel] || 2;
    const rankDiff = Math.abs(cvRank - jobRank);

    if (rankDiff === 0) expScore = 100;
    else if (rankDiff === 1) expScore = 80;
    else if (rankDiff === 2) expScore = 55;
    else expScore = 35;

    const experienceFit = rankDiff <= 1;

    // 3. Industry & Title Semantic Match (20% Weight)
    let domainScore = 40;
    const jobTitleWords = normalize(job.title).split(" ");
    const titleMatchCount = jobTitleWords.filter((w) => w.length > 3 && cvText.includes(w)).length;
    if (titleMatchCount >= 2) domainScore += 45;
    else if (titleMatchCount === 1) domainScore += 25;

    if (cv.industries.some((ind) => job.industry.toLowerCase().includes(ind.toLowerCase()))) {
      domainScore += 25;
    }
    domainScore = Math.min(domainScore, 100);

    // 4. Keyword Density (10% Weight)
    const jobText = normalize(
      `${job.title} ${job.description} ${job.skills.join(" ")} ${job.responsibilities.join(" ")} ${job.requirements.join(" ")} ${job.industry} ${job.categoryName}`
    );
    let keywordScore = 50;
    if (cvSkillsLower.some((s) => jobText.includes(s))) keywordScore += 30;
    if (cv.title && jobText.includes(normalize(cv.title))) keywordScore += 20;
    keywordScore = Math.min(keywordScore, 100);

    // Combined Weighted Score
    const totalScore = Math.round(
      skillScore * 0.45 + expScore * 0.25 + domainScore * 0.20 + keywordScore * 0.10
    );

    // Bounded between 35 and 99
    const finalScore = Math.max(35, Math.min(99, totalScore));

    let matchLevel: JobMatchResult["matchLevel"] = "Moderate Match";
    if (finalScore >= 90) matchLevel = "Exceptional Match";
    else if (finalScore >= 80) matchLevel = "Strong Match";
    else if (finalScore >= 68) matchLevel = "Good Match";

    // AI Explanation Generator
    let aiExplanation = "";
    if (matchedSkills.length > 0) {
      aiExplanation = `Strong alignment with ${job.company.name}'s requirements: You match ${matchedSkills.length} key technical qualifications including ${matchedSkills.slice(0, 3).join(", ")}.`;
    } else {
      aiExplanation = `Relevant domain background for ${job.title} at ${job.company.name} based on your ${cv.seniority} profile.`;
    }

    if (missingSkills.length > 0 && finalScore < 90) {
      aiExplanation += ` Recommended knowledge to highlight: ${missingSkills.slice(0, 2).join(", ")}.`;
    }

    return {
      job,
      score: finalScore,
      matchLevel,
      matchedSkills,
      missingSkills,
      experienceFit,
      aiExplanation,
    };
  });

  // Sort by highest score descending
  return results.sort((a, b) => b.score - a.score);
}
