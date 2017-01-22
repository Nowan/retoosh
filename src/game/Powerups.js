
Powerup = function (game, key, x, y) {
    Phaser.Sprite.call(this, game, 0, 0, key);

    this.anchor.set(0.5);
    this.reset(x, y);

    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
};
Powerup.prototype = Object.create(Phaser.Sprite.prototype);
Powerup.prototype.constructor = Powerup;
Powerup.prototype.upgrade = function () { };

EnergyPowerup = function (game, x, y) {
    Powerup.call(this, game, 'powerupenergy', x, y);
};
EnergyPowerup.prototype = Object.create(Powerup.prototype);
EnergyPowerup.prototype.constructor = EnergyPowerup;
EnergyPowerup.prototype.upgrade = function () {
    increaseLife(1);
};

LifePowerup = function (game, x, y) {
    Powerup.call(this, game, 'poweruplife', x, y);
};
LifePowerup.prototype = Object.create(Powerup.prototype);
LifePowerup.prototype.constructor = LifePowerup;
LifePowerup.prototype.upgrade = function () {
    increaseEnergy(20);
};

ShieldPowerup = function (game, x, y) {
    Powerup.call(this, game, 'powerupshield', x, y);
};
ShieldPowerup.prototype = Object.create(Powerup.prototype);
ShieldPowerup.prototype.constructor = ShieldPowerup;
ShieldPowerup.prototype.upgrade = function (){
    enableShield();
};

UpgradePowerup = function (game, x , y) {
    Powerup.call(this, game, 'powerupupgrade', x, y);
};
UpgradePowerup.prototype = Object.create(Powerup.prototype);
UpgradePowerup.prototype.constructor = UpgradePowerup;
UpgradePowerup.prototype.upgrade = function () {
    upgradeWeapon();
};