/* Renders CMS-editable content (works cases / job listings) from /content/*.json
   so that Decap CMS edits (which only change these JSON files) show up on the live site
   without needing a full rebuild. */

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

const worksGrid = document.getElementById("worksGrid");
if (worksGrid) {
  fetch("content/works.json")
    .then((r) => r.json())
    .then((data) => {
      const items = (data && data.items) || [];
      worksGrid.innerHTML = items.map((it, i) => {
        const num = String(i + 1).padStart(2, "0");
        const photo = it.image ? `<img class="card-photo" src="${esc(it.image)}" alt="${esc(it.title)}">` : "";
        return `<div class="service-card">${photo}<div class="service-num">${num}</div><h3>${esc(it.title)}</h3><p>${esc(it.description)}</p></div>`;
      }).join("");
      if (window.setupCardReveal) window.setupCardReveal("#worksGrid .service-card");
    })
    .catch(() => {});
}

const jobsGrid = document.getElementById("jobsGrid");
if (jobsGrid) {
  fetch("content/jobs.json")
    .then((r) => r.json())
    .then((data) => {
      const items = (data && data.items) || [];
      jobsGrid.innerHTML = items.map((it) => (
        `<div class="job-card"><span class="tag">${esc(it.tag)}</span><h3>${esc(it.title)}</h3><p style="margin-top:12px;font-size:.88rem;color:var(--muted);">${esc(it.description)}</p></div>`
      )).join("");
      if (window.setupCardReveal) window.setupCardReveal("#jobsGrid .job-card");
    })
    .catch(() => {});
}
