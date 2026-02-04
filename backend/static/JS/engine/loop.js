let canvas;
let ctx;
let lastTime = 0;

let currentMap = null;

const TILE_SIZE = 16;
const SCALE = 3;

// ================= TILESET =================

const tileset = new Image();
tileset.src = "/static/images/tiles/town_tiles.png";
tileset.onload = () => console.log("✅ Tileset loaded");

// ================= PLAYER =================

const player = {
  x: 6,
  y: 6,
  speed: 0.1
};

const keys = {};

window.addEventListener("keydown", e => {
  console.log("KEY DOWN:", e.key);
  keys[e.key] = true;
});

window.addEventListener("keyup", e => {
  keys[e.key] = false;
});

// ================= INIT =================

export async function initGame() {
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  // 🔴 CRITICAL FIX: make canvas focusable + focus it
  canvas.setAttribute("tabindex", "0");
  canvas.focus();

  await loadMap("/static/maps/town_prototype.json");

  canvas.width = currentMap.width * TILE_SIZE * SCALE;
  canvas.height = currentMap.height * TILE_SIZE * SCALE;

  requestAnimationFrame(gameLoop);
}

// ================= LOOP =================

function gameLoop(timestamp) {
  const delta = timestamp - lastTime;
  lastTime = timestamp;

  update();
  draw();

  requestAnimationFrame(gameLoop);
}

// ================= UPDATE =================

function update() {
  if (keys["ArrowUp"]) player.y -= player.speed;
  if (keys["ArrowDown"]) player.y += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;

  console.log("PLAYER POS:", player.x, player.y);
}

// ================= DRAW =================

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!currentMap || !tileset.complete) return;

  drawAllTileLayers();
  drawPlayer();
}

// ================= MAP DRAW =================

function drawAllTileLayers() {
  const tilesPerRow = tileset.width / TILE_SIZE;

  currentMap.layers.forEach(layer => {
    if (layer.type !== "tilelayer") return;
    if (layer.name === "Collision") return;

    layer.data.forEach((tileId, index) => {
      if (tileId === 0) return;

      const tileIndex = tileId - 1;

      const sx = (tileIndex % tilesPerRow) * TILE_SIZE;
      const sy = Math.floor(tileIndex / tilesPerRow) * TILE_SIZE;

      const dx = (index % layer.width) * TILE_SIZE * SCALE;
      const dy = Math.floor(index / layer.width) * TILE_SIZE * SCALE;

      ctx.drawImage(
        tileset,
        sx, sy, TILE_SIZE, TILE_SIZE,
        dx, dy,
        TILE_SIZE * SCALE,
        TILE_SIZE * SCALE
      );
    });
  });
}

// ================= PLAYER DRAW =================

function drawPlayer() {
  ctx.fillStyle = "#e50914";
  ctx.fillRect(
    player.x * TILE_SIZE * SCALE,
    player.y * TILE_SIZE * SCALE,
    TILE_SIZE * SCALE,
    TILE_SIZE * SCALE
  );
}

// ================= MAP LOAD =================

async function loadMap(path) {
  const response = await fetch(path);
  const mapData = await response.json();

  console.log("✅ MAP LOADED", mapData);
  currentMap = mapData;
}
