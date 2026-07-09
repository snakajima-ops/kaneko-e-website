gsap.registerPlugin(ScrollTrigger);

/* header background on scroll */
const header = document.getElementById('siteHeader');
if (header) {
  ScrollTrigger.create({
    start: 60,
    onUpdate: (self) => {
      header.classList.toggle('scrolled', self.scroll() > 60);
    }
  });
}

/* hero line reveal (home hero only) */
if (document.querySelector(".hero h1 .line span")) {
  gsap.to(".hero h1 .line span", {
    y: 0, duration: 1.1, ease: "power4.out", stagger: 0.15, delay: 0.3
  });
  gsap.fromTo(".hero-sub, .hero-eyebrow, .hero-meta",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, delay: 1.1, stagger: 0.15 }
  );
}

/* page-hero fade in (inner pages) */
if (document.querySelector(".page-hero")) {
  gsap.fromTo(".page-hero .hero-eyebrow, .page-hero h1, .page-hero .hero-sub",
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 1, delay: 0.2, stagger: 0.15 }
  );
}

/* floating sparks (any page with #sparks) */
const sparkWrap = document.getElementById('sparks');
if (sparkWrap) {
  for (let i = 0; i < 22; i++) {
    const s = document.createElement('div');
    s.className = 'spark';
    const size = Math.random() * 3 + 1;
    s.style.width = s.style.height = size + 'px';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.opacity = Math.random() * 0.6 + 0.2;
    sparkWrap.appendChild(s);
    gsap.to(s, {
      y: (Math.random() - 0.5) * 120,
      x: (Math.random() - 0.5) * 80,
      duration: 4 + Math.random() * 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
}

/* generic reveal on scroll */
gsap.utils.toArray(".reveal").forEach((el) => {
  gsap.to(el, {
    opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 85%" }
  });
});

/* stagger card grids */
function setupCardReveal(selector) {
  gsap.utils.toArray(selector).forEach((el, i) => {
    gsap.set(el, { opacity: 0, y: 30 });
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.7, delay: (i % 3) * 0.08, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%" }
    });
  });
}
window.setupCardReveal = setupCardReveal;
["service-card", "trust-card", "job-card", "timeline-item"].forEach((cls) => {
  setupCardReveal("." + cls);
});

/* counters */
gsap.utils.toArray(".counter").forEach((el) => {
  const target = +el.dataset.target;
  const noComma = el.dataset.noComma === "true";
  ScrollTrigger.create({
    trigger: el, start: "top 90%", once: true,
    onEnter: () => {
      gsap.fromTo(el, { innerText: 0 }, {
        innerText: target, duration: 1.8, ease: "power1.out", snap: { innerText: 1 },
        onUpdate: function () {
          const n = Math.floor(el.innerText);
          el.innerText = noComma ? n : n.toLocaleString();
        }
      });
    }
  });
});

/* parallax band background */
if (document.getElementById("bandBg")) {
  gsap.to("#bandBg", {
    yPercent: 18,
    ease: "none",
    scrollTrigger: { trigger: ".band", start: "top bottom", end: "bottom top", scrub: true }
  });
}
