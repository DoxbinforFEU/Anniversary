/* ==========================================================================
   GALLERY — CAROUSEL — drag-to-browse journal cards
   ========================================================================== */
(function () {
  "use strict";

  var viewport = document.getElementById("carouselViewport");
  var track = document.getElementById("carouselTrack");
  if (!viewport || !track || !window.gsap) return;

  function bounds() {
    var min = Math.min(0, viewport.clientWidth - track.scrollWidth);
    return { minX: min, maxX: 0 };
  }

  if (window.Draggable) {
    var b = bounds();
    var instance = Draggable.create(track, {
      type: "x",
      edgeResistance: 0.7,
      bounds: { minX: b.minX, maxX: b.maxX },
      inertia: false,
      cursor: "grab",
      activeCursor: "grabbing",
      dragClickables: true
    })[0];

    window.addEventListener("resize", function () {
      var nb = bounds();
      instance.applyBounds({ minX: nb.minX, maxX: nb.maxX });
    });
  } else {
    // native fallback
    viewport.style.overflowX = "auto";
    viewport.style.webkitOverflowScrolling = "touch";
  }

  // entrance
  var cards = track.querySelectorAll(".carousel-card");
  gsap.set(cards, { opacity: 0, y: 24 });
  gsap.to(cards, {
    opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.08,
    scrollTrigger: window.ScrollTrigger ? {
      trigger: viewport,
      start: "top 85%",
      toggleActions: "play none none reverse"
    } : undefined
  });
})();
