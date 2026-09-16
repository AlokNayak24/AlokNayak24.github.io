import { motion } from "framer-motion";
import { Code2, Server, Sparkles } from "lucide-react";
import { siteData, SKILL_PROFICIENCY } from "../../data/siteData";

const allCoreItems = siteData.skills.core.flatMap((c) => c.items);

export const StackSection = () => {
  return (
    <motion.section
      id="stack"
      className="w-full max-w-7xl mx-auto px-6 py-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }}
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          <Code2 className="w-5 h-5" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Tech <span className="text-gradient-primary">Stack</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Technical Arsenal — proficiency bars */}
        <div className="glass-panel p-8 rounded-[2rem] border border-foreground/15 shadow-xl">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/60">
            <h4 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" /> Technical Arsenal
            </h4>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/60 px-3 py-1 rounded-full border border-border/50">
              Proficiency
            </span>
          </div>

          <div className="space-y-6">
            {siteData.skills.core.map((category, i) => {
              const proficiency = SKILL_PROFICIENCY[category.category] ?? 90;
              return (
                <div key={category.category} className="space-y-2.5">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-foreground">{category.category}</span>
                    <span className="font-mono font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full text-xs border border-primary/20">
                      {proficiency}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-muted/60 rounded-full overflow-hidden border border-border/40 p-[1px]">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-600 via-primary to-sky-400 rounded-full relative shadow-[0_0_12px_rgba(139,92,246,0.5)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${proficiency}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_8px_#fff]" />
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tools & Technologies + Currently Exploring */}
        <div className="glass-panel p-8 rounded-[2rem] border border-foreground/15 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/60">
              <h4 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> Tools & Technologies
              </h4>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/60 px-3 py-1 rounded-full border border-border/50">
                Core Stack
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {allCoreItems.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: i * 0.02 }}
                  viewport={{ once: true }}
                  className="px-3.5 py-1.5 rounded-2xl border text-xs font-semibold bg-primary/10 border-primary/20 text-primary shadow-sm"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/60">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Currently Exploring</span>
              <span className="text-[10px] font-bold text-muted-foreground/70">— not yet production</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {siteData.skills.exploring.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full border border-dashed border-foreground/20 bg-foreground/[0.03] text-muted-foreground text-xs font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
