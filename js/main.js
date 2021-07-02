'use strict';

{

  //ヘッダー
  const header = document.querySelector('header');
  
  document.addEventListener("scroll",function(){
    const topBounding = document.querySelector('.top').getBoundingClientRect().bottom;
    const top = document.querySelector('.top').getBoundingClientRect().top;

    if(topBounding < 0){
      header.classList.add('header-active');
      header.classList.add('header-hide');

      setTimeout(function(){
        header.classList.remove('header-active');
      }, 1500);

    }else if(top < 0){
      header.classList.add('header-hide');
      header.classList.remove('header-active');

    }else{
      header.classList.remove('header-active');
      header.classList.remove('header-hide');
    }
  })


  //テキストアニメーション
  const animationTargetElements = document.querySelectorAll('.text-animation');

  for(let i = 0; i < animationTargetElements.length; i++){
    const targetElement = animationTargetElements[i];
    
    const texts = targetElement.textContent;
    const textsArr = [];
    const oneCharacter = texts.split('');
    targetElement.textContent = '';

    for(let j = 0; j < oneCharacter.length; j++){
      if(oneCharacter[j] ===' '){
        textsArr.push(' ')
      }else{
        textsArr.push('<span><span style="animation-delay:' + ((j*0.1)+.3) + 's;">' + oneCharacter[j] + '<span><span>');
      }
    }
    for(let k = 0; k < oneCharacter.length; k++){
      targetElement.innerHTML += textsArr[k]
    }
  }


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

// カーテン
  const curtain = document.querySelectorAll('.curtain-animation');
  window.addEventListener('scroll',function(){
    curtain.forEach( curtainTarget => {
      const curtainTargetDistance = curtainTarget.getBoundingClientRect().top + curtainTarget.clientHeight*.5;

      if(window.innerHeight > curtainTargetDistance){
        curtainTarget.classList.add('show');
      }
    });
  })




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


// パズルタブ
const tabMenusPuzzle = document.querySelectorAll('.puzzle-menu ul li');
const tabContentsPuzzle = document.querySelectorAll('.puzzle-content');

tabMenusPuzzle.forEach(tabMenuPuzzle => {
  tabMenuPuzzle.addEventListener('click', () => {
    
    tabMenusPuzzle.forEach(tabMenuAll => {
      tabMenuAll.classList.remove('tab-selected');
    });
    tabMenuPuzzle.classList.add('tab-selected');

    tabContentsPuzzle.forEach(tabContent => {
      tabContent.classList.remove('tab-selected-content');
    });
    document.getElementById(tabMenuPuzzle.dataset.id).classList.add('tab-selected-content');
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


let nam = 1;
let aaa = `aaa${nam}`;
let bbb = `bbb${nam}`;


  let KKK =`<div>
                <input type="checkbox" name="${aaa}"/>
              </div>
              <div>
                <input type="checkbox" name="${bbb}"/>
              </div>`;
  
  


  const XXX = document.getElementById('AAA')
  console.log(XXX);
  // uQdYD#4SGMA#ZR7
  XXX.insertAdjacentHTML('beforeend',KKK);
  XXX.insertAdjacentHTML('beforeend',KKK);
}