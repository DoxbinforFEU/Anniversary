/* ==========================================================================
   FINALE — the letter on the desk, then a slow fade into starlight
   ========================================================================== */
(function () {
  "use strict";

  var sky = document.getElementById("nightsky");
  var paper = document.querySelector(".finale__paper");
  var signoff = document.querySelector(".finale__signoff");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (sky) {
    var COUNT = window.innerWidth < 700 ? 40 : 80;
    var frag = document.createDocumentFragment();
    var stars = [];
    for (var i = 0; i < COUNT; i++) {
      var star = document.createElement("span");
      var size = Math.random() * 1.6 + 1;
      star.style.width = size + "px";
      star.style.height = size + "px";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      frag.appendChild(star);
      stars.push(star);
    }
    sky.appendChild(frag);

    if (window.gsap) {
      if (window.ScrollTrigger) {
        gsap.to(stars, {
          opacity: function () { return gsap.utils.random(0.3, 1); },
          duration: 1.2,
          stagger: { each: 0.01, from: "random" },
          scrollTrigger: { trigger: sky, start: "top 75%", toggleActions: "play none none reverse" },
          onComplete: function () {
            if (reduced) return;
            stars.forEach(function (s) {
              gsap.to(s, {
                opacity: gsap.utils.random(0.15, 1),
                duration: gsap.utils.random(1.5, 3.5),
                repeat: -1, yoyo: true, ease: "sine.inOut",
                delay: Math.random() * 2
              });
            });
          }
        });
      } else {
        gsap.set(stars, { opacity: 1 });
      }
    } else {
      stars.forEach(function (s) { s.style.opacity = 1; });
    }
  }

  if (window.gsap && window.ScrollTrigger && paper && !reduced) {
    gsap.fromTo(paper,
      { scale: 0.94 },
      {
        scale: 1, ease: "none",
        scrollTrigger: {
          trigger: paper,
          start: "top 90%",
          end: "top 25%",
          scrub: 0.6
        }
      }
    );
  }

  if (window.gsap && signoff) {
    gsap.fromTo(signoff, { opacity: 0, y: 16 }, {
      opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
      scrollTrigger: window.ScrollTrigger ? {
        trigger: signoff, start: "top 90%", toggleActions: "play none none reverse"
      } : undefined,
      delay: window.ScrollTrigger ? 0 : 0.3
    });
  }
})();
