import { useState } from "react";
import { motion } from "framer-motion";
import { Award, ArrowUpRight } from "lucide-react";
import { siteData } from "../../data/siteData";
import { CertLightbox } from "../CertificationsSection/CertLightbox";

// A regular 10-sided polygon ("badge/seal" shape), matching the real Claude
// Academy certificate's own decagon design.
const DECAGON_CLIP =
  "polygon(50% 0%, 79.4% 9.5%, 97.6% 34.5%, 97.6% 65.5%, 79.4% 90.5%, 50% 100%, 20.6% 90.5%, 2.4% 65.5%, 2.4% 34.5%, 20.6% 9.5%)";

export const CompletionBadgesSection = () => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <section id="completion-badges" className="w-full max-w-7xl mx-auto px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Completion Badges</h2>
        </div>
        <p className="text-muted-foreground text-lg">
          Real Claude Academy course-completion certificates — click a badge to view it full-size, or verify it directly.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {siteData.completionBadges.map((badge, i) => (
          <motion.div
            key={badge.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: (i % 8) * 0.06, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center gap-3"
          >
            <button
              onClick={() => setLightboxSrc(badge.image)}
              className="w-full aspect-square overflow-hidden shadow-md transition-transform hover:scale-[1.03]"
              style={{ clipPath: DECAGON_CLIP }}
              title="View certificate"
            >
              <img src={badge.image} alt={badge.title} className="w-full h-full object-cover" loading="lazy" />
            </button>
            <h4 className="font-bold text-sm text-foreground leading-snug px-2">{badge.title}</h4>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Issued {badge.issued}</span>
              <a
                href={badge.verifyUrl}
                target="_blank"
                rel="noopener"
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground hover:text-primary transition-colors"
                title="Verify badge"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <CertLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </section>
  );
};
