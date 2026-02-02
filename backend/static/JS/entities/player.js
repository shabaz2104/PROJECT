import { keys } from "../engine/input.js";
import { TILE_SIZE, TILE_TYPES } from "../utils/constants.js";
import { townSquareMap } from "../scenes/TownSquare.js";


export const player = {
  x: 0,
  y: 0,
  width: 20,
  height: 20,
  speed: 0.25,
  color: "#e50914"
};


export function initPlayer(canvas) {
  player.x = canvas.width / 2 - player.width / 2;
  player.y = canvas.height / 2 - player.height / 2;
}
function isWallAt(x, y) {
  const tileX = Math.floor(x / TILE_SIZE);
  const tileY = Math.floor(y / TILE_SIZE);

  if (
    tileY < 0 ||
    tileY >= townSquareMap.length ||
    tileX < 0 ||
    tileX >= townSquareMap[0].length
  ) {
    return true; // treat outside map as wall
  }

  return townSquareMap[tileY][tileX] === TILE_TYPES.WALL;
}


export function updatePlayer(delta, canvas) {
  let nextX = player.x;
  let nextY = player.y;

  const move = player.speed * delta;

  if (keys["w"] || keys["ArrowUp"]) nextY -= move;
  if (keys["s"] || keys["ArrowDown"]) nextY += move;
  if (keys["a"] || keys["ArrowLeft"]) nextX -= move;
  if (keys["d"] || keys["ArrowRight"]) nextX += move;

  // --- X axis collision ---
  if (
    !isWallAt(nextX, player.y) &&
    !isWallAt(nextX + player.width - 1, player.y) &&
    !isWallAt(nextX, player.y + player.height - 1) &&
    !isWallAt(nextX + player.width - 1, player.y + player.height - 1)
  ) {
    player.x = nextX;
  }

  // --- Y axis collision ---
  if (
    !isWallAt(player.x, nextY) &&
    !isWallAt(player.x + player.width - 1, nextY) &&
    !isWallAt(player.x, nextY + player.height - 1) &&
    !isWallAt(player.x + player.width - 1, nextY + player.height - 1)
  ) {
    player.y = nextY;
  }
}



export function drawPlayer(ctx) {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

