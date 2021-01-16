'use strict';

{
  // 15パズル
  (() => {
    class Puzzle {
      constructor(puzzleCanvas, level ,image){
        this.canvas = puzzleCanvas;
        this.level = level;
        this.ctx = this.canvas.getContext('2d');
        this.img = document.createElement('img');
        this.img.src = image;

        this.TILE_SIZE = 70;

        //タイル初期配置用２重配列
        this.tiles = [
          [0 , 1 , 2 , 3 ],
          [4 , 5 , 6 , 7 ],
          [8 , 9 , 10, 11],
          [12, 13, 14, 15],
        ];
        this.BOARD_SIZE = this.tiles.length;
        this.BLANK_INDEX = this.BOARD_SIZE ** 2 - 1;
        //タイル移動用
        this.UDLR = [
          [0, -1], // up
          [0, 1], // down
          [-1, 0], // left
          [1, 0], // right
        ];
        //クリア状態フラグ
        this.isCompleted = false;

        //ロード時のイベント
        this.img.addEventListener('load', () => {
          this.render();
        });

        //タイルクリックイベント
        this.canvas.addEventListener('click', e => {

          //クリアフラグ判定
          if (this.isCompleted === true){
            return;
          }

          //キャンバスの配置情報を取得
          const rect = this.canvas.getBoundingClientRect();

          const col = Math.floor((e.clientX - rect.left) / this.TILE_SIZE);
          //ディスプレイに対するクリック位置からキャンバスの位置情報を引いた値を70で割り、小数点以下を切り捨て
          const row = Math.floor((e.clientY - rect.top) / this.TILE_SIZE);

          this.swapTiles(col, row);
          this.render();

          //ゲームクリアの判定
          if (this.isComplete() === true){
            this.renderGameClear();
            this.isCompleted = true;
          }
        });

        //初期シャッフル
        do {
          this.shuffle(this.level);
        } while (this.isComplete() === true);
        //シャッフル後クリア判定をしてクリアしていれば再度シャッフル
      }

      
      //タイル初期配置用２重配列を回し座標を[row][col]で取得
      render(){
        for (let row = 0; row < this.BOARD_SIZE; row++){
          for (let col = 0; col < this.BOARD_SIZE; col++){
            this.renderTile(this.tiles[row][col], col, row);
          }
        }
      }

      //元画像から切り出し、再配置
      renderTile(n, col, row){
        if (n === this.BLANK_INDEX){
          this.ctx.fillStyle = '#eeeeee';
          this.ctx.fillRect(
            col * this.TILE_SIZE, 
            row * this.TILE_SIZE, 
            this.TILE_SIZE, 
            this.TILE_SIZE
          );
        } else {
          this.ctx.drawImage(
            this.img,//元画像
            //画像の切取り位置
            (n % this.BOARD_SIZE) * this.TILE_SIZE, 
            Math.floor(n / this.BOARD_SIZE) * this.TILE_SIZE, 
            this.TILE_SIZE, 
            this.TILE_SIZE,
            //再配置位置
            col * this.TILE_SIZE, 
            row * this.TILE_SIZE, 
            this.TILE_SIZE, 
            this.TILE_SIZE
          );
        }
      }
  
      //値が枠外(0~3)ならtrueを返す
      isOutside(destCol, destRow){
        return (
          destCol < 0 || destCol > this.BOARD_SIZE-1 || destRow < 0 || destRow > this.BOARD_SIZE-1
        );
      }

      //初期シャッフル
      shuffle(n){
        //15番の初期値
        let blankCol = this.BOARD_SIZE-1;
        let blankRow = this.BOARD_SIZE-1;
      
        //シャッフル
        for (let i = 0; i < n; i++){
          let destCol;
          let destRow;

          do {
            const dir = Math.floor(Math.random() * this.BOARD_SIZE);//0~3のランダムな数値
            destCol = blankCol + this.UDLR[dir][0];
            destRow = blankRow + this.UDLR[dir][1];

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
      swapTiles(col, row){
        if (this.tiles[row][col] === this.BLANK_INDEX){
          return;
        }
  
        //クリックされたタイルの隣り合うタイルを調べる
        for (let i = 0; i < this.BOARD_SIZE; i++){
          const destCol = col + this.UDLR[i][0];
          const destRow = row + this.UDLR[i][1];

          // switch (i){
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
          if (this.isOutside(destCol, destRow) === true){
            continue;
          }
  
          //隣り合うタイルが15番なら分割代入で入れ替える
          if (this.tiles[destRow][destCol] === this.BLANK_INDEX){
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
      //タイル初期配置用２重配列と比較して値が全てあっていればtrue
      isComplete(){
        let i = 0;
        for (let row = 0; row < this.BOARD_SIZE; row++){
          for (let col = 0; col < this.BOARD_SIZE; col++){
            if (this.tiles[row][col] !== i++){
              return false;
            }
          }
        }
        return true;
      }
      //クリア画面
      renderGameClear(){
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = '28px Arial';
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText('GAME CLEAR!!', 40, 150);
      }

    }

    // パズルLv1生成
    const puzzleCanvas = document.getElementById('puzzle');
    if (typeof puzzleCanvas.getContext === 'undefined'){
      return;
    }
    new Puzzle(puzzleCanvas ,70 ,'images/15puzzle.png');


    // パズルLv２生成
    const start = document.getElementById('puzzle_Lv2_tab');
    start.addEventListener('click', () => {
      const puzzleCanvas = document.getElementById('puzzle_Lv2');
      if (typeof puzzleCanvas.getContext === 'undefined'){
        return;
      }
      //インスタンス生成
      new Puzzle(puzzleCanvas ,70 ,'images/pexels-eftodii-aurelia-735423.jpg');
    });

  })();

}