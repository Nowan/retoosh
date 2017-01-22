var ScorePanel = function ( game, player_name ) {
	Phaser.Group.call(this, game);

	var scale_factor = 0.7;

	var background = this.create( 0, 0, 'panel_right' );
	background.width *= scale_factor;
	background.height *= scale_factor;

	var name_label = game.add.text(0, 0, player_name, { 
		font: '17px Orbitron', 
		fill: '#540b4e'
	});
	name_label.anchor = { x: 1, y: 0.5 };
	name_label.x = background.width - 10;
	name_label.y = background.height / 2;
	this.add(name_label);

	var score_label = game.add.text(0, 0, '0', { 
		font: '15px Orbitron', 
		fill: '#781270'
	});
	score_label.anchor = { x: 0.5, y: 0.5 };
	score_label.x = 106 * scale_factor;
	score_label.y = background.height / 2;
	this.add(score_label);

	this.score_label = score_label;

	this.x = game.world.width - background.width;
};

ScorePanel.prototype = Object.create(Phaser.Group.prototype);
ScorePanel.prototype.constructor = ScorePanel;

ScorePanel.prototype.updateScoreIndicator = function( value ){
	this.score_label.text = value;
};