var Explosion = function(x, y) {
  this.x = x;
  this.y = y;
  this.age = 0;
  this.particles = [];
  for(var i = 0; i < 100; i++) {
    this.particles.push({
      pos: createVector(0, 0),
      vel: p5.Vector.random2D().mult(random(2)),
      size: random(5)
    });
  }
}

Explosion.prototype.update = function() {
  this.age++;
  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].pos.add(this.particles[i].vel);
  }
}

Explosion.prototype.draw = function() {
  translate(this.x, this.y);
  for (var i = 0; i < this.particles.length; i++) {
    var particle = this.particles[i];
    noStroke();
    fill(255,255-(255*p5.Vector.mag(particle.pos)/30),0);
    ellipse(particle.pos.x, particle.pos.y, particle.size, particle.size);
  }
  resetMatrix();
}

