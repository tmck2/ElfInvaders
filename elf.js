var Elf = function() {
  this.x = 50;
  this.y = 50;
  this.xSpeed = 1;
  this.dir = 1;
  this.scl = 0.1;
}

Elf.prototype.load = function() {
  this.img = loadImage("assets/elf.png");
}

Elf.prototype.draw = function() {
  image(this.img, this.x, this.y, this.scl * this.img.width, this.scl * this.img.height);
}

Elf.prototype.update = function() {
  if (this.x < 50 || this.x > (590 - this.img.width * this.scl)) {
    this.x = constrain(this.x, 50, 590);
    this.y += this.img.height * this.scl / 2;
    this.dir = -this.dir;
  }
  
  this.x = this.x + this.xSpeed * this.dir;
}

Elf.prototype.collidesWith = function(obj) {
  w1 = this.img.width * this.scl / 2;
  w2 = obj.img.width * obj.scl / 2;
  cx1 = w1 + this.x;
  cx2 = w2 + obj.x;
  
  h1 = this.img.height * this.scl / 2;
  h2 = obj.img.height * obj.scl / 2;
  cy1 = h1 + this.y;
  cy2 = h2 + obj.y;
  
  return (abs(cx2-cx1) <= w1 + w2
          && abs(cy2-cy1) <= h1 + h2)
}
