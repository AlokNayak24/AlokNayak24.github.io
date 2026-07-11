/**
 * SITE_DATA — single source of truth for all portfolio content.
 * Fields marked `placeholder: true` are visible but not yet real —
 * swap the `url` in and flip the flag off when ready.
 */
const SITE_DATA = {
  identity: {
    name: "Alok Kumar Nayak",
    firstName: "Alok",
    lastName: "Nayak",
    role: "Senior QA Automation Engineer",
    location: "Ahmedabad, Gujarat, India",
    email: "aloknayak2013@gmail.com",
    phone: "+91-8328890394",
    status: "Available for Work",
    resumeUrl: "resume/Alok_Kumar_Nayak_Resume.pdf",
    timezone: "Asia/Kolkata",
  },

  titles: [
    "QA Automation Engineer",
    "AI/LLM Test Automation Specialist",
    "SDET",
    "Selenium & AccelQ Expert",
    "API Automation Engineer",
    "CI/CD Specialist",
    "Prompt Engineering for QA",
    "AI Agent Developer",
    "Playwriter & Cypress Enthusiast",
  ],

  socials: [
    { name: "GitHub", icon: "github", url: "https://github.com/AlokNayak24", placeholder: false },
    { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/alok-kumar-nayak", placeholder: false },
    { name: "Email", icon: "mail", url: "mailto:aloknayak2013@gmail.com", placeholder: false },
    { name: "LeetCode", icon: "leetcode", url: "#", placeholder: true },
    { name: "Medium", icon: "medium", url: "#", placeholder: true },
  ],

  stats: [
    { label: "Years Experience", value: 8, suffix: "+" },
    { label: "Automation Coverage", value: 80, suffix: "%" },
    { label: "Manual Effort Reduced", value: 60, suffix: "%" },
    { label: "Faster Script Creation", value: 35, suffix: "%" },
    { label: "Engineers Led", value: 10, suffix: "" },
    { label: "Companies", value: 3, suffix: "" },
  ],

  about: {
    tagline: "Quality isn't a phase — it's an architecture.",
    paragraphs: [
      "I'm an AI Automation Engineer with 8+ years of experience across insurance, fintech-adjacent, and enterprise SaaS platforms — specializing in AI/LLM application testing and intelligent test automation.",
      "I've built a custom AI agent that reads user stories and generates comprehensive test cases directly into Zephyr Scale, cut manual regression effort by up to 60% with Selenium and AccelQ, and lead a team of 5 engineers shipping 80% automation coverage on a U.S. insurance platform.",
    ],
    principles: [
      { title: "🔍 Quality First", desc: "Building quality into every stage of development through proactive testing and continuous feedback." },
      { title: "⚡ Automate with Purpose", desc: "Creating scalable, maintainable automation that accelerates releases without sacrificing reliability." },
      { title: "👤 Think Like the User", desc: "Designing meaningful test scenarios that ensure exceptional user experiences in every release." },
    ],
  },

  skills: {
    core: [
      { category: "Languages", items: ["Java", "JavaScript", "Python","TypeScript", "SQL","HTML","CSS","MySQL", "PostgreSQL", "MongoDB",] },
      { category: "Automation", items: ["Playwright","Selenium WebDriver", "AccelQ", "TestNG", "Rest Assured", "Postman"] },
      { category: "AI Testing", items: ["ChatGPT","Codex","Claude Code","Claude AI","Lovable","GitHub Copilot", "Codex", "AI Agent Development", "Prompt Engineering"] },
      { category: "CI/CD & Tools", items: ["Jenkins", "Maven", "Git", "JIRA", "Zephyr Scale", "Allure Reports","JMeter","Eclips","IntelliJ IDE"] },
      { category: "Methodology", items: ["Hybrid Framework (Data-Driven, BDD)", "Page Object Model", "Agile/Scrum", "SDLC/STLC","Cucumber/BDD"] },
    ],
    exploring: [
      "Cypress", "Appium", "Docker",
      "AWS", "Azure DevOps",
      "Gradle","BrowserStack",
    ],
  },

  experience: [
    {
      role: "QA Automation Engineer",
      company: "Dyad Tech — Nexsure Project (U.S. Insurance Domain)",
      duration: "Nov 2024 — Present",
      location: "Ahmedabad, IN",
      current: true,
      achievements: [
        "Designing meaningful test scenarios that ensure exceptional user experiences in every release.Designed and implemented a real-time production monitoring solution to continuously track server availability and API health across critical business services. The system automatically detects server downtime, API failures, and response time degradation, providing instant notifications to the QA and engineering teams for faster incident response.",
        "Leveraged GitHub Copilot and Codex to cut test script creation time by 35% while maintaining coverage standards.",
        "Implemented a hybrid automation framework (Data-Driven, BDD) to improve test maintenance and scalability.",
        "Automated 80% of regression scenarios (UI + API) using Selenium, AccelQ, and Rest Assured, achieving 30% shorter release timelines.",
        "Ran automated regression/smoke suites via Jenkins + Maven CI/CD across cloud and on-prem environments.",
      ],
      tech: ["Selenium", "AccelQ", "Rest Assured", "ChatGPT", "Claude AI", "Zephyr Scale", "Jenkins", "Maven"],
    },
    {
      role: "QA Engineer",
      company: "Rydot Intuit",
      duration: "Mar 2023 — Oct 2024",
      location: "India",
      current: false,
      achievements: [
        "Lead a team of 10 QA Automation Engineers — regression cycles, task distribution, and code reviews.",
        "Pioneered adoption of ChatGPT and GitHub Copilot for test script optimization and intelligent test case design.",
        "Built and maintained Selenium WebDriver automation, reducing manual testing effort by 60%.",
        "Ran regression + API testing with Rest Assured and Postman inside Jenkins/Maven CI/CD pipelines.",
        "Mentored junior QA engineers on automation best practices and AI-enhanced testing methodologies.",
      ],
      tech: ["Selenium WebDriver", "Rest Assured", "Postman", "Jenkins", "Maven", "ChatGPT", "Copilot"],
    },
    {
      role: "QA Analyst",
      company: "Convisor Technology",
      duration: "Sep 2018 — Feb 2023",
      location: "India",
      current: false,
      achievements: [
        "Translated functional requirements into Smoke, Integration, Regression and Compatibility test cases.",
        "Designed Modular/Integration/E2E test cases with full traceability matrix coverage.",
        "Applied Boundary Value Analysis, Equivalence Partitioning and Decision Tables for optimal coverage.",
        "Performed SQL-based data validation across databases and application layers.",
      ],
      tech: ["SQL", "JIRA", "Manual + Automation Testing", "Agile/Scrum"],
    },
  ],

  education: [
    { degree: "B.Tech, Mechanical Engineering", school: "BPUT Rourkela, Odisha", year: "2017" },
  ],

  certifications: [
    { name: "AccelQ Automation Engineer Certified", issuer: "AccelQ", year: "2023", verifyUrl: "#", placeholder: true, image: "img/certificates/AccelQ Certificate.jpeg" },
    { name: "AccelQ Feature Spotlight Certification", issuer: "AccelQ", year: "2023", verifyUrl: "https://certificate.accelq.com/verify/3cc077a923425", placeholder: false, image: "img/certificates/AccelQ Feature Spotlit.jpeg" },
    { name: "Agile & Scrum with JIRA Certified", issuer: "JIRA / Atlassian", year: "2022", verifyUrl: "#", placeholder: true, image: "img/certificates/Jira Certificate.jpeg" },
    { name: "Application Security Certification", issuer: "—", year: "2022", verifyUrl: "#", placeholder: true, image: "img/certificates/Application Security.jpeg" },
    { name: "New Rookie Award – Excellence", issuer: "Dyad Tech", year: "2024", verifyUrl: "#", placeholder: true, image: "img/certificates/Rookie Award.jpeg" },
    { name: "Claude Code in Action", issuer: "Anthropic", year: "2026", verifyUrl: "https://verify.skilljar.com/c/6qq4jbqqr2sj", placeholder: false, image: "img/certificates/Claude code Action.jpeg" },
    { name: "Claude code 101", issuer: "Anthropic", year: "2026", verifyUrl: "https://verify.skilljar.com/c/ivcf7numby96", placeholder: false, image: "img/certificates/Claude code 101.jpeg" },
    { name: "ESET Security Awareness", issuer: "ESET", year: "2025", verifyUrl: "#", placeholder: true, image: "img/certificates/ESET Security Awareness.jpeg" },
    { name: "Generative AI", issuer: "Skill Nation", year: "2025", verifyUrl: "#", placeholder: true, image: "img/certificates/Generative AI.jpeg" },
    // { name: "ESET General Cybersecurity", issuer: "ESET", year: "2025", verifyUrl: "#", placeholder: true, image: "" },
    // { name: "Generative AI ", issuer: "Skill Nation", year: "2025", verifyUrl: "https://verify.skillnation.ai/certificate?certificate_id=68bb14ae94730109c25a9be4", placeholder: true, image: "" },
  ],

  projects: [
    // {
    //   id: "ai-test-agent",
    //   title: "AI-Powered Test Case Generation Agent",
    //   badge: "Real — Production",
    //   desc: "A custom AI agent using ChatGPT + Claude AI APIs that reads user stories and acceptance criteria, generates comprehensive test cases including edge scenarios, and uploads them directly into Zephyr Scale.",
    //   features: ["NLP-based requirement parsing", "Edge case auto-generation", "Zephyr Scale API integration", "50% faster test case creation"],
    //   tech: ["ChatGPT API", "Claude AI", "Python", "Zephyr Scale"],
    //   githubUrl: "https://github.com/AlokNayak24", demoUrl: "#", caseStudyUrl: "#",
    // },
    {
      id: "nexsure-insurance",
      title: "Nexsure Insurance QA Automation",
      badge: "Real — Production",
      desc: "End-to-end QA automation for a U.S. insurance management platform covering policy administration, claims processing, and CRM workflows, under strict regulatory compliance.",
      features: ["80% automation coverage", "Bi-daily regression cycles", "UI + API hybrid suite", "Regulatory-compliant validation"],
      tech: ["Selenium", "AccelQ", "Rest Assured", "TestNG"],
      githubUrl: "https://github.com/AlokNayak24", demoUrl: "#", caseStudyUrl: "case-study.html?id=nexsure-insurance",
      caseStudy: {
        overview:
          "Nexsure is a U.S. insurance management platform handling policy administration, claims processing, and CRM workflows for agencies and carriers — a domain where a missed regression isn't just a bug, it's a compliance exposure. Coming into this engagement, my first step wasn't writing scripts; it was mapping the regulatory-sensitive workflows (policy binding, endorsements, claims lifecycle) against existing test coverage to find where risk was concentrated. That risk map became the backbone of the automation strategy — coverage was prioritized by business impact and audit exposure, not by what was easiest to script first.",
        features: [
          { icon: "🧭", title: "Risk-Based Test Strategy", points: ["Mapped policy, claims, and CRM workflows against regulatory exposure before writing a single script.", "Prioritized automation coverage by business impact rather than ease of scripting.", "Kept a living traceability matrix in Zephyr Scale linking requirements to test coverage."] },
          { icon: "🧩", title: "Hybrid Automation Framework", points: ["Combined data-driven inputs with BDD-style specs so business stakeholders could read test intent directly.", "Built on the Page Object Model for maintainability as the UI evolved release over release.", "Designed to run identically across cloud and on-prem environments."] },
          { icon: "🔗", title: "UI + API Regression Suite", points: ["Selenium WebDriver + AccelQ for UI regression across policy and claims modules.", "Rest Assured for API-level contract and data validation beneath the UI layer.", "TestNG suites organized by module for parallel execution and faster feedback."] },
          { icon: "⚙️", title: "CI/CD Pipeline Integration", points: ["Jenkins + Maven pipelines running smoke suites on every merge and full regression on a bi-daily cadence.", "Automated failure triage funneled straight into Jira for the dev team.", "Pipeline gates tied to release readiness, not just green checkmarks."] },
          { icon: "📡", title: "Production Monitoring", points: ["Designed a real-time monitoring layer tracking server availability and API health across critical services.", "Automatic detection of downtime, API failures, and response-time degradation.", "Instant alerts to QA and engineering for faster incident response — shifting from reactive to proactive quality."] },
          { icon: "🤖", title: "AI-Accelerated Scripting", points: ["Used GitHub Copilot and Codex to cut test script creation time by 35% without lowering coverage standards.", "AI-assisted boilerplate generation freed up time for deeper exploratory and edge-case testing."] },
        ],
        impact: [
          "80% automation coverage across UI and API regression scenarios.",
          "30% shorter release timelines from a hybrid, parallelizable suite.",
          "35% faster test script creation using AI coding assistants (Copilot, Codex).",
          "Faster incident response through proactive production health monitoring.",
          "Regulatory-compliant validation maintained across every release cycle.",
        ],
        techUsed: ["Selenium WebDriver", "AccelQ", "Rest Assured", "TestNG", "Jenkins", "Maven", "Zephyr Scale", "GitHub Copilot", "Codex"],
        result:
          "Eight years of QA experience taught me that in a regulated domain, automation coverage without a risk model is just noise — you can hit 80% coverage and still miss the 20% that matters most. On Nexsure, tying every automated scenario back to a documented business risk meant the coverage number was actually defensible in an audit conversation, not just a dashboard metric. That discipline, combined with AI-assisted scripting and proactive production monitoring, moved the team from a reactive regression cycle to a genuinely predictable release cadence.",
      },
    },
    {
      id: "ai-copilot-scripting",
      title: "Recognizer.solution",
      badge: "Real — Production",
      desc: "Recognizer is a unique AI solution to recognition of objects, texts, scenes, human faces and activities in images and videos, detect any inappropriate content with computer vision technology and it is enables pattern recognition or shapes to be identified. can be used across different industry verticals to enhance productivity, customer experience, reduce operating costs, increase business efficiency and improve security. offer multiple vision intelligence capabilities in one platform.",
      features: ["60% less manual testing effort", "Faster release cycles", "Reusable Page Object layer", "Team-wide AI tooling adoption"],
      tech: ["Selenium WebDriver", "GitHub Copilot", "Java", "Jenkins"],
      githubUrl: "https://github.com/AlokNayak24", demoUrl: "#", caseStudyUrl: "case-study.html?id=ai-copilot-scripting",
      caseStudy: {
        overview:
          "Recognizer is a computer-vision platform that identifies objects, text, scenes, faces, and activity in images and video, and flags inappropriate content — used across multiple industries for security, moderation, and productivity use cases. Testing an AI/vision product is a different discipline from testing a deterministic CRUD app: correctness isn't binary, so the strategy had to account for probabilistic outputs, not just pass/fail assertions. I spent time understanding the recognition pipeline first — what confidence thresholds meant, where false positives/negatives actually hurt the business (content moderation false-negatives are a much bigger risk than a UI cosmetic bug) — before designing the test approach around that risk profile.",
        features: [
          { icon: "🖼️", title: "AI Output Validation", points: ["Curated diverse test media (lighting, occlusion, resolution, multiple ethnicities/ages) to stress-test recognition accuracy.", "Validated confidence-threshold behavior rather than treating detection as simple pass/fail.", "Focused extra scrutiny on the inappropriate-content classifier, where false negatives carry real business risk."] },
          { icon: "🎭", title: "Cross-Browser UI Regression", points: ["Selenium WebDriver suite covering the upload, processing, and results-review flows across browsers.", "Regression coverage on every release to catch UI drift without slowing releases down."] },
          { icon: "🧱", title: "Reusable Page Object Layer", points: ["Refactored ad-hoc scripts into a Page Object Model layer shared across the whole suite.", "Cut script maintenance overhead as the product's UI iterated release over release."] },
          { icon: "🤖", title: "AI-Accelerated Scripting", points: ["Used GitHub Copilot to scaffold repetitive Selenium test scripts, freeing time for deeper exploratory testing of recognition edge cases.", "Drove team-wide adoption of AI coding assistants for QA scripting."] },
          { icon: "⚙️", title: "CI/CD via Jenkins", points: ["Automated the regression suite into the Jenkins pipeline for consistent, repeatable runs.", "Reduced manual retesting time ahead of each release."] },
        ],
        impact: [
          "60% reduction in manual testing effort across UI regression cycles.",
          "Faster release cycles from an automated, Jenkins-driven regression suite.",
          "Reusable Page Object layer cut ongoing script maintenance cost.",
          "Team-wide adoption of AI-assisted scripting for QA workflows.",
        ],
        techUsed: ["Selenium WebDriver", "Java", "GitHub Copilot", "Jenkins", "TestNG"],
        result:
          "The lesson from Recognizer was that testing an AI feature means testing the failure modes an AI system actually has — biased or thin training data, edge-case lighting/angles, borderline-confidence outputs — not just clicking through the UI. Treating vision-model output like any other deterministic assertion would have given false confidence in exactly the scenarios that matter most for a content-moderation product.",
      },
    },
    {
      id: "api-integration-suite",
      title: "Virtual Building Studio",
      badge: "Real — Production",
      desc: "services cater to Architects, Engineers, Contractors, and Surveyors worldwide, offering unbeatable affordability and uncompromising quality. Whether  require skilled BIM experts or a complete offshore team,  cost-effective solutions empower  to explore, construct, and manage projects seamlessly.",
      features: ["Rest Assured + Postman collections", "CI/CD gated on every PR", "Third-party service validation", "Database integrity checks"],
      tech: ["Rest Assured", "Postman", "Jenkins", "Maven", "SQL"],
      githubUrl: "https://github.com/AlokNayak24", demoUrl: "#", caseStudyUrl: "case-study.html?id=api-integration-suite",
      caseStudy: {
        overview:
          "Virtual Building Studio delivers offshore BIM (Building Information Modeling) services to architects, engineers, contractors, and surveyors — a platform where the real product is data integrity moving correctly between design files, project records, and client deliverables. Since the client-facing surface was thin compared to the volume of data flowing through integrations and the database layer, I shifted the testing emphasis toward the API and data layer early, rather than defaulting to UI-first regression the way many QA engineers do out of habit.",
        features: [
          { icon: "🔌", title: "API Contract Testing", points: ["Rest Assured suites validating request/response contracts for every integration endpoint.", "Negative-path and boundary testing on payloads, not just the happy path."] },
          { icon: "📬", title: "Postman Collection Suites", points: ["Maintained shared Postman collections as living documentation and a manual-verification fallback alongside automation.", "Environment-scoped variables so the same collection ran against staging and pre-prod without edits."] },
          { icon: "🚦", title: "CI/CD Gated on Every PR", points: ["Wired the API suite into Jenkins + Maven so it ran on every pull request, not just nightly.", "Caught contract-breaking changes before merge instead of after deployment."] },
          { icon: "🗄️", title: "Database Integrity Validation", points: ["SQL-based checks confirming data written through the API matched what the application layer expected to read back.", "Caught silent data-corruption issues that UI-only testing would never surface."] },
          { icon: "🔗", title: "Third-Party Service Validation", points: ["Verified behavior of dependent third-party services under both normal and degraded conditions.", "Documented failure-mode expectations so the dev team could design proper fallbacks."] },
        ],
        impact: [
          "Contract-breaking changes caught pre-merge instead of in production.",
          "Reduced production data-integrity incidents through direct SQL-level validation.",
          "Faster PR turnaround with automated API gating replacing manual sign-off.",
          "Reliable, documented behavior for every third-party integration point.",
        ],
        techUsed: ["Rest Assured", "Postman", "Jenkins", "Maven", "SQL"],
        result:
          "This project reinforced a principle I carry into every API-heavy system: the UI is the last place a data problem shows up, not the first. Gating the pipeline on API and database-level checks — rather than waiting for a UI regression to surface a symptom — moved defect detection several steps earlier in the pipeline, where it's far cheaper to fix.",
      },
    },
    {
      id: "hybrid-bdd-framework",
      title: "Hybrid Data-Driven / BDD Framework",
      badge: "Real — Production",
      desc: "A reusable hybrid automation framework combining data-driven design, BDD-style specs, and the Page Object Model for scalable cross-project reuse.",
      features: ["Data-driven test inputs", "BDD-readable specs", "Page Object Model", "Allure + TestNG reporting"],
      tech: ["Java", "TestNG", "Selenium", "Allure"],
      githubUrl: "https://github.com/AlokNayak24", demoUrl: "#", caseStudyUrl: "case-study.html?id=hybrid-bdd-framework",
      caseStudy: {
        overview:
          "Across three companies and 8+ years, I kept hitting the same problem at the start of every new engagement: rebuilding automation infrastructure from scratch — locator strategy, reporting, config management, data handling — before a single meaningful test could run. This framework was built to end that cycle: a hybrid Data-Driven + BDD framework designed once and reused across projects, so a new engagement starts with 'write the test' on day one, not 'build the framework' in week three.",
        features: [
          { icon: "📊", title: "Data-Driven Test Inputs", points: ["Externalized test data from Excel/JSON sources so the same test logic runs against many data sets.", "New test scenarios added by extending data files, not duplicating code."] },
          { icon: "📖", title: "BDD-Readable Specs", points: ["Gherkin-style feature files that product owners and business analysts can read without a QA translator.", "Kept test intent documented in the same place the test logic lives, so specs never drift out of sync with code."] },
          { icon: "🧱", title: "Page Object Model", points: ["Strict separation between locator management and test logic.", "A UI change touches one page object, not every test file that references it."] },
          { icon: "📈", title: "Allure + TestNG Reporting", points: ["TestNG for suite orchestration, parallelization, and retry policies on flaky steps.", "Allure for stakeholder-readable HTML reports with screenshots on failure, not just a pass/fail console log."] },
          { icon: "⚙️", title: "Config-Driven Environments", points: ["Environment and browser configuration externalized so the same suite runs locally, in CI, or against staging without code changes."] },
        ],
        impact: [
          "Cut new-project framework bootstrap time from weeks to days by reusing the same core.",
          "Business-readable BDD specs improved handoff between QA, product, and dev.",
          "Faster onboarding for new automation engineers joining a project already using the framework.",
          "Consistent, screenshot-backed reporting across every project that adopted it.",
        ],
        techUsed: ["Java", "TestNG", "Selenium WebDriver", "Allure", "Cucumber/BDD", "Maven"],
        result:
          "Building this once and reusing it everywhere is the same principle I apply to test design itself: don't rebuild what's already proven to work. The framework has since become the default starting point for new automation work across the teams I've been part of, rather than something reinvented per project.",
      },
    },
    {
      id: "playwright-practice",
      title: "Playwright Cross-Browser Practice Framework",
      badge: "Practice Project",
      desc: "A personal project exploring Playwright + TypeScript for cross-browser E2E automation — parallel execution, trace viewer debugging, and visual diffing.",
      features: ["Cross-browser parallel runs", "Trace viewer debugging", "Visual regression diffing", "TypeScript + fixtures"],
      tech: ["Playwright", "TypeScript", "GitHub Actions"],
      githubUrl: "https://github.com/AlokNayak24", demoUrl: "#", caseStudyUrl: "case-study.html?id=playwright-practice",
      caseStudy: {
        overview:
          "My production automation background is built on Selenium and AccelQ — proven, stable, and what every employer to date has standardized on. This project is a deliberate, honest exploration of Playwright, evaluating it on its own terms rather than assuming it's simply 'the new Selenium': faster execution model, built-in auto-waiting, and debugging tools that Selenium doesn't offer natively. I built this to form my own evidence-based opinion on where Playwright fits before ever proposing a migration on a real project.",
        features: [
          { icon: "🎭", title: "Cross-Browser Parallel Execution", points: ["Ran the same suite across Chromium, Firefox, and WebKit in parallel via Playwright's built-in test runner.", "Compared wall-clock execution time directly against an equivalent Selenium suite."] },
          { icon: "🔍", title: "Trace Viewer Debugging", points: ["Used Playwright's Trace Viewer to step through DOM snapshots, network calls, and console logs per failed test.", "Evaluated how much faster root-causing a flaky failure is versus screenshot-only Selenium reports."] },
          { icon: "🖼️", title: "Visual Regression Diffing", points: ["Built pixel-diff visual regression checks using Playwright's screenshot comparison API.", "Assessed false-positive rate from minor rendering differences across browsers/OS."] },
          { icon: "🧩", title: "TypeScript + Fixtures", points: ["Used TypeScript fixtures for reusable setup/teardown and typed page objects.", "Compared maintainability of typed fixtures against the Java POM pattern used in production work."] },
          { icon: "⚙️", title: "GitHub Actions CI", points: ["Wired the suite into GitHub Actions to evaluate Playwright's CI ergonomics outside a Jenkins environment."] },
        ],
        impact: [
          "Hands-on evaluation of auto-waiting vs. explicit-wait strategies used in production Selenium suites.",
          "Concrete before/after data on debugging time using Trace Viewer vs. screenshot-only failure reports.",
          "A documented, evidence-based point of view on where Playwright would fit in future framework decisions.",
        ],
        techUsed: ["Playwright", "TypeScript", "GitHub Actions"],
        result:
          "This stays labeled a practice project deliberately — it hasn't shipped in production, and I'm not claiming otherwise. But after 8 years standardizing on Selenium, treating a new tool as 'exploring' until it's proven on real, regulated production traffic is the same rigor I'd want applied to any test result: don't call it verified until you've actually verified it.",
      },
    },
  ],

  // Side tools/apps built leveraging AI coding assistants — distinct from
  // `projects` above, which are QA/work deliverables. Edit freely: swap
  // titles, descriptions, and builtWith tools for what you've made.
  // status must be one of: "Production", "Freelancing", "Personal"
  aiTools: [
    {
      id: "ai-portfolio",
      title: "QA Copilot – AI-Powered Test Automation & Quality Engineering Platform",
      status: "Personal",
      desc: "An enterprise-grade AI-powered QA platform that automates the complete software testing lifecycle. QA Copilot leverages Large Language Models (LLMs) to generate intelligent test cases, create Playwright automation scripts, execute tests, perform AI-driven root cause analysis, synchronize results with Jira and Zephyr, and provide real-time quality insights through interactive dashboards.",
      builtWith: ["Claude Code","React","Vite","GitHub Actions","JWT Authentication"],
      tech: ["HTML", "CSS", "JavaScript", "GSAP", "Three.js","Python","SQLAlchemy","Pydantic"],
      placeholder: false,
      caseStudy: {
  overview:
    "Developed QA Copilot, an AI-powered QA Automation Platform that streamlines the complete software testing lifecycle. The platform integrates Jira, Playwright, Zephyr, and Large Language Models (LLMs) to automate test case generation, self-healing test automation, intelligent execution, root cause analysis, and regression management. Designed with a scalable microservices architecture using FastAPI, React, PostgreSQL, Redis, and Docker, enabling teams to accelerate testing while improving software quality and release confidence.",

  features: [
    {
      icon: "🤖",
      title: "AI Test Case Generation",
      points: [
        "Generates comprehensive test cases directly from Jira user stories.",
        "Creates positive, negative, boundary, and edge-case scenarios.",
        "Automatically generates test steps, expected results, and test data.",
      ],
    },
    {
      icon: "🎯",
      title: "Requirement Coverage",
      points: [
        "Maps generated test cases with Jira requirements.",
        "Identifies uncovered business scenarios.",
        "Ensures high requirement traceability and coverage.",
      ],
    },
    {
      icon: "🎭",
      title: "Playwright Automation",
      points: [
        "Automatically generates Playwright automation scripts.",
        "Supports reusable page objects and modular framework.",
        "Accelerates UI automation development.",
      ],
    },
    {
      icon: "🛠️",
      title: "Self-Healing Automation",
      points: [
        "Detects broken UI locators automatically.",
        "Repairs locator strategies using AI.",
        "Reduces maintenance effort for automation suites.",
      ],
    },
    {
      icon: "⚡",
      title: "Smart Test Execution",
      points: [
        "Executes automated test suites on demand.",
        "Runs parallel execution for faster feedback.",
        "Supports scheduled regression execution.",
      ],
    },
    {
      icon: "🔍",
      title: "AI Root Cause Analysis",
      points: [
        "Analyzes failed test executions automatically.",
        "Classifies failures as application defects, locator issues, or environment problems.",
        "Provides AI-generated troubleshooting suggestions.",
      ],
    },
    {
      icon: "📤",
      title: "Zephyr Integration",
      points: [
        "Automatically uploads generated test cases to Zephyr.",
        "Updates execution results after test completion.",
        "Maintains requirement traceability with Jira.",
      ],
    },
    {
      icon: "📋",
      title: "Jira Integration",
      points: [
        "Imports Jira stories and requirements automatically.",
        "Creates bugs directly from failed executions.",
        "Synchronizes testing progress with development teams.",
      ],
    },
    {
      icon: "📊",
      title: "Executive Dashboard",
      points: [
        "Displays AI usage and token consumption.",
        "Tracks execution statistics and automation coverage.",
        "Provides real-time QA insights and project metrics.",
      ],
    },
    {
      icon: "🔐",
      title: "Secure User Management",
      points: [
        "JWT authentication with role-based access control.",
        "Supports Admin, Manual QA, Automation QA, and Viewer roles.",
        "Multi-organization architecture with secure data isolation.",
      ],
    },
    {
      icon: "🐳",
      title: "Cloud-Native Architecture",
      points: [
        "Containerized using Docker and Docker Compose.",
        "Built with FastAPI, React, PostgreSQL, and Redis.",
        "Designed for scalable enterprise deployments.",
      ],
    },
  ],

  impact: [
    "Reduced manual test case creation effort by up to 80%.",
    "Accelerated automation script development using AI.",
    "Improved regression execution efficiency.",
    "Reduced flaky test maintenance through self-healing locators.",
    "Enhanced defect analysis using AI-powered root cause identification.",
    "Automated synchronization between Jira and Zephyr.",
    "Provided real-time QA insights through executive dashboards.",
    "Improved release confidence with end-to-end AI-assisted testing.",
  ],

  techUsed: [
    "React",
    "TypeScript",
    "Vite",
    "Tailwind CSS",
    "FastAPI",
    "Python",
    "SQLAlchemy",
    "Alembic",
    "PostgreSQL",
    "Redis",
    "Docker",
    "JWT Authentication",
    "Playwright",
    "Jira API",
    "Zephyr API",
    "OpenAI",
    "Claude",
    "REST APIs",
    "GitHub",
  ],

  result:
    "Successfully built an enterprise-ready AI-powered QA platform that automates the complete testing lifecycle—from requirement analysis and intelligent test generation to self-healing automation, execution, AI-driven root cause analysis, and seamless Jira and Zephyr integration. The platform significantly improves QA productivity, software quality, and release efficiency while providing actionable insights through real-time dashboards.",
},
    },
    {
      id: "server-api-monitoring",
      title: "🚀 Real-Time Server & API Monitoring System",
      status: "Production",
      desc: "A production-grade monitoring system built at Dyad Tech that continuously watches server uptime and API health, firing real-time alerts the moment something breaks — cutting detection time and improving release confidence.",
      builtWith: ["ChatGPT", "Claude AI"],
      tech: ["Java", "Selenium", "REST APIs", "Postman", "Jenkins", "SQL"],
      placeholder: false,
      caseStudy: {
        overview:
          "Designed and developed a production-grade monitoring system at Dyad Tech to continuously monitor server uptime, API availability, and application health. The solution provides real-time alerts whenever a server or critical API becomes unavailable, enabling faster incident response and improving production reliability.",
        features: [
          {
            icon: "🖥️",
            title: "Server Uptime Monitoring",
            points: [
              "Continuously monitors production servers (24×7).",
              "Detects server downtime and service interruptions.",
              "Tracks overall system availability.",
            ],
          },
          {
            icon: "🌐",
            title: "API Health Monitoring",
            points: [
              "Validates critical REST API endpoints.",
              "Detects HTTP 4xx/5xx errors.",
              "Monitors API response status and availability.",
            ],
          },
          {
            icon: "⏱️",
            title: "Response Time Tracking",
            points: [
              "Measures API latency in real time.",
              "Identifies slow-performing services.",
              "Detects timeout scenarios before they impact users.",
            ],
          },
          {
            icon: "🔔",
            title: "Instant Notifications",
            points: [
              "Sends real-time alerts on failures.",
              "Notifies QA and Engineering teams immediately.",
              "Helps reduce Mean Time to Detect (MTTD).",
            ],
          },
          {
            icon: "📊",
            title: "Production Health Dashboard",
            points: [
              "Displays live service status.",
              "Tracks uptime trends and system health.",
              "Provides quick visibility into production stability.",
            ],
          },
          {
            icon: "🛠️",
            title: "Deployment Validation",
            points: [
              "Automatically verifies application health after every production deployment.",
              "Confirms critical business services are functioning as expected.",
            ],
          },
          {
            icon: "🤝",
            title: "Cross-Team Collaboration",
            points: [
              "Worked closely with Developers, DevOps, and Product teams.",
              "Assisted in rapid issue identification and root cause analysis.",
            ],
          },
        ],
        impact: [
          "Reduced manual production health checks.",
          "Accelerated production issue detection.",
          "Improved application reliability and release confidence.",
          "Enabled proactive monitoring instead of reactive troubleshooting.",
          "Enhanced operational visibility for critical business services.",
        ],
        techUsed: ["Java", "Selenium", "REST APIs", "Postman", "Jenkins", "SQL", "Monitoring Scripts", "Email Notifications", "Real-Time Alerting", "Production Monitoring"],
        result:
          "Implemented a reliable monitoring solution that improved production stability by providing continuous server and API health monitoring, enabling teams to identify and resolve issues quickly while minimizing service downtime.",
      },
    },
    {
      id: "ai-tool-placeholder-2",
      title: "🤖 AI-Powered Test Case Generation Platform",
      status: "Production",
      desc: "Designed and developed an AI-powered Test Case Generation Platform to accelerate software testing by automatically generating comprehensive, high-quality test cases from user stories, requirements, APIs, and functional specifications. The platform leverages Large Language Models (LLMs), RAG, MCP, and a Multi-Agent architecture to create, verify, review, and publish test cases with minimal manual effort",
      builtWith: ["ChatGPT", "GitHub Copilot","LLM", "Claude AI", "RAG", "MCP", "Multi-Agent Architecture"],
      tech: ["Java", "Python", "javascript", "Selenium", "Rest Assured", "SQL","RBAC","D&A"],
      placeholder: true,
      caseStudy: {
  overview:
    "Designed and developed an AI-powered Test Case Generation Platform to automate software testing using Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), and a Multi-Agent architecture. The platform intelligently generates comprehensive test cases from user stories, requirements, APIs, and functional specifications, automatically reviews them for quality, ensures maximum requirement coverage, and publishes approved test cases directly to Zephyr.",

  features: [
    {
      icon: "🤖",
      title: "AI Test Case Generation",
      points: [
        "Generates detailed test cases from user stories and requirements.",
        "Creates positive, negative, boundary, exploratory, and regression scenarios.",
        "Automatically generates preconditions, test data, steps, and expected results.",
      ],
    },
    {
      icon: "🎯",
      title: "Requirement Coverage Analysis",
      points: [
        "Maps test cases to business requirements.",
        "Identifies uncovered scenarios automatically.",
        "Ensures near-complete functional coverage with traceability.",
      ],
    },
    {
      icon: "🧪",
      title: "Edge Case Intelligence",
      points: [
        "Automatically generates boundary value and negative test scenarios.",
        "Identifies hidden edge cases using AI reasoning.",
        "Improves defect detection before production deployment.",
      ],
    },
    {
      icon: "📚",
      title: "RAG Knowledge Engine",
      points: [
        "Retrieves project documentation, APIs, and business rules.",
        "Generates context-aware test cases using enterprise knowledge.",
        "Reduces hallucinations by grounding AI responses with project data.",
      ],
    },
    {
      icon: "🔌",
      title: "MCP Integration",
      points: [
        "Connects AI agents with enterprise tools using Model Context Protocol.",
        "Accesses Jira, Confluence, APIs, and documentation securely.",
        "Provides seamless AI workflow orchestration.",
      ],
    },
    {
      icon: "👥",
      title: "Multi-Agent AI Workflow",
      points: [
        "Requirement Analysis Agent interprets business requirements.",
        "Test Design Agent generates intelligent test scenarios.",
        "Coverage Agent validates requirement mapping.",
        "Review Agent verifies quality and removes duplicate test cases.",
        "Publishing Agent uploads approved test cases automatically.",
      ],
    },
    {
      icon: "✅",
      title: "AI Review & Verification",
      points: [
        "Automatically reviews generated test cases.",
        "Validates formatting, consistency, and completeness.",
        "Detects duplicate or low-quality scenarios before publishing.",
      ],
    },
    {
      icon: "📤",
      title: "Automatic Zephyr Integration",
      points: [
        "Publishes approved test cases directly to Zephyr.",
        "Creates folders, suites, and requirement mappings.",
        "Eliminates manual test management effort.",
      ],
    },
    {
      icon: "📊",
      title: "AI Analytics Dashboard",
      points: [
        "Tracks AI token consumption and usage statistics.",
        "Monitors generation success rate and execution metrics.",
        "Provides cost analysis and performance insights.",
      ],
    },
    {
      icon: "⚡",
      title: "Prompt Engineering",
      points: [
        "Uses optimized prompt templates for consistent output.",
        "Supports reusable prompt libraries.",
        "Improves AI accuracy through prompt optimization.",
      ],
    },
  ],

  impact: [
    "Reduced manual test case creation effort by up to 80%.",
    "Accelerated QA planning through AI-assisted automation.",
    "Improved requirement traceability and test coverage.",
    "Standardized test case quality across teams.",
    "Reduced duplicate and redundant test scenarios.",
    "Enabled automatic publishing of validated test cases to Zephyr.",
    "Improved overall QA productivity and release confidence.",
  ],

  techUsed: [
    "LLMs",
    "OpenAI",
    "Claude",
    "RAG",
    "MCP",
    "Multi-Agent AI",
    "Prompt Engineering",
    "Python",
    "Java",
    "REST APIs",
    "Zephyr API",
    "Jira",
    "Confluence",
    "SQL",
    "Vector Database",
    "JSON",
    "Dashboard Analytics",
    "RBAC",
  ],

  result:
    "Built an enterprise-grade AI-powered QA platform that automates end-to-end test case generation, intelligently validates coverage through a multi-agent review system, leverages RAG and MCP for project-aware context, and seamlessly publishes approved test cases into Zephyr, significantly improving QA efficiency, consistency, and release readiness.",
},
    },
  ],

  testimonials: [
    { quote: "Looking to grow your QA team? I highly recommend , a skilled QA Automation Engineer with a keen eye for detail and a deep understanding of automation frameworks. Their expertise in [Automation/selenium/java] and commitment to quality assurance make them a valuable asset to any team. Connect with them!", author: "Team Lead", role: "Dyad Tech" },
    { quote: "He treats test code like product code — clean architecture, documentation, and genuinely great engineering practices.", author: "Senior Developer", role: "VBS Project" },
    { quote: "Strong ownership, sharp automation instincts, and always pushing the team toward AI-assisted efficiency.", author: "QA Manager", role: "Rydot Intuit" },
    { quote: "One of the few QA engineers who can hold their own in an architecture discussion — thinks like a builder, not just a tester.", author: "Product Manager", role: "Convisor Technology" },
  ],

  blogs: [
    {
      title: "Building an AI Agent That Writes Your Test Cases",
      excerpt: "How I wired ChatGPT and Claude AI into a pipeline that reads user stories and pushes ready-to-run test cases into Zephyr Scale.",
      tags: ["AI", "Test Automation", "LLM"],
      readingTime: "7 min",
      url: "#", placeholder: true,
    },
    {
      title: "80% Automation Coverage: Lessons from an Insurance Platform",
      excerpt: "What it actually takes to automate regression on a regulated U.S. insurance platform without breaking compliance.",
      tags: ["Selenium", "AccelQ", "Insurance"],
      readingTime: "6 min",
      url: "#", placeholder: true,
    },
    {
      title: "Prompt Engineering for QA: Testing LLM Applications",
      excerpt: "A practical framework for validating conversational AI — prompt-response accuracy, context retention, and edge-case prompts.",
      tags: ["Prompt Engineering", "LLM Testing"],
      readingTime: "8 min",
      url: "#", placeholder: true,
    },
  ],

  chatFAQ: [
    { keys: ["experience", "years", "how long"], answer: "Alok has 8+ years of QA automation experience across Convisor Technology, Rydot Intuit, and Dyad Tech." },
    { keys: ["ai", "llm", "chatgpt", "claude"], answer: "Alok builds AI-powered testing tools — including a custom agent that generates test cases from user stories using ChatGPT and Claude AI, integrated with Zephyr Scale." },
    { keys: ["tools", "tech", "stack", "skills"], answer: "Core stack: Selenium WebDriver, AccelQ, TestNG, Rest Assured, Postman, Java/Python/JavaScript, Jenkins, Maven. Also exploring Playwright, Cypress, and Docker." },
    { keys: ["contact", "hire", "email", "reach"], answer: "Best way to reach Alok is via the contact form below, or email aloknayak2013@gmail.com directly." },
    { keys: ["resume", "cv", "download"], answer: "You can download Alok's resume using the 'Download Resume' button in the hero section or navbar." },
    { keys: ["available", "hire", "work", "freelance"], answer: "Alok is currently available for new opportunities — check the status badge in the About section." },
  ],
};
