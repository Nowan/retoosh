Retoosh.GameOver = function(game) { };
Retoosh.GameOver.prototype = {

	init: function(has_won){
		this.has_won = has_won;
	},

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

        // ending message
    	var sprite_id = this.has_won ? 'you_won' : 'game_over';

    	var scoreText = this.game.add.text(Retoosh.WIDTH * 0.5 , Retoosh.HEIGHT * 0.5 + 80, 'Your score: ' + score, { font: '30px Orbitron', fill: '#15d3e2' });
    	scoreText.anchor.set(0.5, 0.5);
        this.has_won ? scoreText.visible = true : scoreText.visible = false;

    	var ending_message = this.game.add.sprite(Retoosh.WIDTH * 0.5, Retoosh.HEIGHT * 0.5, sprite_id);
        ending_message.anchor.set( 0.5, 0.5 );
        ending_message.scale.set( 0.7, 0.7 );

        // add click listener to background
        this.parallax[2].inputEnabled = true;
        this.parallax[2].events.onInputDown.add(this.startGame, this);
    },

    startGame: function() {
        this.game.state.start('Howto');
    }

};

