Retoosh.Game = function(game) {
    this.spaceship = null;
    this.speed = 300;

    this.weapons = [];
    this.currentWeapon = 0;
};


Retoosh.Game.prototype = {

    create: function() {

        previousTimestamp = new Date();
        currentTimestamp = new Date();

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        background = this.game.add.tileSprite(0, 0, Retoosh.WIDTH, Retoosh.HEIGHT, 'background');

        background.autoScroll(-40, 0);

        score = 0;
        scoreText = this.game.add.text(10, 10, 'Score: 0', { font: '40px Phosphate', fill: '#ffffff' });

        this.game.add.text(100, Retoosh.HEIGHT - 30, 'Move: Mouse', { font: '20px Phosphate', fill: '#ffffff' });
        this.game.add.text(300, Retoosh.HEIGHT - 30, 'Fire: Spacebar', { font: '20px Phosphate', fill: '#ffffff' });
        this.game.add.text(500, Retoosh.HEIGHT - 30, 'Weapon change: Enter', { font: '20px Phosphate', fill: '#ffffff' });


        this.spaceship = this.game.add.sprite(this.game.world.width * 0.5, this.game.world.height * 0.5, 'spaceship');
        this.game.physics.enable(this.spaceship, Phaser.Physics.ARCADE);
        this.spaceship.anchor.set(0.5, 0.5);

        this.spaceship.body.collideWorldBounds = true;
        this.spaceship.body.immovable = true;

        enemies = this.game.add.group();

        this.weapons.push(new Weapon.SingleBullet(this.game));
        this.weapons.push(new Weapon.FrontAndBack(this.game));

        for (var i = 1; i < this.weapons.length; i++)
        {
            this.weapons[i].visible = false;
        }

        this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

        var changeKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        changeKey.onDown.add(this.nextWeapon, this);
    },

    update: function() {
        currentTimestamp = new Date();

        // this.game.physics.arcade.collide(enemies);
        this.game.physics.arcade.collide(this.spaceship, enemies, this.enemyHitPlayer, null, null);
        this.game.physics.arcade.collide(enemies, this.weapons[this.currentWeapon], this.playerKillEnemy, null, null);

        if((currentTimestamp - previousTimestamp) / 1000 > 2){
            var noEnemies = Math.floor((Math.random() * 20) + 1);
            for(i=0; i< noEnemies; i++) {
                this.generateEnemies();
            }
            previousTimestamp = currentTimestamp;
        }

        this.spaceship.x = this.game.input.x || this.game.world.width * 0.5;
        this.spaceship.y = this.game.input.y || this.game.world.height * 0.5;

        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            this.weapons[this.currentWeapon].fire(this.spaceship);
        }
    },
 
    enemyHitPlayer: function (spaceship, enemy) {
        enemy.kill();
        score -= 100;
        scoreText.setText('Score: ' + score);
    },

    playerKillEnemy: function (enemy, weapon) {

        enemy.kill();
        weapon.kill();

        score += 100;
        scoreText.setText('Score: ' + score);
    },

    generateEnemies: function () {
        var newEnemyHeight = Math.floor((Math.random() * Retoosh.HEIGHT) + 1);
        var newEnemyVelocity = Math.floor((Math.random() * 300) + 80);

        newEnemy = this.game.add.sprite(1000, newEnemyHeight, 'enemy');

        var rand = this.game.rnd.realInRange(0.8, 1.5);

        newEnemy.scale.setTo(rand, rand);

        this.game.physics.enable(newEnemy, Phaser.Physics.ARCADE);

        newEnemy.body.velocity.set(newEnemyVelocity*(-1), 0);
        newEnemy.body.collideWorldBounds = false;

        enemies.add(newEnemy);
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


var Bullet = function (game, key) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.anchor.set(0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.tracking = false;
    this.scaleSpeed = 0;

};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {

    gx = gx || 0;
    gy = gy || 0;

    this.reset(x, y);
    this.scale.set(1);

    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

    this.angle = angle;

    this.body.gravity.set(gx, gy);

};

Bullet.prototype.update = function () {

    if (this.tracking)
    {
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }

    if (this.scaleSpeed > 0)
    {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
    }

};

var Weapon = {};


Weapon.SingleBullet = function (game) {

    Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet'), true);
    }

    return this;

};

Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.fire = function (source) {

    console.log("Single fire");
    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 10;
    var y = source.y;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;

};

Weapon.FrontAndBack = function (game) {

    Phaser.Group.call(this, game, game.world, 'Front And Back', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet'), true);
    }

    return this;

};

Weapon.FrontAndBack.prototype = Object.create(Phaser.Group.prototype);
Weapon.FrontAndBack.prototype.constructor = Weapon.FrontAndBack;

Weapon.FrontAndBack.prototype.fire = function (source) {

    console.log("Front and back fire");
    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 10;
    var y = source.y;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x, y, 180, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;

};