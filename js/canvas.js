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
      constructor(canvas, level) {
        this.canvas = canvas;
        this.level = level;
        this.ctx = this.canvas.getContext('2d');

        //タイル初期配置用２重配列
        this.tiles = [
          [0 , 1 , 2 , 3 ],
          [4 , 5 , 6 , 7 ],
          [8 , 9 , 10, 11],
          [12, 13, 14, 15],
        ];
        //タイル移動用
        this.UDLR = [
          [0, -1], // up
          [0, 1], // down
          [-1, 0], // left
          [1, 0], // right
        ];

        this.img = document.createElement('img');
        this.img.src = 'images/15puzzle.png';
        this.img.addEventListener('load', () => {
          this.render();
        });

        //タイルクリックイベント
        this.canvas.addEventListener('click', e => {
          //キャンバスの配置情報を取得
          const rect = this.canvas.getBoundingClientRect();

          const col = Math.floor((e.clientX - rect.left) / 70);
          //ディスプレイに対するクリック位置からキャンバスの位置情報を引いた値を70で割り、小数点以下を切り捨て
          const row = Math.floor((e.clientY - rect.top) / 70);
          console.log(col, row);
          this.swapTiles(col, row);
          this.render();

          //ゲームクリアの判定
          if (this.isComplete() === true) {
            this.renderGameClear();
          }
        });

        this.shuffle(this.level);
      }

      //タイル初期配置用２重配列を回し座標を[row][col]で取得
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
  
      //値が枠外(0~3)ならtrueを返す
      isOutside(destCol, destRow) {
        return (
          destCol < 0 || destCol > 3 || destRow < 0 || destRow > 3
        );
      }

      //初期シャッフル
      shuffle(n) {
        //15番の初期値
        let blankCol = 3;
        let blankRow = 3;
      
        //シャッフル
        for (let i = 0; i < n; i++) {
          let destCol;
          let destRow;

          do {
            const dir = Math.floor(Math.random() * 4);//0~3のランダムな数値
            destCol = blankCol + this.UDLR[dir][0];
            destRow = blankRow + this.UDLR[dir][1];
            // switch (dir) {
            //   case 0: // up
            //     destCol = blankCol + UDLR[0][0]
            //     destRow = blankRow + UDLR[0][1];
            //     break;
            //   case 1: // down
            //     destCol = blankCol + UDLR[1][0]
            //     destRow = blankRow + UDLR[1][1]
            //     break;
            //   case 2: // left
            //     destCol = blankCol + UDLR[2][0]
            //     destRow = blankRow + UDLR[2][1]
            //     break;
            //   case 3: // right
            //     destCol = blankCol + UDLR[3][0]
            //     destRow = blankRow + UDLR[3][1]
            //     break;
            // }

          //上下左右がキャンバスからはみ出す場合は次のループへスキップする
          } while (this.isOutside(destCol, destRow) === true);

          [
            this.tiles[blankRow][blankCol],
            this.tiles[destRow][destCol],
          ] = [
            this.tiles[destRow][destCol],
            this.tiles[blankRow][blankCol],
          ];
  
          [blankCol, blankRow] = [destCol, destRow];
        }
      }

      //タイルのクリックアクション
      swapTiles(col, row) {
        if (this.tiles[row][col] === 15) {
          return;
        }
  
        //クリックされたタイルの隣り合うタイルを調べる
        for (let i = 0; i < 4; i++) {
          const destCol = col + this.UDLR[i][0];
          const destRow = row + this.UDLR[i][1];

          // switch (i) {
          //   case 0: // up
          //     destCol = col;
          //     destRow = row - 1;
          //     break;
          //   case 1: // down
          //     destCol = col;
          //     destRow = row + 1;
          //     break;
          //   case 2: // left
          //     destCol = col - 1;
          //     destRow = row;
          //     break;
          //   case 3: // right
          //     destCol = col + 1;
          //     destRow = row;
          //     break;
          // }

          //上下左右がキャンバスからはみ出す場合は次のループへスキップする
          if (this.isOutside(destCol, destRow) === true) {
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

      //クリア判定
      isComplete() {
        return true;
      }
      //クリア画面
      renderGameClear() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = '28px Arial';
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText('GAME CLEAR!!', 40, 150);
      }

    }


    const canvas = document.getElementById('puzzle');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    //インスタンス生成
    new Puzzle(canvas ,30);
  })();

}