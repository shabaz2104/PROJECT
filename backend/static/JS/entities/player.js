const TILE_SIZE = 16;
const SCALE = 3;

let player = {
  x: 6,
  y: 6
};

let keys = {};

// HARD PROOF keyboard works
window.addEventListener("keydown", e => {
  console.log("KEY DOWN:", e.key);
  keys[e.key] = true;
});

window.addEventListener("keyup", e => {
  keys[e.key] = false;
});

export function updatePlayer() {
  if (keys["ArrowUp"])    player.y -= 0.1;
  if (keys["ArrowDown"])  player.y += 0.1;
  if (keys["ArrowLeft"])  player.x -= 0.1;
  if (keys["ArrowRight"]) player.x += 0.1;

  // HARD PROOF update runs
  console.log("PLAYER POS:", player.x, player.y);
}

export function drawPlayer(ctx) {
  ctx.fillStyle = "#e50914";
  ctx.fillRect(
    player.x * TILE_SIZE * SCALE,
    player.y * TILE_SIZE * SCALE,
    TILE_SIZE * SCALE,
    TILE_SIZE * SCALE
  );
}
