//taken from https://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html

window.onload = function() {
  var ctx = new AudioContext();
  var audio = document.getElementById('myAudio');
  audio.crossOrigin = "anonymous";
  var audioSrc = ctx.createMediaElementSource(audio);
  var analyser = ctx.createAnalyser();
  // we have to connect the MediaElementSource with the analyser 
  audioSrc.connect(analyser);
  // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
 
  // frequencyBinCount tells you how many values you'll receive from the analyser
  var frequencyData = new Uint8Array(analyser.frequencyBinCount);
 
  // we're ready to receive some data!
  // loop
  function renderFrame() {
     requestAnimationFrame(renderFrame);
     // update data in frequencyData
     analyser.getByteFrequencyData(frequencyData);
     // render frame based on values in frequencyData
     // console.log(frequencyData);
     var sum = 0;
     for (i = 0; i < analyser.fftSize / 2; i++) {
      sum += frequencyData[i];
     }
     var wsum = 0;
     for (i = 0; i < analyser.fftSize / 2; i++) {
      wsum += frequencyData[i] * (i * (ctx.sampleRate / analyser.fftSize));
     }
     console.log(analyser.fftSize + " " + wsum + " " + sum + " " + (wsum / sum));
  }
  audio.play();
  renderFrame();
};