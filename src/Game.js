Retoosh.Game = function(game) {

    this.game = game;
    this.background = null;

    this.spaceship = null;
    this.speed = 300;

    this.weapons = [];
    this.currentWeapon = 0;
};

var weaponsLimit = 0;
var weaponsAvailable = 0;
var score = 0;
var hp = 100;
var shield = false;

function GameOver(game, has_won) {
    game.state.start('GameOver', true, false, has_won );
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
        this.currentWeapon = 0;
        // ui
        stats_panel = new StatsPanel(this.game);
        score_panel = new ScorePanel(this.game, playerName);

        shieldText = this.game.add.text(Retoosh.WIDTH/2, Retoosh.HEIGHT/2, 'SHIELD!', { font: '40px Orbitron', fill: '#ffffff' });
        shieldText.anchor.set(0.5, 0.5);
        shieldText.visible = false;

        this.spaceship = this.game.add.sprite(this.game.world.width * 0.5, this.game.world.height * 0.5, 'spaceship');
        this.game.physics.enable(this.spaceship, Phaser.Physics.ARCADE);
        this.spaceship.anchor.set(0.5, 0.5);

        this.spaceship.body.collideWorldBounds = true;
        this.spaceship.body.immovable = true;

        this.weapons = [];
        this.weapons.push(new Weapon.SingleBullet(this.game));
        this.weapons.push(new Weapon.FrontAndBack(this.game));
        this.weapons.push(new Weapon.ThreeWay(this.game));
        this.weapons.push(new Weapon.EightWay(this.game));
        this.weapons.push(new Weapon.ScatterShot(this.game));
        this.weapons.push(new Weapon.ScaleBullet(this.game));

        weaponsAvailable = 1;
        weaponsLimit = this.weapons.length;

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

        scenario.startScenario();
    },

    update: function() {
        var link = this;

        var beamColliderCallback = function(obj1, obj2) {
            link.playerKillEnemy(link.game, obj1, obj2);
        };

        var playerColliderCallback = function(obj1, obj2){
            link.enemyHitPlayer(link.game, obj1, obj2,false);
        };
        var enemyShotPlayerCallback = function(obj1, obj2){
            link.enemyHitPlayer(link.game, obj1, obj2,true);
        };

        var enemy = scenario.getEnemies();
        var enemyKind= enemy.getFirstExists();

        this.game.physics.arcade.collide(this.spaceship, powerups, this.playerGainPowerup, null, this);
        this.game.physics.arcade.collide(this.spaceship, enemy, playerColliderCallback, null, null);
        this.game.physics.arcade.overlap(enemy, this.weapons[this.currentWeapon], beamColliderCallback, null, null);
        if(enemyKind!= null && enemyKind.key=='boss')
        {
            weaponEnemy = enemyKind.getWeapon();
            this.game.physics.arcade.overlap(this.spaceship, weaponEnemy, enemyShotPlayerCallback, null, null);
        }
        scenario.updateScenario(this.game);

        this.spaceship.x = this.game.input.x || this.game.world.width * 0.5;
        this.spaceship.y = this.game.input.y || this.game.world.height * 0.5;

        if (this.input.activePointer.leftButton.isDown) {
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

        if(hp <= 0) {
            GameOver(this.game, false);
        }
    },

    enemyHitPlayer: function (game, spaceship, enemy,isShot) {

        // show explosion in place of killed enemy
        var explosion = game.add.sprite(enemy.x, enemy.y, 'explosion');
        explosion.anchor.set( 0.5, 0.5 );
        explosion.animations.add('explode');
        explosion.animations.play('explode', 30, false, true);
        var dmg= 5;
        // remove enemy sprite
        if(!isShot)
        {
            enemy.isHit(5);
        }
        else
        {
            enemy.kill();
            dmg=15;
        }


        // play explosion sound with slight change of rate and volume
        var explosion_sound = this.game.add.audio('explosion');
        explosion_sound.volume = game.rnd.realInRange(0.4,1);
        explosion_sound.play();
        explosion_sound._sound.playbackRate.value = game.rnd.realInRange(0.85,1.15);

        shield ? score+=0 : score-=200;

        score_panel.updateScoreIndicator( score );
        if(!shield) {
            loseLife(dmg);
        }
    },

    playerKillEnemy: function (game, enemy, weapon) {

        // show explosion in place of killed enemy
        var explosion = game.add.sprite(enemy.x, enemy.y, 'explosion');
        explosion.anchor.set( 0.5, 0.5 );
        explosion.animations.add('explode');
        explosion.animations.play('explode', 30, false, true);

        // remove colliding sprites
        enemy.isHit(weapon.damage);
        weapon.kill();

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

        if(powerup.type == "upgrade")
            this.nextWeapon();
    },

    nextWeapon: function () {
        if(this.currentWeapon >= weaponsLimit - 1) return;

        this.weapons[this.currentWeapon].visible = false;
        this.weapons[this.currentWeapon].callAll('reset', null, 0, 0);
        this.weapons[this.currentWeapon].setAll('exists', false);

        this.currentWeapon++;
        this.currentWeapon = this.currentWeapon % weaponsAvailable;

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

function loseLife(dmg) {
    hp -= dmg;
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

function upgradeWeapon(){
    weaponsAvailable < weaponsLimit ? weaponsAvailable++ : weaponsAvailable;
    stats_panel.updateUpgradeIndicator(weaponsAvailable);
}