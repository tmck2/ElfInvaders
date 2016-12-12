var santa = new Santa();
var flakes = [];
var candy = [];
var elves = [];
var nomsound;
var bellsound;
var music;

function preload() {
  nomsound = loadSound('assets/nom.wav');
  bellsound = loadSound('assets/bell.wav');
  music = loadSound('assets/music.mp3');
  santa.load();
  for (var j = 0; j < 4; j++) {
    for (var i = 0; i < 8; i++) {
        elves[j*8+i] = new Elf();
        elves[j*8+i].load();
    }
  }
}

function setup() {
  createCanvas(640,480);

  santa.setup();

  for (var i = 0; i < 500; i++) {
    flakes[i] = new SnowFlake();
  }
  
  var dx = 520 / 8;
  for (var j = 0; j < 4; j++) {
    for (var i = 0; i < 8; i++) {
        elves[j*8+i].x = (i+1) * dx;
        elves[j*8+i].y = (j + 1) * elves[j*8+i].img.height * elves[j*8+i].scl;
    }
  }
  
  music.setVolume(16.0);
  music.jump(5);
  music.loop(5);
  music.play();
}

function keyPressed() {
  if (keyCode === 32 && candy.length < 1) {
    bellsound.play();
    var c = new Candy(santa.x + santa.img.width / 2, santa.y - santa.img.height / 2);
    c.load();
    candy.push(c);
  }  
}

function draw() {
  background(24, 22, 86);
  
  // flakes
  for (var i = 0; i < flakes.length; i++) {
    flakes[i].fall();
    flakes[i].draw();
  }
  
  // santa
  santa.update();
  santa.draw();
  
  // candy canes
  for (var i = 0; i < candy.length; i++) {
    candy[i].update();
    candy[i].draw();
  }
  
  // elves
  for (var i = 0; i < elves.length; i++) {
    elves[i].update();
    elves[i].draw();
  }
  
  // collisions
  elvesToRemove = [];
  candyToRemove = [];
  for (var i = 0; i < candy.length; i++) {
    // candy off the top of the screen
    if (candy[i].y + candy[i].img.height * candy[i].scl < 0) {
      candyToRemove.push(i);
    }
    else {
      // candy with elves
      for (var j = 0; j < elves.length; j++) {
        if (elves[j].collidesWith(candy[i])) {
          elvesToRemove.push(j);
          candyToRemove.push(i);
          nomsound.play();
        }
      }
    }
  }
  
  // remove dead entities
  for (var i = 0; i < candyToRemove.length; i++) {
    candy.splice(candyToRemove[i],1);
  }
  for (var i = 0; i < elvesToRemove.length; i++) {
    elves.splice(elvesToRemove[i],1);
  }
}