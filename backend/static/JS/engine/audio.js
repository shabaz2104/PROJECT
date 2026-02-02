export let audioCtx = null;
export let menuMusicSource = null;

let clickBuffer = null;
let menuMusicBuffer = null;

export let settings = {
  volume: 100,
  musicOn: true,
  reduceMotion: false
};

export function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (!clickBuffer) {
    fetch("/static/sounds/click.mp3")
      .then(r => r.arrayBuffer())
      .then(b => audioCtx.decodeAudioData(b))
      .then(buf => clickBuffer = buf);
  }

  if (!menuMusicBuffer) {
    fetch("/static/sounds/menu.mp3")
      .then(r => r.arrayBuffer())
      .then(b => audioCtx.decodeAudioData(b))
      .then(buf => menuMusicBuffer = buf);
  }
}

export function playMenuMusic() {
  if (!settings.musicOn || !menuMusicBuffer || menuMusicSource || !audioCtx) return;

  const src = audioCtx.createBufferSource();
  const gain = audioCtx.createGain();

  gain.gain.value = (settings.volume / 100) * 0.35;
  src.buffer = menuMusicBuffer;
  src.loop = true;

  src.connect(gain);
  gain.connect(audioCtx.destination);
  src.start();

  menuMusicSource = src;
}

export function stopMenuMusic() {
  if (menuMusicSource) {
    menuMusicSource.stop();
    menuMusicSource = null;
  }
}

export function playClickSound() {
  if (!settings.musicOn || !clickBuffer || !audioCtx) return;

  const src = audioCtx.createBufferSource();
  const gain = audioCtx.createGain();

  gain.gain.value = settings.volume / 100;
  src.buffer = clickBuffer;

  src.connect(gain);
  gain.connect(audioCtx.destination);
  src.start();
}
