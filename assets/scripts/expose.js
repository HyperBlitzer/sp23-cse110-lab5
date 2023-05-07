// expose.js

window.addEventListener('DOMContentLoaded', init);

const VOLUMELEVEL0 = "assets/icons/volume-level-0.svg";
const VOLUMELEVEL1 = "assets/icons/volume-level-1.svg";
const VOLUMELEVEL2 = "assets/icons/volume-level-2.svg";
const VOLUMELEVEL3 = "assets/icons/volume-level-3.svg";
const jsConfetti = new JSConfetti();

function init() {
  const dropdownMenu = document.getElementById("horn-select");
  const volumeSlider = document.querySelector("[type='range']");
  const imageDisplays = document.getElementsByTagName("img");
  const playButton = document.getElementsByTagName("button");
  const audio = document.getElementsByClassName("hidden");


  dropdownMenu.addEventListener('change', function() {
      let value = dropdownMenu.options[dropdownMenu.selectedIndex].value;
      imageDisplays[0].src = 'assets/images/'+value+'.svg';
      audio[0].src = 'assets/audio/'+value+'.mp3';
  })

  volumeSlider.addEventListener('change', function() {
    let value = volumeSlider.value;
    if (Number(value) == 0) {
      imageDisplays[1].src = VOLUMELEVEL0;
      imageDisplays[1].alt = "Volume Level 0";
    } else if (Number(value) > 1 && Number(value) < 33) {
      imageDisplays[1].src = VOLUMELEVEL1;
      imageDisplays[1].alt = "Volume Level 1";
    } else if (Number(value) > 32 && Number(value) < 67) {
      imageDisplays[1].src = VOLUMELEVEL2;
      imageDisplays[1].alt = "Volume Level 2";
    } else {
      imageDisplays[1].src = VOLUMELEVEL3;
      imageDisplays[1].alt = "Volume Level 3";
    }
    audio[0].volume = value*.01;
  })

  playButton[0].addEventListener('click', function() {
    let value = dropdownMenu.options[dropdownMenu.selectedIndex].value;
    if (value == "party-horn") {
      jsConfetti.addConfetti();
    }
    audio[0].play();
  })
}


