Retoosh.Howto = function(game) { };

Retoosh.Howto.prototype = {
    create: function() {
        this.buttonContinue = this.add.button(Retoosh.WIDTH * 0.5 - 200, Retoosh.HEIGHT * 0.5 - 100, 'screen-howtoplay', this.startGame, this);
    },
    startGame: function() {
        this.game.state.start('Game');
    }
};
