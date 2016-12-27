function preload() {
  soundmgr.preload();
  resourceManager.getImage('elf.png');
  resourceManager.getImage('santa40.png');
  resourceManager.getImage('present.png');
  resourceManager.getImage('candy.png');
}

function setup() {
  createCanvas(640,480);

  game.init();

  soundmgr.play(sounds.music);
}

function keyPressed() {
  game.keyPressed(); 
}

function draw() {
  background(24, 22, 86);
 
  game.update();
  game.draw();
}
