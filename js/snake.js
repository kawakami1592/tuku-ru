{
 
  class Snake{
    constructor(canvas,grid,stage){
      this.canvas = canvas;
      this.grid   = grid;
      this.stage  = stage;
      this.ctx    = this.canvas.getContext('2d');

      // スネークの初期値
      this.x = this.stage / 2;
      this.y = this.stage / 2;
      this.tail = 4;
      this.body = [];

      // 移動方向
      this.dx = 1;
      this.dy = 0;
      this.move();

      this.isMissed = false;
    }

    update(item){
      const itemX = item.getX();
      const itemY = item.getY();

      //蛇の体
      this.body.push({
        x: this.x,
        y: this.y
      });
      this.x += this.dx;
      this.y += this.dy;

      if(this.x === itemX && this.y === itemY) {
        this.tail++;
        console.log(this.tail);
        item.random();
      }

      if(
        this.x < 0
        || this.y < 0
        || this.x > this.stage-1
        || this.y > this.stage-1
      ){
        this.isMissed = true;
      }

    }

    draw(){
      this.ctx.fillStyle = 'green';
      this.body.forEach((obj) => {
        this.ctx.fillRect(obj.x * this.grid, obj.y * this.grid, this.grid-2, this.grid-2);
         //自分自身に接触したら最初に戻る
        if(this.x === obj.x && this.y === obj.y){
          this.isMissed = true;
        }
      })
      
      //ヘビの長さ制限
      if(this.body.length >= this.tail){
        this.body.shift();
      }
    }

    move(){
      document.addEventListener('keydown', e => {
        switch(e.key) {
          case 'ArrowLeft':
            this.dx = -1;this.dy = 0;
            break;
          case 'ArrowRight':
            this.dx = 1;this.dy = 0;
            break;
          case 'ArrowUp':
            this.dx = 0;this.dy = -1;
            break;
          case 'ArrowDown':
            this.dx = 0;this.dy = 1;
            break;
        }
      });
    }

    //失敗処理
    getMissedStatus() {
      return this.isMissed;
    }
  }

  class Item{
    constructor(canvas,grid,stage){
      this.canvas = canvas;
      this.grid   = grid;
      this.stage  = stage;
      this.ctx    = this.canvas.getContext('2d');
      this.x = Math.floor(Math.random() * this.stage);
      this.y = Math.floor(Math.random() * this.stage);

    }

    random(){
      this.x = Math.floor(Math.random() * this.stage);
      this.y = Math.floor(Math.random() * this.stage);
    }

    draw(){
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(this.x * this.grid, this.y * this.grid, this.grid -2, this.grid -2);
    }

    getX() {
      return this.x;
    }
    getY() {
      return this.y;
    }
  }

  class Game {
    constructor(canvas) {
      this.canvas     = canvas;
      this.ctx        = this.canvas.getContext('2d');
      this.grid       = 10;
      this.stage      = canvas.width / this.grid;
      this.snake      = new Snake(this.canvas, this.grid, this.stage);
      this.item       = new Item(this.canvas, this.grid, this.stage);
      this.isGameOver = false;
      this.loop();
    }

    loop(){
      if (this.isGameOver){
          return;
      }
      this.update();
      this.draw();

      //10フレームでゲームを描画
      setTimeout(() => {this.loop();}, 1000/10);
    }

    update(){
      if (this.snake.getMissedStatus()) {
        this.isGameOver = true;
      }
      this.snake.update(this.item);
    }

    draw(){
      if (this.isGameOver) {
        this.drawGameOver();
        return;
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.snake.draw();
      this.item.draw();
    }

    //失敗処理
    drawGameOver() {
      this.ctx.font      = '28px "Arial Black"';
      this.ctx.fillStyle = 'tomato';
      this.ctx.fillText('GAME OVER', 100, 150);
    }

  }

  // スタートボタン
  const start = document.getElementById('snake_start');
  start.addEventListener('click', () => {
    const canvas = document.getElementById('snake');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    new Game(canvas);
  });

}