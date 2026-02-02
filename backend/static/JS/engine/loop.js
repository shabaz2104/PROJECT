let canvas;
let ctx;
let lastTime = 0;
import { initPlayer, updatePlayer, drawPlayer } from "../entities/player.js";
import { TILE_SIZE, TILE_TYPES } from "../utils/constants.js";
import { townSquareMap } from "../scenes/TownSquare.js";




export function initGame() {
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");

  initPlayer(canvas);

  lastTime = 0;
  requestAnimationFrame(gameLoop);
}


function gameLoop(timestamp) {
  const delta = timestamp - lastTime;
  lastTime = timestamp;

  update(delta);
  draw();

  requestAnimationFrame(gameLoop);
}

function update(delta) {
  updatePlayer(delta, canvas);
}


function drawMap(ctx) {
  for (let y = 0; y < townSquareMap.length; y++) {
    for (let x = 0; x < townSquareMap[y].length; x++) {
      const tile = townSquareMap[y][x];

      if (tile === TILE_TYPES.FLOOR) {
        ctx.fillStyle = "#111";
      } else if (tile === TILE_TYPES.WALL) {
        ctx.fillStyle = "#222";
      }

      ctx.fillRect(
        x * TILE_SIZE,
        y * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawMap(ctx);
  drawPlayer(ctx);
}


