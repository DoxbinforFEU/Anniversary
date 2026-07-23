/* ==========================================================================
   LIGHTBOX — fullscreen viewer for every photograph on the site
   ========================================================================== */
(function () {
  "use strict";

  var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
  var lightbox = document.getElementById("lightbox");
  if (!triggers.length || !lightbox) return;

  var imgEl = document.getElementById("lightboxImg");
  var captionEl = document.getElementById("lightboxCaption");
  var prevBtn = document.getElementById("lightboxPrev");
  var nextBtn = document.getElementById("lightboxNext");
  var closeBtn = document.getElementById("lightboxClose");
  var figure = lightbox.querySelector(".lightbox__figure");

  var items = triggers.map(function (el) {
    return { full: el.getAttribute("data-full"), caption: el.getAttribute("data-caption") || "" };
  });

  var current = -1;
  var lastFocused = null;

  function show(index, opts) {
    if (!items.length) return;
    current = (index + items.length) % items.length;
    var item = items[current];
    imgEl.src = item.full;
    imgEl.alt = item.caption;
    captionEl.textContent = item.caption;

    if (window.gsap && !(opts && opts.silent)) {
      gsap.fromTo(figure, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
    }
  }

  function open(index, triggerEl) {
    lastFocused = triggerEl || document.activeElement;
    show(index);
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    imgEl.src = "";
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  triggers.forEach(function (el, i) {
    el.addEventListener("click", function () { open(i, el); });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(i, el);
      }
    });
  });

  closeBtn.addEventListener("click", close);
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  // basic swipe support
  var touchX = null;
  lightbox.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) { dx > 0 ? prev() : next(); }
    touchX = null;
  }, { passive: true });
})();
