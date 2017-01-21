Retoosh.Preloader = function (game) { };

Retoosh.Preloader.prototype = {
  preload: function () {
      this.game.stage.backgroundColor = '#eee';

      // long-duration audio
      this.game.load.audio('maintheme', 'assets/music/space_trip.mp3');

      // sound effects 
      this.game.load.audio('laser_1', 'assets/sounds/laser_1.wav');
      this.game.load.audio('laser_2', 'assets/sounds/laser_2.wav');
      this.game.load.audio('explosion', 'assets/sounds/explosion.wav');

      // parallax background
      this.game.load.image('parallax_1', 'assets/textures/parallax/parallax_1.png');
      this.game.load.image('parallax_2', 'assets/textures/parallax/parallax_2.png');
      this.game.load.image('parallax_3', 'assets/textures/parallax/parallax_3.png');

      // in-game ui
      this.game.load.image('panel_left', 'assets/textures/ui_panel/panel_left.png');
      this.game.load.image('panel_right', 'assets/textures/ui_panel/panel_right.png');
      this.game.load.image('life_indicator', 'assets/textures/ui_panel/life_indicator.png');
      this.game.load.image('life_segment', 'assets/textures/ui_panel/life_segment.png');
      this.game.load.image('energy_indicator', 'assets/textures/ui_panel/energy_indicator.png');
      this.game.load.image('energy_segment', 'assets/textures/ui_panel/energy_segment.png');
      this.game.load.image('upgrade_indicator', 'assets/textures/ui_panel/upgrade_indicator.png');
      this.game.load.image('upgrade_segment', 'assets/textures/ui_panel/upgrade_segment.png');

      // main menu textures
      this.game.load.image('logo', 'assets/textures/main_menu/logo.png');
      this.game.load.image('main_panel_top', 'assets/textures/main_menu/panel_top.png');
      this.game.load.image('main_panel_bottom', 'assets/textures/main_menu/panel_bottom.png');
      this.game.load.spritesheet('main_panel_newgame', 'assets/textures/main_menu/panel_newgame.png', 533, 79);
      this.game.load.spritesheet('main_panel_settings', 'assets/textures/main_menu/panel_settings.png', 533, 88);
      this.game.load.spritesheet('main_panel_credits', 'assets/textures/main_menu/panel_credits.png', 533, 78);

      // how-to textures
      this.game.load.image('how_to_move', 'assets/textures/how_to/how_to_move.png');
      this.game.load.image('how_to_fire', 'assets/textures/how_to/how_to_fire.png');

      this.game.load.image('easyenemy', 'assets/textures/ship/ms1_hull.png');
      this.game.load.image('mediumenemy', 'assets/textures/ship/ms2_hull.png');
      this.game.load.image('hardenemy', 'assets/textures/ship/ss1_hull.png');

      this.game.load.image('spaceship', 'assets/textures/ship/bs1_hull.png');
      this.game.load.image('bullet', 'assets/textures/beam/beam_yellow.png');
      this.game.load.image('screen-howtoplay', 'img/screen-howtoplay.png');

      this.game.load.image('game-over', 'img/game-over.png');
  },
  create: function () {
      this.game.state.start('MainMenu');
  }
};