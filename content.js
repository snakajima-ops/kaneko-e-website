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

const clientsMarquee = document.getElementById("clientsMarquee");
if (clientsMarquee) {
  fetch("content/clients.json")
    .then((r) => r.json())
    .then((data) => {
      const items = (data && data.items) || [];
      if (!items.length) return;
      const spans = items.map((it) => `<span>${esc(it.name)}</span>`).join("");
      clientsMarquee.innerHTML = spans + spans;
    })
    .catch(() => {});
}


const newsList = document.getElementById("newsList");
if (newsList) {
  fetch("content/news.json")
    .then((r) => r.json())
    .then((data) => {
      const items = (data && data.items) || [];
      newsList.innerHTML = items.map((it) => {
        const paras = String(it.body || "")
          .split(/\n{2,}/)
          .filter((p) => p.trim())
          .map((p) => `<p>${esc(p.trim()).replace(/\n/g, "<br>")}</p>`)
          .join("");
        const imgs = (it.images || []).filter((im) => im && im.image);
        const hero = imgs.length
          ? `<div style="max-width:1000px;margin:48px auto 0;padding:0 24px;">
<img src="${esc(imgs[0].image)}" alt="${esc(imgs[0].caption || it.title)}" loading="lazy" style="width:100%;height:auto;display:block;border-radius:4px;box-shadow:0 20px 60px rgba(0,0,0,.12);">
${imgs[0].caption ? `<p style="text-align:center;font-size:.85rem;color:var(--muted);margin-top:14px;">${esc(imgs[0].caption)}</p>` : ""}
</div>`
          : "";
        const rest = imgs.slice(1);
        const grid = rest.length
          ? `<div style="max-width:1000px;margin:36px auto 0;padding:0 24px;">
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;">
${rest.map((im) => `<figure style="margin:0;"><img src="${esc(im.image)}" alt="${esc(im.caption || it.title)}" loading="lazy" style="width:100%;aspect-ratio:4/3;object-fit:cover;display:block;border-radius:4px;">${im.caption ? `<figcaption style="font-size:.85rem;color:var(--muted);margin-top:10px;text-align:center;">${esc(im.caption)}</figcaption>` : ""}</figure>`).join("")}
</div>
</div>`
          : "";
        return `<article style="margin-bottom:96px;">
<div class="section-head"><span class="section-tag">${esc(it.date)}</span><h2>${esc(it.title)}</h2></div>
<div class="greeting-wrap">${paras}</div>
${hero}${grid}
</article>`;
      }).join("");
    })
    .catch(() => {});
}
