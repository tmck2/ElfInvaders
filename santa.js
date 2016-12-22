var Santa = function () {
  this.setup = function() {
    this.x = (width - this.img.width) / 2;
    this.y = height - this.img.height * 1.2;
  }

  this.update = function() {
    if (keyIsDown(LEFT_ARROW)) {
      this.facing = -1;
      this.xvel = -3;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      this.facing = 1;
      this.xvel = 3;
    } else {
      this.xvel = 0;
    }

    Entity.prototype.update.call(this);

    this.x = constrain(this.x, 0, width - this.img.width);
  }
}

Santa.prototype = new Entity('assets/santa40.gif');
Santa.prototype.constructor = Santa;
