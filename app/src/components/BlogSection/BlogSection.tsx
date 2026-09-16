import { motion } from "framer-motion";
import { PenSquare, Clock } from "lucide-react";
import { siteData } from "../../data/siteData";

export const BlogSection = () => {
  return (
    <section id="blog" className="w-full max-w-7xl mx-auto px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <PenSquare className="w-5 h-5" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Writing</h2>
        </div>
        <p className="text-muted-foreground text-lg">Notes on QA automation and AI-assisted testing — coming soon.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {siteData.blogs.map((post, i) => (
          <motion.a
            key={post.title}
            href={post.placeholder ? undefined : post.url}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className={`glass-panel rounded-2xl border border-foreground/10 p-6 flex flex-col relative ${
              post.placeholder ? "cursor-default opacity-80" : "hover:border-primary/30 transition-colors cursor-pointer"
            }`}
          >
            {post.placeholder && (
              <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-foreground/5 border border-foreground/10 text-muted-foreground">
                Coming soon
              </span>
            )}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 border border-primary/20 text-primary">
                  {t}
                </span>
              ))}
            </div>
            <h3 className="font-extrabold text-foreground mb-2 leading-snug">{post.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{post.excerpt}</p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-4 pt-4 border-t border-border/60">
              <Clock className="w-3.5 h-3.5" /> {post.readingTime} read
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};
