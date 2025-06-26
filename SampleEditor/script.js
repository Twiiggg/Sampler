// import WaveSurfer from '../node_modules/wavesurfer.js'
import Spectrogram from '../node_modules/wavesurfer.js/dist/plugins/spectrogram.esm.js';

let options= {
  container: '#waveform',
  url: "./audio/TheAmenBreak.ogg",
  normalize: false,
  waveColor: "#7f7f7f",
  progressColor: "#56e45e",
  cursorColor: "#ffffff",
  cursorWidth: 2,
  barWidth: 2,
  barGap: 2,
  barRadius: 4,
  barAlign: "bottom",
  fillParent: true,   
  autoplay: false,
  interact: true,
  dragToSeek: true,
  hideScrollbar: false,
  audioRate: 1,
  sampleRate: 8000
}
let spectroOptions = {
    labels: true,
    height: 200,
    splitChannels: false,
    scale: 'mel',
    frequencyMax: 8000,
    frequencyMin: 0,
    fftSamples: 1024,
    labelsBackground: 'rgba(0, 0, 0, 0.05)'
  }

let wavesurfer = WaveSurfer.create(options)
let spectrogram = wavesurfer.registerPlugin(Spectrogram.create(spectroOptions))


// let prev = document.getElementById("prev")
// let next = document.getElementById("next")
let playpause = document.getElementById("playpause")
let volumeslider = document.getElementById("volume")
let volumeValue = document.getElementById("volumeValue")
let speed = document.getElementById("speed")
let speedValue = document.getElementById("speedValue")
let loop = document.getElementById("loop")
let wfstyle = document.getElementById("wfstyle")
let spectro = document.getElementById("spectro")
let timeIndicator = document.getElementById("timeIndicator")
// let throbber = document.getElementById("throbber")

let wfstyleMode = true
let loopMode = false
let spectroMode = true
let sampleDuration = 0

// indicador de duração
wavesurfer.on('decode', (duration) => {
  sampleDuration = duration
  timeIndicator.innerHTML = "0.00/" + sampleDuration .toFixed(2)
})
// atualização
wavesurfer.on('timeupdate', (currentTime) => {
  timeIndicator.innerHTML = currentTime.toFixed(2) + "/" + sampleDuration.toFixed(2)
})

// muda a estilização 
function wfstyling(){
  if (wfstyleMode) {
    options.barWidth = 2
    options.barGap = 2
    options.barAlign = 'bottom'
    
  } else {    
    options.barWidth = null
    options.barGap = null
    options.barAlign = ''
  }
  wavesurfer.setOptions(options) 
}
// toggle no espectrograma
function spectroToggle(){
  if (spectroMode) {
    spectrogram = wavesurfer.registerPlugin(Spectrogram.create(spectroOptions))
    wavesurfer.setOptions(options)
  } else {
    spectrogram.destroy()
  }
}

wavesurfer.on('play', () => {
  playpause.style.backgroundImage = "url('img/pause.png')"
})
wavesurfer.on('pause', () => {
  playpause.style.backgroundImage = "url('img/play.png')"
})

// faz o loop funcionar
wavesurfer.on('finish', () => {
  if (loopMode) wavesurfer.play(0)
})

// Loop toggle
loop.addEventListener('click', () => {
  loopMode = !loopMode;
  loop.style.backgroundImage = loopMode ? "url('img/loopon.png')" : "url('img/loopoff.png')";
})
// waveform styling toggle
wfstyle.addEventListener('click', () => {
  wfstyleMode = !wfstyleMode;
  wfstyling()
  wfstyle.style.backgroundImage = wfstyleMode ? "url('img/styleon.png')" : "url('img/styleoff.png')";
})
// spectrogram toggle
spectro.addEventListener('click', () => {
  spectroMode = !spectroMode;
  spectroToggle()
  spectro.textContent = spectroMode ? 'spec on' : 'spec off';
})
// Volume control
volumeslider.addEventListener('input', () => {
  let volume = volumeslider.value
  volumeValue.textContent = Math.floor(volume*100) + "%"
  volume = volume*volume // faz com que o volume parece mais linear
  wavesurfer.setVolume(volume);
});

// Speed control
speed.addEventListener('input', () => {
  const rate = parseFloat(speed.value);
  wavesurfer.setPlaybackRate(rate);
  speedValue.textContent = rate.toFixed(2) + "x"; // codigo
});

// playPause
playpause.addEventListener('click', () => {
  wavesurfer.playPause()
})


// modo meio estranho de fazer a barra de espaço funcionar quando segurada
// feature meio desnecessária que pode ser removida depois
let timer
window.addEventListener("keydown", event => {
  if(event.key == " " && !timer){
    wavesurfer.playPause()
    timer = Date.now()
  } 
})
// aqui na vdd acaba sendo util pra fazer botões fazerem coisas quando forem *LEVANTADOS*
// emcima tambem mas de outro jeito, que é quando eles são apertados
window.addEventListener("keyup", event => {
  switch (event.key) {
    case " ":
      let now = Date.now()
      if (now - timer < 400) {
        timer = null
        break
      }
      timer = null
      wavesurfer.playPause()
      break;
    case "":

      break;

    default:
      break;
  }
})

// Função de pegar id de botões de modo diferente e pior para a situação atual

// function buttons(id){
//   switch (id) {
//     case "prev":
//       // função
//       break;
  
//     default:
//       // nada i guess
//       break;
//   }
// }

// document.getElementById("main").addEventListener('click', event => {
//   const isButton = event.target.nodeName === 'BUTTON';
// if (!isButton) {
//   return;
// }
//   buttons(event.target.id)
// })
  