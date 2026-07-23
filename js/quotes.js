/* ==========================================================================
   QUOTES — handwritten journal-entry quotes, revealed as the page turns
   ========================================================================== */
(function () {
  "use strict";

  var blocks = document.querySelectorAll(".quote-block");
  if (!blocks.length || !window.gsap) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  blocks.forEach(function (block) {
    var quote = block.querySelector("blockquote");
    var cite = block.querySelector("cite");
    if (!quote) return;

    if (reduced) return;

    gsap.set(quote, { opacity: 0, y: 22, letterSpacing: "0.02em" });
    if (cite) gsap.set(cite, { opacity: 0 });

    var tl = gsap.timeline({
      scrollTrigger: window.ScrollTrigger ? {
        trigger: block,
        start: "top 82%",
        toggleActions: "play none none reverse"
      } : undefined
    });

    tl.to(quote, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" });
    if (cite) tl.to(cite, { opacity: 1, duration: 0.8, ease: "power1.out" }, "-=0.4");
  });
})();
