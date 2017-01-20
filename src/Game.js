Retoosh.Game = function(game) {

    this.background = null;

    this.spaceship = null;
    this.speed = 300;

    this.weapons = [];
    this.currentWeapon = 0;
};

var score = 0;
var hp = 100;

function GameOver(game) {
    game.state.start('GameOver');
    console.log('GAME OVER');
}
Retoosh.Game.prototype = {

    create: function() {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // parallax background
        this.parallax = [
            this.game.add.tileSprite(0, 0, Retoosh.WIDTH, Retoosh.HEIGHT, 'parallax_1'),
            this.game.add.tileSprite(0, 0, Retoosh.WIDTH, Retoosh.HEIGHT, 'parallax_2'),
            this.game.add.tileSprite(0, 0, Retoosh.WIDTH, Retoosh.HEIGHT, 'parallax_3')
        ];

        this.parallax[0].autoScroll(-80, 0);
        this.parallax[1].autoScroll(-150, 0);
        this.parallax[2].autoScroll(-180, 0);

        // ui
        stats_panel = new StatsPanel(this.game);

        var playerName = this.game.cache.getText('name');
        score = 0;
        hp = 100;
        playerNameText=this.game.add.text(10, 10, playerName, { font: '40px Phosphate', fill: '#ffffff' });
        scoreText = this.game.add.text(playerNameText._width + 25, 10, 'score: '+ score, { font: '40px Phosphate', fill: '#ffffff' });

        this.game.add.text(100, Retoosh.HEIGHT - 30, 'Move: Mouse', { font: '20px Phosphate', fill: '#ffffff' });
        this.game.add.text(300, Retoosh.HEIGHT - 30, 'Fire: Spacebar', { font: '20px Phosphate', fill: '#ffffff' });
        this.game.add.text(500, Retoosh.HEIGHT - 30, 'Weapon change: Enter', { font: '20px Phosphate', fill: '#ffffff' });

        this.spaceship = this.game.add.sprite(this.game.world.width * 0.5, this.game.world.height * 0.5, 'spaceship');
        this.game.physics.enable(this.spaceship, Phaser.Physics.ARCADE);
        this.spaceship.anchor.set(0.5, 0.5);

        this.spaceship.body.collideWorldBounds = true;
        this.spaceship.body.immovable = true;

        this.weapons = [];
        this.weapons.push(new Weapon.SingleBullet(this.game));
        this.weapons.push(new Weapon.FrontAndBack(this.game));

        scenario = new Scenario();
        scenario.addStage(new Formations.Line(this.game));
        scenario.addStage(new Formations.Square(this.game));
        scenario.addStage(new Formations.FlyingWedge(this.game));


        for (var i = 1; i < this.weapons.length; i++) {
            this.weapons[i].visible = false;
        }

        this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

        var changeKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        changeKey.onDown.add(this.nextWeapon, this);

        scenario.startScenario();
    },

    update: function() {
        var link = this;

        this.game.physics.arcade.collide(this.spaceship, scenario.getEnemies(), this.enemyHitPlayer, null, null);
        
        var beamColliderCallback = function(obj1, obj2) { 
            link.playerKillEnemy(link.game, obj1, obj2); 
        }
        this.game.physics.arcade.collide(scenario.getEnemies(), this.weapons[this.currentWeapon], beamColliderCallback, null, null);
        scenario.updateScenario(this.game);

        this.spaceship.x = this.game.input.x || this.game.world.width * 0.5;
        this.spaceship.y = this.game.input.y || this.game.world.height * 0.5;

        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.input.activePointer.leftButton.isDown) {
            this.weapons[this.currentWeapon].fire(this.spaceship);
        }

        if(hp <=0)
        {
            GameOver(this.game);
        }
    },


    enemyHitPlayer: function (spaceship, enemy) {

        enemy.kill();

        scoreText.setText('score: ' + score);
        loseLife();
    },

    playerKillEnemy: function (game, enemy, weapon) {

        enemy.kill();
        weapon.kill();

        // play explosion sound with slight change of rate and volume
        var explosion_sound = this.game.add.audio('explosion');
        explosion_sound.volume = game.rnd.realInRange(0.4,1);
        explosion_sound.play();
        explosion_sound._sound.playbackRate.value = game.rnd.realInRange(0.85,1.15);
        
        score += 100;
        scoreText.setText('score: ' + score);
    },

    nextWeapon: function () {

        this.weapons[this.currentWeapon].visible = false;
        this.weapons[this.currentWeapon].callAll('reset', null, 0, 0);
        this.weapons[this.currentWeapon].setAll('exists', false);

        this.currentWeapon++;

        if (this.currentWeapon === this.weapons.length) {
            this.currentWeapon = 0;
        }

        this.weapons[this.currentWeapon].visible = true;
    }
};

function loseLife() {
    hp -= 5;

    stats_panel.updateEnergyIndicator( hp );
}