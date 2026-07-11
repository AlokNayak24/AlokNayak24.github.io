<div align="center">

# Alok Kumar Nayak

### Senior QA Automation Engineer &nbsp;·&nbsp; AI/LLM Test Automation Specialist

A premium, dark-glassmorphism portfolio built with **zero frameworks and zero build tooling** —
plain HTML, CSS, and JavaScript, engineered to feel like a product, not a template.

[**Live Site →**](https://AlokNayak24.github.io) &nbsp;|&nbsp; [Résumé](resume/Alok_Kumar_Nayak_Resume.pdf) &nbsp;|&nbsp; [LinkedIn](https://www.linkedin.com/in/alok-kumar-nayak) &nbsp;|&nbsp; [GitHub](https://github.com/AlokNayak24)

![No Framework](https://img.shields.io/badge/framework-none-00E5FF?style=for-the-badge&logoColor=white)
![No Build Step](https://img.shields.io/badge/build_step-none-7C3AED?style=for-the-badge)
![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r128-000000?style=for-the-badge&logo=three.js&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-lightgrey?style=for-the-badge)

</div>

---

## Why this exists

Most engineering portfolios are a resume pasted into a template. This one is built the way I test software:
**deliberately, with an eye for edge cases, and with real production data** — every stat, role, and
certification here comes straight from an 8+ year QA/AI-automation career, not filler copy.

The build constraint was the point: no Node, no npm, no bundler on the target machine — so the entire
site had to be production-grade using nothing but a browser's native capabilities. That constraint forced
disciplined architecture: a single data layer, render-on-load components, and hand-rolled interaction
systems instead of pulling in a library for each one.

## What's inside

| Capability | Implementation |
|---|---|
| **3D interactive hero** | Custom Three.js (r128) wireframe scene, no scene-graph abstraction library |
| **Buttery scroll + reveals** | Lenis smooth-scroll driven by a single `gsap.ticker` clock, synced with GSAP ScrollTrigger |
| **Command palette (⌘K)** | Fuzzy-searchable, keyboard-driven navigation across the entire site |
| **Live GitHub panel** | Real-time repos + contribution graph via the GitHub REST API and `ghchart.rshah.org` |
| **Live weather widget** | Ahmedabad conditions via the Open-Meteo API (no API key required) |
| **Live Hacker News feed** | Top stories pulled from the HN Firebase API |
| **Rule-based AI chat assistant** | In-page FAQ bot answering questions about my experience, skills, and projects |
| **Magnetic buttons + tilt cards** | Cursor-reactive micro-interactions, hand-written (no interaction library) |
| **Dynamic case studies** | One generic template (`case-study.html`) renders any AI-tool deep-dive from a single `?id=` param |
| **Dark/light theming** | Full design-token system, instant no-flash theme switch |
| **Accessible, responsive layout** | Mobile-first, semantic HTML, reduced-motion-aware animation |

## Tech stack

```
Markup / Styles     HTML5 · CSS3 (custom properties, no preprocessor)
Interactivity       Vanilla JavaScript (ES6+, no transpilation)
3D                  Three.js r128
Motion              GSAP + ScrollTrigger, Lenis
Data                Single JS object (SITE_DATA) — one source of truth
Live data           GitHub REST API · Open-Meteo · Hacker News (Firebase) API
Hosting             GitHub Pages (static, CDN-served)
Tooling             None — open two files and it runs
```

**Deliberate non-choices:** no React/Vue/Svelte, no Webpack/Vite/esbuild, no CSS framework, no jQuery.
Every animation, every widget, every layout system is legible in a single file with no build artifact
standing between the source and what ships.

## Architecture

```
index.html                  → page shell; sections are empty mount points ("#xGrid") filled at runtime
case-study.html              → one generic template for every AI-tool case study
javascript/
  ├─ data.js                 → SITE_DATA: the single source of truth for all content
  ├─ main.js                 → renders SITE_DATA into the DOM + owns every interaction system
  ├─ widgets.js               → live external data: GitHub, weather, HN, visitor count, IST clock, chat
  └─ case-study.js           → reads SITE_DATA.aiTools[].caseStudy for the ?id= in the URL
css/
  ├─ style.css               → full design system: tokens, dark/light themes, every component
  └─ case-study.css          → case-study page extensions
resume/                      → real, current résumé — wired to every "Download Resume" CTA
img/certificates/            → real certificate images, rendered in a lightbox
```

**Content model:** everything the page renders — bio, stats, skills, experience, certifications,
projects, AI tools, testimonials — lives in `javascript/data.js`. Updating the site is a data edit,
never a markup edit. `main.js` never hardcodes copy; it only knows how to *render* `SITE_DATA`.

**One clock for scroll physics:** Lenis is driven by `gsap.ticker` exclusively — a raw `requestAnimationFrame`
fallback only engages if GSAP fails to load. Two competing clocks previously caused visible scroll drift;
fixing that taught the lesson permanently baked into the architecture now.

## Run it locally

No install step. No `npm install`. Clone and serve.

```bash
git clone https://github.com/AlokNayak24/AlokNayak24.github.io.git
cd AlokNayak24.github.io
python3 -m http.server 8765
```

Open **http://localhost:8765**.

> Serve it — don't open `index.html` directly via `file://`. The live widgets in `widgets.js` use
> `fetch()`, which several browsers block under the `file://` origin.

## Engineering highlights (for reviewers)

- **Zero-dependency interaction engineering** — magnetic buttons, tilt cards, and the command palette
  are implemented from first principles against raw pointer/keyboard events, not composed from a library.
- **Single source of truth** — `SITE_DATA` means content changes never touch markup, and markup changes
  never touch content. Classic separation of concerns, enforced by file boundaries rather than convention.
- **Verified, not assumed** — this environment has no browser-automation tooling, so every integration
  (asset reachability, public API endpoints, HTML-id ↔ JS-selector consistency) is verified via `curl`
  and static analysis before being called done.
- **Honesty over polish** — skills are split into `core` (resume-verified, production experience) and
  `exploring` (tools I'm actively learning but haven't shipped with). Nothing here is inflated.

## Status

Actively maintained. Currently backfilling: verified certificate links, published blog posts, and two
in-progress AI-tool case studies.

## Contact

**Alok Kumar Nayak** — Ahmedabad, India
[aloknayak2013@gmail.com](mailto:aloknayak2013@gmail.com) · [LinkedIn](https://www.linkedin.com/in/alok-kumar-nayak) · [GitHub](https://github.com/AlokNayak24)

<div align="center">

*If you're reading this as a hiring manager: the site you're looking at is itself a work sample —
built, tested, and shipped the same way I'd approach a quality engineering problem on your team.*

</div>
