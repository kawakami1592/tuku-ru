{
  class Tiles{
    constructor(canvas,game){
      this.canvas = canvas;
      this.game = game;
      this.ctx    = this.canvas.getContext('2d');

      this.tileRow = 10;//行数
      this.tileCol = 10;//列数

      this.tiles = [];
      this.max = 5; 

      this.getTiles(this.tileRow,this.tileCol,this.max)
      console.log(this.tiles);

      this.tileSize = canvas.width / this.tileRow
      this.stage = canvas.width / this.grid;

      //失敗フラグ
      this.isMissed = false;

      //タイルクリックイベント
      this.canvas.addEventListener('click', e => {
        //キャンバスの配置情報を取得
        const rect = this.canvas.getBoundingClientRect();

        //クリック位置からタイルの座標を特定
        const col = Math.floor((e.clientX - rect.left) / this.tileSize);
        const row = Math.floor((e.clientY - rect.top) / this.tileSize);

        if(this.isMissed){
          return;
        }else{
          this.search(col, row);
        }
      });

      this.draw();

    }

    // 0からmax-1までの整数を返す
    getRandomInt(max) {
      // ランダムな配列
      return Math.floor(Math.random() * max);
    }
    getTiles(tileRow,tileCol,max){
      for (let i = 0; i < tileRow; i++) {
        this.tile_array = [];
        for (let i = 0; i < tileCol; i++) {
          if(this.getRandomInt(max) === 0){
            this.tile_array.push(2);
          }
          else{
            this.tile_array.push(1);
          }
        }
        this.tiles.push(this.tile_array);
      }
    }

    //タイルのクリックアクション
    search(col, row){
      let t = 0;

      if(this.tiles[row][col] === 2){
        console.log('ここは２');
        t = '💣';
        this.searchResult(t,col, row);
        this.isMissed = true;
        this.game.drawGameOver();
      }else{
        if(row === 0 && col === 0){//左上
          for(let a = row; a <= row +1; a++) {
            for(let b = col; b <= col +1; b++) {
              t += this.tiles[a][b] -1;
            }
          }
        }
        else if(row === 0 && col === this.tileCol -1){//右上
          for(let a = row; a <= row +1; a++) {
            for(let b = col -1; b <= col; b++) {
              t += this.tiles[a][b] -1;
            }
          }
        }
        else if(row === this.tileRow -1 && col === 0){//左下
          for(let a = row -1; a <= row; a++) {
            for(let b = col; b <= col +1; b++) {
              t += this.tiles[a][b] -1;
            }
          }
        }
        else if(row === this.tileRow -1 && col === this.tileCol -1){//右下
          for(let a = row -1; a <= row; a++) {
            for(let b = col -1; b <= col; b++) {
              t += this.tiles[a][b] -1;
            }
          }
        }
        else if(row === 0){//上
          for(let a = row; a <= row +1; a++) {
            for(let b = col -1; b <= col +1; b++) {
              t += this.tiles[a][b] -1;
            }
          }
        }
        else if(row === this.tileRow -1){//下
          for(let a = row -1; a <= row; a++) {
            for(let b = col -1; b <= col +1; b++) {
              t += this.tiles[a][b] -1;
            }
          }
        }
        else if(col === 0){//左
          for(let a = row -1; a <= row +1; a++) {
            for(let b = col; b <= col +1; b++) {
              t += this.tiles[a][b] -1;
            }
          }
        }
        else if(col === this.tileCol -1){//右
          for(let a = row -1; a <= row +1; a++) {
            for(let b = col -1; b <= col; b++) {
              t += this.tiles[a][b] -1;
            }
          }
        }
        else{
          for(let a = row -1; a <= row +1; a++) {
            for(let b = col -1; b <= col +1; b++) {
              t += this.tiles[a][b] -1;
            }
          }
        }

        this.searchResult(t,col, row);

        // drawGameclear()
      }
    }

    searchResult(t,col, row){
      this.ctx.font      = '15px "Arial Black"';
      this.ctx.fillStyle = '#fdfdfd';
      this.ctx.fillText(
        t,
        this.tileSize * col + this.tileSize/2-5,
        this.tileSize * row + this.tileSize/2+5
      );
    }

    //ブロック初期配置用２重配列を回し座標を[row][col]で取得
    draw(){
      for (let row = 0; row < this.tileRow; row++){
        for (let col = 0; col < this.tileCol; col++){

          this.ctx.strokeStyle = '#fdfdfd';
          this.ctx.strokeRect(
            col * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            this.tileSize
          );

        }
      }
    }

  }

  class Game {
    constructor(canvas) {
      this.canvas     = canvas;
      this.ctx        = this.canvas.getContext('2d');
      this.tiles      = new Tiles(this.canvas,this);
      // this.bomb       = new Bomb(this.canvas);
      this.isGameOver = false;
      this.draw();
    }

    draw(){
      if (this.isGameOver) {
        this.drawGameOver();
        return;
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.tiles.draw();
    }

    //失敗処理
    drawGameOver() {
      this.ctx.font      = '28px "Arial Black"';
      this.ctx.fillStyle = 'tomato';
      this.ctx.fillText('GAME OVER', 50, 150);
    }
    //クリア画面
    drawGameclear() {
      this.ctx.font      = '28px "Arial Black"';
      this.ctx.fillStyle = 'tomato';
      this.ctx.fillText('GAME CLEAR', 50, 150);

    }

  }

  // スタートボタン
  const start = document.getElementById('minesweeper_start');
  start.addEventListener('click', () => {
    const canvas = document.getElementById('minesweeper');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    new Game(canvas);
  });
}