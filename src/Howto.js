Retoosh.Howto = function(game) { };
var DEFAULT_VALUE= 'Enter your name';
Retoosh.Howto.prototype = {
    create: function() {
        this.myInput = this.createInput(Retoosh.WIDTH * 0.5 - 175, Retoosh.HEIGHT * 0.5 +100);
        this.buttonContinue = this.add.button(Retoosh.WIDTH * 0.5 - 200, Retoosh.HEIGHT * 0.5 - 100, 'screen-howtoplay', this.startGame, this);
        if(this.game.cache.getText('name') != null)
        {
            this.myInput.canvasInput.value(this.game.cache.getText('name'));
        }
        var enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.add(this.startGame, this);
    },
    startGame: function() {
        var name = this.myInput.canvasInput._value;
        if(name == DEFAULT_VALUE || name.trim()=="")
        {
            this.add.text(Retoosh.WIDTH * 0.5 - 225,  Retoosh.HEIGHT * 0.5-200, 'ENTER NAME!', { font: '75px Phosphate', fill: '#ff0000' });
        }
        else
            {
                this.game.cache.addText('name',name,name);
                console.log(this.game.cache.getText('name'));
                this.game.state.start('Game');
            }

    },
    inputFocus: function(sprite){
        sprite.canvasInput.focus();
    },
    createInput: function(x, y){
        var bmd = this.add.bitmapData(400, 50);
        var myInput = this.game.add.sprite(x, y, bmd);

        myInput.canvasInput = new CanvasInput({
            canvas: bmd.canvas,
            fontSize: 30,
            fontFamily: 'Arial',
            fontColor: '#212121',
            fontWeight: 'bold',
            width: Retoosh.WIDTH * 0.5 - 75,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 3,
            boxShadow: '1px 1px 0px #fff',
            innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            placeHolder: DEFAULT_VALUE
        });
        myInput.inputEnabled = true;
        myInput.input.useHandCursor = true;
        myInput.events.onInputUp.add(this.inputFocus, this);

        return myInput;
    }
};
