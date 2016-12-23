Screen.Game = function(game) {};
Screen.Game.prototype = {
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        ball = this.game.add.sprite(50, 50, 'ball');

        this.game.physics.enable(ball, Phaser.Physics.ARCADE);
        ball.body.velocity.set(150,150);
        ball.body.collideWorldBounds = true;
        ball.body.bounce.set(1);

        spaceship = this.game.add.sprite(this.game.world.width * 0.5, this.game.world.height * 0.5, 'spaceship');
        this.game.physics.enable(spaceship, Phaser.Physics.ARCADE);
        spaceship.anchor.set(0.5, 0.5);

        spaceship.body.collideWorldBounds = true;
        spaceship.body.immovable = true;
    },
    update: function() {
        this.game.physics.arcade.collide(ball, spaceship);

        spaceship.x = this.game.input.x || this.game.world.width * 0.5;
        spaceship.y = this.game.input.y || this.game.world.height * 0.5;
    },
};