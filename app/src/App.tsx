import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { AboutSection } from "./components/AboutSection/AboutSection";
import { StackSection } from "./components/StackSection/StackSection";
import { ProjectsSection } from "./components/ProjectsSection/ProjectsSection";
import { AiToolsSection } from "./components/AiToolsSection/AiToolsSection";
import { ExperienceTimeline } from "./components/ExperienceSection/ExperienceTimeline";
import { EducationSection } from "./components/EducationSection/EducationSection";
import { CertificationsSection } from "./components/CertificationsSection/CertificationsSection";
import { BlogSection } from "./components/BlogSection/BlogSection";
import { LiveFeedSection } from "./components/LiveFeedSection/LiveFeedSection";
import TestimonialsSection from "./components/TestimonialsSection/TestimonialsSection";
import { ContactSection } from "./components/ContactSection/ContactSection";
import { Footer } from "./components/Footer/Footer";
import { CommandPalette } from "./components/CommandPalette/CommandPalette";
import { ChatAssistant } from "./components/ChatAssistant/ChatAssistant";
import ReactLenis from "lenis/react";
import { Home, User, Layers, FolderKanban, Sparkles, Briefcase, Award, PenSquare, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Dock from "./components/lightswind/dock";

const DOCK_ICONS: Record<string, React.ReactNode> = {
  hero: <Home size={20} />,
  about: <User size={20} />,
  stack: <Layers size={20} />,
  projects: <FolderKanban size={20} />,
  "ai-tools": <Sparkles size={20} />,
  experience: <Briefcase size={20} />,
  certifications: <Award size={20} />,
  blog: <PenSquare size={20} />,
  contact: <Send size={20} />,
};

const DOCK_LABELS: Record<string, string> = {
  hero: "Home",
  about: "About",
  stack: "Stack",
  projects: "Projects",
  "ai-tools": "AI Tools",
  experience: "Experience",
  certifications: "Certs",
  blog: "Writing",
  contact: "Contact",
};

function App() {
  const [showDock, setShowDock] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const shouldShow = currentScrollY > lastScrollY && currentScrollY > window.innerHeight * 0.5;
      const isTop = currentScrollY < window.innerHeight * 0.5;

      if (shouldShow) {
        setShowDock(true);
      } else if (isTop) {
        setShowDock(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const dockItems = Object.keys(DOCK_ICONS).map((id) => ({
    icon: DOCK_ICONS[id],
    label: DOCK_LABELS[id],
    onClick: () => scrollToSection(id),
  }));

  return (
    <div className="bg-transparent min-h-screen relative overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      <ReactLenis root options={{ smoothWheel: true, duration: 1.2 }}>
        <Header />
        <CommandPalette />

        <main className="w-full flex flex-col pt-10 border-none">
          <HeroSection />
          <AboutSection />
          <StackSection />
          <ProjectsSection />
          <AiToolsSection />
          <ExperienceTimeline />
          <EducationSection />
          <CertificationsSection />
          <BlogSection />
          <LiveFeedSection />
          <TestimonialsSection />
          <ContactSection />
        </main>

        <Footer />
        <ChatAssistant />

        <AnimatePresence>
          {showDock && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed bottom-2 left-0 right-0 z-[999] hidden md:block"
            >
              <Dock items={dockItems} panelHeight={56} baseItemSize={44} magnification={66} distance={180} multiBorder />
            </motion.div>
          )}
        </AnimatePresence>
      </ReactLenis>
    </div>
  );
}

export default App;
