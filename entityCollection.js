var EntityCollection = function() {}

EntityCollection.prototype = new Array();

EntityCollection.prototype.remove = function(pred) {
  var itemsToRemove = [];
  for (var i = 0; i < this.length; i++) {
    if (pred(this[i])) {
      itemsToRemove.push(i);
    }
  }
  for (i = 0; i < itemsToRemove.length; i++) {
    this.splice(itemsToRemove[i],1);
  }
}


