// import WaveSurfer from '../node_modules/wavesurfer.js'
import Spectrogram from '../node_modules/wavesurfer.js/dist/plugins/spectrogram.esm.js';

let options= {
  container: '#waveform',
  url: "./audio/TheLickSwing.opus",
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
let playpause = document.getElementById("playpause")
// let next = document.getElementById("next")
let volumeslider = document.getElementById("volume")
let volumeValue = document.getElementById("volumeValue")
let speed = document.getElementById("speed")
let speedValue = document.getElementById("speedValue")
let loop = document.getElementById("loop")
let wfstyle = document.getElementById("wfstyle")
let spectro = document.getElementById("spectro")

let wfstyleMode = true
let loopMode = false
let spectroMode = true

// muda a estilização e toggle no espectrograma
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
function spectroToggle(){
  if (spectroMode) {
    spectrogram.create(spectroOptions)
  } else {
    spectrogram.destroy()
    spectrogram.on('destroy', () => {console.log("thing")})
  }
}
// mostra e esconde o icone de carregando
wavesurfer.on('destroy')

// faz o loop funcionar
wavesurfer.on('finish', () => {
  if (loopMode) wavesurfer.play(0)
})

// Loop toggle
loop.addEventListener('click', () => {
  loopMode = !loopMode;
  loop.textContent = loopMode ? 'loop on' : 'loop off';
})
// waveform styling toggle
wfstyle.addEventListener('click', () => {
  wfstyleMode = !wfstyleMode;
  wfstyling()
  wfstyle.textContent = wfstyleMode ? 'wfstyle on' : 'wfstyle off';
})
// spectrogram toggle
spectro.addEventListener('click', () => {
  spectroMode = !spectroMode;
  spectroToggle()
  spectro.textContent = spectroMode ? 'spectrogram on' : 'spectrogram off';
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
  