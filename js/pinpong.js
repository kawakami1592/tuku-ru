{
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  class Ball {
    constructor(canvas,game) {
      this.canvas = canvas;
      this.game   = game;
      this.ctx    = this.canvas.getContext('2d');

      //ボール初期位置
      this.x = rand(30, 250);
      this.y = 100;
      this.r = 7;

      //移動距離
      this.vx = rand(2, 4) * (Math.random() < 0.5 ? 1 : -1);
      this.vy = rand(2, 5);

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

    bounceXY() {
      this.vx *= -1.1;
      this.vy *= -1;
    }
    bounceX() {
      this.vx *= -1;
    }
    bounceY() {
      this.vy *= -1;
    }

    reposition(paddleTop) {
      this.y = paddleTop - this.r;
    }
    repositionLeft(paddleLeft) {
      this.x = paddleLeft - this.r;
    }
    repositionRight(ballRight) {
      this.x = ballRight + this.r;
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

    getVX() {
      this.vx *= 1.1;
      this.vy *= 1.1;
      
    }


  }

  class Paddle {
    constructor(canvas,game) {
      this.canvas = canvas;
      this.game   = game;
      this.ctx    = this.canvas.getContext('2d');

      //パドルのサイズ
      this.w = 55;
      this.h = 7;

      //初期位置
      this.x = this.canvas.width / 2 - (this.w / 2);
      this.y = this.canvas.height - 20;

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
      const ballTop     = ball.getY() - ball.getR();
      const ballBottom  = ball.getY() + ball.getR();
      const ballLeft    = ball.getX() - ball.getR();
      const ballRight   = ball.getX() + ball.getR();
      const ballCenterX = ball.getX();
      const ballCenterY = ball.getY();

      const paddleTop    = this.y;
      const paddleBottom = this.y + this.h;
      const paddleLeft   = this.x;
      const paddleRight  = this.x + this.w;
      const paddleCenter = ball.getY();
      
      //当たり判定
      if(//下端
        // ballBottom  > this.y + this.h /2 &&
        ballCenterY > this.y + this.h /2 &&
        ballCenterX > paddleLeft &&
        ballCenterX < paddleRight
      ){
        return;
        // ball.bounceY();
        //  ball.reposition(paddleTop);
        // this.game.addScore();
      }
      else if(//左端
        ballCenterY > paddleTop &&
        ballCenterY < paddleBottom &&
        ballLeft    < paddleLeft &&
        ballRight   > paddleLeft
      ){
        ball.bounceXY();
        // ball.repositionLeft(ballLeft);
        this.game.addScore();
      }
      else if(//右端
        ballCenterY > paddleTop &&
        ballCenterY < paddleBottom &&
        ballLeft    < paddleRight &&
        ballRight   > paddleRight
      ){
        ball.bounceXY();
        // ball.repositionRight(ballRight);
        this.game.addScore();
      }
      else if(//上端
        ballBottom  > this.y + this.h /2 &&
        // ballTop     < this.y + this.h /2 &&
        ballCenterX > paddleLeft &&
        ballCenterX < paddleRight
      ){
        ball.bounceY();
         ball.reposition(paddleTop);
        this.game.addScore();
      }

      //キャンバスの大きさ
      const rect = this.canvas.getBoundingClientRect();
      //パドルの左端=マウスの位置-キャンバスの左端の座標-パドルの幅/2
      this.x = this.mouseX - rect.left - (this.w / 2);

      //キャンバスの左端に行った時
      if (this.x + this.w/2 < 0) {
        this.x = -this.w/2;
      }
      //キャンバスの右端に行った時
      if (this.x + this.w /2 > this.canvas.width) {
        this.x = this.canvas.width - this.w/2;
      }
    }

    draw() {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(this.x + this.w, this.y);
      this.ctx.lineTo(this.x + this.w +5, this.y + this.h/2);
      this.ctx.lineTo(this.x + this.w, this.y + this.h);
      this.ctx.lineTo(this.x , this.y + this.h);
      this.ctx.lineTo(this.x -5 , this.y + this.h/2);
      this.ctx.closePath();
      this.ctx.fillStyle = '#fdfdfd';
      this.ctx.fill();
    }
  }

  class Bricks{
    constructor(canvas,game){
      this.canvas = canvas;
      this.game   = game;
      this.ctx    = this.canvas.getContext('2d');
      this.Brick_H = 10;
      this.Brick_W = 25;
      //ブロック初期配置用２重配列
      this.bricks = [
        [ 1,1,1,1,1,1,1,1,1,1,],
        [ 1,1,1,1,1,1,1,1,1,1,],
        [ 1,1,1,1,1,1,1,1,1,1,],
        [ 1,1,1,1,1,1,1,1,1,1,],
      ];
      this.brickRow = this.bricks.length;//行数
      this.brickCol = this.bricks[0].length;//列数

      //初期位置
      this.x = 20;
      this.y = 10;

      this.data = [];
      this.draw();
    }

    update(ball) {
      const ballTop     = ball.getY() - ball.getR();
      const ballBottom  = ball.getY() + ball.getR();
      const ballLeft    = ball.getX() - ball.getR();
      const ballRight   = ball.getX() + ball.getR();
      const ballCenterX = ball.getX();
      const ballCenterY = ball.getY();

      this.data.forEach((brick,i) => {

        // this.drawBrick(this.bricks[row][col], col, row);
        const brickTop    = brick.y;
        const brickBottom = brick.y + this.Brick_H;
        const brickLeft   = brick.x;
        const brickRight  = brick.x +  this.Brick_W;

        //当たり判定
        if(//上下
          ballTop     < brickBottom &&
          ballBottom  > brickTop &&
          ballCenterX < brickRight &&
          ballCenterX > brickLeft
        ){
          ball.bounceY();
          this.data.splice(i,1);

        }
        else if(//左右
          ballCenterY < brickBottom &&
          ballCenterY > brickTop &&
          ballLeft    < brickRight &&
          ballRight   > brickLeft
        ){
          ball.bounceX();
          this.data.splice(i,1);
        }

      });
    }

    //ブロック初期配置用２重配列を回し座標を[row][col]で取得
    draw() {
      for (let row = 0; row < this.brickRow; row++) {//row=0~3
        for (let col = 0; col < this.brickCol; col++) {//col=0~７
          if(this.bricks[row][col]){
            this.data.push({
              x : this.x + col * this.Brick_W, 
              y : this.y + row * this.Brick_H, 
              w : this.Brick_W, 
              h : this.Brick_H
            })
          }
        }
      }
      this.drawBrick(this.data);
    }
    drawBrick(data) {
      data.forEach(brick => {
        // this.ctx.fillStyle = '#fdfdfd';
        this.ctx.strokeStyle = '#fdfdfd';
        // this.ctx.fillRect(
        this.ctx.strokeRect(
        brick.x, 
        brick.y, 
        brick.w, 
        brick.h
      );
      });

    }

  }


  class Game {
    constructor(canvas) {
      this.canvas     = canvas;
      this.ctx        = this.canvas.getContext('2d');
      this.ball       = new Ball(this.canvas,this);
      this.paddle     = new Paddle(this.canvas,this);//キャンバスの情報,Gameインスタンス
      this.bricks     = new Bricks(this.canvas,this);
      this.isGameOver = false;
      this.score      = 0;
      this.loop();
    }

    addScore() {
      this.score++;
      if(this.score % 5 === 0){
        this.ball.getVX();
      }
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
      this.bricks.update(this.ball);
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
      this.bricks.drawBrick(this.bricks.data);
      this.drawScore();
    }

    //失敗処理
    drawGameOver() {
      this.ctx.font      = '28px "Arial Black"';
      this.ctx.fillStyle = 'tomato';
      this.ctx.fillText('GAME OVER', 50, 150);
    }

    //得点表示
    drawScore() {
      this.ctx.font      = '20px Arial';
      this.ctx.fillStyle = '#fdfdfd';
      this.ctx.fillText(this.score, 10, 25);
    }
    getScore(){
      return this.score;
    }
  }
  
  
  // スタートボタン
  const start = document.getElementById('pinpong_start');
  start.addEventListener('click', () => {

    const canvas = document.getElementById('pinpong');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    
    new Game(canvas);

  });


}