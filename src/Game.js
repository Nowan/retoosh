Retoosh.Game = function(game) {

    this.game = game;
    this.background = null;

    this.spaceship = null;
    this.speed = 300;

    this.weapons = [];
    this.currentWeapon = 0;
};

var score = 0;
var hp = 100;
var shield = false;

function GameOver(game) {
    game.state.start('GameOver');
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

        // global params
        var playerName = this.game.cache.getText('name');
        score = 0;
        hp = 100;
        shield = false;

        // ui
        stats_panel = new StatsPanel(this.game);
        score_panel = new ScorePanel(this.game, playerName);

        this.game.add.text(100, Retoosh.HEIGHT - 30, 'Move: Mouse', { font: '20px Phosphate', fill: '#ffffff' });
        this.game.add.text(300, Retoosh.HEIGHT - 30, 'Fire: Spacebar', { font: '20px Phosphate', fill: '#ffffff' });
        this.game.add.text(500, Retoosh.HEIGHT - 30, 'Weapon change: Enter', { font: '20px Phosphate', fill: '#ffffff' });

        shieldText = this.game.add.text(Retoosh.WIDTH/2 - 60, Retoosh.HEIGHT/2 - 30, 'SHIELD!', { font: '40px Phosphate', fill: '#ffffff' });
        shieldText.visible = false;

        this.spaceship = this.game.add.sprite(this.game.world.width * 0.5, this.game.world.height * 0.5, 'spaceship');
        this.game.physics.enable(this.spaceship, Phaser.Physics.ARCADE);
        this.spaceship.anchor.set(0.5, 0.5);

        this.spaceship.body.collideWorldBounds = true;
        this.spaceship.body.immovable = true;

        this.weapons = [];
        this.weapons.push(new Weapon.SingleBullet(this.game));
        this.weapons.push(new Weapon.FrontAndBack(this.game));

        scenario = new Scenario();
        scenario.addStage(new Formations.Square(this.game));
        scenario.addStage(new Formations.FlyingWedge(this.game));
        scenario.addStage(new Formations.Line(this.game));
        scenario.addStage(new Formations.Boss(this.game));

        powerups = this.game.add.group();

        previousTimestamp = new Date();
        currentTimestamp = new Date();

        shieldStartTimestamp = new Date();
        shieldCurrentTimestamp = new Date();



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

        var beamColliderCallback = function(obj1, obj2) {
            link.playerKillEnemy(link.game, obj1, obj2);
        };

        var playerColliderCallback = function(obj1, obj2){
            link.enemyHitPlayer(link.game, obj1, obj2);
        };

        this.game.physics.arcade.collide(this.spaceship, powerups, this.playerGainPowerup, null, null);
        this.game.physics.arcade.collide(this.spaceship, scenario.getEnemies(), playerColliderCallback, null, null);
        this.game.physics.arcade.overlap(scenario.getEnemies(), this.weapons[this.currentWeapon], beamColliderCallback, null, null);

        scenario.updateScenario(this.game);

        this.spaceship.x = this.game.input.x || this.game.world.width * 0.5;
        this.spaceship.y = this.game.input.y || this.game.world.height * 0.5;

        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.input.activePointer.leftButton.isDown) {
            this.weapons[this.currentWeapon].fire(this.spaceship);
        }

        currentTimestamp = new Date();
        this.randomPowerup();

        if(shield){
            shieldCurrentTimestamp = new Date();
            var shieldTimeDifference = (shieldCurrentTimestamp - shieldStartTimestamp) / 1000;
            shieldText.visible = true;
            shieldText.text = "SHIELD " + parseInt(6-shieldTimeDifference) + " sec";

            if( shieldTimeDifference > 5) {
                shield = false;
                shieldText.visible = false;
            }
        }

        if(hp <=0) {
            GameOver(this.game);
        }
    },

    enemyHitPlayer: function (game, spaceship, enemy) {

        // show explosion in place of killed enemy
        var explosion = game.add.sprite(enemy.x, enemy.y, 'explosion');
        explosion.anchor.set( 0.5, 0.5 );
        explosion.animations.add('explode');
        explosion.animations.play('explode', 30, false, true);

        // remove enemy sprite
        enemy.kill();

        // play explosion sound with slight change of rate and volume
        var explosion_sound = this.game.add.audio('explosion');
        explosion_sound.volume = game.rnd.realInRange(0.4,1);
        explosion_sound.play();
        explosion_sound._sound.playbackRate.value = game.rnd.realInRange(0.85,1.15);

        enemy.isHit(10);
        score-=200;
        score_panel.updateScoreIndicator( score );
        if(!shield) {
            loseLife();
        }
    },

    playerKillEnemy: function (game, enemy, weapon) {

        // show explosion in place of killed enemy
        var explosion = game.add.sprite(enemy.x, enemy.y, 'explosion');
        explosion.anchor.set( 0.5, 0.5 );
        explosion.animations.add('explode');
        explosion.animations.play('explode', 30, false, true);

        // remove colliding sprites
        enemy.kill();
        weapon.kill();

        enemy.isHit(weapon.damage);

        // play explosion sound with slight change of rate and volume
        var explosion_sound = this.game.add.audio('explosion');
        explosion_sound.volume = game.rnd.realInRange(0.4,1);
        explosion_sound.play();
        explosion_sound._sound.playbackRate.value = game.rnd.realInRange(0.85,1.15);
        
        score += 100;
        score_panel.updateScoreIndicator( score );
    },

    playerGainPowerup: function (spaceship, powerup) {
        powerup.upgrade();
        powerup.kill();
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
    },

    randomPowerup: function () {

        if((currentTimestamp - previousTimestamp) / 1000 > 2) {
            var randValue = this.game.rnd.integerInRange(0, 10);
            if (randValue > 5) {
                var randX = this.game.rnd.integerInRange(100, Retoosh.WIDTH - 50);
                var randY = this.game.rnd.integerInRange(50, Retoosh.HEIGHT - 50);

                var powerupRand = this.game.rnd.integerInRange(0, 3);

                if (powerupRand == 0) {
                    powerups.add(new EnergyPowerup(this.game, randX, randY), true);
                }
                else if (powerupRand == 1) {
                    powerups.add(new LifePowerup(this.game, randX, randY), true);
                }
                else if (powerupRand == 2) {
                    powerups.add(new ShieldPowerup(this.game, randX, randY), true);
                }
                else {
                    powerups.add(new UpgradePowerup(this.game, randX, randY), true);
                }
            }
            previousTimestamp = currentTimestamp;
        }
    }
};

function loseLife() {
    hp -= 5;
    stats_panel.updateEnergyIndicator( hp );
}

function increaseLife(value) {
}

function increaseEnergy(value) {
    hp += value;
    stats_panel.updateEnergyIndicator( hp );
}

function enableShield(){
    shield = true;
    shieldStartTimestamp = new Date();
}