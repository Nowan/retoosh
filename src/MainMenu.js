Retoosh.MainMenu = function(game) {};

var music;

Retoosh.MainMenu.prototype = {
    create: function() {
        this.gameTitle = this.add.sprite(Retoosh.WIDTH*0.5, 40, 'title');
        this.gameTitle.anchor.set(0.5,0);
        this.startButton = this.add.button(Retoosh.WIDTH*0.5, 200, 'button-start', this.startGame, this, 2, 0, 1);
        this.startButton.anchor.set(0.5,0);
        this.startButton.input.useHandCursor = true;

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