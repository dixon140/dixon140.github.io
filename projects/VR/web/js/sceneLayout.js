// sceneLayout.js
export function positionPanelsInSemicircle(containerEl, panelEls, radius = 3.2) {
  const count = panelEls.length;
  if (count === 0) return;
  const startAngle = -60; // degrees
  const endAngle = 60;
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const angle = (startAngle + (endAngle - startAngle) * t) * (Math.PI / 180);
    const x = Math.sin(angle) * radius;
    const z = -Math.cos(angle) * radius;
    panelEls[i].setAttribute('position', `${x} 1.5 ${z}`);
    panelEls[i].setAttribute('rotation', `0 ${-angle * (180/Math.PI)} 0`);
  }
}

window.positionPanelsInSemicircle = positionPanelsInSemicircle;

window.buildPitWall = function(feeds) {
  const scene = document.querySelector('a-scene');
  const pitwall = document.getElementById('pitwall');
  pitwall.innerHTML = '';

  const main = feeds[0];
  const sideFeeds = feeds.slice(1, 6);

  const panels = [];

  if (main) {
    const panel = document.createElement('a-entity');
    panel.setAttribute('video-panel', JSON.stringify({ feed: main, width: 2.2, height: 1.24 }));
    panel.setAttribute('position', '0 1.6 -3');
    pitwall.appendChild(panel);
    panels.push(panel);
  }

  sideFeeds.forEach((feed) => {
    const panel = document.createElement('a-entity');
    panel.setAttribute('video-panel', JSON.stringify({ feed, width: 1.2, height: 0.68 }));
    pitwall.appendChild(panel);
    panels.push(panel);
  });

  positionPanelsInSemicircle(pitwall, panels, 3.6);
};
