import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, Code2, PenSquare, Heart } from "lucide-react";
import { MorphingText } from "../lightswind/morphing-text";
import { siteData, NAV_SECTIONS } from "../../data/siteData";

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  leetcode: Code2,
  medium: PenSquare,
};

export const Footer = () => {
  const { identity, socials, titles } = siteData;
  const morphingTexts = [...titles.slice(0, 4), identity.name];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full relative z-10 pt-16 pb-28 md:pb-36 bg-card/60 backdrop-blur-2xl border-t border-black/5 dark:border-white/10 shadow-2xl rounded-t-[3rem] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-primary to-sky-400 p-[1px] shadow-lg">
              <div className="w-full h-full bg-background rounded-[11px] flex items-center justify-center">
                <span className="font-extrabold text-xs tracking-tighter bg-gradient-to-r from-purple-500 to-sky-400 bg-clip-text text-transparent">
                  AN
                </span>
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold tracking-tight text-foreground text-base leading-none">{identity.name}</span>
              <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase mt-0.5">{identity.role}</span>
            </div>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border border-black/5 dark:border-white/10 text-xs font-bold text-foreground hover:text-primary hover:border-primary/40 transition-all shadow-sm cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        <div className="py-12 px-6 rounded-3xl bg-black/[0.015] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 text-center flex flex-col items-center justify-center my-2 shadow-sm">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 shadow-sm">
            Build & Ship Quality
          </span>

          <MorphingText
            texts={morphingTexts}
            morphTime={1.6}
            cooldownTime={0.8}
            className="text-2xl md:text-4xl lg:text-5xl text-foreground font-extrabold min-h-[70px] text-center"
          />
        </div>

        <div className="py-6 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm font-semibold text-muted-foreground">
          {NAV_SECTIONS.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="hover:text-foreground transition-colors hover:scale-105 transform duration-200">
              {link.label}
            </a>
          ))}
        </div>

        <div className="pt-6 border-t border-black/5 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon] ?? Mail;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel={social.url.startsWith("http") ? "noopener" : undefined}
                  aria-label={social.name}
                  className={`w-10 h-10 rounded-full glass-panel border border-black/5 dark:border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:scale-110 transition-all shadow-sm ${social.placeholder ? "opacity-40" : ""}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 font-medium text-center md:text-right">
            <span style={{ fontWeight: 500, color: "inherit" }}>{`© ${new Date().getFullYear()} ${identity.name}. Crafted with`}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline-block" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
