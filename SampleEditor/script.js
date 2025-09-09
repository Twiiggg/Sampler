import WaveSurfer from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js'
import Spectrogram from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/plugins/spectrogram.esm.js'
import RegionsPlugin from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/plugins/regions.esm.js'
import Hover from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/plugins/hover.esm.js'
// import Spectrogram from '../node_modules/wavesurfer.js/dist/plugins/spectrogram.esm.js';

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
  sampleRate: 8000,
  minPxPerSec: 2,
    plugins: [
    Hover.create({
      lineColor: '#00ff00',
      lineWidth: 2,
      labelBackground: '#555',
      labelColor: '#fff',
      labelSize: '11px',
      labelPreferLeft: false,
    })
  ],
}
let spectroOptions = {
  labels: true,
  height: 200,
  splitChannels: false,
  scale: 'mel',
  frequencyMax: options.sampleRate/2,
  frequencyMin: 0,
  fftSamples: 1024,
  labelsBackground: 'rgba(0, 0, 0, 0.05)',
  // useWebWorker: true
}

let wavesurfer = WaveSurfer.create(options)
let regions = wavesurfer.registerPlugin(RegionsPlugin.create())
let spectrogram = wavesurfer.registerPlugin(Spectrogram.create(spectroOptions))


// gerador de cor aleatória


// const prev = document.getElementById("prev")
// const next = document.getElementById("next")
const playpause = document.getElementById("playpause")
const volumeslider = document.getElementById("volume")
const volumeValue = document.getElementById("volumeValue")
const speed = document.getElementById("speed")
const speedValue = document.getElementById("speedValue")
const loop = document.getElementById("loop")
const wfstyle = document.getElementById("wfstyle")
const spectro = document.getElementById("spectro")
const timeIndicator = document.getElementById("timeIndicator")
const addRegion = document.getElementById("addRegion")
const removeRegion = document.getElementById("removeRegion")
let regionName = document.getElementById("regionName")
const regionColor = document.getElementById("regionColor")
// const throbber = document.getElementById("throbber")

let wfstyleMode = true
let loopMode = false
let spectroMode = true
let sampleDuration = 0


{
  let activeRegion = null
  regions.on('region-in', (region) => {
    console.log('region-in', region)
    activeRegion = region
  })
  regions.on('region-out', (region) => {
    console.log('region-out', region)
    if (activeRegion === region) {
      if (loopMode) {
        region.play()
      } else {
        activeRegion = null
      }
    }
  })
  regions.on('region-clicked', (region, e) => {
    e.stopPropagation() // prevent triggering a click on the waveform
    activeRegion = region
    region.play(true)
  })
  // Reset the active region when the user clicks anywhere in the waveform
  wavesurfer.on('interaction', () => {
    activeRegion = null
  })
}


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

// adcionar e tirar regiões
addRegion.addEventListener('click', () => {
    regions.addRegion({
    start: 1,
    end: 4, // 3 sec long
    color: regionColor.value + "77" ,
    content: regionName.value ? regionName.value : "Region",
    drag: true,
    resize: true,
    })
})
removeRegion.addEventListener('click', () => {
  regions.clearRegions()
  // const allRegions = regions.getRegions()
  // if (allRegions.length > 0) {
  //   const last = allRegions[allRegions.length - 1]
  //   last.remove()
  // }
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
  