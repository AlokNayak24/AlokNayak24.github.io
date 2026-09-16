import { motion } from "framer-motion";
import { Clock, CloudSun, Github, Newspaper, Users, Star } from "lucide-react";
import { siteData } from "../../data/siteData";
import { useLiveClock } from "../../hooks/useLiveClock";
import { useWeather } from "../../hooks/useWeather";
import { useGithubRepos } from "../../hooks/useGithubRepos";
import { useHackerNews } from "../../hooks/useHackerNews";
import { useVisitorCount } from "../../hooks/useVisitorCount";

const GITHUB_USER = "AlokNayak24";

export const LiveFeedSection = () => {
  const clock = useLiveClock(siteData.identity.timezone);
  const weather = useWeather();
  const { repos, loading: reposLoading } = useGithubRepos(GITHUB_USER);
  const { stories, loading: newsLoading } = useHackerNews(5);
  const visits = useVisitorCount();

  return (
    <section id="live-feed" className="w-full max-w-7xl mx-auto px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
          Live <span className="text-gradient-primary">Feed</span>
        </h2>
        <p className="text-muted-foreground text-lg">Real-time data pulled straight from public APIs — no mocked numbers.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* IST clock */}
        <div className="glass-panel rounded-2xl border border-foreground/10 p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-wider">
            <Clock className="w-4 h-4 text-primary" /> Ahmedabad (IST)
          </div>
          <span className="text-2xl font-mono font-extrabold text-foreground">{clock}</span>
        </div>

        {/* Weather */}
        <div className="glass-panel rounded-2xl border border-foreground/10 p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-wider">
            <CloudSun className="w-4 h-4 text-primary" /> Weather
          </div>
          <span className="text-2xl font-extrabold text-foreground">{weather.temp}</span>
          <span className="text-xs text-muted-foreground">{weather.description}</span>
        </div>

        {/* Visitor counter */}
        <div className="glass-panel rounded-2xl border border-foreground/10 p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4 text-primary" /> Your Visits
          </div>
          <span className="text-2xl font-extrabold text-foreground">{visits ?? "—"}</span>
          <span className="text-xs text-muted-foreground">Tracked locally in your browser</span>
        </div>

        {/* GitHub repo count */}
        <div className="glass-panel rounded-2xl border border-foreground/10 p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-wider">
            <Github className="w-4 h-4 text-primary" /> Public Repos
          </div>
          <span className="text-2xl font-extrabold text-foreground">{reposLoading ? "—" : repos.length}</span>
          <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener" className="text-xs text-primary font-semibold hover:underline">
            @{GITHUB_USER}
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        {/* Recent repos */}
        <div className="glass-panel rounded-2xl border border-foreground/10 p-6">
          <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Github className="w-4 h-4 text-primary" /> Recently Updated Repos
          </h4>
          <div className="space-y-2.5">
            {reposLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
            {!reposLoading && repos.length === 0 && <p className="text-sm text-muted-foreground">Unable to load repos right now.</p>}
            {repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-between gap-3 text-sm py-1.5 border-b border-border/50 last:border-0 hover:text-primary transition-colors group"
              >
                <span className="font-medium text-foreground group-hover:text-primary truncate">{repo.name}</span>
                <span className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                  {repo.language && <span>{repo.language}</span>}
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3" /> {repo.stargazers_count}
                  </span>
                </span>
              </a>
            ))}
          </div>
          <img
            src={`https://ghchart.rshah.org/00E5FF/${GITHUB_USER}`}
            alt="GitHub contribution graph"
            className="w-full mt-4 rounded-lg opacity-90"
            loading="lazy"
          />
        </div>

        {/* Hacker News */}
        <div className="glass-panel rounded-2xl border border-foreground/10 p-6">
          <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-primary" /> Hacker News — Top Stories
          </h4>
          <div className="space-y-2.5">
            {newsLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
            {!newsLoading && stories.length === 0 && <p className="text-sm text-muted-foreground">Unable to load stories right now.</p>}
            {stories.map((story, i) => (
              <a
                key={story.id}
                href={story.url ?? `https://news.ycombinator.com/item?id=${story.id}`}
                target="_blank"
                rel="noopener"
                className="flex items-start gap-2.5 text-sm py-1.5 border-b border-border/50 last:border-0 hover:text-primary transition-colors group"
              >
                <span className="text-muted-foreground font-mono text-xs mt-0.5">{i + 1}.</span>
                <span className="text-foreground group-hover:text-primary leading-snug">{story.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
