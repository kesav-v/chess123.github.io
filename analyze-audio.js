//taken from https://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html

var freq = "";

window.onload = function() {
  var ctx = new AudioContext();
  var audio = document.getElementById('audio');
  // audio.crossOrigin = "anonymous";
  var audioSrc = ctx.createMediaElementSource(audio);
  var analyser = ctx.createAnalyser();
  analyser.fftSize = 4096;
  audio.volume = 1.0;
  var c = document.getElementById('mycanvas');
  var g = c.getContext('2d');
  // we have to connect the MediaElementSource with the analyser 
  audioSrc.connect(analyser);
  analyser.connect(ctx.destination);
  // audio.play();

  audio.play();
  // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
 
  // frequencyBinCount tells you how many values you'll receive from the analyser
  var frequencyData = new Uint8Array(analyser.frequencyBinCount);
//   audio.addEventListener('loadedmetadata', function() {
//     console.log("Playing " + audio.src + ", for: " + audio.duration + " seconds.");
//     audio.play(); 
// });
 
  // we're ready to receive some data!
  // loop
  function renderFrame() {
    if (audio.paused) return;
     requestAnimationFrame(renderFrame);
     // update data in frequencyData
     analyser.getByteFrequencyData(frequencyData);
     // render frame based on values in frequencyData
     // console.log(frequencyData);
     var max = 0;
     var maxVal = 0;
     for (i = 0; i < analyser.fftSize / 4; i++) {
      var re = frequencyData[2 * i];
      var im = frequencyData[2 * i + 1];
      var mag = Math.sqrt(re * re + im * im);
      if (mag > maxVal) {
        maxVal = mag;
        max = i;
      }
      else if (mag == maxVal && mag != 0) {
        max = (max + i) / 2;
      }
     }
     console.log(2 * max * (ctx.sampleRate / analyser.fftSize));
     draw();
     if (audio.paused) audio.pause();
  }
  renderFrame();

  function draw() {
    var max = 0;
    var maxVal = 0;
     for (i = 0; i < analyser.fftSize / 4; i++) {
      if (frequencyData[i] > maxVal) {
        maxVal = frequencyData[i];
        max = i;
      }
     }
    g.clearRect(0, 0, c.width, c.height);
    g.fillStyle = '#0000ff';
    for (i = 0; i < analyser.fftSize / 4; i++) {
      g.fillRect(i * c.width / (analyser.fftSize / 4), c.height - c.height * frequencyData[i] / maxVal, (c.width / (analyser.fftSize / 2)), c.height * frequencyData[i] / maxVal);
    }
    document.getElementById("frequency").innerHTML = "Approximate frequency: " + freq + " Hz";
  }
};
