export const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});
export function getGamepadAxis() {
  const gamepads = navigator.getGamepads();
  if (!gamepads) return { x: 0, y: 0 };

  const gp = gamepads[0];
  if (!gp) return { x: 0, y: 0 };

  // Left stick
  let x = gp.axes[0] || 0;
  let y = gp.axes[1] || 0;

  // Deadzone
  const deadzone = 0.15;
  if (Math.abs(x) < deadzone) x = 0;
  if (Math.abs(y) < deadzone) y = 0;

  return { x, y };
}
