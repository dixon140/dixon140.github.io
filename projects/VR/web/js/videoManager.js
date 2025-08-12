// videoManager.js
export function setMutedAll(muted) {
  document.querySelectorAll('video').forEach(v => { v.muted = muted; });
}

export function pauseAll() {
  document.querySelectorAll('video').forEach(v => v.pause());
}

export function playAll() {
  document.querySelectorAll('video').forEach(v => v.play().catch(() => {}));
}

window.videoManager = { setMutedAll, pauseAll, playAll };
