import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { Search, ArrowRight, Sun, Download, Copy, Github, Linkedin, Check } from "lucide-react";
import { siteData, NAV_SECTIONS } from "../../data/siteData";

interface Action {
  id: string;
  label: string;
  group: string;
  icon: React.ReactNode;
  run: () => void;
}

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lenis = useLenis();

  const goTo = (id: string) => {
    if (lenis) lenis.scrollTo(`#${id}`);
    else document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  const actions: Action[] = useMemo(
    () => [
      ...NAV_SECTIONS.map((s) => ({
        id: `nav-${s.id}`,
        label: `Go to ${s.label}`,
        group: "Navigate",
        icon: <ArrowRight className="w-4 h-4" />,
        run: () => goTo(s.id),
      })),
      {
        id: "theme",
        label: "Toggle light / dark theme",
        group: "Actions",
        icon: <Sun className="w-4 h-4" />,
        run: () => {
          const isDark = document.documentElement.classList.toggle("dark");
          localStorage.setItem("theme", isDark ? "dark" : "light");
        },
      },
      {
        id: "resume",
        label: "Download résumé",
        group: "Actions",
        icon: <Download className="w-4 h-4" />,
        run: () => {
          const a = document.createElement("a");
          a.href = siteData.identity.resumeUrl;
          a.download = "";
          a.click();
        },
      },
      {
        id: "copy-email",
        label: "Copy email address",
        group: "Actions",
        icon: <Copy className="w-4 h-4" />,
        run: () => {
          navigator.clipboard?.writeText(siteData.identity.email);
          setFeedback("Email copied to clipboard");
          window.setTimeout(() => setFeedback(null), 2000);
        },
      },
      {
        id: "github",
        label: "Open GitHub profile",
        group: "Links",
        icon: <Github className="w-4 h-4" />,
        run: () => window.open(siteData.socials.find((s) => s.icon === "github")?.url, "_blank"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn profile",
        group: "Links",
        icon: <Linkedin className="w-4 h-4" />,
        run: () => window.open(siteData.socials.find((s) => s.icon === "linkedin")?.url, "_blank"),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      window.setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const action = filtered[activeIndex];
      if (action) {
        action.run();
        setOpen(false);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-6 right-6 z-40 hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel border border-foreground/10 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Search</span>
        <kbd className="px-1.5 py-0.5 rounded bg-foreground/10 text-[10px] font-mono">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 md:pt-32 px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg glass-panel rounded-2xl border border-foreground/10 shadow-2xl overflow-hidden bg-card/95"
            >
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/60">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyNav}
                  placeholder="Jump to a section or run an action…"
                  className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground/60"
                />
                <kbd className="px-1.5 py-0.5 rounded bg-foreground/10 text-[10px] font-mono text-muted-foreground">esc</kbd>
              </div>

              <div className="max-h-80 overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-6">No matches.</p>
                )}
                {filtered.map((action, i) => (
                  <button
                    key={action.id}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => {
                      action.run();
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                      i === activeIndex ? "bg-primary/10 text-primary" : "text-foreground hover:bg-foreground/5"
                    }`}
                  >
                    <span className="text-muted-foreground">{action.icon}</span>
                    <span className="flex-1">{action.label}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">{action.group}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-2 px-4 py-2.5 rounded-full glass-panel border border-emerald-500/30 text-sm font-semibold text-emerald-500 shadow-lg"
          >
            <Check className="w-4 h-4" /> {feedback}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
