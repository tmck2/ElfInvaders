var Entity = function(imageUrl) {
  this.facing = 1;
  this.x = 0;
  this.y = 0;
  this.xvel = 0;
  this.yvel = 0;
  this.scl = 1;
  this.imageUrl = imageUrl;
  this.currentFrame = 1;
  this.frames = 1;
}

Entity.prototype = { 
  collidesWith: function(obj) {
    var width = this.width || this.img.width;
    var height = this.height || this.img.height;
    var objWidth = obj.width || obj.img.width;
    var objHeight = obj.height || obj.img.height;

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

  load: function() {
    this.img = loadImage(this.imageUrl);
  },

  draw: function() {
    var width = this.width || this.img.width;
    var height = this.height || this.img.height;

    if (this.facing < 0) {
      translate(this.x + width, this.y);
      scale(-this.scl, this.scl);
    } else {
      translate(this.x, this.y);
      scale(this.scl, this.scl);
    }
    image(this.img, (this.currentFrame-1)*this.width, 0, width, height, 0, 0, width, height);
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
  },

  setup: function() {
    this.width = this.img.width / this.frames;
    this.height = this.img.height;
  }
}
