/* ==========================================================================
   PRELOADER — brief cinematic mark reveal, then hands off to main.js
   ========================================================================== */
(function () {
  "use strict";

  var el = document.getElementById("preloader");
  var mark = el ? el.querySelector(".preloader__mark") : null;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // lock scroll until the preloader finishes
  document.documentElement.style.overflow = "hidden";

  function finish() {
    document.documentElement.style.overflow = "";
    if (el && el.parentNode) el.parentNode.removeChild(el);
    document.dispatchEvent(new CustomEvent("preloader:complete"));
  }

  if (!window.gsap || reduced || !el) {
    finish();
    return;
  }

  var minWait = new Promise(function (resolve) {
    var tl = gsap.timeline({ onComplete: resolve });
    tl.set(mark, { opacity: 0, letterSpacing: "0.55em" })
      .to(mark, { opacity: 1, letterSpacing: "0.3em", duration: 1.1, ease: "power2.out" })
      .to(mark, { opacity: 1, duration: 0.5 })
      .to(el, { opacity: 0, duration: 0.7, ease: "power1.inOut" }, "+=0.1");
  });

  var pageLoaded = new Promise(function (resolve) {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", resolve, { once: true });
  });

  Promise.all([minWait, pageLoaded]).then(finish);

  // absolute safety net — never let a slow asset trap the visitor behind the curtain
  setTimeout(finish, 4500);
})();
