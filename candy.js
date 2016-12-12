var Candy = function (x, y) {
  this.x = x;
  this.y = y;
  this.scl = 0.25;
  this.ySpeed = -3;
}

Candy.prototype.load = function() {
  this.img = loadImage("assets/candy.png");
}

Candy.prototype.update = function () {
  this.y += this.ySpeed;
}

Candy.prototype.draw = function() {
  image(this.img, this.x, this.y, this.scl * this.img.width, this.scl * this.img.height);
}
