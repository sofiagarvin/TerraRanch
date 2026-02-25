// assets/site.js
(function () {
  const burger = document.querySelector('[data-burger]');
  const nav = document.querySelector('[data-nav]');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
    });
  }

  // highlight active nav link
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('a[data-navlink]').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path) a.classList.add('active');
  });
})();
// --- Product page: call Gemini via Cloudflare Worker ---
(() => {
  const btn = document.getElementById("generateBtn");
  const out = document.getElementById("outputBox");
  if (!btn || !out) return; // runs only on product.html

  const WORKER_URL = "https://worker.sofiagarvin.workers.dev/";

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    const old = btn.textContent;
    btn.textContent = "Generating…";
    out.textContent = "";

    const payload = {
      county: document.getElementById("county")?.value?.trim() || "",
      acres: document.getElementById("acres")?.value || "",
      current_use: document.getElementById("current")?.value || "",
      time_horizon: document.getElementById("horizon")?.value || "",
      goals: document.getElementById("goals")?.value?.trim() || "",
      constraints: document.getElementById("constraints")?.value?.trim() || "",
    };

    try {
      const resp = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const t = await resp.text();
        throw new Error(`Worker error ${resp.status}: ${t}`);
      }

      const data = await resp.json();
      out.textContent = data.text || "No output returned.";
    } catch (e) {
      out.textContent = "Error: " + (e?.message || String(e));
    } finally {
      btn.disabled = false;
      btn.textContent = old;
    }
  });
})();
