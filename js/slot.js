'use strict';

{
  class Panel {
    constructor() {
      //section要素作成しpanelクラスを追加
      const section = document.createElement('section');
      section.classList.add('panel');

      //img要素作成しsrc属性を設定
      this.img = document.createElement('img');
      this.img.src = this.getRandomImage();

      //div要素を作成しテキストとクラスを追加
      this.stop = document.createElement('div');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('stop', 'inactive');

      //section要素の子要素に、img要素とdiv要素を追加
      section.appendChild(this.img);
      section.appendChild(this.stop);

      //IDのslot-mainの要素を取得し、子要素にsection要素を追加
      const main = document.getElementById('slot-main');
      main.appendChild(section);


      this.timeoutId = undefined;
      // ストップボタンのイベント
      this.stop.addEventListener('click', () => {
        // inactiveクラスが付いていたら処理を止める
        if (this.stop.classList.contains('inactive')) {
          return;
        }
        //inactiveクラスを追加する
        this.stop.classList.add('inactive');

        // setTimeoutを止める
        clearTimeout(this.timeoutId);

        // 結果判定のための変数、ストップボタンを押すたびに-1する
        panelsLeft--;

        // 結果判定のための変数、0になったら関数を呼び出す
        if (panelsLeft === 0) {
          checkResult();
          // スタートボタンのinactiveクラスを外す
          start.classList.remove('inactive');
          // 結果判定のためのカウント変数を初期値に戻す
          panelsLeft = 3;
        }
      });

    }

    //img要素のsrc属性の値
    getRandomImage() {
      // 使用する画像を配列で保持
      const images = [
        './images/seven.png',
        './images/bell.png',
        './images/cherry.png',
      ];
      //ランダムなimgを返す。「切り捨て（０〜１の乱数 * 配列の数）」
      return images[Math.floor(Math.random() * images.length)];
    }

    // spinメソッド
    spin() {
      this.img.src = this.getRandomImage();

      // 70ms毎にspinメソッドを呼び出す
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 70);
    }
    // パネルに表示されている画像が他の２つと違うかを判定
    isUnmatched(p1, p2) {
      // panels[0]とpanels[1]、panels[2]が等しくない時はtrueを返す
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    // パネルに表示されている画像が他の２つと違う場合クラスを追加
    unmatch() {
      this.img.classList.add('unmatched');
    }

    // スタートが押された時に再度各クラスを外す
    activate() {
      this.img.classList.remove('unmatched');
      this.stop.classList.remove('inactive');
    }
  }

  // 結果判定の関数
  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }
  }

  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
  ];

  // 結果判定のための変数、初期値
  let panelsLeft = 3;

  // スタートボタンのイベント
  const start = document.getElementById('start');
  start.addEventListener('click', () => {
    // inactiveクラスが付いていたら処理を止める
    if (start.classList.contains('inactive')) {
      return;
    }
    // inactiveクラスを追加する
    start.classList.add('inactive');

    // 配列panelsの中身を１つづつ取り出す
    panels.forEach(panel => {
      // 要素のクラスを外すメソッドを呼び出す
      panel.activate();
      // spinメソッド呼び出し
      panel.spin();
    });
  });
}