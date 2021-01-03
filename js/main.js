'use strict';

{
// ハンバーガーメニュー
  const navBtn = document.getElementById('nav-btn');
  const hamburger = document.getElementById('hamburger')
  navBtn.addEventListener('click', () => {
    navBtn.classList.toggle('nav-open');
    hamburger.classList.toggle('hamburger-close');
    mask.classList.toggle('hidden');
  });

// スクロールバー
  const scrollImgs = document.getElementById('slider-js');
  const copyImgs = scrollImgs.cloneNode(true);
  const showScrollJs = document.getElementById('show-scroll-js');
  showScrollJs.insertBefore(copyImgs, scrollImgs.nextSibling);



// モーダルウィンドウ
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const modal = document.getElementById('modal');
  const mask = document.getElementById('mask');

  open.addEventListener('click', () => {
    modal.classList.remove('hidden');
    mask.classList.remove('hidden');
  });
  close.addEventListener('click', () => {
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });

// マスク
  mask.addEventListener('click', () => {
    close.click();
    navBtn.classList.remove('nav-open');
    hamburger.classList.add('hamburger-close');

  });


// タブメニュー
  const tabMenus = document.querySelectorAll('.tab-menu ul li');
  const tabContents = document.querySelectorAll('.tab-content');

  tabMenus.forEach(tabMenu => {
    tabMenu.addEventListener('click', () => {
      
      tabMenus.forEach(tabMenuAll => {
        tabMenuAll.classList.remove('tab-selected');
      });
      tabMenu.classList.add('tab-selected');

      tabContents.forEach(tabContent => {
        tabContent.classList.remove('tab-selected-content');
      });
      document.getElementById(tabMenu.dataset.id).classList.add('tab-selected-content');
    });
  });


  //キャンバス
  let t = 0;
  function draw() {
    const canvas = document.getElementById('canvas-eye');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');

    // const CANVAS_WIDTH = canvas.width;
    // const CANVAS_HEIGHT = canvas.height;
    // const dpr = window.devicePixelRatio || 1;
    // canvas.width = CANVAS_WIDTH * dpr;
    // canvas.height = CANVAS_HEIGHT * dpr;
    // ctx.scale(dpr, dpr);
    // canvas.style.width = CANVAS_WIDTH + 'px';
    // canvas.style.height = CANVAS_HEIGHT + 'px';

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




//   var photo1 = $('.photo1');

//   var photoNumber =0;

//   function changePhoto() {
//     photoNumber += 1;

//     if (photoNumber >= 4) {
//       photoNumber = 0;
//     }

//     if (photoNumber == 0) {
//       photo1.attr('src', 'img/img.jpg');
//     }
//     else if (photoNumber == 1) {
//       photo1.attr('src', 'img/img1.jpg');
//     }
//     else if (photoNumber == 2) {
//       photo1.attr('src', 'img/img2.jpg');
//     }
//     else if (photoNumber == 3) {
//       photo1.attr('src', 'img/img3.jpg');
//     }
//     else if (photoNumber == 4) {
//       photo1.attr('src', 'img/img4.jpg');
//     }
//   };

// function changePhoto2() {
//   photoNumber -= 1;

//   if (photoNumber < 0) {
//     photoNumber = 3;
//   }

//   if (photoNumber == 0) {
//     photo1.attr('src', 'img/img.jpg');
//   }
//   else if (photoNumber == 1) {
//     photo1.attr('src', 'img/img1.jpg');
//   }
//   else if (photoNumber == 2) {
//     photo1.attr('src', 'img/img2.jpg');
//   }
//  else if (photoNumber == 3) {
//     photo1.attr('src', 'img/img3.jpg');
//   }
// }
}