Retoosh.GameOver = function(game) { };
Retoosh.GameOver.prototype = {
    create: function() {
        this.buttonContinue = this.add.button(10, 10, 'game-over', this.startGame, this);
    },
    startGame: function() {
        this.game.state.start('Howto');
    }

};

