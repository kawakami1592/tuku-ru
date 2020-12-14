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