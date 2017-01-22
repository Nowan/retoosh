Retoosh.Howto = function(game) { };
var DEFAULT_VALUE= 'Enter your name';
Retoosh.Howto.prototype = {
    create: function() {
        // parallax background
        this.parallax = [
            this.game.add.tileSprite(0, 0, Retoosh.WIDTH, Retoosh.HEIGHT, 'parallax_1'),
            this.game.add.tileSprite(0, 0, Retoosh.WIDTH, Retoosh.HEIGHT, 'parallax_2'),
            this.game.add.tileSprite(0, 0, Retoosh.WIDTH, Retoosh.HEIGHT, 'parallax_3')
        ];

        this.parallax[0].autoScroll(-10, 0);
        this.parallax[1].autoScroll(-20, 0);
        this.parallax[2].autoScroll(-25, 0);

        // "RETOOSH" logo
        this.logo = this.add.sprite(Retoosh.WIDTH * 0.5, 100, 'logo');
        this.logo.anchor.set( 0.5, 0 );
        this.logo.scale.set( 0.7, 0.7 );

        var how_to_play_label = this.add.text(Retoosh.WIDTH * 0.5, 195, 'How to play', { font: '18px Orbitron', fill: '#15d3e2' });
        how_to_play_label.anchor.set( 0.5, 0 );

        var press_key_label = this.add.text(Retoosh.WIDTH * 0.5, Retoosh.HEIGHT - 10, '<< press any key to continue >>', { font: '12px Orbitron', fill: '#15d3e2' });
        press_key_label.anchor.set( 0.5, 1 );

        // instructions
        var instruction_move = this.add.sprite(Retoosh.WIDTH * 0.5, 250, 'how_to_move');
        instruction_move.scale.set( 0.6, 0.6 );
        instruction_move.x -= instruction_move.width + 10;

        var instruction_fire = this.add.sprite(Retoosh.WIDTH * 0.5 + 10, 250, 'how_to_fire');
        instruction_fire.scale.set( 0.6, 0.6 );

        this.myInput = this.createInput(Retoosh.WIDTH * 0.5 - 175, Retoosh.HEIGHT - 100);
        
        if(this.game.cache.checkTextKey('name'))
        {
            this.myInput.canvasInput.value(this.game.cache.getText('name'));
        }

        var enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.add(this.startGame, this);

        this.error_label = this.add.text(this.myInput.x + this.myInput.width - 50, this.myInput.y + 2, '!', { font: '40px Phosphate', fill: '#ff0000' });
        this.error_label.visible = false;

        this.parallax[2].inputEnabled = true;
        this.parallax[2].events.onInputDown.add(this.startGame, this);
    },

    startGame: function() {
        var name = this.myInput.canvasInput._value;
        if(name == DEFAULT_VALUE || name.trim()=="")
        {
            if(!this.error_label.visible)
                this.error_label.visible = true;
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
