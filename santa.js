var Santa = function () {
  this.setup = function() {
    this.dir = 1;
    this.xSpeed = 0;
    this.x = (width - this.img.width) / 2;
    this.y = height - this.img.height * 1.2;
    this.scl = 1;
  }
  
  this.load = function () {
    this.img = loadImage("assets/santa40.gif");
  }
  
  this.update = function() {
    if (keyIsDown(LEFT_ARROW)) {
      this.dir = -1;
      this.xSpeed = -3;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      this.dir = 1;
      this.xSpeed = 3;
    } else {
      this.xSpeed = 0;
    }

    this.x = constrain(this.x + this.xSpeed, 0, width - this.img.width);
  }
  
  this.draw = function () {
    if (this.dir > 0) {
      scale(-this.dir,1);
      translate(-this.img.width,0)
      image(this.img, -this.x, this.y);  
      resetMatrix();
    }
    else
    {
      image(this.img, this.x, this. y);
    }
  }
}
