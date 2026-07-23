/* ==========================================================================
   REVEAL — generic fade + rise for any element carrying .reveal
   ========================================================================== */
(function () {
  "use strict";

  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!window.gsap || !window.ScrollTrigger || reduced) {
    items.forEach(function (el) { el.style.opacity = 1; });
    return;
  }

  items.forEach(function (el) {
    // elements handled with bespoke choreography elsewhere still fade in the
    // same way here, then their dedicated script layers extra motion on top
    var fromY = el.classList.contains("quote-block") || el.tagName === "BLOCKQUOTE" ? 18 : 34;

    gsap.fromTo(el,
      { opacity: 0, y: fromY },
      {
        opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
})();
