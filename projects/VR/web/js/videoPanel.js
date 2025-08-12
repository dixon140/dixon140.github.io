// videoPanel.js
AFRAME.registerComponent('video-panel', {
  schema: { type: 'string' },
  init: function () {
    let config = {};
    try { config = JSON.parse(this.data || '{}'); } catch {}
    const { feed, width = 1.6, height = 0.9 } = config;

    const el = this.el;
    const assets = document.getElementById('assets');

    const videoId = `vid_${feed?.id || Math.random().toString(36).slice(2)}`;

    const video = document.createElement('video');
    video.setAttribute('id', videoId);
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.crossOrigin = 'anonymous';
    video.preload = 'auto';
    video.autoplay = true;
    video.muted = true; // user gesture policies; unmute via controller later
    video.controls = false;

    if (feed?.hls) video.src = feed.hls;
    else if (feed?.dash) video.src = feed.dash;

    assets.appendChild(video);

    const plane = document.createElement('a-plane');
    plane.setAttribute('material', `shader: flat; src: #${videoId}`);
    plane.setAttribute('width', width);
    plane.setAttribute('height', height);
    el.appendChild(plane);

    // Interaction handle
    el.setAttribute('class', 'interactable');
    el.setAttribute('interaction', '');

    video.addEventListener('loadeddata', () => {
      video.play().catch(() => {});
    });
  }
});
