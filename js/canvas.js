'use strict';

{
  function draw() {
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');

    // ctx.createLinearGradient(x0, y0, x1, y1);
    const g = ctx.createLinearGradient(0, 0, canvas.width, 0);

    g.addColorStop(0, '#f00');
    g.addColorStop(0.3, '#0f0');
    g.addColorStop(1, '#00f');
    
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  draw();
}