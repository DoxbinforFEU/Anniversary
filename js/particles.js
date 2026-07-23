/* ==========================================================================
   PARTICLES — ambient floating dust motes in the hero
   ========================================================================== */
(function () {
  "use strict";

  var field = document.getElementById("heroParticles");
  if (!field || !window.gsap) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  var COUNT = window.innerWidth < 700 ? 16 : 30;
  var frag = document.createDocumentFragment();
  var motes = [];

  for (var i = 0; i < COUNT; i++) {
    var mote = document.createElement("span");
    var size = gsap.utils.random(2, 4);
    mote.style.width = size + "px";
    mote.style.height = size + "px";
    mote.style.left = gsap.utils.random(0, 100) + "%";
    mote.style.top = gsap.utils.random(0, 100) + "%";
    frag.appendChild(mote);
    motes.push(mote);
  }
  field.appendChild(frag);

  function drift(mote) {
    gsap.to(mote, {
      opacity: gsap.utils.random(0.15, 0.6),
      duration: gsap.utils.random(1.5, 3)
    });
    gsap.to(mote, {
      x: "+=" + gsap.utils.random(-60, 60),
      y: "+=" + gsap.utils.random(-90, -30),
      duration: gsap.utils.random(9, 18),
      ease: "sine.inOut",
      onComplete: function () { drift(mote); }
    });
  }

  var started = false;
  function start() {
    if (started) return;
    started = true;
    motes.forEach(drift);
  }

  document.addEventListener("preloader:complete", start, { once: true });
  setTimeout(function () {
    if (!document.getElementById("preloader")) start();
  }, 4600);
})();
