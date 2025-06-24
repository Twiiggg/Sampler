// import WaveSurfer from '/../node_modules/wavesurfer.js'

    let options= {
    container: '#waveform',
    url: "./audio/First Steps.mp3",
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

let wavesurfer = WaveSurfer.create(options)
let prev = document.getElementById("prev")
let playpause = document.getElementById("playpause")
let next = document.getElementById("next")
let volumeslider = document.getElementById("volume")
let speed = document.getElementById("speed")
let loop = document.getElementById("loop")
let wfstyle = document.getElementById("wfstyle")

let wfstyleMode = true
let loopMode = false

function wfstyling(toggle){
  const position = wavesurfer.getCurrentTime();
  const isPlaying = wavesurfer.isPlaying();
  if (toggle) {
    options.barWidth = 2
    options.barGap = 2
    wavesurfer.destroy()
    wavesurfer = WaveSurfer.create(options)
    
  } else {    
    options.barWidth = null
    options.barGap = null
    wavesurfer.destroy()
    wavesurfer = WaveSurfer.create(options)
  }
  wavesurfer.once('ready', () => {
    wavesurfer.setTime(position);
    if (isPlaying) wavesurfer.play();
  })
}

prev.addEventListener('click', () => {
  
})

wavesurfer.on('finish', () => {
  if (loopMode) {wavesurfer.play(0);}
})

// Loop toggle
loop.addEventListener('click', () => {
  loopMode = !loopMode;
  loop.textContent = loopMode ? 'loop on' : 'loop off';
})
// waveform styling toggle
wfstyle.addEventListener('click', () => {
  wfstyleMode = !wfstyleMode;
  wfstyling(wfstyleMode)
  wfstyle.textContent = wfstyleMode ? 'wfstyle on' : 'wfstyle off';
})
// Volume control
volumeslider.addEventListener('input', () => {
  let volume = volumeslider.value
  volume = volume*volume
  wavesurfer.setVolume(volume);
});

// Speed control
speed.addEventListener('input', () => {
  const rate = parseFloat(speed.value);
  wavesurfer.setPlaybackRate(rate);
  // speedValue.textContent = rate + "x";
});

playpause.addEventListener('click', () => {
  wavesurfer.playPause()
})

let timer
window.addEventListener("keydown", event => {
  if(event.key == " " && !timer){
    wavesurfer.playPause()
    timer = Date.now()
  } 
})
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
  