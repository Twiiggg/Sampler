const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    url: '../audio/First Steps.mp3',
    normalize: false,
    waveColor: "#7f7f7f",
    progressColor: "#56e45e",
    cursorColor: "#ffffff",
    cursorWidth: 2,
    // barWidth: 2,
    // barGap: 2,
    // barRadius: 4,
    barAlign: "bottom",
    fillParent: true,   
    autoplay: false,
    interact: true,
    dragToSeek: true,
    hideScrollbar: false,
    audioRate: 1,
    sampleRate: 8000
  })
  
  wavesurfer.on('interaction', () => {
    wavesurfer.playPause()
  })