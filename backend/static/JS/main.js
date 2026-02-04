console.log("✅ main.js loaded");

import { initGame } from "./engine/loop.js";
import { showScreen } from "./engine/screen.js";
import {
  initAudio,
  playMenuMusic,
  stopMenuMusic,
  playClickSound
} from "./engine/audio.js";

// ===== EXPOSE MENU FUNCTIONS TO HTML =====

window.startGame = function () {
  stopMenuMusic();
  showScreen("game-screen");
  initGame();
};

window.openSettings = function () {
  showScreen("settings-screen");
};

window.openCredits = function () {
  showScreen("credits-screen");
};

window.backToMenu = function () {
  showScreen("intro-screen");
  playMenuMusic();
};

window.resetSettings = function () {
  localStorage.removeItem("settings");
  location.reload();
};

// ===== WAIT FOR DOM =====
document.addEventListener("DOMContentLoaded", () => {

  // Audio unlock
  document.addEventListener("click", function unlock() {
    initAudio();
    playMenuMusic();
    document.removeEventListener("click", unlock);
  });

  document.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") playClickSound();
  });

  // Fullscreen toggle
  const fsToggle = document.getElementById("fullscreen-toggle");

  if (fsToggle) {
    fsToggle.addEventListener("change", () => {
      if (fsToggle.checked) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });

    document.addEventListener("fullscreenchange", () => {
      fsToggle.checked = !!document.fullscreenElement;
    });
  }
});
