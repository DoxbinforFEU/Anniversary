/* ==========================================================================
   GALLERY — FILMSTRIP — pinned section with horizontal reel scroll
   ========================================================================== */
(function () {
  "use strict";

  var pin = document.querySelector(".filmstrip-pin");
  var track = document.getElementById("filmstripTrack");
  if (!pin || !track || !window.gsap || !window.ScrollTrigger) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var resizeTimer = 0;

  function build() {
    var distance = track.scrollWidth - pin.clientWidth;
    if (distance <= 0) return null;

    return gsap.to(track, {
      x: -distance,
      ease: "none",
      scrollTrigger: {
        trigger: ".filmstrip-section",
        start: "top top",
        end: "+=" + (distance + window.innerHeight * 0.5),
        scrub: 0.15,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
  }

  if (reduced) {
    track.style.overflowX = "auto";
    track.style.paddingBottom = "1rem";
    return;
  }

  var tween = build();

  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      if (tween && tween.scrollTrigger) tween.scrollTrigger.kill();
      gsap.set(track, { x: 0 });
      tween = build();
      ScrollTrigger.refresh();
    }, 150);
  });

  // gentle frame lift on hover, layered on top of the scroll-driven transform
  track.querySelectorAll(".filmstrip-frame").forEach(function (frame) {
    frame.addEventListener("mouseenter", function () {
      gsap.to(frame, { y: -8, duration: 0.4, ease: "power2.out" });
    });
    frame.addEventListener("mouseleave", function () {
      gsap.to(frame, { y: 0, duration: 0.5, ease: "power2.out" });
    });
  });
})();
