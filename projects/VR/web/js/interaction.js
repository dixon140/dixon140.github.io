// interaction.js
AFRAME.registerComponent('interaction', {
  init: function () {
    const el = this.el;

    el.setAttribute('grabbable', '');
    el.setAttribute('stretchable', '');
    el.setAttribute('hoverable', '');
    el.setAttribute('draggable', '');

    el.addEventListener('grab-start', () => el.addState('grabbed'));
    el.addEventListener('grab-end', () => el.removeState('grabbed'));

    // Click to toggle mute for this panel's video
    el.addEventListener('click', () => {
      const plane = el.querySelector('a-plane');
      const material = plane?.getAttribute('material');
      const idMatch = material?.src?.match(/^#(.+)$/);
      const id = idMatch && idMatch[1];
      if (id) {
        const video = document.getElementById(id);
        if (video) video.muted = !video.muted;
      }
    });
  }
});
