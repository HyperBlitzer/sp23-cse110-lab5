// explore.js

window.addEventListener('DOMContentLoaded', init);

const SMILING = "assets/images/smiling.png";
const TALKING = "assets/images/smiling-open.png";

function init() {
  const textBox = document.getElementById("text-to-speak");
  const button = document.getElementsByTagName("button");
  const dropDown = document.getElementById("voice-select");
  const images = document.getElementsByTagName("img");
  const synth = window.speechSynthesis;

  setInterval(() => {
    if (synth.speaking) {
      images[0].src = TALKING;
    } else {
      images[0].src = SMILING;
    }
  },500)
  
  let voices = [];

  function populateVoiceList() {
    voices = synth.getVoices();

    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

      if (voices[i].default) {
        option.textContent += " - DEFAULT";
      }

      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      dropDown.appendChild(option);
    }
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }


  button[0].addEventListener('click', function() {
    const utterThis = new SpeechSynthesisUtterance(textBox.value);
    const selectedOption = dropDown.selectedOptions[0].getAttribute("data-name");
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    synth.speak(utterThis);
  })
}