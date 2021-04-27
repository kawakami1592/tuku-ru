{
  const targetElemnt = document.querySelectorAll(".animationTarget");

  document.addEventListener("scroll",function(){
    for(let i = 0; i < targetElemnt.length; i++){
      //ブラウザ(画面)の上からの要素の上端の距離＋要素の高さ*0.6
      const getElemntDistance = targetElemnt[i].getBoundingClientRect().top + targetElemnt[i].clientHeight * 0.6;
      
      if(getElemntDistance < window.innerHeight){
        targetElemnt[i].classList.add("show");

      }
    }
  })
}

