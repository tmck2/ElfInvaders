var Entity = function(imageUrl) {
  this.facing = 1;
  this.x = 0;
  this.y = 0;
  this.xvel = 0;
  this.yvel = 0;
  this.scl = 1;
  this.imageUrl = imageUrl;
}

Entity.prototype = { 
  collidesWith: function(obj) {
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
  },

  load: function() {
    this.img = loadImage(this.imageUrl);
  },

  draw: function() {
    if (this.facing < 0) {
      translate(this.x + this.img.width, this.y);
      scale(-this.scl, this.scl);
    } else {
      translate(this.x, this.y);
      scale(this.scl, this.scl);
    }
    image(this.img, 0, 0, this.img.width, this.img.height);
    resetMatrix();
  },

  update: function() {
    this.x += this.xvel;
    this.y += this.yvel;
  },

  setup: function() {
  }
}
