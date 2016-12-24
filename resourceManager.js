var ResourceManager = function() {
  var resources = [];

  var getSound = function(resourceName) {
    if (!resources[resourceName])
      resources[resourceName] = loadSound('assets/' + resourceName);
    return resources[resourceName];
  }

  var getImage = function(resourceName) {
    if (!resources[resourceName])
      resources[resourceName] = loadImage('assets/' + resourceName);
    return resources[resourceName];
  }

  return {
    getSound: getSound,
    getImage: getImage
  }
}

var resourceManager = ResourceManager();
