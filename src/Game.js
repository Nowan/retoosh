Retoosh.Game = function(game) {

    this.background = null;

    this.spaceship = null;
    this.speed = 300;

    this.weapons = [];
    this.currentWeapon = 0;

    this.formattions = [];
    this.currentFormation = 0;
};


Retoosh.Game.prototype = {

    create: function() {

        previousTimestamp = new Date();
        currentTimestamp = new Date();

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.background = this.game.add.tileSprite(0, 0, Retoosh.WIDTH, Retoosh.HEIGHT, 'background');

        this.background.autoScroll(-40, 0);
        var playerName = this.game.cache.getText('name');
        score = 0;
        playerNameText=this.game.add.text(10, 10, playerName, { font: '40px Phosphate', fill: '#ffffff' });
        scoreText = this.game.add.text(playerNameText._width + 25, 10, 'score: 0', { font: '40px Phosphate', fill: '#ffffff' });

        this.game.add.text(100, Retoosh.HEIGHT - 30, 'Move: Mouse', { font: '20px Phosphate', fill: '#ffffff' });
        this.game.add.text(300, Retoosh.HEIGHT - 30, 'Fire: Spacebar', { font: '20px Phosphate', fill: '#ffffff' });
        this.game.add.text(500, Retoosh.HEIGHT - 30, 'Weapon change: Enter', { font: '20px Phosphate', fill: '#ffffff' });

        this.spaceship = this.game.add.sprite(this.game.world.width * 0.5, this.game.world.height * 0.5, 'spaceship');
        this.game.physics.enable(this.spaceship, Phaser.Physics.ARCADE);
        this.spaceship.anchor.set(0.5, 0.5);

        this.spaceship.body.collideWorldBounds = true;
        this.spaceship.body.immovable = true;

        this.weapons.push(new Weapon.SingleBullet(this.game));
        this.weapons.push(new Weapon.FrontAndBack(this.game));

        scenario = new Scenario();
        scenario.addStage(new Formations.Square(this.game));
        scenario.addStage(new Formations.Line(this.game));
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
        currentTimestamp = new Date();

        this.game.physics.arcade.collide(this.spaceship, scenario.getEnemies(), this.enemyHitPlayer, null, null);
        this.game.physics.arcade.collide(scenario.getEnemies(), this.weapons[this.currentWeapon], this.playerKillEnemy, null, null);

        scenario.updateScenario();

        this.spaceship.x = this.game.input.x || this.game.world.width * 0.5;
        this.spaceship.y = this.game.input.y || this.game.world.height * 0.5;

        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.input.activePointer.leftButton.isDown) {
            this.weapons[this.currentWeapon].fire(this.spaceship);
        }


    },
 
    enemyHitPlayer: function (spaceship, enemy) {
        enemy.kill();

        score -= 100;
        scoreText.setText('score: ' + score);
    },

    playerKillEnemy: function (enemy, weapon) {

        enemy.kill();
        weapon.kill();

        score += 100;
        scoreText.setText('score: ' + score);
    },

    nextWeapon: function () {


        this.weapons[this.currentWeapon].visible = false;
        this.weapons[this.currentWeapon].callAll('reset', null, 0, 0);
        this.weapons[this.currentWeapon].setAll('exists', false);

        this.currentWeapon++;

        if (this.currentWeapon === this.weapons.length)
        {
            this.currentWeapon = 0;
        }

        this.weapons[this.currentWeapon].visible = true;

    }
};