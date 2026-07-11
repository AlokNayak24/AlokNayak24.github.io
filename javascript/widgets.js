/* ==========================================================================
   WIDGETS.JS — live data: GitHub, weather, tech news, visitor counter,
   clock, and the rule-based AI chat assistant. All public, no API keys.
   ========================================================================== */

(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const GITHUB_USER = "AlokNayak24";
  const AHMEDABAD = { lat: 23.0225, lon: 72.5714, label: "Ahmedabad, IN" };

  /* ---------------------------------------------------------------------
     LIVE CLOCK — Asia/Kolkata
     --------------------------------------------------------------------- */
  function tickClock() {
    const el = $("#liveClock");
    if (!el) return;
    function update() {
      const now = new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false });
      el.textContent = now;
    }
    update();
    setInterval(update, 1000);
  }

  /* ---------------------------------------------------------------------
     WEATHER — Open-Meteo (no key)
     --------------------------------------------------------------------- */
  const WMO = {
    0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Rime fog", 51: "Light drizzle", 61: "Light rain",
    63: "Rain", 65: "Heavy rain", 71: "Snow", 80: "Rain showers", 95: "Thunderstorm",
  };

  async function loadWeather() {
    const valEl = $("#liveWeather");
    const subEl = $("#liveWeatherSub");
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${AHMEDABAD.lat}&longitude=${AHMEDABAD.lon}&current_weather=true`;
      const res = await fetch(url);
      const data = await res.json();
      const cw = data.current_weather;
      valEl.textContent = `${Math.round(cw.temperature)}°C`;
      subEl.textContent = `${WMO[cw.weathercode] || "—"} · ${AHMEDABAD.label}`;
    } catch (err) {
      valEl.textContent = "—";
      subEl.textContent = "Weather unavailable";
    }
  }

  /* ---------------------------------------------------------------------
     GITHUB — public REST API (repos) + ghchart image (already in HTML)
     --------------------------------------------------------------------- */
  async function loadGithub() {
    const listEl = $("#repoList");
    const countEl = $("#repoCount");
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=5`);
      if (!res.ok) throw new Error("github api error");
      const repos = await res.json();
      countEl.textContent = repos.length ? `${repos.length}+` : "0";
      listEl.innerHTML = repos.length
        ? repos
            .map(
              (r) => `
        <div class="gh-repo-row">
          <a class="repo-name" href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a>
          <span class="repo-lang">${r.language || "—"} · ★${r.stargazers_count}</span>
        </div>`
            )
            .join("")
        : `<div class="gh-repo-row"><span class="repo-name">No public repos yet</span></div>`;
    } catch (err) {
      countEl.textContent = "—";
      listEl.innerHTML = `<div class="gh-repo-row"><span class="repo-name">Couldn't load repos right now</span></div>`;
    }
  }

  /* ---------------------------------------------------------------------
     TECH NEWS — Hacker News public Firebase API (no key)
     --------------------------------------------------------------------- */
  async function loadNews() {
    const el = $("#newsList");
    try {
      const idsRes = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
      const ids = (await idsRes.json()).slice(0, 5);
      const stories = await Promise.all(
        ids.map((id) => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((r) => r.json()))
      );
      el.innerHTML = stories
        .map((s) => `<div class="news-row"><a href="${s.url || "#"}" target="_blank" rel="noopener">${s.title}</a></div>`)
        .join("");
    } catch (err) {
      el.innerHTML = `<div class="news-row">Tech news unavailable right now</div>`;
    }
  }

  /* ---------------------------------------------------------------------
     VISITOR COUNTER — local per-browser count (no third-party service:
     the usual free options like CountAPI.xyz are no longer reachable)
     --------------------------------------------------------------------- */
  function loadVisitorCount() {
    const el = $("#visitorCount");
    const subEl = el?.nextElementSibling;
    const key = "portfolio_visits_count";
    const n = (+localStorage.getItem(key) || 0) + 1;
    localStorage.setItem(key, n);
    el.textContent = n.toLocaleString();
    if (subEl) subEl.textContent = "Your visits";
  }

  /* ---------------------------------------------------------------------
     AI CHAT WIDGET — rule-based FAQ matcher (no external LLM call)
     --------------------------------------------------------------------- */
  function initChat() {
    const fab = $("#chatFab");
    const panel = $("#chatPanel");
    const messages = $("#chatMessages");
    const input = $("#chatInput");
    const sendBtn = $("#chatSend");

    function addMsg(text, who) {
      const div = document.createElement("div");
      div.className = `chat-msg ${who}`;
      div.textContent = text;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }

    function answer(question) {
      const q = question.toLowerCase();
      const faq = SITE_DATA.chatFAQ.find((f) => f.keys.some((k) => q.includes(k)));
      return faq ? faq.answer : "I don't have a canned answer for that yet — try asking about experience, AI tooling, skills, or how to get in touch.";
    }

    let opened = false;
    fab.addEventListener("click", () => {
      panel.classList.toggle("open");
      if (!opened) {
        addMsg("Hi! I'm a lightweight FAQ assistant (not a live LLM). Ask me about Alok's experience, AI testing work, or skills.", "bot");
        opened = true;
      }
    });

    function submit() {
      const val = input.value.trim();
      if (!val) return;
      addMsg(val, "user");
      input.value = "";
      setTimeout(() => addMsg(answer(val), "bot"), 400);
    }
    sendBtn.addEventListener("click", submit);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });
  }

  document.addEventListener("DOMContentLoaded", () => {
    tickClock();
    loadWeather();
    loadGithub();
    loadNews();
    loadVisitorCount();
    initChat();
  });
})();
