var game = (function() {
  var santa = new Santa();
  var flakes = [];
  var candy = new EntityCollection();
  var explosions = new EntityCollection();
  var presents = new EntityCollection();
  var elves = [];
  var score = 0;

  function init() {
    for (var i = 0; i < 500; i++) {
      flakes[i] = new SnowFlake();
    }
    
    for (var j = 0; j < 4; j++) {
      for (var i = 0; i < 8; i++) {
        var ix = j*8+i;
        elves[ix] = new Elf();
        elves[ix].alive = false;
        elves[ix].img = resourceManager.getImage('elf.png');
      }
    }

    nextWave();
  }

  function keyPressed() {
    if (keyCode === 32 && candy.length < 1) {
      soundmgr.play(sounds.bell);
      spawnCandyAt(santa.x + santa.getSize().x / 2, santa.y - santa.getSize().y / 2);
   }     
  }

  function update() {
    _.each(flakes, function(p) { p.fall(); }); 
    santa.update();
    _.each(candy, function(c) { c.update(); });
    var liveElves = elves.filter(function(e) { return e.alive; });
    _.each(liveElves, function(e) { e.update(); });
    _.each(presents, function(p) { p.update(); });
    _.each(explosions, function(e) { e.update(); });

    // elves throw presents randomly
    if (random(1000) < 32 - liveElves.length && liveElves.length >= 1) {
      var elf = random(liveElves);
      spawnPresentAt(
        elf.x + elf.img.width * elf.scl / 2 - 12,
        elf.y + elf.img.height * elf.scl / 2 - 12);
    }
    
    // collisions
    for (var i = 0; i < candy.length; i++) {
      // candy off the top of the screen
      if (candy[i].y + candy[i].getSize().y * candy[i].scl < 0) {
        candy[i].alive = false;
      }
      else {
        // candy with elves
        for (var j = 0; j < liveElves.length; j++) {
          if (liveElves[j].collidesWith(candy[i])) {
            liveElves[j].alive = false;
            score += 10;
            candy[i].alive = false;
            soundmgr.play(sounds.nom);
            break;
          }
        }
      }
    }
    for (var i = 0; i < liveElves.length; i++) {
      if (santa.collidesWith(liveElves[i])) {
        nextWave();
      }
    }
    for (var i = 0; i < presents.length; i++)
    {
      if (presents.y > height) {
        presents[i].alive = false;
      }
      else if (santa.collidesWith(presents[i])) {
        presents[i].alive = false;
        spawnExplosion(presents[i].x, presents[i].y + santa.getSize().y / 2);
        soundmgr.play(sounds.boom);
      }
    }

    // remove dead entities
    candy.remove(function(c) { return !c.alive; });
    presents.remove(function(p) { return !p.alive; });
    explosions.remove(function(e) { return e.age > 30; });

    if (liveElves.length <= 0)
      nextWave();

    textSize(48);
    fill('red');
    textAlign(RIGHT);
    text("" + score, 630, 48);
  }

  function draw() {
    _.each(flakes, function(p) { p.draw(); });
    var liveElves = elves.filter(function(e) { return e.alive; });
    _.each(liveElves, function(e) { e.draw(); });
    santa.draw();
    _.each(candy, function(c) { c.draw(); });
    _.each(presents, function(p) { p.draw(); });
    _.each(explosions, function(e) { e.draw(); });
  }

  function nextWave() {
    var dx = 520 / 8;
    for (var j = 0; j < 4; j++) {
      for (var i = 0; i < 8; i++) {
          ix = j*8+i;
          elves[ix].x = (i+1) * dx;
          elves[ix].y = (j + 1) * elves[j*8+i].img.height * elves[j*8+i].scl;
          elves[ix].alive = true;
          elves[ix].xvel = 1;
          elves[ix].dir = 1;
      }
    }
  }

  function spawnPresentAt(x, y) {
    var p = new Entity('present.png');
    p.x = x;
    p.y = y;
    p.yvel = 2;
    p.scl = 0.1;
    presents.push(p);
  }

  function spawnCandyAt(x, y) {
    var c = new Entity('candy.png');
    c.x = x;
    c.y = y;
    c.yvel = -4;
    c.scl = 0.25;
    candy.push(c);
  }

  function spawnExplosion(x, y) {
    var e = new Explosion(x, y);
    explosions.push(e);
  }

  return {
    init: init,
    update: update,
    draw: draw,
    keyPressed: keyPressed
  }
})();


