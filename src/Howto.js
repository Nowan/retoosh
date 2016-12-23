Screen.Howto = function(game) { };

Screen.Howto.prototype = {
    create: function() {
        this.buttonContinue = this.add.button(Screen.WIDTH * 0.5 - 200, Screen.HEIGHT * 0.5 - 100, 'screen-howtoplay', this.startGame, this);
    },
    startGame: function() {
        this.game.state.start('Game');
    }
};
