var Screen = {
    WIDTH: 800,
    HEIGHT: 600
};

Screen.Boot = function (game) { };
Screen.Boot.prototype = {
  preload: function () {

  },
  
  create: function () {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.pageAlignVertically = true;
      this.game.scale.pageAlignHorizontally = true;
      this.game.state.start('Preloader');
  }
};