(() => {
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  class Ball {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');

      //ボール初期位置
      this.x = rand(30, 250);
      this.y = 30;
      this.r = 10;

      //移動距離
      this.vx = rand(3, 6) * (Math.random() < 0.5 ? 1 : -1);
      this.vy = rand(2, 7);

      //失敗フラグ
      this.isMissed = false;
    }

    //失敗処理
    getMissedStatus() {
      return this.isMissed;
    }

    update() {

      if (this.y - this.r > this.canvas.height){
        this.isMissed = true;
      }

      this.x += this.vx;
      this.y += this.vy;

      //左右の跳ね返り
      if (this.x - this.r < 0 || this.x + this.r > this.canvas.width){
        this.vx *= -1;
      }
      //上の跳ね返り
      if (this.y - this.r < 0){
        this.vy *= -1;
      }
    }
  
    draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = '#fdfdfd';
      this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      this.ctx.fill();
    }

    bounceY() {
      this.vy *= -1;
    }

    reposition(paddleTop) {
      this.y = paddleTop - this.r;
    }

    getX() {
      return this.x;
    }

    getY() {
      return this.y;
    }

    getR() {
      return this.r;
    }

  }

  class Paddle {
    constructor(canvas,game) {
      this.canvas = canvas;
      this.game = game;
      this.ctx = this.canvas.getContext('2d');

      //パドルのサイズ
      this.w = 60;
      this.h = 16;

      //初期位置
      this.x = this.canvas.width / 2 - (this.w / 2);
      this.y = this.canvas.height - 32;

      this.mouseX = this.x;
      this.addHandler();
    }

    //マウスの位置
    addHandler() {
      document.addEventListener('mousemove', e => {
        this.mouseX = e.clientX;
      });
    }

    update(ball) {
      const ballBottom = ball.getY() + ball.getR();
      const paddleTop = this.y;
      const ballTop = ball.getY() - ball.getR();
      const paddleBottom = this.y + this.h;
      const ballCenter = ball.getX();
      const paddleLeft = this.x;
      const paddleRight = this.x + this.w;
      
      //当たり判定
      if (
        ballBottom > paddleTop &&
        ballTop < paddleBottom &&
        ballCenter > paddleLeft &&
        ballCenter < paddleRight
      ) {
       ball.bounceY();
       ball.reposition(paddleTop);
       this.game.addScore();
      }

      //キャンバスの大きさ
      const rect = this.canvas.getBoundingClientRect();
      //パドルの左端=マウスの位置-キャンバスの左端の座標-パドルの幅/2
      this.x = this.mouseX - rect.left - (this.w / 2);

      //キャンバスの左端に行った時
      if (this.x < 0) {
        this.x = 0;
      }
      //キャンバスの右端に行った時
      if (this.x + this.w > this.canvas.width) {
        this.x = this.canvas.width - this.w;
      }
    }

    draw() {
      this.ctx.fillStyle = '#fdfdfd';
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }


  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
      this.ball = new Ball(this.canvas);
      this.paddle = new Paddle(this.canvas,this);//キャンバスの情報,Gameインスタンス
      this.loop();
      this.isGameOver = false;
      this.score = 0;
    }

    addScore() {
      this.score++;
    }

    //ゲームループ
    loop() {
      if (this.isGameOver) {
          return;
        }
      this.update();
      this.draw();
      //描画処理に最適化した再帰的処理
      requestAnimationFrame(() => {
        this.loop();
      });
    }
    
    //ゲームの情報更新
    update() {
      if (this.ball.getMissedStatus()) {
        this.isGameOver = true;
      }
      this.ball.update();
      this.paddle.update(this.ball);
    }
    
    //ゲームの描画
    draw() {
      if (this.isGameOver) {
        this.drawGameOver();
        return;
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ball.draw();
      this.paddle.draw();
      this.drawScore();
    }

    //失敗処理
    drawGameOver() {
      this.ctx.font = '28px "Arial Black"';
      this.ctx.fillStyle = 'tomato';
      this.ctx.fillText('GAME OVER', 50, 150);
    }

    //得点表示
    drawScore() {
      this.ctx.font = '20px Arial';
      this.ctx.fillStyle = '#fdfdfd';
      this.ctx.fillText(this.score, 10, 25);
    }
  }
  
  
  const canvas = document.getElementById('pinpong');
  if (typeof canvas.getContext === 'undefined') {
    return;
  }
  
  new Game(canvas);
})();