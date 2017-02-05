var StatsPanel = function (game) {
	Phaser.Group.call(this, game);

	var scale_factor = 0.7;
	var rescale = function( sprite, scale_factor ){
		sprite.width *= scale_factor;
		sprite.height *= scale_factor;
		sprite.x *= scale_factor;
		sprite.y *= scale_factor;
	};

	var background = this.create( 0, 0, 'panel_left' );
	rescale( background, scale_factor );
	
	// life indicator
	var life_indicator = game.add.group( this );
	life_indicator.full_tint = 0xed1950;
	life_indicator.empty_tint = 0x4b202b;

	life_indicator.create( 20, 8, 'life_indicator' );
	for( var i = 0; i < 2; i++ ){
		life_indicator.create( 42 + i * 8, 8, 'life_segment' );
	}

	for( var i = 0; i < life_indicator.children.length; i++ ){
		var sprite = life_indicator.children[i];
		sprite.tint = i > 0 ? life_indicator.empty_tint : life_indicator.full_tint;
		rescale( sprite, scale_factor );
	}

	// energy indicator
	var energy_indicator = game.add.group( this );
	energy_indicator.full_tint = 0x34f772;
	energy_indicator.empty_tint = 0x295f3a;
	
	energy_indicator.create( 97, 8, 'energy_indicator' );
	for( var i = 0; i < 10; i++ ){
		energy_indicator.create( 110 + i * 8, 8, 'energy_segment' );
	}

	for( var i = 0; i < energy_indicator.children.length; i++ ){
		var sprite = energy_indicator.children[i];
		sprite.tint = energy_indicator.full_tint;
		rescale( sprite, scale_factor );
	}

	// upgrade indicator
	var upgrade_indicator = game.add.group( this );
	upgrade_indicator.full_tint = 0xe8c755;
	upgrade_indicator.empty_tint = 0x5e5125;
	
	upgrade_indicator.create( 240, 8, 'upgrade_indicator' );
	for( var i = 0; i < 5; i++ ){
		upgrade_indicator.create( 258 + i * 8, 8, 'upgrade_segment' );
	}

	for( var i = 0; i < upgrade_indicator.children.length; i++ ){
		var sprite = upgrade_indicator.children[i];
		sprite.tint = i > 0 ? upgrade_indicator.empty_tint : upgrade_indicator.full_tint;
		rescale( sprite, scale_factor );
	}

	this.indicators = {
		"life": life_indicator,
		"energy": energy_indicator,
		"upgrade": upgrade_indicator
	}
};

StatsPanel.prototype = Object.create(Phaser.Group.prototype);
StatsPanel.prototype.constructor = StatsPanel;

StatsPanel.prototype.updateEnergyIndicator = function( value ){
	var energy_indicator = this.indicators.energy;

	var full_segments = Math.floor(value / 10) + 1;

	for( var i = 1; i < energy_indicator.children.length; i++ ){
		var sprite = energy_indicator.children[i];
		sprite.tint = i > full_segments ? energy_indicator.empty_tint : energy_indicator.full_tint;
	}
}

StatsPanel.prototype.updateLifeIndicator = function( value ){
	var life_indicator = this.indicators.life;

	var full_segments = value;

	for( var i = 0; i < life_indicator.children.length; i++ ){
		var sprite = life_indicator.children[i];
		sprite.tint = i >= full_segments ? life_indicator.empty_tint : life_indicator.full_tint;
	}
}

StatsPanel.prototype.updateUpgradeIndicator = function( value ){
	var upgrade_indicator = this.indicators.upgrade;

	var full_segments = value;

	for( var i = 0; i < upgrade_indicator.children.length; i++ ){
		var sprite = upgrade_indicator.children[i];
		sprite.tint = i >= full_segments ? upgrade_indicator.empty_tint : upgrade_indicator.full_tint;
	}
}