//taken from https://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html

var freq = "";

window.onload = function() {
  var ctx = new AudioContext();
  var audio = document.getElementById('audio');
  // audio.crossOrigin = "anonymous";
  var audioSrc = ctx.createMediaElementSource(audio);
  var analyser = ctx.createAnalyser();
  analyser.fftSize = 512;
  audio.volume = 1.0;
  var c = document.getElementById('mycanvas');
  var g = c.getContext('2d');
  var c2 = document.getElementById('mycanvas2');
  var g2 = c2.getContext('2d');
  // we have to connect the MediaElementSource with the analyser 
  audioSrc.connect(analyser);
  analyser.connect(ctx.destination);
  // audio.play();

  audio.play();
  // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
 
  // frequencyBinCount tells you how many values you'll receive from the analyser
  var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  audio.addEventListener('loadedmetadata', function() {
    console.log("Playing " + audio.src + ", for: " + audio.duration + " seconds.");
    audio.play(); 
});
 
  // we're ready to receive some data!
  // loop
  function renderFrame() {
    // if (audio.paused) return;
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
     if (audio.paused) audio.pause();
     else draw();
  }
  var times = 0;
  var noteFreqs = [261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.30, 440, 466.16, 493.88];
  var last = new Array();
  var countFrames = 0;
  var sampleSize = 1000;
  renderFrame();


  function draw() {
    times++;
    var max = 0;
    var arr = new Array();
    var count = 0;
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
      if (i != 0 && i != analyser.fftSize / 4 - 1) {
        if (frequencyData[i] >= frequencyData[i - 1] && frequencyData[i] >= frequencyData[i + 1]) {
          arr[count] = (i * ctx.sampleRate / (analyser.fftSize + 0.0));
          count++;
        }
      }
      g.fillRect(i * c.width / (analyser.fftSize / 4), c.height - c.height * frequencyData[i] / maxVal, (c.width / (analyser.fftSize / 3)), c.height * frequencyData[i] / maxVal);
    }
    var low = lowest(arr);
    var note = "";
    var minDiff = 1;
    var bestNote = 0;
    for (i = 0; i < noteFreqs.length; i++) {
      var diff;
      if (low > noteFreqs[i]) diff = 0.5 - Math.abs(0.5 - (low / noteFreqs[i]) % 1);
      else diff = 0.5 - Math.abs(0.5 - (noteFreqs[i] / low) % 1);
      if (diff < minDiff) {
        minDiff = diff;
        bestNote = i;
      }
    }
    switch (bestNote) {
      case 0: note = "C"; break;
      case 1: note = "C#"; break;
      case 2: note = "D"; break;
      case 3: note = "D#"; break;
      case 4: note = "E"; break;
      case 5: note = "F"; break;
      case 6: note = "F#"; break;
      case 7: note = "G"; break;
      case 8: note = "G#"; break;
      case 9: note = "A"; break;
      case 10: note = "A#"; break;
      case 11: note = "B"; break;
    }
    document.getElementById('freq').innerHTML = "Lowest Frequency: " + note + " (" + low + " Hz)";
    if (countFrames < sampleSize) {
      last[countFrames] = low;
      countFrames++;
    }
    else {
      for (k = 1; k < countFrames; k++) {
        last[k - 1] = last[k];
      }
      last[countFrames - 1] = low;
    }
    updateGraph();
  }

  function lowest(array) {
    var allLows = new Array();
    var count = 0;
    var allFreqs = new Array();
    for (m = 0; m < array.length; m++) {
      if (m == 0) {
        allLows[0] = 0;
        allLows[0]++;
        allFreqs[0] = array[m];
        count++;
      }
      else {
        var divisible = false;
        for (n = 0; n < m; n++) {
          if (array[m] % array[n] == 0) {
            allLows[n]++;
            divisible = true;
            break;
          }
        }
        if (!divisible) {
          allLows[count] = 0;
          allLows[count]++;
          allFreqs[count] = array[m];
          count++;
        }
      }
    }
    var maxValue = 0;
    var frequ = 0;
    var countMaxes = 1;
    for (m = 0; m < allLows.length; m++) {
      if (allLows[m] > maxValue) {
        maxValue = allLows[m];
        frequ = allFreqs[m];
      }
      else if (allLows[m] == maxValue) {
        frequ += allFreqs[m];
        countMaxes++;
      }
    }
    return frequ / countMaxes;
  }


  function updateGraph() {
    g2.clearRect(0, 0, c2.width, c2.height);
    var maxFreq = 1500;
    g2.strokeStyle = '#000000';
    g2.beginPath();
    g2.moveTo(0, c2.height / 2);
    g2.lineTo(c2.width, c2.height / 2);
    g2.stroke();
    g2.strokeStyle = '#ff0000';
    for (j = 0; j < sampleSize - 1; j++) {
      g2.beginPath();
      if (j > 0 && last[j] == last[j - 1] && last[j] == last[j + 1]) {
        g2.rect(j * c2.width / sampleSize, c2.height / 2 - last[j] / (2 * maxFreq) * c2.height, 1, 1);
      }
      g2.stroke();
    }
  }
};
