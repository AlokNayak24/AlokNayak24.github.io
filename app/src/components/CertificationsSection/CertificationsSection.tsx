import { useState } from "react";
import { motion } from "framer-motion";
import { Award, ArrowUpRight } from "lucide-react";
import { siteData } from "../../data/siteData";
import { CertLightbox } from "./CertLightbox";

export const CertificationsSection = () => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <section id="certifications" className="w-full max-w-7xl mx-auto px-6 py-10">
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
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Certifications
          </h2>
        </div>
        <p className="text-muted-foreground text-lg">
          Click a certificate with no verify link to view the image; certificates with a real link open verification in a new tab.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {siteData.certifications.map((cert, i) => {
          const hasRealUrl = !!cert.verifyUrl && cert.verifyUrl !== "#";
          return (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-panel rounded-2xl border border-foreground/10 overflow-hidden hover:border-primary/30 transition-colors group"
            >
              <button
                onClick={() => setLightboxSrc(cert.image)}
                className="w-full h-40 overflow-hidden block bg-foreground/5"
              >
                <img
                  src={cert.image}
                  alt={cert.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>
              <div className="p-4">
                <h4 className="font-bold text-sm text-foreground leading-snug mb-1">{cert.name}</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  {cert.issuer} · {cert.year}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    {hasRealUrl ? "Verified" : "View certificate"}
                  </span>
                  {hasRealUrl ? (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener"
                      className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
                      title="Verify"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      onClick={() => setLightboxSrc(cert.image)}
                      className="w-8 h-8 rounded-full bg-foreground/5 border border-foreground/10 text-muted-foreground flex items-center justify-center hover:text-primary hover:border-primary/30 transition-colors"
                      title="View certificate"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <CertLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </section>
  );
};
