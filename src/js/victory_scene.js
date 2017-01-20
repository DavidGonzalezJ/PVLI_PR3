var victoryScene = {
    create: function () {
        console.log("Victory");
        this.aleluya = this.game.add.audio('Aleluya');
        this.aleluya.loop = true;
        this.aleluya.play();
        this.game.world.setBounds(0,0,800,600);

        var logo = this.game.add.sprite(this.game.world.centerX, 
                                        this.game.world.centerY, 
                                        'Victory');
        logo.anchor.set(0.5);
        var button = this.game.add.button(250, 300,
            'button',this.actionOnClick, this, 2, 1, 0);

        button.anchor.set(0.5);

       // var goText = this.game.add.text(400, 100, "Victory");

        var text = this.game.add.text(0, 0, "Restart");
        text.anchor.set(0.5);
        //goText.anchor.set(0.5);
        button.addChild(text);
        
        //TODO 8 crear un boton con el texto 'Return Main Menu' que nos devuelva al menu del juego.
        var button2 = this.game.add.button(250, 400,
                                          'button',
                                          this.click2, 
                                          this, 2, 1, 0);
        button2.anchor.set(0.5);
        var text2 = this.game.add.text(0, 0, "Return Menu");
        text2.anchor.set(0.5);
        button2.addChild(text2);
    },
    
    //TODO 7 declarar el callback del boton.
    actionOnClick: function(){
        this.game.state.start('play');
        this.aleluya.destroy();
    },

    //Callback del otro botón (punto 8)
    click2: function(){
        //this.game.state.start('preloader');
        this.game.state.start('menu');
        this.aleluya.destroy();
    }
};

module.exports = victoryScene;