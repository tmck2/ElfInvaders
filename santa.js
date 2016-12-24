var Santa = function () {
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

    this.x = constrain(this.x, 0, width - this.getSize().x);
    this.y = height - this.getSize().y * 1.1;
  }
}

Santa.prototype = new Entity('santa40.png', 4);
Santa.prototype.constructor = Santa;
