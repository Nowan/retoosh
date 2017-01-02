Retoosh.MainMenu = function(game) {};
Retoosh.MainMenu.prototype = {
    create: function() {
        this.gameTitle = this.add.sprite(Retoosh.WIDTH*0.5, 40, 'title');
        this.gameTitle.anchor.set(0.5,0);
        this.startButton = this.add.button(Retoosh.WIDTH*0.5, 200, 'button-start', this.startGame, this, 2, 0, 1);
        this.startButton.anchor.set(0.5,0);
        this.startButton.input.useHandCursor = true;
    },
    startGame: function() {
        this.game.state.start('Howto');
    }
};