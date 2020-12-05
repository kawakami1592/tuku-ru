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

}