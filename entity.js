var Entity = function(resourceName, frames) {
  this.alive = true;
  this.facing = 1;
  this.x = 0;
  this.y = 0;
  this.xvel = 0;
  this.yvel = 0;
  this.scl = 1;
  this.currentFrame = 1;
  this.frames = frames || 1;

  this.getImage = function() {
    return resourceManager.getImage(resourceName);
  }

  this.getSize = function() {
    var img = this.getImage();
    return {
      x: img.width / this.frames,
      y: img.height
    }
  }
}

Entity.prototype = { 
  collidesWith: function(obj) {
    var img = this.getImage();

    var width = this.getSize().x;
    var height = this.getSize().y;
    var objWidth = obj.getSize().x;
    var objHeight = obj.getSize().y;

    w1 = width * this.scl / 2;
    w2 = objWidth * obj.scl / 2;
    cx1 = w1 + this.x;
    cx2 = w2 + obj.x;
    
    h1 = height * this.scl / 2;
    h2 = objHeight * obj.scl / 2;
    cy1 = h1 + this.y;
    cy2 = h2 + obj.y;
    
    return (abs(cx2-cx1) <= w1 + w2
            && abs(cy2-cy1) <= h1 + h2)
  },

  draw: function() {
    var img = this.getImage();

    var width = this.getSize().x;
    var height = this.getSize().y;

    if (this.facing < 0) {
      translate(this.x + width, this.y);
      scale(-this.scl, this.scl);
    } else {
      translate(this.x, this.y);
      scale(this.scl, this.scl);
    }
    image(img, (this.currentFrame-1)*width, 0, width, height, 0, 0, width, height);
    resetMatrix();
  },

  update: function() {
    this.x += this.xvel;
    this.y += this.yvel;

    if ((frameCount % 6) == 0) {
      this.currentFrame++;
      if (this.currentFrame > this.frames)
        this.currentFrame = 1;
    }
  }  
}
