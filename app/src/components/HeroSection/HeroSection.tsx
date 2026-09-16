import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Code2, PenSquare } from "lucide-react";
import TechStackSection from "../TechStackSection/TechStackSection";
import { Button } from "../lightswind/button";
import { Badge } from "../lightswind/badge";
import { HangingIdCard } from "../lightswind/HangingIdCard";
import { AuroraTextEffect } from "../lightswind/aurora-text-effect";
import { DotPattern } from "../lightswind/dot-pattern";
import { siteData } from "../../data/siteData";

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  leetcode: Code2,
  medium: PenSquare,
};

function useTypingEffect(titles: readonly string[]) {
  const [text, setText] = useState("");

  useEffect(() => {
    let titleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId: number;

    const tick = () => {
      const current = titles[titleIndex];
      if (!deleting) {
        charIndex++;
        setText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          timeoutId = window.setTimeout(tick, 1800);
          return;
        }
        timeoutId = window.setTimeout(tick, 55);
      } else {
        charIndex--;
        setText(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          titleIndex = (titleIndex + 1) % titles.length;
          timeoutId = window.setTimeout(tick, 400);
          return;
        }
        timeoutId = window.setTimeout(tick, 28);
      }
    };

    timeoutId = window.setTimeout(tick, 55);
    return () => window.clearTimeout(timeoutId);
  }, [titles]);

  return text;
}

export const HeroSection = () => {
  const typed = useTypingEffect(siteData.titles);
  const { identity, socials } = siteData;

  return (
    <section id="hero" className="relative min-h-[100vh] flex flex-col pt-12 md:pt-16 overflow-hidden bg-background">
      <DotPattern width={16} height={16} cx={1} cy={1} cr={1} glow />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 pb-12">
        <motion.div
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left pt-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6"
          >
            <Badge variant="outline" size="lg" className="gap-2.5 py-1.5 px-4 glass-panel border-foreground/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-muted-foreground">{identity.status}</span>
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-4 text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">Hi, I'm</h1>

            <div className="block dark:hidden">
              <span className="bg-gradient-to-r from-violet-600 via-sky-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-extrabold text-[clamp(3rem,6.5vw,5.5rem)] leading-none tracking-tight block pb-2 select-none">
                {identity.name}
              </span>
            </div>

            <div className="hidden dark:block">
              <AuroraTextEffect
                text={identity.name}
                fontSize="clamp(3rem, 6.5vw, 5.5rem)"
                className="bg-transparent overflow-visible p-0 justify-start"
                textClassName="bg-gradient-to-r from-cyan-400 via-purple-400 to-sky-300 bg-clip-text text-transparent pb-2 font-extrabold"
              />
            </div>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-primary font-semibold max-w-xl mb-2 leading-relaxed w-full min-h-[1.75rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            {typed}
            <span className="inline-block w-[2px] h-5 bg-primary ml-1 align-middle animate-pulse" />
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {siteData.about.tagline}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10 w-full md:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <a href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}>
              <Button size="lg" className="rounded-full px-7 h-12 bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-1">
                View Work <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href={identity.resumeUrl} download>
              <Button size="lg" variant="outline" className="rounded-full px-7 h-12 glass-panel text-foreground font-semibold flex items-center gap-2 hover:bg-foreground/10 transition-all hover:-translate-y-1 border-foreground/10">
                Resume <Download className="w-4 h-4" />
              </Button>
            </a>
          </motion.div>

          <motion.div
            className="flex items-center gap-5 justify-center md:justify-start w-full md:w-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon] ?? Mail;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel={social.url.startsWith("http") ? "noopener" : undefined}
                  title={social.name}
                  className={`text-muted-foreground hover:text-foreground transition-colors hover:-translate-y-1 transform duration-200 ${social.placeholder ? "opacity-40" : ""}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 w-full max-w-md relative flex justify-center items-center py-2"
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <HangingIdCard
            name={identity.name}
            role={identity.role}
            badgeId="AN-QA-2026"
            accentColor="#8b5cf6"
            ropeLength={75}
            ropeColor="#27272a"
            cardWidth="w-72 sm:w-80 md:w-84"
          >
            <div className="flex flex-col h-full bg-card w-full">
              <div className="relative px-5 pt-7 pb-6 flex flex-col items-center bg-gradient-to-br from-purple-700 via-primary to-indigo-950 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

                <div className="mt-1 relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-primary to-purple-400 backdrop-blur-md shadow-2xl border border-white/50 overflow-hidden group">
                  <img
                    src="img/alok.jpeg"
                    alt={identity.name}
                    className="w-full h-full object-cover rounded-full filter contrast-105"
                    loading="eager"
                  />
                  <div className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-md" />
                </div>
              </div>

              <div className="p-5 flex flex-col items-center text-center bg-card text-card-foreground flex-1 gap-3">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight text-foreground">{identity.name}</h3>
                  <div className="inline-flex items-center gap-1.5 mt-1 px-3 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold">
                    <span>{identity.role}</span>
                  </div>
                </div>

                <div className="w-full border-t border-border/60 my-0.5" />

                <div className="grid grid-cols-2 gap-2.5 w-full text-left bg-muted/40 p-3 rounded-xl border border-border/50">
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-widest font-bold">Specialty</span>
                    <span className="font-bold text-foreground text-xs">QA Automation & AI Testing</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-widest font-bold">Location</span>
                    <span className="font-bold text-foreground text-xs">{identity.location}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-widest font-bold">Experience</span>
                    <span className="font-bold text-foreground text-xs">8+ Years</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-widest font-bold">Status</span>
                    <span className="font-bold text-emerald-500 text-xs flex items-center gap-1">● Active</span>
                  </div>
                </div>

                <div className="flex flex-col items-center mt-1 w-full gap-1">
                  <div className="flex gap-[2.5px] items-end h-7 px-3 py-0.5 bg-white/90 dark:bg-black/40 rounded-lg border border-border/40 w-full justify-center">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-foreground rounded-[1px]"
                        style={{
                          width: i % 4 === 0 ? "3.5px" : i % 2 === 0 ? "2px" : "1px",
                          height: `${50 + Math.sin(i * 1.4) * 45}%`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between w-full px-1 text-[10px]">
                    <span className="font-mono font-bold tracking-widest text-primary">AN-QA-2026</span>
                    <span className="text-muted-foreground font-semibold text-[9px] uppercase tracking-wider">SDET · AI TESTING</span>
                  </div>
                </div>
              </div>
            </div>
          </HangingIdCard>
        </motion.div>
      </div>

      <div className="w-full relative z-10 mt-auto">
        <TechStackSection />
      </div>
    </section>
  );
};
