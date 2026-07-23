/* ==========================================================================
   SCROLL PROGRESS — thin gold thread at the top of the viewport
   ========================================================================== */
(function () {
  "use strict";

  var fill = document.getElementById("progressFill");
  if (!fill) return;

  if (!window.gsap || !window.ScrollTrigger) {
    // graceful fallback without GSAP
    window.addEventListener("scroll", function () {
      var h = document.documentElement;
      var pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      fill.style.width = pct + "%";
    }, { passive: true });
    return;
  }

  gsap.to(fill, {
    width: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3
    }
  });
})();
