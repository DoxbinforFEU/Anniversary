/* ==========================================================================
   TILT — subtle 3D pointer tilt for the previous-website browser mockup
   ========================================================================== */
(function () {
  "use strict";

  var mock = document.querySelector(".browser-mock");
  if (!mock) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var coarse = window.matchMedia("(pointer: coarse)").matches;
  if (reduced || coarse) return;

  var stage = mock.closest(".began__stage") || mock.parentElement;
  var rect;

  var rotX, rotY, scale;
  if (window.gsap) {
    rotX = gsap.quickTo(mock, "rotationX", { duration: 0.6, ease: "power3.out" });
    rotY = gsap.quickTo(mock, "rotationY", { duration: 0.6, ease: "power3.out" });
    scale = gsap.quickTo(mock, "scale", { duration: 0.6, ease: "power3.out" });
    gsap.set(mock, { transformPerspective: 1600, transformOrigin: "center" });
  }

  function onMove(e) {
    rect = stage.getBoundingClientRect();
    var px = (e.clientX - rect.left) / rect.width;
    var py = (e.clientY - rect.top) / rect.height;
    var ry = (px - 0.5) * 14;
    var rx = (0.5 - py) * 10;

    if (window.gsap) {
      rotX(rx); rotY(ry); scale(1.015);
    } else {
      mock.style.transform = "rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
    }
  }

  function onLeave() {
    if (window.gsap) { rotX(0); rotY(0); scale(1); }
    else { mock.style.transform = ""; }
  }

  stage.addEventListener("mousemove", onMove);
  stage.addEventListener("mouseleave", onLeave);
})();
