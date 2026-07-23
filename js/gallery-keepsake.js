/* ==========================================================================
   GALLERY — KEEPSAKE — organic floating drift, like photos adrift in a box
   ========================================================================== */
(function () {
  "use strict";

  var field = document.getElementById("keepsakeField");
  if (!field || !window.gsap) return;

  var cards = field.querySelectorAll(".keepsake-card");
  if (!cards.length) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  gsap.set(cards, { opacity: 0, scale: 0.9 });

  gsap.to(cards, {
    opacity: 1, scale: 1, duration: 1, stagger: 0.12, ease: "power2.out",
    scrollTrigger: window.ScrollTrigger ? {
      trigger: field,
      start: "top 80%",
      toggleActions: "play none none reverse"
    } : undefined
  });

  if (reduced) return;

  function drift(card) {
    gsap.to(card, {
      x: "+=" + gsap.utils.random(-22, 22),
      y: "+=" + gsap.utils.random(-26, 26),
      rotate: gsap.utils.random(-4, 4),
      duration: gsap.utils.random(5, 8),
      ease: "sine.inOut",
      onComplete: function () { drift(card); }
    });
  }

  cards.forEach(function (card, i) {
    gsap.delayedCall(0.4 + i * 0.15, function () { drift(card); });
  });
})();
