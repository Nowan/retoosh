Screen.Game = function(game) {};
Screen.Game.prototype = {

    create: function() {

        previousTimestamp = new Date();
        currentTimestamp = new Date();

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        background = this.game.add.tileSprite(0, 0, Screen.WIDTH, Screen.HEIGHT, 'background');

        background.autoScroll(-40, 0);

        score = 0;
        scoreText = this.game.add.text(10, 10, 'Score: 0', { font: '40px Phosphate', fill: '#ffffff' });

        spaceship = this.game.add.sprite(this.game.world.width * 0.5, this.game.world.height * 0.5, 'spaceship');
        this.game.physics.enable(spaceship, Phaser.Physics.ARCADE);
        spaceship.anchor.set(0.5, 0.5);

        spaceship.body.collideWorldBounds = true;
        spaceship.body.immovable = true;

        enemies = this.game.add.group();
    },

    update: function() {
        currentTimestamp = new Date();

        // this.game.physics.arcade.collide(enemies);
        this.game.physics.arcade.collide(spaceship, enemies, this.enemyHitPlayer, null, null);

        console.log(previousTimestamp);
        console.log(currentTimestamp);
        if((currentTimestamp - previousTimestamp) / 1000 > 2){
            var noEnemies = Math.floor((Math.random() * 20) + 1);
            for(i=0; i< noEnemies; i++) {
                this.generateEnemies();
            }
            previousTimestamp = currentTimestamp;
        }

        spaceship.x = this.game.input.x || this.game.world.width * 0.5;
        spaceship.y = this.game.input.y || this.game.world.height * 0.5;
    },
 
    enemyHitPlayer: function (spaceship, enemy) {
        enemy.kill();
        score -= 100;
        scoreText.setText('Score: ' + score);
    },

    playerKillEnemy: function () {

    },

    generateEnemies: function () {
        var newEnemyHeight = Math.floor((Math.random() * Screen.HEIGHT) + 1);
        var newEnemyVelocity = Math.floor((Math.random() * 300) + 80);

        newEnemy = this.game.add.sprite(1000, newEnemyHeight, 'enemy');

        var rand = this.game.rnd.realInRange(0.8, 1.5);

        newEnemy.scale.setTo(rand, rand);

        this.game.physics.enable(newEnemy, Phaser.Physics.ARCADE);

        newEnemy.body.velocity.set(newEnemyVelocity*(-1), 0);
        newEnemy.body.collideWorldBounds = false;

        enemies.add(newEnemy);
    }
    
};
