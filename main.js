let video;
let asciiDiv;
let mic;
const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';

let charWidth = 6;
let charHeight = 11;

function setup() {
  noCanvas();

  let cols = floor(windowWidth / charWidth);
  let rows = floor(windowHeight / charHeight);

  video = createCapture(VIDEO);
  video.size(cols, rows);
  video.hide();

  asciiDiv = createDiv();
  asciiDiv.style('font-family', 'monospace');
  asciiDiv.style('white-space', 'pre');
  asciiDiv.style('line-height', '1.1');
  asciiDiv.style('font-size', '10px');
  asciiDiv.style('color', '#000'); 
  asciiDiv.style('margin', '0');
  asciiDiv.style('padding', '0');
  asciiDiv.style('position', 'absolute');
  asciiDiv.style('top', '0');
  asciiDiv.style('left', '0');
  asciiDiv.style('width', '100vw');
  asciiDiv.style('height', '100vh');
  asciiDiv.style('overflow', 'hidden');


  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  video.loadPixels();

  let asciiImage = '';
  let vol = mic.getLevel(); // detecta sonido

  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;

      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));
      let c = density.charAt(charIndex);

      if (c === ' ') c = '&nbsp;';


      if (vol > 0.01 && random() < vol * 10) {
        c += c;
      }

      asciiImage += c;
    }
    asciiImage += '<br/>';
  }

  asciiDiv.html(asciiImage);
}

function windowResized() {
  let cols = floor(windowWidth / charWidth);
  let rows = floor(windowHeight / charHeight);
  video.size(cols, rows);
}
