/* ==========================================================================
   GALLERY — CORKBOARD — scattered pin-in entrance
   ========================================================================== */
(function () {
  "use strict";

  var board = document.getElementById("corkboard");
  if (!board || !window.gsap) return;

  var cards = board.querySelectorAll(".polaroid");
  if (!cards.length) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  gsap.set(cards, { opacity: 0, y: 60, scale: 0.85 });

  cards.forEach(function (card, i) {
    var baseTilt = getComputedStyle(card).getPropertyValue("--tilt") || "0deg";
    gsap.fromTo(card,
      { opacity: 0, y: 60, scale: 0.8, rotate: (i % 2 ? 14 : -14) },
      {
        opacity: 1, y: 0, scale: 1, rotate: parseFloat(baseTilt) || 0,
        duration: 0.9, ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: board,
          start: "top 82%",
          toggleActions: "play none none reverse"
        },
        delay: i * 0.08
      }
    );
  });
})();
