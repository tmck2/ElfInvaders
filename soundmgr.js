var sounds = {
 nom: { filename: 'nom.wav' },
 bell: { filename: 'bell.wav' },
 boom: { filename: 'boom.wav' },
 music: { 
   filename: 'music.mp3',
   opts: function(s) {
     s.setVolume(8.0);
     s.jump(5);
     s.loop(5);
   }
  }
};

var soundmgr = (function() {
  function preload() {
    _.each(sounds, function(s) { resourceManager.getSound(s.filename); });
  }

  function play(s) {
    var snd = resourceManager.getSound(s.filename);

    if (s.opts) {
      s.opts(snd);
    }

    snd.play();
  }
  
  return {
    preload: preload,
    play: play
  }
})();

