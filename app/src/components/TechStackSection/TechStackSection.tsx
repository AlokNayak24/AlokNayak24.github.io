import { motion } from "framer-motion";
import { siteData } from "../../data/siteData";

const allSkills = siteData.skills.core.flatMap((c) => c.items);

// Real logos only for items with an actual devicon/simple-icons entry —
// verified reachable. Everything else (concepts like "Prompt Engineering",
// niche/commercial tools like "Zephyr Scale", or brands with no public icon
// like "Lovable") falls back to the plain bullet dot rather than a fake or
// generic icon.
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SIMPLE_ICONS = "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons";
const TECH_ICONS: Record<string, string> = {
  ChatGPT: `${SIMPLE_ICONS}/openai.svg`,
  Codex: `${SIMPLE_ICONS}/openai.svg`,
  "Claude Code": `${SIMPLE_ICONS}/claude.svg`,
  "Claude AI": `${SIMPLE_ICONS}/claude.svg`,
  Java: `${DEVICON}/java/java-original.svg`,
  JavaScript: `${DEVICON}/javascript/javascript-original.svg`,
  Python: `${DEVICON}/python/python-original.svg`,
  TypeScript: `${DEVICON}/typescript/typescript-original.svg`,
  HTML: `${DEVICON}/html5/html5-original.svg`,
  CSS: `${DEVICON}/css3/css3-original.svg`,
  MySQL: `${DEVICON}/mysql/mysql-original.svg`,
  PostgreSQL: `${DEVICON}/postgresql/postgresql-original.svg`,
  MongoDB: `${DEVICON}/mongodb/mongodb-original.svg`,
  Playwright: `${DEVICON}/playwright/playwright-original.svg`,
  "Selenium WebDriver": `${DEVICON}/selenium/selenium-original.svg`,
  Postman: `${DEVICON}/postman/postman-original.svg`,
  Jenkins: `${DEVICON}/jenkins/jenkins-line.svg`,
  Maven: `${DEVICON}/maven/maven-original.svg`,
  Git: `${DEVICON}/git/git-original.svg`,
  JIRA: `${DEVICON}/jira/jira-original.svg`,
  "IntelliJ IDE": `${DEVICON}/intellij/intellij-original.svg`,
  Eclipse: `${DEVICON}/eclipse/eclipse-original.svg`,
  "Cucumber/BDD": `${DEVICON}/cucumber/cucumber-plain.svg`,
  "GitHub Copilot": `${DEVICON}/github/github-original.svg`,

  // User-supplied logo files (no public icon-library coverage for these) —
  // symlinked in at public/logo -> ../../alok/logo.
  AccelQ: "logo/accelq.webp",
  TestNG: "logo/testng.png",
  "Rest Assured": "logo/restAssured.webp",
  "Zephyr Scale": "logo/zypher.jpeg",
  "Allure Reports": "logo/allure.jpeg",
  JMeter: "logo/jmeter.png",
  SQL: "logo/sql.png",
  "Agile/Scrum": "logo/Agile.jpeg",
  Lovable: "logo/Lovable.png",
  "Hybrid Framework (Data-Driven, BDD)": "logo/Hybrid Framework.png",
  "SDLC/STLC": "logo/SDLC STLC.png",
  "AI Agent Development": "logo/Ai Agent development.png",
  "Prompt Engineering": "logo/prompt enginearing.png",
  "Page Object Model": "logo/page-object-model.png",
};

// These logos are solid near-black with no dark variant (GitHub #181616,
// OpenAI/Claude default black fill) — invisible on a dark pill background
// unless inverted. The colorful brand logos (MongoDB green, Postgres blue,
// etc.) must NOT get this treatment or their real brand colors break.
const INVERT_IN_DARK = new Set(["GitHub Copilot", "ChatGPT", "Codex", "Claude Code", "Claude AI"]);

// These user-supplied files have a plain opaque white background baked into
// the image itself (verified via PIL — not a guess), which would show as a
// jarring white box on a dark pill. A small white chip behind them looks
// intentional in both themes instead of only breaking in dark mode.
const WHITE_CHIP = new Set([
  "TestNG",
  "Rest Assured",
  "Zephyr Scale",
  "Allure Reports",
  "JMeter",
  "Agile/Scrum",
  "SQL",
  "AI Agent Development",
  "SDLC/STLC",
  "Page Object Model",
]);

const TechStackSection = () => {
  return (
    <div className="w-full py-6 border-t border-b border-foreground/10 bg-foreground/[0.02] flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full overflow-hidden relative flex items-center"
      >
        <div className="absolute left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-[marquee_35s_linear_infinite] whitespace-nowrap items-center hover:[animation-play-state:paused] py-1">
          {[...allSkills, ...allSkills].map((tech, i) => {
            const icon = TECH_ICONS[tech];
            return (
              <div
                key={i}
                className="mx-3 px-5 py-2.5 rounded-full border border-foreground/10 bg-background/80 text-foreground font-medium text-sm flex items-center gap-2.5 transition-all hover:scale-105 hover:border-primary/50 hover:bg-foreground/5 cursor-default shadow-sm shrink-0"
              >
                {icon && WHITE_CHIP.has(tech) ? (
                  <span className="w-5 h-5 rounded-md bg-white p-0.5 flex items-center justify-center shrink-0 overflow-hidden">
                    <img src={icon} alt={tech} className="w-full h-full object-contain" loading="lazy" decoding="async" />
                  </span>
                ) : icon ? (
                  <img
                    src={icon}
                    alt={tech}
                    className={`w-5 h-5 object-contain shrink-0 ${INVERT_IN_DARK.has(tech) ? "dark:invert" : ""}`}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                )}
                <span className="tracking-wide text-xs md:text-sm">{tech}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
};

export default TechStackSection;
