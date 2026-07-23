/* ==========================================================================
   BEGAN PREVIEW — attempts a genuine live iframe of the previous site;
   falls back to the styled placeholder if it's blocked or too slow.
   ========================================================================== */
(function () {
  "use strict";

  var screen = document.getElementById("beganScreen");
  var iframe = document.getElementById("beganIframe");
  if (!screen || !iframe) return;

  var settled = false;

  function reveal() {
    if (settled) return;
    settled = true;
    screen.classList.add("is-loaded");
  }

  function fallback() {
    if (settled) return;
    settled = true;
    screen.classList.add("is-blocked");
    // stop holding onto a dead/blocked cross-origin frame
    iframe.setAttribute("src", "about:blank");
  }

  iframe.addEventListener("load", function () {
    // a same-origin-blocked frame (X-Frame-Options / CSP frame-ancestors)
    // still fires "load" in most browsers, so give it a beat to actually
    // paint before trusting it — then reveal.
    setTimeout(reveal, 150);
  });

  iframe.addEventListener("error", fallback);

  // if nothing has resolved within a reasonable window, assume the target
  // refused to be framed (or is too slow) and show the elegant placeholder
  setTimeout(fallback, 6000);
})();
