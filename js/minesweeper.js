{
  class Tiles{
    constructor(canvas){
      this.canvas = canvas;
      this.ctx    = this.canvas.getContext('2d');

      //タイル初期配置用２重配列
      // this.tiles = [
      //   [1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
      //   [1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
      //   [1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
      //   [1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
      //   [1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
      //   [1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
      //   [1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
      //   [1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
      //   [1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
      //   [1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1]
      // ];
      this.tiles = [//1:タイル 2:爆弾
        [1 ,1 ,1 ,1 ,1 ],
        [1 ,2 ,1 ,2 ,1 ],
        [1 ,1 ,1 ,1 ,1 ],
        [1 ,1 ,2 ,1 ,1 ],
        [1 ,1 ,1 ,1 ,1 ]
      ];
      this.tileRow = this.tiles.length;//行数
      this.tileCol = this.tiles[0].length;//列数

      //初期位置
      this.x = 0;
      this.y = 0;

      this.tileSize = canvas.width / this.tileRow
      this.stage = canvas.width / this.grid;

      this.data = [];
      this.draw();
      //失敗フラグ
      this.isMissed = false;

      //タイルクリックイベント
      this.canvas.addEventListener('click', e => {
        //キャンバスの配置情報を取得
        const rect = this.canvas.getBoundingClientRect();

        //クリック位置からタイルの座標を特定
        const col = Math.floor((e.clientX - rect.left) / this.tileSize);
        const row = Math.floor((e.clientY - rect.top) / this.tileSize);
        console.log(col, row);
        this.search(col, row);

      });
    }


      //タイルのクリックアクション
      search(col, row){
        if(this.tiles[row][col] === 2){
          console.log('ここは２');
          // this.isMissed = true;
        }else{
          let t = 0;

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

          console.log(t);
          this.searchResult(t,col, row);
        }
      }

      searchResult(t,col, row){
        // this.ctx.font      = '28px "Arial Black"';
        this.ctx.fillStyle = '#fdfdfd';
        this.ctx.fillText(t, 50, 150);
      }

    update(){

    }

    //ブロック初期配置用２重配列を回し座標を[row][col]で取得
    draw(){
      for (let row = 0; row < this.tileRow; row++){
        for (let col = 0; col < this.tileCol; col++){
          if(this.tiles[row][col]){
            this.data.push({
              x : this.x + col * this.tileSize, 
              y : this.y + row * this.tileSize, 
              w : this.tileSize, 
              h : this.tileSize,
              b : this.tiles[row][col]//1:タイル　2：爆弾
            })
          }
        }
      }
      this.drawTiles(this.data);

    }

    drawTiles(data){
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

    //失敗処理
    getMissedStatus() {
      return this.isMissed;
    }
  }

  class Game {
    constructor(canvas) {
      this.canvas     = canvas;
      this.ctx        = this.canvas.getContext('2d');
      this.tiles      = new Tiles(this.canvas);
      // this.bomb       = new Bomb(this.canvas);
      this.isGameOver = false;
      this.loop();
    }
    loop(){
      if (this.isGameOver){
          return;
      }
      // this.update();
      this.draw();

      //再帰的処理
      // requestAnimationFrame(() => {
      //   this.loop();
      // });
    }

    update(){
      if (this.tiles.getMissedStatus()) {
        this.isGameOver = true;
      }
      this.tiles.update();
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