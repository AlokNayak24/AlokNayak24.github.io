import { ThemeToggle } from "../components/lightswind/theme-toggle";
import { siteData, STATUS_META, type CaseStudy } from "../data/siteData";

interface ResolvedItem {
  title: string;
  builtWith: string[];
  caseStudy?: CaseStudy;
  badgeLabel: string;
  badgeClass: string;
  backHref: string;
  backLabel: string;
}

function resolveItem(id: string | null): ResolvedItem | null {
  if (!id) return null;

  const tool = siteData.aiTools.find((t) => t.id === id);
  if (tool) {
    const meta = STATUS_META[tool.status];
    return {
      title: tool.title,
      builtWith: tool.builtWith,
      caseStudy: tool.caseStudy,
      badgeLabel: meta.label,
      badgeClass: meta.className,
      backHref: "index.html#ai-tools",
      backLabel: "AI Tools",
    };
  }

  const project = siteData.projects.find((p) => p.id === id);
  if (project) {
    return {
      title: project.title,
      builtWith: project.tech,
      caseStudy: project.caseStudy,
      badgeLabel: project.badge,
      badgeClass: project.badge.startsWith("Real") ? "status-production" : "status-personal",
      backHref: "index.html#projects",
      backLabel: "Projects",
    };
  }

  return null;
}

const BADGE_STYLES: Record<string, string> = {
  "status-production": "bg-emerald-500/10 border-emerald-500/30 text-emerald-500",
  "status-freelancing": "bg-sky-500/10 border-sky-500/30 text-sky-500",
  "status-personal": "bg-violet-500/10 border-violet-500/30 text-violet-400",
};

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-lg text-muted-foreground">Couldn't find that case study.</p>
      <a href="index.html#projects" className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
        ← Back to Portfolio
      </a>
    </div>
  );
}

export function CaseStudyPage() {
  const id = new URLSearchParams(window.location.search).get("id");
  const item = resolveItem(id);

  if (!item || !item.caseStudy) return <NotFound />;
  const cs = item.caseStudy;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 glass-panel border-b border-foreground/10 px-6 py-4 flex items-center justify-between">
        <a href={item.backHref} className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
          ← Back to {item.backLabel}
        </a>
        <ThemeToggle />
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold border mb-5 ${BADGE_STYLES[item.badgeClass] ?? BADGE_STYLES["status-personal"]}`}>
          {item.badgeLabel}
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">{item.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">{cs.overview}</p>
        <div className="flex flex-wrap gap-2 mb-16">
          {item.builtWith.map((b) => (
            <span key={b} className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 border border-primary/20 text-primary">
              {b}
            </span>
          ))}
        </div>

        {cs.features.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-extrabold tracking-tight mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {cs.features.map((f) => (
                <div key={f.title} className="glass-panel rounded-2xl border border-foreground/10 p-6">
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <h4 className="font-bold text-foreground mb-2">{f.title}</h4>
                  <ul className="space-y-1.5">
                    {f.points.map((p, i) => (
                      <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                        <span className="text-primary mt-1 shrink-0">▸</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {cs.impact.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-extrabold tracking-tight mb-6">Business Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cs.impact.map((impact, i) => (
                <div key={i} className="glass-panel rounded-xl border border-foreground/10 p-4 flex items-start gap-3">
                  <span className="text-primary font-bold shrink-0">✓</span>
                  <span className="text-sm text-foreground">{impact}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {cs.techUsed.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-extrabold tracking-tight mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {cs.techUsed.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-foreground/5 border border-foreground/10 text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        {cs.result && (
          <section className="mb-8">
            <div className="glass-panel rounded-2xl border border-primary/20 p-8 bg-primary/5">
              <div className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Result</div>
              <p className="text-foreground leading-relaxed">{cs.result}</p>
            </div>
          </section>
        )}

        <div className="text-center pt-4">
          <a href={item.backHref} className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm inline-block">
            ← Back to {item.backLabel}
          </a>
        </div>
      </main>
    </div>
  );
}
