document.addEventListener('DOMContentLoaded', () => {
  const nextDom = document.querySelector('.next');
  const prevDom = document.querySelector('.prev');
  const sliderDom = document.querySelector('.slider');
  const listDom = document.querySelector('.slider');

  // Background music setup with correct filename
  const bgMusic = new Audio('Ricky_Montgomery_-_Line_Without_a_Hook_(mp3.pm).mp3');
  bgMusic.loop = true;

  // Auto play music on first user click anywhere on page
  const playMusic = () => {
    bgMusic.play().then(() => {
      document.removeEventListener('click', playMusic);
    }).catch(error => {
      console.log("Autoplay blocked:", error);
    });
  };
  document.addEventListener('click', playMusic);

  nextDom.onclick = function(){
    showSlider('next');
  }

  prevDom.onclick = function(){
    showSlider('prev');
  }

  let timeRunning = 3000;
  let timeAutoNext = 7000;
  let runTimeOut;
  let runAutoSlider = setTimeout(() => {
    nextDom.click();
  }, timeAutoNext);

  function showSlider(type){
    let sliderItemsDom = listDom.querySelectorAll('.slider .item');
    
    if(type === 'next'){
      listDom.appendChild(sliderItemsDom[0]);
      sliderDom.classList.add('next');
    }else{
      listDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
      sliderDom.classList.add('prev');
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
      sliderDom.classList.remove('next');
      sliderDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runAutoSlider);
    runAutoSlider = setTimeout(() => {
      nextDom.click();
    }, timeAutoNext);
  }
});
