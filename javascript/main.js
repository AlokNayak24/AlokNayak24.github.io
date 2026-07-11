/* ==========================================================================
   MAIN.JS — content rendering + core interactions
   Depends on: SITE_DATA (data.js), GSAP + ScrollTrigger, Three.js, Lenis (CDN)
   ========================================================================== */

(function () {
  "use strict";

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const svgIcons = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.28 5.69.42.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z" opacity="0"/><path d="M22 6 12 13 2 6"/><path d="M2 6h20v12H2z"/></svg>',
    leetcode: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 2 5 11l8.5 9 2.1-2.1-6.4-6.9 6.4-6.9L13.5 2z" opacity=".85"/><path d="M19 15.5h-8v2.2h8v-2.2z"/></svg>',
    medium: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="12" r="4.2"/><ellipse cx="15" cy="12" rx="2.6" ry="4.2"/><ellipse cx="20.5" cy="12" rx="1" ry="4"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>',
  };

  /* ---------------------------------------------------------------------
     RENDER: content from SITE_DATA into DOM mount points
     --------------------------------------------------------------------- */
  function renderAll() {
    renderHeroSocials();
    renderMarquee();
    renderAbout();
    renderStack();
    renderProjects();
    renderAiTools();
    renderTimeline();
    renderCerts();
    renderBlog();
    renderTestimonials();
    renderDock();
    renderCmdk();
    document.getElementById("heroStatus").textContent = SITE_DATA.identity.status.toUpperCase();
  }

  function renderHeroSocials() {
    const wrap = $("#heroSocials");
    wrap.innerHTML = SITE_DATA.socials
      .map(
        (s) => `
      <a class="social-icon${s.placeholder ? " is-placeholder" : ""}" href="${s.url}" target="_blank" rel="noopener" title="${s.name}${s.placeholder ? " (coming soon)" : ""}">
        ${svgIcons[s.icon] || ""}
      </a>`
      )
      .join("");
  }

  function renderMarquee() {
    const items = SITE_DATA.skills.core.flatMap((c) => c.items);
    const html = items.map((t) => `<span>${t.toUpperCase()}</span><span class="dot">•</span>`).join("");
    $("#marqueeTrack").innerHTML = html + html;
  }

  function renderAbout() {
    $("#aboutParagraphs").innerHTML = SITE_DATA.about.paragraphs.map((p) => `<p>${p}</p>`).join("");

    $("#principlesGrid").innerHTML = SITE_DATA.about.principles
      .map(
        (p, i) => `
      <div class="principle-card glass reveal-up" style="transition-delay:${i * 0.08}s">
        <div class="p-index">PRINCIPLE_0${i + 1}</div>
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
      </div>`
      )
      .join("");

    $("#statsGrid").innerHTML = SITE_DATA.stats
      .map(
        (s, i) => `
      <div class="stat-card glass reveal-up" style="transition-delay:${i * 0.06}s">
        <div class="stat-num" data-count="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</div>
        <div class="stat-label">${s.label}</div>
      </div>`
      )
      .join("");
  }

  const PROFICIENCY = { Languages: 92, Automation: 96, "AI Testing": 94, "CI/CD & Tools": 88, Methodology: 90 };

  function renderStack() {
    $("#stackGrid").innerHTML = SITE_DATA.skills.core
      .map((cat, i) => {
        const pct = PROFICIENCY[cat.category] || 85;
        const r = 16;
        const circ = 2 * Math.PI * r;
        const offset = circ - (pct / 100) * circ;
        return `
        <div class="stack-card glass reveal-up" style="transition-delay:${i * 0.08}s">
          <div class="stack-card-head">
            <h4>${cat.category}</h4>
            <svg class="progress-ring" viewBox="0 0 40 40">
              <circle class="ring-track" cx="20" cy="20" r="${r}"></circle>
              <circle class="ring-fill" cx="20" cy="20" r="${r}" stroke-dasharray="${circ}" stroke-dashoffset="${circ}" data-offset="${offset}"></circle>
            </svg>
          </div>
          <div class="stack-item-list">
            ${cat.items.map((it) => `<span class="stack-item">${it}</span>`).join("")}
          </div>
        </div>`;
      })
      .join("");

    $("#exploringList").innerHTML = SITE_DATA.skills.exploring.map((t) => `<span>${t}</span>`).join("");
  }

  const ART_GRADIENTS = [
    "linear-gradient(135deg,#00E5FF,#3B82F6)",
    "linear-gradient(135deg,#7C3AED,#3B82F6)",
    "linear-gradient(135deg,#10B981,#00E5FF)",
    "linear-gradient(135deg,#3B82F6,#7C3AED)",
    "linear-gradient(135deg,#00E5FF,#7C3AED)",
    "linear-gradient(135deg,#7C3AED,#10B981)",
  ];
  const ART_GLYPHS = ["🤖", "🛡️", "⚡", "🔗", "🧬", "🎭"];

  function renderProjects() {
    $("#projectsGrid").innerHTML = SITE_DATA.projects
      .map((p, i) => {
        const isReal = p.badge.startsWith("Real");
        return `
        <div class="project-card glass tilt-card reveal-up" style="transition-delay:${(i % 4) * 0.08}s">
          <div class="project-art" style="background:${ART_GRADIENTS[i % ART_GRADIENTS.length]}">
            <span class="art-glyph">${ART_GLYPHS[i % ART_GLYPHS.length]}</span>
          </div>
          <div class="project-body">
            <div class="project-top">
              <span class="project-badge ${isReal ? "real" : "practice"}">${p.badge}</span>
            </div>
            <h3>${p.title}</h3>
            <p class="project-desc">${p.desc}</p>
            <ul class="project-features">${p.features.map((f) => `<li>${f}</li>`).join("")}</ul>
            <div class="tech-tags">${p.tech.map((t) => `<span>${t}</span>`).join("")}</div>
            <div class="project-actions">
              <a class="icon-btn magnetic" href="${p.githubUrl}" target="_blank" rel="noopener" title="GitHub">${svgIcons.github}</a>
              <a class="icon-btn magnetic" href="${p.demoUrl}" title="Live Demo">${svgIcons.arrow}</a>
              <a class="icon-btn magnetic" href="${p.caseStudyUrl}" title="Case Study">📄</a>
            </div>
          </div>
        </div>`;
      })
      .join("");
  }

  const STATUS_META = {
    Production: { cls: "status-production", label: "Production — Live" },
    Freelancing: { cls: "status-freelancing", label: "Freelance — Project" },
    Personal: { cls: "status-personal", label: "Personal — Project" },
  };

  function renderAiTools() {
    const grid = $("#aiToolsGrid");
    if (!grid) return;
    grid.innerHTML = SITE_DATA.aiTools
      .map((t, i) => {
        const meta = STATUS_META[t.status] || STATUS_META.Personal;
        return `
      <div class="ai-tool-card glass tilt-card reveal-up${t.placeholder ? " is-placeholder" : ""}" style="transition-delay:${(i % 4) * 0.08}s">
        <div class="ai-tool-top">
          <span class="status-badge ${meta.cls}">${meta.label}</span>
          <div class="built-with">${t.builtWith.map((b) => `<span class="chip">${b}</span>`).join("")}</div>
        </div>
        <h3>${t.title}</h3>
        <p class="project-desc">${t.desc}</p>
        <div class="tech-tags">${t.tech.map((x) => `<span>${x}</span>`).join("")}</div>
        ${t.caseStudy ? `<a class="btn btn-secondary btn-sm magnetic ai-tool-link" href="case-study.html?id=${t.id}">View Details ${svgIcons.arrow}</a>` : ""}
      </div>`;
      })
      .join("");
  }

  function renderTimeline() {
    $("#timelineList").innerHTML = SITE_DATA.experience
      .map(
        (e, i) => `
      <div class="timeline-item${e.current ? " current" : ""} reveal-up" style="transition-delay:${i * 0.1}s">
        <div class="timeline-dot"></div>
        <div class="exp-card glass" data-idx="${i}">
          <div class="exp-card-head">
            <div>
              <div class="exp-role">${e.role}</div>
              <div class="exp-company">${e.company}</div>
            </div>
            <div class="exp-meta">
              ${e.duration}<br />${e.location}
              ${e.current ? '<span class="current-badge">CURRENT</span>' : ""}
              <div class="exp-toggle-icon">▾</div>
            </div>
          </div>
          <div class="exp-body">
            <ul class="exp-achievements">${e.achievements.map((a) => `<li>${a}</li>`).join("")}</ul>
            <div class="exp-tech">${e.tech.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
          </div>
        </div>
      </div>`
      )
      .join("");

    $$(".exp-card").forEach((card) => {
      card.addEventListener("click", () => card.classList.toggle("open"));
    });

    const edu = SITE_DATA.education[0];
    $("#educationRow").innerHTML = `
      <div><h4>${edu.degree}</h4><p>${edu.school}</p></div>
      <span class="chip">${edu.year}</span>`;
  }

  function renderCerts() {
    $("#certGrid").innerHTML = SITE_DATA.certifications
      .map((c, i) => {
        const hasRealUrl = !!c.verifyUrl && c.verifyUrl !== "#";
        const footerLabel = hasRealUrl ? "Verified" : c.image ? "View certificate" : "Verification link";
        const actionBtn = hasRealUrl
          ? `<a class="icon-btn magnetic" href="${c.verifyUrl}" target="_blank" rel="noopener" title="Verify">${svgIcons.arrow}</a>`
          : c.image
          ? `<button type="button" class="icon-btn magnetic cert-view-btn" data-img="${c.image}" title="View certificate">${svgIcons.arrow}</button>`
          : `<span class="icon-btn" style="opacity:.35" title="No link available">${svgIcons.arrow}</span>`;
        return `
      <div class="cert-card glass reveal-up" style="transition-delay:${i * 0.07}s">
        ${
          c.image
            ? `<div class="cert-photo cert-photo-clickable" data-img="${c.image}" title="View full certificate"><img src="${c.image}" alt="${c.name} certificate" loading="lazy" /></div>`
            : `<div class="cert-ribbon">🏅</div>`
        }
        <h4>${c.name}</h4>
        <p class="cert-issuer">${c.issuer} · ${c.year}</p>
        <div class="cert-footer">
          <span class="cert-year">${footerLabel}</span>
          ${actionBtn}
        </div>
      </div>`;
      })
      .join("");

    $$(".cert-view-btn, .cert-photo-clickable").forEach((el) => {
      el.addEventListener("click", () => openLightbox(el.dataset.img));
    });
  }

  /* ---------------------------------------------------------------------
     LIGHTBOX — full-size certificate image viewer
     --------------------------------------------------------------------- */
  function openLightbox(src) {
    if (!src) return;
    $("#lightboxImg").src = src;
    $("#lightboxOverlay").classList.add("open");
  }
  function closeLightbox() {
    $("#lightboxOverlay").classList.remove("open");
  }
  function initLightbox() {
    $("#lightboxOverlay").addEventListener("click", (e) => {
      if (e.target.id === "lightboxOverlay" || e.target.id === "lightboxClose") closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }

  function renderBlog() {
    $("#blogGrid").innerHTML = SITE_DATA.blogs
      .map(
        (b, i) => `
      <div class="blog-card glass reveal-up" style="transition-delay:${i * 0.08}s">
        <div class="blog-thumb" style="background:${ART_GRADIENTS[(i + 2) % ART_GRADIENTS.length]}"></div>
        <div class="blog-body">
          <div class="blog-tags">${b.tags.map((t) => `<span>${t}</span>`).join("")}</div>
          <h3>${b.title}</h3>
          <p class="excerpt">${b.excerpt}</p>
          <div class="blog-footer">
            <span>${b.readingTime} read</span>
            <a class="read-link" href="${b.url}">${b.placeholder ? "Coming soon" : "Read"} ${svgIcons.arrow}</a>
          </div>
        </div>
      </div>`
      )
      .join("");
  }

  function renderTestimonials() {
    const cardHtml = (t) => `
      <div class="testi-card glass">
        <div class="quote-mark">❞</div>
        <p class="quote">${t.quote}</p>
        <div class="testi-author">
          <div class="testi-avatar">${t.author.charAt(0)}</div>
          <div><h6>${t.author}</h6><span>${t.role}</span></div>
        </div>
      </div>`;
    const html = SITE_DATA.testimonials.map(cardHtml).join("");
    $("#testiTrack").innerHTML = html + html; // duplicate for seamless loop
  }

  const NAV_SECTIONS = [
    { id: "hero", label: "Home", icon: "⌂" },
    { id: "about", label: "About", icon: "◐" },
    { id: "stack", label: "Stack", icon: "⚙" },
    { id: "projects", label: "Projects", icon: "▦" },
    { id: "ai-tools", label: "AI Tools", icon: "✦" },
    { id: "experience", label: "Experience", icon: "◷" },
    { id: "certifications", label: "Certs", icon: "🏅" },
    { id: "contact", label: "Contact", icon: "✉" },
  ];

  function renderDock() {
    $("#dock").innerHTML = NAV_SECTIONS.map(
      (s) => `<a href="#${s.id}" class="dock-item" data-section="${s.id}"><span class="dock-tip">${s.label}</span>${s.icon}</a>`
    ).join("");
  }

  function renderCmdk() {
    const items = [
      ...NAV_SECTIONS.map((s) => ({ label: `Go to ${s.label}`, hint: "section", action: () => scrollToId(s.id) })),
      { label: "Toggle theme", hint: "cmd", action: toggleTheme },
      { label: "Download resume", hint: "cmd", action: () => (window.location.href = SITE_DATA.identity.resumeUrl) },
      { label: "Copy email address", hint: "cmd", action: copyEmail },
      { label: "Open GitHub profile", hint: "link", action: () => window.open("https://github.com/AlokNayak24", "_blank") },
      { label: "Open LinkedIn profile", hint: "link", action: () => window.open("https://www.linkedin.com/in/alok-kumar-nayak", "_blank") },
    ];
    window.__cmdkItems = items;
    paintCmdk(items);
  }

  function paintCmdk(items) {
    const list = $("#cmdkList");
    list.innerHTML = items
      .map((it, i) => `<div class="cmdk-item${i === 0 ? " active" : ""}" data-idx="${i}"><span>${it.label}</span><span class="cmdk-hint">${it.hint}</span></div>`)
      .join("");
    $$(".cmdk-item", list).forEach((el) => {
      el.addEventListener("click", () => {
        items[+el.dataset.idx].action();
        closeCmdk();
      });
    });
  }

  /* ---------------------------------------------------------------------
     LOADER
     --------------------------------------------------------------------- */
  function runLoader() {
    const loader = $("#loader");
    const fill = $("#loaderFill");
    const pct = $("#loaderPct");
    let p = 0;
    const timer = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(timer);
        setTimeout(() => {
          loader.classList.add("done");
          document.body.classList.remove("loading");
          playIntro();
        }, 250);
      }
      fill.style.width = p + "%";
      pct.textContent = Math.round(p) + "%";
    }, 140);
  }

  /* ---------------------------------------------------------------------
     TYPING EFFECT — hero role titles
     --------------------------------------------------------------------- */
  function startTypingEffect() {
    const el = $("#typingText");
    const words = SITE_DATA.titles;
    let wi = 0, ci = 0, deleting = false;

    function tick() {
      const word = words[wi];
      if (!deleting) {
        ci++;
        el.textContent = word.slice(0, ci);
        if (ci === word.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        ci--;
        el.textContent = word.slice(0, ci);
        if (ci === 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
        }
      }
      setTimeout(tick, deleting ? 40 : 75);
    }
    tick();
  }

  /* ---------------------------------------------------------------------
     NUMBER COUNTERS
     --------------------------------------------------------------------- */
  function animateCounters() {
    $$(".stat-num").forEach((el) => {
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || "";
      const dur = 1400;
      const start = performance.now();
      function step(now) {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------------------------------------------------------------------
     PARTICLE NETWORK BACKGROUND
     --------------------------------------------------------------------- */
  function initParticles() {
    const canvas = $("#particle-canvas");
    const ctx = canvas.getContext("2d");
    let w, h, particles;

    function resize() {
      w = canvas.width = innerWidth;
      h = canvas.height = document.documentElement.scrollHeight;
    }
    function makeParticles() {
      const count = Math.min(90, Math.floor((innerWidth * innerHeight) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    }
    resize();
    makeParticles();
    addEventListener("resize", () => { resize(); makeParticles(); });

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const viewTop = scrollY, viewBottom = scrollY + innerHeight;
      ctx.strokeStyle = "rgba(0,229,255,0.12)";
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > innerHeight) p.vy *= -1;
        const drawY = p.y + scrollY;
        ctx.beginPath();
        ctx.fillStyle = "rgba(0,229,255,0.45)";
        ctx.arc(p.x, drawY, 1.6, 0, Math.PI * 2);
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            ctx.globalAlpha = 1 - dist / 130;
            ctx.beginPath();
            ctx.moveTo(p.x, drawY);
            ctx.lineTo(q.x, q.y + scrollY);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ---------------------------------------------------------------------
     THREE.JS — hero wireframe object
     --------------------------------------------------------------------- */
  function initHeroThree() {
    const canvas = $("#hero-three");
    if (!canvas || typeof THREE === "undefined") return;
    const hero = $("#hero");
    let w = hero.clientWidth, h = hero.clientHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 7;

    const geo = new THREE.IcosahedronGeometry(2.1, 1);
    const mat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.35 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(2.4, -0.4, 0);
    scene.add(mesh);

    const geo2 = new THREE.IcosahedronGeometry(2.1 * 1.35, 0);
    const mat2 = new THREE.MeshBasicMaterial({ color: 0x7c3aed, wireframe: true, transparent: true, opacity: 0.12 });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    mesh2.position.copy(mesh.position);
    scene.add(mesh2);

    let mx = 0, my = 0;
    addEventListener("mousemove", (e) => {
      mx = (e.clientX / innerWidth - 0.5) * 2;
      my = (e.clientY / innerHeight - 0.5) * 2;
    });

    addEventListener("resize", () => {
      w = hero.clientWidth; h = hero.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });

    (function animate() {
      mesh.rotation.x += 0.0022;
      mesh.rotation.y += 0.0032;
      mesh2.rotation.x -= 0.0012;
      mesh2.rotation.y -= 0.0018;
      camera.position.x += (mx * 0.6 - camera.position.x) * 0.03;
      camera.position.y += (-my * 0.6 - camera.position.y) * 0.03;
      camera.lookAt(mesh.position);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    })();
  }

  /* ---------------------------------------------------------------------
     SMOOTH SCROLL (Lenis) + SCROLL-DRIVEN UI
     --------------------------------------------------------------------- */
  function initScroll() {
    if (typeof Lenis !== "undefined") {
      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      window.lenis = lenis;

      if (window.gsap && window.ScrollTrigger) {
        // Drive Lenis exclusively via the GSAP ticker when GSAP is present —
        // running a second raw requestAnimationFrame loop alongside it feeds
        // Lenis two conflicting time sources per frame, which destabilizes
        // its momentum and shows up as the page drifting up/down on its own.
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      } else {
        (function raf(time) { lenis.raf(time); requestAnimationFrame(raf); })();
      }
    }

    const navbar = $("#navbar");
    const progressBar = $("#progressBar");
    const backToTop = $("#backToTop");

    function onScroll() {
      const y = scrollY;
      navbar.classList.toggle("scrolled", y > 40);
      backToTop.classList.toggle("visible", y > 600);

      const docH = document.documentElement.scrollHeight - innerHeight;
      progressBar.style.width = docH > 0 ? (y / docH) * 100 + "%" : "0%";

      updateActiveSection(y);
    }
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function updateActiveSection(y) {
    let current = NAV_SECTIONS[0].id;
    NAV_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el && el.offsetTop - 140 <= y) current = s.id;
    });
    $$(".nav-link").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
    $$(".dock-item").forEach((a) => a.classList.toggle("active", a.dataset.section === current));
  }

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.lenis) window.lenis.scrollTo(el);
    else el.scrollIntoView({ behavior: "smooth" });
  }

  /* ---------------------------------------------------------------------
     GSAP SCROLL REVEALS
     --------------------------------------------------------------------- */
  function initReveals() {
    if (!window.gsap || !window.ScrollTrigger) {
      $$(".reveal-up, .reveal-fade, .reveal-scale").forEach((el) => {
        el.style.opacity = 1; el.style.transform = "none";
      });
      animateCounters();
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    $$(".reveal-up, .reveal-fade, .reveal-scale").forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });

    ScrollTrigger.create({
      trigger: "#statsGrid",
      start: "top 85%",
      once: true,
      onEnter: animateCounters,
    });

    $$(".ring-fill").forEach((ring) => {
      ScrollTrigger.create({
        trigger: ring,
        start: "top 90%",
        once: true,
        onEnter: () => { ring.style.strokeDashoffset = ring.dataset.offset; },
      });
    });

    ScrollTrigger.refresh();
  }

  function playIntro() {
    if (!window.gsap) return;
    gsap.fromTo(".hero-title .line span", { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: "power3.out" });
    gsap.fromTo([".eyebrow", ".hero-typing", ".hero-desc", ".hero-actions", ".hero-socials"], { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, delay: 0.3, duration: 0.8, ease: "power3.out" });
    gsap.fromTo(".hero-portrait", { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, delay: 0.2, ease: "back.out(1.4)" });
    startTypingEffect();
  }

  /* ---------------------------------------------------------------------
     MAGNETIC BUTTONS + TILT CARDS
     --------------------------------------------------------------------- */
  function initMagnetic() {
    document.addEventListener("mousemove", (e) => {
      $$(".magnetic").forEach((btn) => {
        const r = btn.getBoundingClientRect();
        const dist = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
        if (dist < 90) {
          const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
          const dy = (e.clientY - (r.top + r.height / 2)) * 0.25;
          btn.style.transform = `translate(${dx}px, ${dy}px)`;
        } else {
          btn.style.transform = "";
        }
      });
    });
  }

  function initTilt() {
    document.addEventListener("mousemove", (e) => {
      const card = e.target.closest(".tilt-card");
      $$(".tilt-card").forEach((c) => { if (c !== card) c.style.transform = ""; });
      if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${-py * 8}deg) rotateY(${px * 10}deg) translateY(-6px)`;
    });
  }

  /* ---------------------------------------------------------------------
     NAV / MOBILE MENU / THEME
     --------------------------------------------------------------------- */
  function initNav() {
    $$('.nav-link, .mnav, .dock-item, a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
          e.preventDefault();
          scrollToId(href.slice(1));
          $("#mobileMenu").classList.remove("open");
          $("#navToggle").classList.remove("open");
        }
      });
    });

    $("#navToggle").addEventListener("click", () => {
      $("#navToggle").classList.toggle("open");
      $("#mobileMenu").classList.toggle("open");
    });

    $("#backToTop").addEventListener("click", () => scrollToId("hero"));
  }

  function toggleTheme() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  function initTheme() {
    const saved = localStorage.getItem("theme");
    const preferred = saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", preferred);
    $("#themeToggle").addEventListener("click", toggleTheme);
  }

  function copyEmail() {
    navigator.clipboard?.writeText(SITE_DATA.identity.email);
    showToast("Email copied to clipboard");
  }

  /* ---------------------------------------------------------------------
     COMMAND PALETTE
     --------------------------------------------------------------------- */
  function openCmdk() {
    $("#cmdkOverlay").classList.add("open");
    $("#cmdkInput").value = "";
    paintCmdk(window.__cmdkItems);
    setTimeout(() => $("#cmdkInput").focus(), 50);
  }
  function closeCmdk() { $("#cmdkOverlay").classList.remove("open"); }

  function initCmdk() {
    $("#cmdkTrigger").addEventListener("click", openCmdk);
    $("#cmdkOverlay").addEventListener("click", (e) => { if (e.target.id === "cmdkOverlay") closeCmdk(); });

    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        $("#cmdkOverlay").classList.contains("open") ? closeCmdk() : openCmdk();
      }
      if (e.key === "Escape") closeCmdk();
    });

    $("#cmdkInput").addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      paintCmdk(window.__cmdkItems.filter((it) => it.label.toLowerCase().includes(q)));
    });

    $("#cmdkInput").addEventListener("keydown", (e) => {
      const items = $$(".cmdk-item");
      let idx = items.findIndex((i) => i.classList.contains("active"));
      if (e.key === "ArrowDown") { e.preventDefault(); idx = Math.min(items.length - 1, idx + 1); }
      if (e.key === "ArrowUp") { e.preventDefault(); idx = Math.max(0, idx - 1); }
      if (e.key === "Enter") { items[idx]?.click(); return; }
      items.forEach((i, n) => i.classList.toggle("active", n === idx));
    });
  }

  /* ---------------------------------------------------------------------
     AMBIENT SOUND TOGGLE (Web Audio, no external files)
     --------------------------------------------------------------------- */
  function initMusic() {
    let ctx, osc, gain, playing = false;
    const btn = $("#musicToggle");
    btn.addEventListener("click", () => {
      if (!ctx) {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        osc = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        gain = ctx.createGain();
        gain.gain.value = 0;
        osc.type = "sine"; osc.frequency.value = 110;
        osc2.type = "sine"; osc2.frequency.value = 164.8;
        osc.connect(gain); osc2.connect(gain); gain.connect(ctx.destination);
        osc.start(); osc2.start();
      }
      playing = !playing;
      gain.gain.linearRampToValueAtTime(playing ? 0.035 : 0, ctx.currentTime + 0.6);
      btn.classList.toggle("playing", playing);
    });
  }

  /* ---------------------------------------------------------------------
     CONTACT FORM
     --------------------------------------------------------------------- */
  function initContactForm() {
    $("#contactForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = $(".send-btn");
      const name = $("#cName").value.trim();
      const email = $("#cEmail").value.trim();
      const subject = $("#cSubject").value.trim();
      const message = $("#cMessage").value.trim();
      if (!name || !email || !subject || !message) {
        showToast("Please fill in every field");
        return;
      }
      btn.classList.add("sending");
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      const mailto = `mailto:${SITE_DATA.identity.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
      setTimeout(() => {
        window.location.href = mailto;
        btn.classList.remove("sending");
        showToast("Opening your email client…");
        e.target.reset();
      }, 700);
    });
  }

  /* ---------------------------------------------------------------------
     TOASTS
     --------------------------------------------------------------------- */
  function showToast(msg) {
    const container = $("#toastContainer");
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<span class="toast-dot"></span>${msg}`;
    container.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 400);
    }, 3200);
  }
  window.showToast = showToast;

  /* ---------------------------------------------------------------------
     BOOT
     --------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderAll();
    initTheme();
    initNav();
    initCmdk();
    initParticles();
    initHeroThree();
    initScroll();
    initReveals();
    initMagnetic();
    initTilt();
    initMusic();
    initContactForm();
    initLightbox();
    runLoader();
  });
})();
