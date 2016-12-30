Screen.Preloader = function (game) { };

Screen.Preloader.prototype = {
  preload: function () {
      this.game.stage.backgroundColor = '#eee';

      this.game.load.image('background', 'img/Space.png');

      this.game.load.image('enemy', 'img/enemy.png');
      this.game.load.image('ball','img/ball.png');
      this.game.load.image('spaceship', 'img/spaceship.png');

      this.game.load.image('title', 'img/title.png');
      this.game.load.image('screen-howtoplay', 'img/screen-howtoplay.png');

      this.game.load.spritesheet('button-start', 'img/button-start.png', 146, 51);
  },
  create: function () {
      this.game.state.start('MainMenu');
  }
};