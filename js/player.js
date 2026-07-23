/* ==========================================================================
   PLAYER — vintage vinyl-style music player
   ========================================================================== */
(function () {
  "use strict";

  var player = document.getElementById("player");
  var audio = document.getElementById("audioEl");
  var toggle = document.getElementById("playerToggle");
  var icon = document.getElementById("playerIcon");
  var bar = document.getElementById("playerBar");
  var barFill = document.getElementById("playerBarFill");
  var muteBtn = document.getElementById("playerMute");

  if (!player || !audio || !toggle) return;

  var PLAY_ICON = '<path d="M8 5v14l11-7z"/>';
  var PAUSE_ICON = '<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>';

  function setPlayingState(isPlaying) {
    player.classList.toggle("is-playing", isPlaying);
    icon.innerHTML = isPlaying ? PAUSE_ICON : PLAY_ICON;
    toggle.setAttribute("aria-label", isPlaying ? "Pause music" : "Play music");
  }

  toggle.addEventListener("click", function () {
    if (audio.paused) {
      var playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.then(function () { setPlayingState(true); })
          .catch(function () {
            // no audio source provided yet — fail silently and stay paused
            setPlayingState(false);
          });
      } else {
        setPlayingState(true);
      }
    } else {
      audio.pause();
      setPlayingState(false);
    }
  });

  audio.addEventListener("ended", function () { setPlayingState(false); });

  audio.addEventListener("timeupdate", function () {
    if (!audio.duration) return;
    var pct = (audio.currentTime / audio.duration) * 100;
    barFill.style.width = pct + "%";
  });

  bar.addEventListener("click", function (e) {
    if (!audio.duration) return;
    var rect = bar.getBoundingClientRect();
    var pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  });

  var MUTE_ICON = '<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 010 7"/>';
  var UNMUTE_ICON = '<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M16 9l5 6M21 9l-5 6"/>';

  muteBtn.addEventListener("click", function () {
    audio.muted = !audio.muted;
    muteBtn.innerHTML = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\">" +
      (audio.muted ? UNMUTE_ICON : MUTE_ICON) + "</svg>";
    muteBtn.setAttribute("aria-label", audio.muted ? "Unmute" : "Mute");
  });
})();
