import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { MagicCard } from "../lightswind/magic-card";
import { siteData, STATUS_META } from "../../data/siteData";

export const AiToolsSection = () => {
  return (
    <section id="ai-tools" className="w-full max-w-7xl mx-auto px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-12 md:mb-16"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            AI <span className="text-gradient-primary">Tools</span>
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Side tools and platforms built leveraging AI coding assistants — separate from client QA work above.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {siteData.aiTools.map((tool, i) => {
          const meta = STATUS_META[tool.status];
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 2) * 0.1, duration: 0.6 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <MagicCard
                className="h-full rounded-[2rem] border border-foreground/10 p-7"
                gradientColor="rgba(56, 189, 248, 0.12)"
                gradientFrom="#38bdf8"
                gradientTo="#8b5cf6"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                      meta.className === "status-production"
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                        : meta.className === "status-freelancing"
                        ? "bg-sky-500/10 border-sky-500/30 text-sky-500"
                        : "bg-violet-500/10 border-violet-500/30 text-violet-400"
                    }`}
                  >
                    {meta.label}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-foreground tracking-tight mb-2">{tool.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4">{tool.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {tool.builtWith.map((b) => (
                    <span key={b} className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-primary/10 border border-primary/20 text-primary">
                      {b}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {tool.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-foreground/5 border border-foreground/10 text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>

                {tool.caseStudy && (
                  <a
                    href={`case-study.html?id=${tool.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all mt-auto"
                  >
                    View Details <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </MagicCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
