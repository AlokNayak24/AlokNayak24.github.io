import { motion } from "framer-motion";
import { CountUp } from "../lightswind/count-up";
import { siteData } from "../../data/siteData";

export const AboutSection = () => {
  const { about, stats } = siteData;

  return (
    <section id="about" className="w-full max-w-7xl mx-auto px-6 py-10">
      <motion.div
        className="flex flex-col md:flex-row gap-16 items-start"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Quality isn't a phase — <span className="text-gradient-primary">it's an architecture</span>
          </h2>
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-lg text-muted-foreground leading-relaxed mb-4">
              {p}
            </p>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-panel p-6 rounded-2xl border border-foreground/10 hover:border-primary/50 transition-colors group relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
              <CountUp
                value={stat.value}
                suffix={stat.suffix}
                duration={1.6}
                className="text-3xl font-bold text-foreground mb-1 justify-start"
                colorScheme="default"
              />
              <p className="text-sm font-medium text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Principle cards span the full section width (not just the left
          column), so at "2 per row" they stay full-size rather than being
          squeezed into half a column. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
        {about.principles.map((principle, i) => (
          <motion.div
            key={i}
            className="glass-panel p-5 rounded-2xl border border-foreground/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-foreground mb-1">{principle.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{principle.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
