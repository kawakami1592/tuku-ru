(() => {
  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
    }
  }
  
  const canvas = document.getElementById('pinpong');
  if (typeof canvas.getContext === 'undefined') {
    return;
  }
  
  new Game(canvas);
})();