/* ==========================================================================
   CASE-STUDY.JS — renders a full case-study page for one SITE_DATA.aiTools
   entry, selected via ?id=<tool-id> in the URL.
   ========================================================================== */

(function () {
  "use strict";

  const STATUS_META = {
    Production: { cls: "status-production", label: "Production — Live" },
    Freelancing: { cls: "status-freelancing", label: "Freelance — Project" },
    Personal: { cls: "status-personal", label: "Personal — Project" },
  };

  function applySavedTheme() {
    const saved = localStorage.getItem("theme");
    const preferred = saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", preferred);
  }

  function notFound(container) {
    container.innerHTML = `
      <div class="cs-notfound">
        <p>Couldn't find that case study.</p>
        <a href="index.html#projects" class="btn btn-primary btn-sm" style="margin-top:20px;">Back to Projects</a>
      </div>`;
  }

  // Resolves the ?id= against both SITE_DATA.aiTools and SITE_DATA.projects,
  // normalizing the differing field names (builtWith/tech, status/badge) so
  // render() can treat either source the same way.
  function resolveItem(id) {
    if (!id || typeof SITE_DATA === "undefined") return null;
    const tool = SITE_DATA.aiTools.find((t) => t.id === id);
    if (tool) return { ...tool, backHref: "index.html#ai-tools", backLabel: "AI Tools" };
    const project = SITE_DATA.projects.find((p) => p.id === id);
    if (project) return { ...project, backHref: "index.html#projects", backLabel: "Projects" };
    return null;
  }

  function statusMeta(item) {
    if (item.status) return STATUS_META[item.status] || STATUS_META.Personal;
    if (item.badge && item.badge.startsWith("Real")) return { cls: "status-production", label: item.badge };
    return { cls: "status-personal", label: item.badge || "Project" };
  }

  function render(item) {
    const container = document.getElementById("csContent");
    const cs = item.caseStudy;
    const meta = statusMeta(item);
    const chips = item.builtWith || item.tech || [];

    if (!cs) {
      notFound(container);
      return;
    }

    document.title = `${item.title} — Case Study — Alok Kumar Nayak`;

    container.innerHTML = `
      <div class="cs-header">
        <span class="status-badge ${meta.cls}">${meta.label}</span>
        <h1>${item.title}</h1>
        <p class="cs-lede">${cs.overview}</p>
        <div class="built-with">${chips.map((b) => `<span class="chip">${b}</span>`).join("")}</div>
      </div>

      ${
        cs.features?.length
          ? `<section class="cs-section">
              <h2>Key Features</h2>
              <div class="cs-feature-grid">
                ${cs.features
                  .map(
                    (f) => `
                  <div class="cs-feature-card glass">
                    <div class="cs-feature-icon">${f.icon || "✦"}</div>
                    <h4>${f.title}</h4>
                    <ul>${f.points.map((p) => `<li>${p}</li>`).join("")}</ul>
                  </div>`
                  )
                  .join("")}
              </div>
            </section>`
          : ""
      }

      ${
        cs.impact?.length
          ? `<section class="cs-section">
              <h2>Business Impact</h2>
              <div class="cs-impact-grid">
                ${cs.impact
                  .map(
                    (i) => `
                  <div class="cs-impact-item glass">
                    <span class="cs-check">✓</span>
                    <span>${i}</span>
                  </div>`
                  )
                  .join("")}
              </div>
            </section>`
          : ""
      }

      ${
        cs.techUsed?.length
          ? `<section class="cs-section">
              <h2>Technologies Used</h2>
              <div class="cs-tech-tags">${cs.techUsed.map((t) => `<span>${t}</span>`).join("")}</div>
            </section>`
          : ""
      }

      ${
        cs.result
          ? `<section class="cs-section">
              <div class="cs-result glass">
                <div class="cs-result-label">Result</div>
                <p>${cs.result}</p>
              </div>
            </section>`
          : ""
      }

      <div class="cs-cta">
        <a href="${item.backHref}" class="btn btn-secondary">← Back to ${item.backLabel}</a>
      </div>
    `;
  }

  document.addEventListener("DOMContentLoaded", () => {
    applySavedTheme();
    const container = document.getElementById("csContent");
    const id = new URLSearchParams(location.search).get("id");
    const item = resolveItem(id);
    item ? render(item) : notFound(container);
  });
})();
