{
  function draw() {
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'pink';
    ctx.strokeStyle = '#f00';
    ctx.lineWidth = 8;
    // ctx.lineJoin = 'round';
    ctx.lineJoin = 'bevel';
    
    ctx.fillRect(50, 50, 50, 50);
    ctx.strokeRect(50, 50, 50, 50);
  }

  draw();
}