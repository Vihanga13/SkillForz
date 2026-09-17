import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "blog-001",
    slug: "sri-lanka-tech-salary-trends-2024",
    title: "Sri Lanka Tech Salary Trends 2024: Navigating Pegged Compensation & Market Shifts",
    excerpt: "An in-depth analysis of software engineering and cloud salaries in Sri Lanka, examining USD-pegged compensation models and high-demand skillsets.",
    content: `Sri Lanka's technology sector has demonstrated remarkable resilience and growth, driven by enterprise cloud adoption, open-source engineering, and global delivery centers. As local technology firms compete globally for top engineering talent, compensation structures have evolved significantly.

### The Rise of USD-Pegged Packages
Over the last two years, the majority of Tier-1 Sri Lankan software houses—including WSO2, Sysco LABS, IFS, and London Stock Exchange Group (LSEG)—have adopted dollar-pegged or inflation-adjusted compensation models. This has provided critical stability for senior tech professionals and curtailed the brain drain to Singapore, the UK, and Australia.

### Most Lucrative Roles in 2024
1. **Cloud & Platform Engineers (AWS / Azure / Kubernetes)**: Mid-level engineers command between LKR 350,000 to 500,000 per month, while Principal Architects comfortably surpass LKR 650,000 to 900,000.
2. **Full-Stack & Backend (Go, Rust, TypeScript)**: High demand for distributed microservices expertise has pushed senior full-stack compensation into the LKR 400,000 - 600,000 bracket.
3. **Data Engineers & ML Specialists**: Companies are heavily investing in algorithmic intelligence, with machine learning roles seeing a 25% year-on-year surge in base pay.

### Advice for Candidates
When negotiating in the current market, focus on total rewards: look beyond base pay to consider medical covers for extended family, hardware stipends, learning allowances for AWS/CKA certifications, and remote flexibility.`,
    coverImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&h=600&q=80",
    author: {
      name: "Dinuka Perera",
      role: "Lead Tech Talent Strategist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
    },
    category: "Career Advice",
    readingTimeMinutes: 5,
    publishedAt: "2024-09-01",
    tags: ["Tech Salaries", "Sri Lanka", "Career Growth", "Software Engineering"],
  },
  {
    id: "blog-002",
    slug: "ace-technical-interviews-top-sri-lankan-companies",
    title: "How to Ace Technical Coding & System Design Interviews in Colombo",
    excerpt: "A practical guide to clearing algorithmic problem solving, take-home tasks, and high-level system design rounds at leading tech hubs.",
    content: `Landing an offer at companies like WSO2, IFS, Virtusa, or Dialog requires more than just knowing syntax. Local hiring bars are modeled closely on Silicon Valley standards, with structured stages testing problem-solving, architectural maturity, and cultural alignment.

### Stage 1: The Online Assessment
Expect 2-3 LeetCode medium-level algorithmic questions covering hash maps, dynamic programming, and binary trees. Focus on clean code, edge cases, and time-complexity explanations.

### Stage 2: Practical Take-Home or Live Pairing
Instead of obscure trivia, leading companies in Colombo often assign realistic mini-projects: building a secure REST API with JWT authentication, a responsive React table with debounce search, or deploying a containerized microservice on Docker.

### Stage 3: System Design
For senior roles, expect to design scalable distributed systems such as a ride-hailing dispatcher like PickMe or an e-commerce catalog for Sysco. Be ready to discuss caching (Redis), message queues (Kafka), database sharding, and latency trade-offs.`,
    coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&h=600&q=80",
    author: {
      name: "Kasun Jayasuriya",
      role: "Senior Engineering Manager",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    },
    category: "Interview Prep",
    readingTimeMinutes: 6,
    publishedAt: "2024-08-25",
    tags: ["Interviews", "Coding", "System Design", "Tech Jobs"],
  },
  {
    id: "blog-003",
    slug: "sri-lankan-apparel-tech-revolution",
    title: "The Digital Revolution in Sri Lankan Apparel: Where Fashion Meets High-Tech",
    excerpt: "How MAS and Brandix are pioneering 3D fashion design, robotics, and sustainable textile innovation on the global stage.",
    content: `Sri Lanka's apparel industry has evolved far beyond traditional garment assembly. Today, it stands as a global hub for smart clothing, wearable tech, and sustainable high-tech manufacturing.

### 3D Digital Prototyping
Tools like CLO3D and Browzwear are transforming design cycles. Digital garments can be simulated on photorealistic avatars with accurate fabric drape physics, slashing sample turnaround times from weeks to hours and drastically reducing fabric waste.

### Automation and Robotics
Factory floors at MAS Active and Bodyline feature automated laser cutting, robotic material transport, and AI-driven optical fabric inspection systems. This shift has created high-demand careers for automation engineers, PLC specialists, and industrial data analysts.`,
    coverImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&h=600&q=80",
    author: {
      name: "Roshani Senanayake",
      role: "Textile Innovation Lead",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
    },
    category: "Industry Insights",
    readingTimeMinutes: 4,
    publishedAt: "2024-08-18",
    tags: ["Apparel", "Manufacturing", "Innovation", "Textiles"],
  },
  {
    id: "blog-004",
    slug: "remote-work-guide-sri-lanka-freelance-global",
    title: "The Ultimate Guide to Working Remotely for Global Tech Giants from Sri Lanka",
    excerpt: "Everything you need to know about setting up home offices, power redundancies, tax considerations, and landing USD remote roles.",
    content: `Working remotely for companies in Europe, the United States, and Australia while living in Sri Lanka has become an aspirational career path. With Colombo and southern coastal towns like Galle, Mirissa, and Ahangama developing vibrant nomad communities, remote work offers great lifestyle freedom.

### Infrastructure Essentials
- **Power Backup**: A compact mini-UPS for your fiber router combined with a portable power station ensures uninterrupted internet during maintenance shutdowns.
- **Dual Connectivity**: Pair an SLT-Mobitel high-speed Fiber line with a Dialog 4G/5G backup SIM to eliminate downtime during client calls.

### Where to Find Remote Roles
Platforms like SkillForz, LinkedIn, RemoteOK, and Toptal regularly feature overseas companies actively hiring South Asian talent on contractor agreements.`,
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&h=600&q=80",
    author: {
      name: "Naveen Wickramasinghe",
      role: "Distributed Systems Consultant",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
    },
    category: "Remote Work",
    readingTimeMinutes: 5,
    publishedAt: "2024-08-10",
    tags: ["Remote Work", "Digital Nomad", "Sri Lanka", "Global Hiring"],
  },
  {
    id: "blog-005",
    slug: "future-of-banking-careers-sri-lanka",
    title: "Fintech, Digital Wallets & The Future of Commercial Banking in Sri Lanka",
    excerpt: "Discover how Sri Lanka's leading private banks and fintech startups are digitizing credit underwriting and payments.",
    content: `Sri Lanka's banking landscape is undergoing a digital renaissance. The adoption of the LANKAQR standard by the Central Bank of Sri Lanka, mobile payment apps, and digital banking platforms has revolutionized customer onboarding and merchant acquiring.

### Modern Banking Skillsets
Traditional ledger accounting is rapidly giving way to data-driven credit modeling. Commercial banks are actively recruiting professionals proficient in Python, SQL, risk analytics, and regulatory technology (RegTech). Financial institutions are prioritizing leaders who can bridge the gap between regulatory compliance and intuitive mobile-first banking.`,
    coverImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&h=600&q=80",
    author: {
      name: "Tharindu Fernando",
      role: "Fintech Strategy Advisor",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80",
    },
    category: "Finance & Banking",
    readingTimeMinutes: 4,
    publishedAt: "2024-07-28",
    tags: ["Banking", "Fintech", "Commercial Bank", "Finance Careers"],
  },
  {
    id: "blog-006",
    slug: "cv-optimization-topjobs-style-job-portals",
    title: "How to Build a High-Converting CV for TopJobs & SkillForz Applications",
    excerpt: "Optimize your resume to pass automated screening and catch the eye of HR directors in Colombo's top corporate enterprises.",
    content: `Recruiters spend an average of 6 to 8 seconds scanning a resume before deciding whether to shortlist a candidate. On portals like SkillForz and TopJobs, where high-profile vacancies attract hundreds of applicants, structure and clarity are paramount.

### 5 Rules for a Winning Resume
1. **Highlight the Reference Number**: If applying via an email or direct cover note, always include the Job Reference Code (e.g. REF-MAS-2024-089) in the subject line.
2. **Quantify Achievements**: Instead of writing 'Responsible for improving system speed', write 'Optimized SQL queries and Redis caching, slashing API response time by 42%'.
3. **Keep it to 2 Pages**: Unless you are an academic with extensive research papers, two pages is the gold standard.
4. **List In-Demand Skills as Chips**: Clearly state your core competencies (React, Kubernetes, AWS, CIMA, PLC) in a distinct skills section.
5. **Clean PDF Format**: Always upload an unencrypted, cleanly formatted PDF without complex multi-column graphics that confuse parsing engines.`,
    coverImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&h=600&q=80",
    author: {
      name: "Shalini Abeywardena",
      role: "Executive Recruiter",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
    },
    category: "Job Hunting",
    readingTimeMinutes: 4,
    publishedAt: "2024-07-15",
    tags: ["Resume Writing", "CV Tips", "Job Application", "Recruitment"],
  },
];
