# Alok Kumar Nayak — Portfolio Site

Premium dark-glassmorphism portfolio for a Senior QA/AI Automation Engineer (8+ yrs). Built as a **static site — plain HTML/CSS/JS, no build step, no framework** — because this machine has no Node/npm/Homebrew installed. Do not introduce a bundler, npm, or a framework unless the environment changes; keep everything runnable by opening the files directly / serving them statically.

## Run it

```bash
cd /Users/alokkumarnayak/Downloads/alok
python3 -m http.server 8765
```
Open `http://localhost:8765`. (Plain `file://` can break the `fetch()` calls in `widgets.js` in some browsers — always serve it.)

## File map

| File | Purpose |
|---|---|
| `index.html` | Page shell — every section is mostly empty mount points (`id="xGrid"` etc.) filled by JS on load |
| `javascript/data.js` | **`SITE_DATA`** — single source of truth for ALL content (bio, stats, skills, experience, certs, projects, AI tools, testimonials, blogs, chat FAQ). Edit content here, not in the HTML. |
| `javascript/main.js` | Renders `SITE_DATA` into the DOM + all interactions: loader, particle bg, Three.js hero wireframe, Lenis smooth scroll, GSAP ScrollTrigger reveals, nav/dock/theme, command palette (⌘K), magnetic buttons, tilt cards, contact form, lightbox |
| `javascript/widgets.js` | Live data: GitHub repos/contribution graph, Open-Meteo weather (Ahmedabad), Hacker News feed, local visitor counter, IST clock, rule-based AI chat assistant |
| `javascript/case-study.js` | Renders a single case-study detail page from `?id=<toolId>`, reading `SITE_DATA.aiTools[].caseStudy` |
| `case-study.html` | Generic template page for the above — one URL works for every AI-tool case study |
| `css/style.css` | Full design system: tokens (`--bg`, `--accent` #00E5FF, `--accent-2` #7C3AED, etc.), dark default + light theme override, every component/section style |
| `css/case-study.css` | Extra styles just for the case-study page |
| `resume/Alok_Kumar_Nayak_Resume.pdf` | Real resume, wired to all "Download Resume" buttons |
| `img/certificates/` | Certificate photos, referenced by filename in `SITE_DATA.certifications[].image` |

## Content model (in `data.js`)

- **`experience`** / **`education`** / **`certifications`** — real, from the user's actual resume. Don't invent employers, dates, or metrics.
- **`skills.core`** — resume-verified tools only. **`skills.exploring`** — extra tools (Playwright, Cypress, Docker, etc.) the user is *exploring*, explicitly not claimed as production experience. Keep this distinction; it was a deliberate accuracy call.
- **`projects`** — real QA/work deliverables (badge: "Real — Production" or "Practice Project").
- **`aiTools`** — a *separate* section (own nav entry, own grid, between Projects and Experience) for side tools built leveraging AI coding assistants. Each entry has a `status` of exactly `"Production"`, `"Freelancing"`, or `"Personal"` (rendered as a colored pill — see `STATUS_META` in `main.js`). If an entry has a `caseStudy: {...}` object, a "View Details" button appears linking to `case-study.html?id=<id>`; if not, no button. Two placeholder entries (`[Add your AI-built tool name]`) are still unfilled — ask the user for real ones before removing the placeholder brackets.
- Fields with `placeholder: true` (LeetCode/Medium social links, some cert `verifyUrl: "#"`, blog posts) are intentionally fake/pending — don't silently "fix" them without asking; ask the user for the real link.
- **Certifications logic**: if `verifyUrl` is a real link → the arrow button opens it in a new tab. If not → it opens the cert `image` in a lightbox instead. All 9 real certificate images are already wired.

## Things already fixed — don't reintroduce

- **Lenis must be driven by exactly one clock.** `main.js`'s `initScroll()` drives Lenis via `gsap.ticker` only (falls back to a raw rAF loop *only* if GSAP isn't loaded). Running both simultaneously previously caused the page to visibly drift up/down with no user input — two unsynchronized time sources fighting Lenis's momentum calc.
- `window.lenis` **must** be set (not just a local `lenis` var) — `scrollToId()` checks `window.lenis` to route through Lenis's own `.scrollTo()`; otherwise nav clicks fall back to native `scrollIntoView` and fight Lenis's hijacked scrolling.
- `const SITE_DATA = {...}` in a classic (non-module) `<script>` does **not** attach to `window`. Any script checking for its presence must test the bare identifier (`typeof SITE_DATA !== "undefined"`), not `window.SITE_DATA` — this exact mistake broke `case-study.js` once already.
- No custom cursor. It existed early on (round dot + glow) but was removed entirely per user request — plain system arrow everywhere. Don't re-add it.
- The hero portrait ring does **not** rotate (explicitly disabled per user request) — it's a static conic-gradient with hard color-stop bands (no smooth blend, no transparent gaps — also explicit asks).
- `.dock-item:hover`/`.active` sets `color: #04121A` for icon contrast; the `.dock-tip` tooltip span must keep its own explicit `color: var(--text)` or it inherits that near-black color onto a dark tooltip background and becomes unreadable.
- CountAPI.xyz (the free visitor-counter service) is dead (DNS doesn't resolve). The visitor counter is local-only (`localStorage`), labeled "Your visits" — don't wire it back to CountAPI.

## Environment notes

- No Node/npm/Homebrew/browser-automation tooling available in the shell — verification is done via `curl` (asset/API reachability, HTML id ↔ JS selector consistency) plus asking the user to eyeball the actual browser render. `python3` and `pip3` are available.
- CDN deps (loaded in `index.html`): GSAP + ScrollTrigger, Three.js r128, Lenis — all fetched from public CDNs, confirmed reachable.
- Live widgets call public, no-key APIs: GitHub REST API, Open-Meteo, Hacker News Firebase API, `ghchart.rshah.org` (contribution graph image).

## Still pending / open placeholders

- LeetCode + Medium URLs (`socials`, currently `"#"`)
- 2 unfilled `aiTools` placeholder cards
- Several certification `verifyUrl`s still `"#"` (AccelQ base cert, JIRA, Application Security, Rookie Award, ESET, Generative AI) — image-only lightbox fallback is active for these
- Blog posts are placeholder concepts, not published anywhere yet
- Testimonials are generic/anonymized (no real names supplied)
