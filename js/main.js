/* ==========================================================================
   MAIN — global GSAP setup + hero entrance sequence
   ========================================================================== */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  if (!window.gsap) return;

  gsap.registerPlugin(window.ScrollTrigger, window.Draggable);
  gsap.defaults({ ease: "power2.out" });

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (window.ScrollTrigger && !reduced && window.matchMedia("(pointer: coarse)").matches) {
    ScrollTrigger.normalizeScroll(true);
  }

  /* ---- split hero title into animatable characters, no plugin required ---- */
  function splitChars(node) {
    var text = node.textContent;
    node.textContent = "";
    var frag = document.createDocumentFragment();
    text.split("").forEach(function (ch) {
      var span = document.createElement("span");
      span.className = "char";
      span.textContent = ch === " " ? "\u00A0" : ch;
      frag.appendChild(span);
    });
    node.appendChild(frag);
    return node.querySelectorAll(".char");
  }

  function runHeroIntro() {
    var withEl = document.querySelector(".hero__title .with");
    var mainEl = document.querySelector(".hero__title-main");
    var eyebrow = document.querySelector(".hero__eyebrow");
    var subtitle = document.querySelector(".hero__subtitle");
    var scrollcue = document.querySelector(".hero__scrollcue");

    if (!mainEl) return;

    var mainChars = splitChars(mainEl);
    var withChars = withEl ? splitChars(withEl) : [];

    gsap.set(mainChars, { yPercent: 130, opacity: 0, rotate: 4 });
    gsap.set(withChars, { yPercent: 120, opacity: 0 });
    if (scrollcue) gsap.set(scrollcue, { opacity: 0 });

    var tl = gsap.timeline({ delay: 0.15 });

    tl.to(eyebrow, { opacity: 1, duration: 0.9, ease: "power1.out" })
      .to(withChars, {
        yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        stagger: 0.018
      }, "-=0.4")
      .to(mainChars, {
        yPercent: 0, opacity: 1, rotate: 0, duration: 1.1, ease: "power4.out",
        stagger: 0.045
      }, "-=0.55")
      .to(subtitle, { opacity: 1, duration: 1, ease: "power1.out" }, "-=0.5")
      .to(scrollcue, { opacity: 1, duration: 0.8 }, "-=0.4");

    // slow ambient zoom-out on the hero glow for cinematic depth
    gsap.fromTo(".hero__glow",
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2.4, ease: "power1.out" }
    );

    if (window.ScrollTrigger) {
      gsap.to(".hero__content", {
        yPercent: -18,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });
      gsap.to(".hero__glow", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });
    }
  }

  function boot() {
    runHeroIntro();
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }

  if (reduced) {
    document.querySelectorAll(".hero__eyebrow, .hero__subtitle, .hero__scrollcue")
      .forEach(function (n) { n.style.opacity = 1; });
    boot();
  } else {
    document.addEventListener("preloader:complete", boot, { once: true });
  }

  // fallback in case preloader.js didn't run for some reason
  window.addEventListener("load", function () {
    setTimeout(function () {
      if (document.getElementById("preloader")) {
        document.getElementById("preloader").remove();
        boot();
      }
    }, 5000);
  });
})();
