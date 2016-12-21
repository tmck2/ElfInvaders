var Entity = function() {}

Entity.prototype.collidesWith = function(obj) {
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
