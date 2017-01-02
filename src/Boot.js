var Retoosh = {
    WIDTH: 800,
    HEIGHT: 600
};

Retoosh.Boot = function (game) { };
Retoosh.Boot.prototype = {
  preload: function () {

  },
  
  create: function () {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.pageAlignVertically = true;
      this.game.scale.pageAlignHorizontally = true;
      this.game.state.start('Preloader');
  }
};