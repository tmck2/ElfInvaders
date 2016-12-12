var SnowFlake = function() {
  this.x = random(0, width);
  this.y = random(0, 480);
  this.z = random(5, 20);
  this.scl = this.z / 15;
  this.ySpeed = this.scl;
  this.size = 5 * this.scl;
}

SnowFlake.prototype.fall = function() {
  this.y = this.y + this.ySpeed;
  
  if (this.y > height)
    this.y = random(-480, 0);
}

SnowFlake.prototype.draw = function() {
  noStroke();
  fill(255*this.scl,255*this.scl,255*this.scl, 225);
  ellipse(this.x, this.y, this.size, this.size);
}
