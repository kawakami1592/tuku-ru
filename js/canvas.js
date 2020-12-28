'use strict';

{
  function draw() {
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');

    // ctx.ellipse(x, y, rx, ry, rotation, start, end);
    ctx.ellipse(100, 100, 50, 30, Math.PI/2, 0, 2 * Math.PI);
    // ctx.rect(50, 50, 50, 50);
    
    ctx.stroke();
  }

  draw();
}