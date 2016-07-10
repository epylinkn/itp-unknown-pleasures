var song;
var waves = [];
var mic;

function preload() {
  song = loadSound('seesaw.mp3');
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseClicked(togglePlay);

  song.setVolume(0.5);
  // mic = new p5.AudioIn();
  // mic.amp(1);
  // mic.connect();
  // mic.start();
  fft = new p5.FFT();
  // print(mic.getSources());
}

function draw() {
  background(0);
  // print(mic.getLevel());


  var waveform = fft.analyze(32);
  waves.push(waveform);
  // print(waves.length);
  if (waves.length > 30) {
    waves.shift();
    // print(waves.length);
  }

  noFill();
  stroke(255, 255, 255); // waveform is red
  strokeWeight(2);

  for (var i = 0; i < waves.length; i++) {
    var form = waves[i];
    beginShape();

    for (var j = 0; j < 32; j++) {
      var x = map(Math.log(j + 1), Math.log(0 + 1), Math.log(32 + 1), 400, width - 400) - i * 10 + 30 * 10 / 2;
      var y = -map(form[j], 0, 255, 0, 200) + (height / 1.7) + (i * 15) - 30 * 15 / 2;
      vertex(x, y);
    }
    endShape();
  }
}

function togglePlay() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}