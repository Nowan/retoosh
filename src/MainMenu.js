Screen.MainMenu = function(game) {};
Screen.MainMenu.prototype = {
    create: function() {
        this.gameTitle = this.add.sprite(Screen.WIDTH*0.5, 40, 'title');
        this.gameTitle.anchor.set(0.5,0);
        this.startButton = this.add.button(Screen.WIDTH*0.5, 200, 'button-start', this.startGame, this, 2, 0, 1);
        this.startButton.anchor.set(0.5,0);
        this.startButton.input.useHandCursor = true;
    },
    startGame: function() {
        this.game.state.start('Howto');
    }
};