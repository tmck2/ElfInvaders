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

