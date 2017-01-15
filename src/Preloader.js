Retoosh.Preloader = function (game) { };

Retoosh.Preloader.prototype = {
  preload: function () {
      this.game.stage.backgroundColor = '#eee';

      this.game.load.image('background', 'img/Space.png');

      this.game.load.image('easyenemy', 'img/easyEnemy.png');
      this.game.load.image('mediumenemy', 'img/mediumEnemy.png');
      this.game.load.image('hardenemy', 'img/hardEnemy.png');
      this.game.load.image('ball','img/ball.png');
      this.game.load.image('spaceship', 'img/spaceship.png');

      this.game.load.image('title', 'img/title.png');
      this.game.load.image('screen-howtoplay', 'img/screen-howtoplay.png');

      this.game.load.spritesheet('button-start', 'img/button-start.png', 146, 51);

      this.game.load.image('bullet', 'img/bullet.png');
  },
  create: function () {
      this.game.state.start('MainMenu');
  }
};