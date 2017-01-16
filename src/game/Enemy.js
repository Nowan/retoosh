var Formations = {};
var noEnemies = (Retoosh.HEIGHT)/60;
var diff = (Retoosh.HEIGHT -40)/noEnemies - 10;
Formations.FlyingWedge = function (game){

    Phaser.Group.call(this, game, game.world, 'Flying Wedge', false, true, Phaser.Physics.ARCADE);

  //  var noEnemies = Retoosh.HEIGHT/60;
   // var diff = Retoosh.HEIGHT/noEnemies - 10;

    for (var i = 2; i < 6; i++)
    {
        for (var j = 0; j < noEnemies/i; j++){
            this.add(new Enemies.Easy(game, Retoosh.WIDTH - 80 - (i - 2) * 65, Retoosh.HEIGHT/2 + diff*j), true);
            if(j != 0) {
                this.add(new Enemies.Easy(game, Retoosh.WIDTH - 80 - (i - 2) * 65, Retoosh.HEIGHT / 2 - diff * j), true);
            }
        }
    }

    return this;
};

Formations.FlyingWedge.prototype = Object.create(Phaser.Group.prototype);
Formations.FlyingWedge.prototype.constructor = Formations.FlyingWedge;

Formations.Line = function (game){

    Phaser.Group.call(this, game, game.world, 'Line', false, true, Phaser.Physics.ARCADE);

    //var noEnemies = Retoosh.HEIGHT/60;
    //var diff = Retoosh.HEIGHT/noEnemies - 10;

    for (var j = 0; j < noEnemies; j++){
        this.add(new Enemies.Easy(game, Retoosh.WIDTH - 80, diff + 60 + diff*j), true);
    }

    return this;

};

Formations.Line.prototype = Object.create(Phaser.Group.prototype);
Formations.Line.prototype.constructor = Formations.Line;


Formations.Square = function (game){

    Phaser.Group.call(this, game, game.world, 'Square', false, true, Phaser.Physics.ARCADE);

     //var noEnemies = Retoosh.HEIGHT/60;
    //var diff = Retoosh.HEIGHT/noEnemies - 10;

    for (var i = 0; i < 4; i++)
    {
        for (var j = 0; j < noEnemies; j++){
            this.add(new Enemies.Easy(game, Retoosh.WIDTH - 80 - i*65, diff +60+ diff*j), true);
        }
    }

    return this;
};

Formations.Square.prototype = Object.create(Phaser.Group.prototype);
Formations.Square.prototype.constructor = Formations.Square;


Enemy = function (game, key, x, y) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    this.anchor.set(0.5);
    this.reset(x, y);

    this.scaleSpeed = 0;
    this.exists = false;

};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.showOnScreen = function (angle, speed, scale) {

    this.scale.setTo(scale, scale);
    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
    this.body.collideWorldBounds = false;
    this.exists = true;

};


var Enemies = {};

Enemies.Easy = function (game, x, y) {
    Enemy.call(this, game, 'easyenemy', x, y);
};

Enemies.Easy.prototype = Object.create(Enemy.prototype);
Enemies.Easy.prototype.constructor = Enemies.Easy;


Enemies.Medium = function (game, x, y) {
    Enemy.call(this, game, 'mediumenemy', x, y);
};

Enemies.Medium.prototype = Object.create(Enemy.prototype);
Enemies.Medium.prototype.constructor = Enemies.Medium;

Enemies.Hard = function (game, x, y) {
    Enemy.call(this, game, 'easyenemy', x, y);
};

Enemies.Hard.prototype = Object.create(Enemy.prototype);
Enemies.Hard.prototype.constructor = Enemies.Hard;