import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Calendar } from "lucide-react";
import { siteData } from "../../data/siteData";

export const ExperienceTimeline = () => {
  const events = siteData.experience;
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [rowPercents, setRowPercents] = useState<number[]>([]);

  // Continuous scroll-linked fill, matching the reference's own mechanism —
  // tracked against `gridRef` (the CSS-Grid container whose height is
  // guaranteed correct), not the window/whole page. `smoothProgress` is a
  // MotionValue in [0,1]; the line overlay's height is bound to it directly
  // as a percentage, so it is structurally capped at 100% of this same
  // correctly-sized parent and can never exceed or float past the cards.
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ["start center", "end center"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Cards have very different heights (achievement counts differ), so a
  // naive i/N split doesn't land on each dot's real position. Measure each
  // row's actual vertical center as a fraction of the grid's total height,
  // and light a dot only once the line's progress has genuinely reached it —
  // this is what keeps the glowing tip and the dots visually connected.
  useEffect(() => {
    function measure() {
      const grid = gridRef.current;
      if (!grid) return;
      const gridRect = grid.getBoundingClientRect();
      if (!gridRect.height) return;
      setRowPercents(
        rowRefs.current.map((row) => {
          if (!row) return 0;
          const r = row.getBoundingClientRect();
          return (r.top + r.height / 2 - gridRect.top) / gridRect.height;
        })
      );
    }
    measure();
    // re-measure shortly after mount too, in case web-font loading reflows
    // the card text (and therefore each row's height) after first paint
    const timeoutId = window.setTimeout(measure, 500);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("resize", measure);
    };
  }, [events.length]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      let idx = -1;
      for (let i = 0; i < rowPercents.length; i++) {
        if (v >= rowPercents[i]) idx = i;
      }
      setActiveIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, rowPercents]);

  return (
    <section id="experience" className="w-full max-w-7xl mx-auto px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Career <span className="text-gradient-primary">Journey</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          8+ years across insurance, fintech-adjacent, and enterprise SaaS platforms.
        </p>
      </motion.div>

      {/*
        CSS Grid, not absolute positioning: the connector line spans
        `gridRow: 1 / -1`, so its total height is derived directly from the
        row tracks the cards actually occupy — it cannot desync from content.
      */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-[1fr_2px_1fr] md:gap-x-10 gap-y-8 md:gap-y-14">
        <div className="relative hidden md:block md:col-start-2" style={{ gridRow: `1 / ${events.length + 1}` }}>
          <div className="w-full h-full rounded-full overflow-hidden bg-border/40">
            <motion.div
              className="w-full rounded-full"
              style={{
                height: progressHeight,
                background: "linear-gradient(to bottom, #22d3ee, #6366f1, #a855f7)",
                boxShadow: "0 0 15px rgba(99,102,241,0.5), 0 0 25px rgba(168,85,247,0.3)",
              }}
            />
          </div>
          {/* Floating "you are here" marker — sits at the exact tip of the
              growing line above, separate from the per-card dots, and
              continuously pulses. Bound to the same progressHeight value
              driving the line, so it can never drift from its actual tip. */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ top: progressHeight }}
          >
            <motion.div
              className="w-5 h-5 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(99,102,241,0.5) 40%, rgba(34,211,238,0) 70%)",
                boxShadow: "0 0 15px 4px rgba(168,85,247,0.6), 0 0 25px 8px rgba(99,102,241,0.4), 0 0 40px 15px rgba(34,211,238,0.2)",
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {events.map((exp, i) => {
          const isReached = i <= activeIndex;
          const isCurrentStop = i === activeIndex;
          return (
            <div
              key={exp.company}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className={`relative pl-8 border-l-2 border-primary/15 md:pl-0 md:border-l-0 ${
                i % 2 === 0 ? "md:col-start-1" : "md:col-start-3"
              }`}
              style={{ gridRow: i + 1 }}
            >
              {/* Mobile dot — always a hollow ring; only the border lights up once reached */}
              <motion.span
                className={`md:hidden absolute -left-[7px] top-6 w-3.5 h-3.5 rounded-full border-2 bg-background transition-colors duration-300 ${
                  isReached ? "border-primary" : "border-muted-foreground/40"
                }`}
                animate={isReached ? { boxShadow: ["0 0 0px rgba(139,92,246,0)", "0 0 10px rgba(139,92,246,0.6)", "0 0 0px rgba(139,92,246,0)"] } : {}}
                transition={{ duration: 1.2, repeat: isCurrentStop ? Infinity : 0, repeatDelay: 3 }}
              />
              {/* Desktop dot — hollow ring on the shared line; border lights up once reached */}
              <motion.span
                className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 bg-background z-10 transition-colors duration-300 ${
                  i % 2 === 0 ? "-right-[53px]" : "-left-[53px]"
                } ${isReached ? "border-primary" : "border-muted-foreground/40"}`}
                animate={isReached ? { boxShadow: ["0 0 0px rgba(99,102,241,0)", "0 0 12px rgba(99,102,241,0.6)", "0 0 0px rgba(99,102,241,0)"] } : {}}
                transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <div className="glass-panel rounded-2xl border border-foreground/10 shadow-md p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm font-bold text-primary">{exp.duration}</span>
                    {exp.current && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-500">
                        CURRENT
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{exp.role}</h3>
                  <p className="text-muted-foreground font-semibold mb-4">
                    {exp.company} · {exp.location}
                  </p>

                  <ul className="space-y-2.5 mb-4">
                    {exp.achievements.map((a, j) => (
                      <li key={j} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2.5">
                        <span className="text-primary mt-1 shrink-0">▸</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-foreground/5 border border-foreground/10 text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
