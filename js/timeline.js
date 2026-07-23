/* ==========================================================================
   TIMELINE — spine line draws in with scroll; chapter photos drift + settle
   ========================================================================== */
(function () {
  "use strict";

  if (!window.gsap || !window.ScrollTrigger) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var spinePath = document.getElementById("spinePath");
  var section = document.querySelector(".timeline__spine-wrap");

  if (spinePath && section && !reduced) {
    gsap.set(spinePath, { strokeDasharray: 100, strokeDashoffset: 100 });
    gsap.to(spinePath, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 60%",
        scrub: 0.4
      }
    });
  }

  var figures = document.querySelectorAll(".chapter__figure");
  figures.forEach(function (fig) {
    var img = fig.querySelector("img");
    if (!img) return;

    if (reduced) { gsap.set(img, { scale: 1 }); return; }

    gsap.fromTo(img,
      { scale: 1.16, yPercent: -4 },
      {
        scale: 1.02, yPercent: 4, ease: "none",
        scrollTrigger: {
          trigger: fig,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6
        }
      }
    );
  });

  // gentle counter-drift on the numerals for a hand-turned-page feel
  document.querySelectorAll(".chapter__numeral").forEach(function (num) {
    if (reduced) return;
    gsap.fromTo(num,
      { opacity: 0.35, letterSpacing: "0.35em" },
      {
        opacity: 1, letterSpacing: "0.05em", duration: 1,
        scrollTrigger: { trigger: num, start: "top 92%", toggleActions: "play none none reverse" }
      }
    );
  });
})();
