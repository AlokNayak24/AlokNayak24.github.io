import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import { MagicCard } from "../lightswind/magic-card";
import { siteData } from "../../data/siteData";

export const ProjectsSection = () => {
  return (
    <section id="projects" className="w-full max-w-7xl mx-auto px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-12 md:mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-center md:text-left">
          Selected <span className="text-gradient-primary">Work</span>
        </h2>
        <p className="text-muted-foreground text-center md:text-left max-w-2xl text-lg">
          QA automation and quality-engineering deliverables — real production work, not mockups.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {siteData.projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: (i % 2) * 0.1, duration: 0.6 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <MagicCard className="h-full rounded-[2rem] border border-foreground/10 p-7">
              <div className="flex items-start justify-between gap-3 mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                    project.badge.startsWith("Real")
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                      : "bg-amber-500/10 border-amber-500/30 text-amber-500"
                  }`}
                >
                  {project.badge}
                </span>
                <a href={project.githubUrl} target="_blank" rel="noopener" className="text-muted-foreground hover:text-primary transition-colors shrink-0">
                  <Github className="w-4 h-4" />
                </a>
              </div>

              <h3 className="text-xl font-extrabold text-foreground tracking-tight mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4">{project.desc}</p>

              <ul className="grid grid-cols-2 gap-1.5 mb-4">
                {project.features.map((f) => (
                  <li key={f} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-foreground/5 border border-foreground/10 text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>

              {project.caseStudy && (
                <a
                  href={project.caseStudyUrl}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all mt-auto"
                >
                  View Case Study <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </MagicCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
