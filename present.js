var Present = function(x, y) {
  this.x = x;
  this.y = y;
  this.xSpeed = 0;
  this.ySpeed = 2;
  this.scl = 0.1;
}

Present.prototype.load = function() {
  this.img = loadImage("assets/present.png");
}

Present.prototype.draw = function() {
  image(this.img, this.x, this.y, this.scl * this.img.width, this.scl * this.img.height);
}

Present.prototype.update = function() {
  this.y += this.ySpeed;
}
