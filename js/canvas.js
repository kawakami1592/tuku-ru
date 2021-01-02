'use strict';

{
  let t = 0;

  function draw() {
    const canvas = document.getElementById('canvas-eye');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');

    const CANVAS_WIDTH = canvas.width;
    const CANVAS_HEIGHT = canvas.height;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_WIDTH * dpr;
    canvas.height = CANVAS_HEIGHT * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = CANVAS_WIDTH + 'px';
    canvas.style.height = CANVAS_HEIGHT + 'px';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.ellipse(100, 100, 40, 30, 0, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(80 + 4*Math.sin(t / 20), 100, 8, 8, 0, 0, 2 * Math.PI);
    ctx.ellipse(120 + 4*Math.sin(t / 20), 100, 8, 8, 0, 0, 2 * Math.PI);
    ctx.fillStyle = 'skyblue';
    ctx.fill();

    t++;
    setTimeout(draw, 20);
  }

  draw();


  // 15パズル

  (() => {
    class Puzzle {
      constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        //タイル縦横配置用２重配列
        this.tiles = [
          [0 , 1 , 2 , 3 ],
          [4 , 5 , 6 , 7 ],
          [8 , 9 , 10, 11],
          [12, 13, 14, 15],
        ];
        this.img = document.createElement('img');
        this.img.src = 'images/15puzzle.png';
        this.img.addEventListener('load', () => {
          this.render();
        });

        this.canvas.addEventListener('click', e => {
          //キャンバスの配置情報を取得
          const rect = this.canvas.getBoundingClientRect();

          const col = Math.floor((e.clientX - rect.left) / 70);
          //ディスプレイに対するクリック位置からキャンバスの位置情報を引いた値を70で割り、小数点以下を切り捨て
          const row = Math.floor((e.clientY - rect.top) / 70);
          console.log(col, row);
          this.swapTiles(col, row);
          this.render();
        });
      }

      swapTiles(col, row) {
        if (this.tiles[row][col] === 15) {
          return;
        }
  
        //クリックされたタイルの隣り合うタイルを調べる
        for (let i = 0; i < 4; i++) {
          let destCol;
          let destRow;
          switch (i) {
            case 0: // up
              destCol = col;
              destRow = row - 1;
              break;
            case 1: // down
              destCol = col;
              destRow = row + 1;
              break;
            case 2: // left
              destCol = col - 1;
              destRow = row;
              break;
            case 3: // right
              destCol = col + 1;
              destRow = row;
              break;
          }
          if (//上下左右がキャンバスからはみ出す場合はループをスキップする
            destCol < 0 || destCol > 3 ||
            destRow < 0 || destRow > 3
          ) {
            continue;
          }
  
          //隣り合うタイルが15番なら分割代入で入れ替える
          if (this.tiles[destRow][destCol] === 15) {
            [
              this.tiles[row][col],
              this.tiles[destRow][destCol],
            ] = [
              this.tiles[destRow][destCol],
              this.tiles[row][col],
            ];
            break;
          }
        }
      }
  
      //タイル縦横配置用２重配列を回し座標を[row][col]で取得
      render() {
        for (let row = 0; row < 4; row++) {
          for (let col = 0; col < 4; col++) {
            this.renderTile(this.tiles[row][col], col, row);
          }
        }
      }
  
      //元画像から切り出し、再配置
      renderTile(n, col, row) {
        this.ctx.drawImage(
          this.img,//元画像
          (n % 4) * 70, Math.floor(n / 4) * 70, 70, 70,//画像の切取り位置
          col * 70, row * 70, 70, 70//再配置位置
        );
      }
    }


    const canvas = document.getElementById('puzzle');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    //インスタンス生成
    new Puzzle(canvas);
  })();

}