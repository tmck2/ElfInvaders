var santa = new Santa();
var flakes = [];
var candy = [];
var elves = [];
var score = 0;
var presents = [];
var nomsound;
var bellsound;
var music;
var musicRate = 1.0;

function preload() {
  nomsound = loadSound('assets/nom.wav');
  bellsound = loadSound('assets/bell.wav');
  music = loadSound('assets/music.mp3');
  santa.load();
  for (var j = 0; j < 4; j++) {
    for (var i = 0; i < 8; i++) {
        var ix = j*8+i;
        elves[ix] = new Elf();
        elves[ix].alive = false;
        elves[ix].load();
    }
  }
}

function nextWave() {
  var dx = 520 / 8;
  for (var j = 0; j < 4; j++) {
    for (var i = 0; i < 8; i++) {
        ix = j*8+i;
        elves[ix].x = (i+1) * dx;
        elves[ix].y = (j + 1) * elves[j*8+i].img.height * elves[j*8+i].scl;
        elves[ix].alive = true;
        elves[ix].xSpeed = 1;
        elves[ix].dir = 1;
    }
  }
}

function setup() {
  createCanvas(640,480);

  santa.setup();

  for (var i = 0; i < 500; i++) {
    flakes[i] = new SnowFlake();
  }

  nextWave();
    
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
  liveElves = elves.filter(function(e) { return e.alive == true; });
  for (var i = 0; i < liveElves.length; i++) {
    liveElves[i].update();
    liveElves[i].draw();
  }
  
  // elves throw presents randomly
  if (random(1000) < 32 - liveElves.length && liveElves.length >= 1) {
    var elf = random(liveElves);
    var p = new Present(
      elf.x + elf.img.width * elf.scl / 2 - 12,
      elf.y + elf.img.height * elf.scl / 2 - 12);
    p.load();
    presents.push(p);
  }
  
  // update and draw presents
  presents.forEach(function(present) {
    present.update();
    present.draw();
  });
  
  // collisions
  candyToRemove = [];
  for (var i = 0; i < candy.length; i++) {
    // candy off the top of the screen
    if (candy[i].y + candy[i].img.height * candy[i].scl < 0) {
      candyToRemove.push(i);
    }
    else {
      // candy with elves
      for (var j = 0; j < liveElves.length; j++) {
        if (Entity.prototype.collidesWith.call(liveElves[j], candy[i])) {
          liveElves[j].alive = false;
          score += 10;
          candyToRemove.push(i);
          nomsound.play();
          liveElves.forEach(function(e) {
            e.xSpeed += 0.05;
          })
          musicRate += 0.01;
          music.rate(musicRate);
        }
      }
    }
  }
  for (var i = 0; i < presents.length; i++)
  {
    if (Entity.prototype.collidesWith.call(presents[i], santa)) {
      console.log('ouch!');
    }
  }
  
  // remove dead entities
  for (var i = 0; i < candyToRemove.length; i++) {
    candy.splice(candyToRemove[i],1);
  }

  if (liveElves.length <= 0)
    nextWave();

  textSize(48);
  fill('red');
  textAlign(RIGHT);
  text("" + score, 630, 48);
}
