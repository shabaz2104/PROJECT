export function hideAllScreens() {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.remove("active")
  );
}

export function showScreen(id) {
  hideAllScreens();
  document.getElementById(id).classList.add("active");
}
