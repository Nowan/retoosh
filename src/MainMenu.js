Retoosh.MainMenu = function(game) {};

var music;

Retoosh.MainMenu.prototype = {
    create: function() {
        // parallax background
        this.parallax = [
            this.game.add.tileSprite(0, 0, Retoosh.WIDTH, Retoosh.HEIGHT, 'parallax_1'),
            this.game.add.tileSprite(0, 0, Retoosh.WIDTH, Retoosh.HEIGHT, 'parallax_2'),
            this.game.add.tileSprite(0, 0, Retoosh.WIDTH, Retoosh.HEIGHT, 'parallax_3')
        ];

        this.parallax[0].autoScroll(-10, 0);
        this.parallax[1].autoScroll(-20, 0);
        this.parallax[2].autoScroll(-25, 0);

        // "RETOOSH" logo
        this.logo = this.add.sprite(Retoosh.WIDTH * 0.5, 100, 'logo');
        this.logo.anchor.set( 0.5, 0 );
        this.logo.scale.set( 0.7, 0.7 );

        // panel with options - "new game", "settings", "credits"
        this.main_panel = this.add.group();

        var panel_top = this.main_panel.create( 0, 0, 'main_panel_top' );


        var new_game_button = this.add.button( 0, panel_top.height, 
                                               'main_panel_newgame', 
                                               this.startGame, this, 
                                               1, 0, 1 );
        new_game_button.input.useHandCursor = true;
        this.main_panel.add( new_game_button );


        var settings_button = this.add.button( 0, new_game_button.y + new_game_button.height, 
                                               'main_panel_settings', 
                                               function(){}, this, 
                                               1, 0, 1 );
        settings_button.input.useHandCursor = true;
        this.main_panel.add( settings_button );


        var credits_button = this.add.button( 0, settings_button.y + settings_button.height, 
                                               'main_panel_credits', 
                                               function(){}, this, 
                                               1, 0, 1 );
        credits_button.input.useHandCursor = true;
        this.main_panel.add( credits_button );


        var panel_bottom = this.main_panel.create( 0, credits_button.y + credits_button.height, 
                                                   'main_panel_bottom' );

        // rescale and position main panel
        this.main_panel.scale.set( 0.7, 0.7 );
        this.main_panel.x = ( Retoosh.WIDTH - this.main_panel.width ) * 0.5;
        this.main_panel.y = 250;

        // create just one instance of main audio theme and play it in a loop
        if( typeof(music) == "undefined" ){
            music = this.game.add.audio('maintheme');
            music.loop = true;
            music.play();
        }
    },
    startGame: function() {
        this.game.state.start('Howto');
    }
};