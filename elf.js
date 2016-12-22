var Elf = function() {
  this.x = 50;
  this.y = 50;
  this.xvel = 1;
  this.scl = 0.1;

  this.update = function() {
    if (this.x < 50 || this.x > (590 - this.img.width * this.scl)) {
      this.x = constrain(this.x, 50, 590);
      this.y += this.img.height * this.scl / 2;
      this.xvel = -this.xvel;
    }
    Entity.prototype.update.call(this);  
  }
}

Elf.prototype = new Entity('assets/elf.png');
Elf.prototype.constructor = Elf;
