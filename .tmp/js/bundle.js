(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var GameOver = {
    create: function () {
        console.log("Game Over");
        var button = this.game.add.button(400, 300,
                                          'button',
                                          this.actionOnClick, 
                                          this, 2, 1, 0);
        button.anchor.set(0.5);
        var goText = this.game.add.text(400, 100, "GameOver");
        var text = this.game.add.text(0, 0, "Reset Game");
        text.anchor.set(0.5);
        goText.anchor.set(0.5);
        button.addChild(text);
        
        //TODO 8 crear un boton con el texto 'Return Main Menu' que nos devuelva al menu del juego.
        var button2 = this.game.add.button(400, 400,
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
    },

    //Callback del otro botón (punto 8)
    click2: function(){
        //this.game.state.start('preloader');
        this.game.state.start('menu');
    }
};

module.exports = GameOver;
},{}],2:[function(require,module,exports){
'use strict';

//TODO 1.1 Require de las escenas, play_scene, gameover_scene y menu_scene.

//  The Google WebFont Loader will look for this object, so create it before loading the script.
var playScene = require ('./play_scene.js'); 
var gameOver = require ('./gameover_scene.js');
var menuScene = require ('./menu_scene'); 


var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
    this.game.load.spritesheet('button', 'images/buttons.png', 168, 70);
    this.game.load.image('logo', 'images/phaser.png');
  },

  create: function () {
    //this.game.state.start('preloader');
      this.game.state.start('menu');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(100,300, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5); 
    this.game.load.setPreloadSprite(this.loadingBar);
    this.game.stage.backgroundColor = "#000000";
    
    
    
    this.load.onLoadStart.add(this.loadStart, this);
    //TODO 2.1 Cargar el tilemap images/map.json con el nombre de la cache 'tilemap'.
      //la imagen 'images/simples_pimples.png' con el nombre de la cache 'tiles' y
      // el atlasJSONHash con 'images/rush_spritesheet.png' como imagen y
      // 'images/rush_spritesheet.json' como descriptor de la animación.
      this.game.load.tilemap('tilemap', 'images/map.json', null, Phaser.Tilemap.TILED_JSON);//
      this.game.load.image('tiles','images/simples_pimples.png');//
      //Carga del enemigo
      this.game.load.image('enemy', 'images/enemy.png');
      //Carga de la cruz
      this.game.load.image('cross', 'images/cross.png');
      this.game.load.atlas('rush', 'images/rush_spritesheet.png', 'images/rush_spritesheet.json', 
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);


      //TODO 2.2a Escuchar el evento onLoadComplete con el método loadComplete que el state 'play'
    this.load.onLoadComplete.add(this.loadComplete, this);
//});

  },

  loadStart: function () {
    //this.game.state.start('play');
    console.log("Game Assets Loading ...");
  },
    
  //TODO 2.2b function loadComplete()
  loadComplete: function() {
    this.game.state.start('play');
  },
    
  update: function(){
    this._loadingBar
  }
};


var wfconfig = {
 
    active: function() { 
        console.log("font loaded");
        init();
    },
 
    google: {
        families: ['Sniglet']
    }
 
};

//TODO 3.2 Cargar Google font cuando la página esté cargada con wfconfig.
window.onload = function() {
    WebFont.load(wfconfig); //carga la fuente definida en el objeto anterior.
};

//TODO 3.3 La creación del juego y la asignación de los states se hará en el método init().
function init () {
   var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

//TODO 1.2 Añadir los states 'boot' BootScene, 'menu' MenuScene,
// 'preloader' PreloaderScene, 'play' PlayScene, 'gameOver' GameOver.
  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', playScene);
  game.state.add('gameOver', gameOver);
  game.state.add('menu', menuScene);

//TODO 1.3 iniciar el state 'boot'. 
  game.state.start('boot');
    
};

},{"./gameover_scene.js":1,"./menu_scene":3,"./play_scene.js":4}],3:[function(require,module,exports){
var MenuScene = {
    create: function () {
        this.game.world.setBounds(0,0,800,600);
        var logo = this.game.add.sprite(this.game.world.centerX, 
                                        this.game.world.centerY, 
                                        'logo');
        logo.anchor.setTo(0.5, 0.5);
        var buttonStart = this.game.add.button(this.game.world.centerX, 
                                               this.game.world.centerY, 
                                               'button', 
                                               this.actionOnClick, 
                                               this, 2, 1, 0);
        buttonStart.anchor.set(0.5);
        var textStart = this.game.add.text(0, 0, "Start");
        textStart.font = 'Sniglet';
        textStart.anchor.set(0.5);
        buttonStart.addChild(textStart);
    },
    
    actionOnClick: function(){
        this.game.state.start('preloader');
    } 
};

module.exports = MenuScene;
},{}],4:[function(require,module,exports){
'use strict';



var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3}
var Direction = {'LEFT':0, 'RIGHT':1, 'NONE':3}


//CONSTRUCTORAS ENEMIGOS Y OBJETOS

var enemy1;
//////////CELESTIAL CROSS/////////////
function CelestialCross(character, sprite, game){
    Phaser.Sprite.call(this, game, character.x,character.y,'cross');
    game.add.existing(this);

    this.scale.setTo(0.1,0.1);
    this.anchor.setTo(0.5, 0.5);

    this.character = character;
    game.physics.arcade.enable(this);
    this.kill();

    this.speed = 350;
    this.maxDist = 200;
    this.initialPosX = -150;
    this.puntoFinal = -150;
    
    this.dir = 'NULL';

    this.vuelta = false;
    this.launched = false;
    this.limit = false;
}

CelestialCross.prototype = Object.create(Phaser.Sprite.prototype);
CelestialCross.prototype.constructor = CelestialCross;
CelestialCross.prototype.setDirection = function(character){
    if (character.scale.x > 0){
        this.body.velocity.x = this.speed + character.body.velocity.x;
        this.puntoFinal = character.x + this.maxDist;
        this.dir = 'DERECHA';
    }
    else{
        this.body.velocity.x = -this.speed + character.body.velocity.x;
        this.puntoFinal = character.x - this.maxDist;
        this.dir = 'IZQUIERDA';
    }
}

CelestialCross.prototype.move = function(character){
    this.revive();

    if(this.launched === false){
        this.x = character.x;
        this.y = character.y-10;
        this.launched = true;
    }else{
        if(this.dir === 'DERECHA'){
            if(this.x >= this.puntoFinal) this.vuelta = true;
            if(this.vuelta && !this.limit) {
                this.body.velocity.x *= -1;
                this.limit = true;
            }
        }
        else if(this.dir === 'IZQUIERDA'){
            if(this.x <= this.puntoFinal) this.vuelta = true;
            if(this.vuelta && !this.limit) {
                this.body.velocity.x *= -1;
                this.limit = true;
            }
        }
        if(this.vuelta && this.x >= character.x-10 && this.x <= character.x+10){
            this.kill();
            this.vuelta = false;
            this.initialPosX = -150; 
            this.launched = false;
            this.limit = false;
            return true;
        }
        this.y = character.y;
        this.angle += 20;
    }

    return false;
}
////////////////////////////////////////////////////////////

///////////////////////ENEMIGO//////////////////////////////
function Enemy(x, y, sprite, game){
    Phaser.Sprite.call(this, game, x,y,'enemy');
    game.add.existing(this);

    //Posición inicial necesaria para el movimiento
    this.initialPos = this.x;
    this.speed = 150;
    //Escalado guarro para las pruebas
    this.scale.setTo(0.1,0.1);
    game.physics.arcade.enable(this);
    this.body.velocity.x = -this.speed;
    this.body.gravity.y = 30;
}
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.move = function(min,max){

    if(this.x === this.initialPos - min){ //&& this.x < this.initialPos + max)
        this.body.velocity.x = this.speed;
        if(this.scale.x > 0)
            this.scale.x *= -1; 
    }
    else if(this.x === this.initialPos + max){
        this.body.velocity.x = -this.speed;
        if(this.scale.x < 0)
            this.scale.x *= -1; 
    }

}
Enemy.prototype.collisionCross = function(game,cross){
    game.physics.arcade.overlap(cross, this, function (obj1, obj2) {
        obj2.kill();
        obj1.kill();

        /////FUTURO MARCADOR
        //score += 1;
        //scoreText.text = 'Score: ' + score;
    });
}

///////////////////////////////////////////////////
 function EnemyBird(index, game, x,y){
    this.bird = game.add.sprite(x,y,'enemy');
    this.bird.anchor.setTo(0.5);
    this.bird.name = index.toString();
    game.physics.enable(this.bird, Phaser.Physics.ARCADE);
    this.bird.body.immovable = true;
    this.bird.body.collideWorldBounds = true;
    this.bird.body.allowGravity =false;

    this.bird.scale.setTo(0.1,0.1);
    var time =4000;
    this.birdTween= game.add.tween(this.bird).to({
        x:this.bird.x + 200
    }, time*0.9,Phaser.Easing.Sinusoidal.Out, true,0,100,true).to({x: x}, time * 0.9, Phaser.Easing.Sinusoidal.In, true, 1,100,true).start();
}


/////////////////PLAY SCENE///////////////////////
var PlayScene = {
    _rush: {}, //player
    _enemy2:{},
    enemies:{},
    _speed: 250, //velocidad del player
    _jumpSpeed: 400, //velocidad de salto
    _jumpHight: 150, //altura máxima del salto.
    _playerState: PlayerState.STOP, //estado del player
    _direction: Direction.NONE,  //dirección inicial del player. NONE es ninguna dirección.
    _lanzamiento: false,//controla el lanzamiento de la cruz

    create: function () {
        ///PAUSA
        var Esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        Esc.onDown.add(this.unpause, this);
        //Creamos al player con un sprite por defecto.
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //TODO 5 Creamos a rush 'rush'  con el sprite por defecto en el 10, 10 con la animación por defecto 'rush_idle01'
        this._rush = this.game.add.sprite(10,275,'rush');
        //Creo la cruz de Santa Teresa
        this.cross = new CelestialCross(this._rush,'cross',this.game);

        //TODO 4: Cargar el tilemap 'tilemap' y asignarle al tileset 'patrones' la imagen de sprites 'tiles'
        this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('patrones','tiles');

        //Creacion de las layers
        this.backgroundLayer = this.map.createLayer('BackgroundLayer');
        this.groundLayer = this.map.createLayer('GroundLayer');
        //plano de muerte
        this.death = this.map.createLayer('Death');
        //Colisiones con el plano de muerte y con el plano de muerte y con suelo.
        this.map.setCollisionBetween(1, 5000, true, 'Death');
        this.map.setCollisionBetween(1, 5000, true, 'GroundLayer');
        this.death.visible = false;
          
        //Cambia la escala a x3.
        this.groundLayer.setScale(3,3);
        this.backgroundLayer.setScale(5,5);
        this.death.setScale(3,3);
         
        //this.groundLayer.resizeWorld(); //resize world and adjust to the screen
          
        //nombre de la animación, frames, framerate, isloop
        this._rush.animations.add('run',
            Phaser.Animation.generateFrameNames('rush_run',1,5,'',2),10,true);
        this._rush.animations.add('stop',
            Phaser.Animation.generateFrameNames('rush_idle',1,1,'',2),0,false);
        this._rush.animations.add('jump',
            Phaser.Animation.generateFrameNames('rush_jump',2,2,'',2),0,false);
        this.configure();


        //Introduzco al enemigo
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;

        for (var i = 0; i < 2; i++) {
            var enemy = new Enemy(130+ 30*i, 250, 'enemy', this.game);
            this.enemies.add(enemy);
        }

        enemy1 = new EnemyBird(0, this.game, 100, 500);
    },
    
    //IS called one per frame.
    update: function () {

        this.GetInput();
        var moveDirection = new Phaser.Point(0, 0);
        var collisionWithTilemap = this.game.physics.arcade.collide(this._rush, this.groundLayer);
        var enemyStanding = this.game.physics.arcade.collide(this.enemies, this.groundLayer);
        var collisionWithEnemy = this.game.physics.arcade.collide(this._rush, this.enemies);

        ///NO UTILIZADO AUN
        var collisionWithEnemyBird = this.game.physics.arcade.collide(this._rush, enemy1.bird);
        
       
        ///////////SI SE LANZA SE MIRA SI COLISIONA CON ENEMIGOS
        if(this._lanzamiento){        
            this.enemies.forEach( function(enemy) {
                enemy.collisionCross(this.game, this.cross);
            },this);
        }
        var movement = this.GetMovement();

        ///////////////////////TRANSITIONS//////////////////////
        switch(this._playerState)
        {
            case PlayerState.STOP:
            case PlayerState.RUN:
                if(this.isJumping(collisionWithTilemap)){
                    this._playerState = PlayerState.JUMP;
                    this._initialJumpHeight = this._rush.y;
                    this._rush.animations.play('jump');
                }
                else{
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        this._rush.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        this._rush.animations.play('stop');
                    }
                }    
                break;
                
            case PlayerState.JUMP:
                
                var currentJumpHeight = this._rush.y - this._initialJumpHeight;
                this._playerState = (currentJumpHeight*currentJumpHeight < this._jumpHight*this._jumpHight)
                    ? PlayerState.JUMP : PlayerState.FALLING;
                break;
                
            case PlayerState.FALLING:
                if(this.isStanding()){
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        this._rush.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        this._rush.animations.play('stop');
                    }
                }
                break;     
        }
        if(this._playerState !== PlayerState.JUMP && !this.isStanding())
            this._playerState = PlayerState.FALLING;

        /////////////////////////////////////////////////////////////////////


        ////////////////STATES////////////////////////
        switch(this._playerState){
                
            case PlayerState.STOP:
                moveDirection.x = 0;
                break;
            case PlayerState.JUMP:
            case PlayerState.RUN:

            case PlayerState.FALLING:
                if(movement === Direction.RIGHT){
                    moveDirection.x = this._speed;
                    if(this._rush.scale.x < 0)
                        this._rush.scale.x *= -1;
                }
                else if(movement === Direction.LEFT){
                    moveDirection.x = -this._speed;
                    if(this._rush.scale.x > 0)
                        this._rush.scale.x *= -1; 
                }
                if(this._playerState === PlayerState.JUMP)
                    moveDirection.y = -this._jumpSpeed;
                else if(this._playerState === PlayerState.FALLING)
                    moveDirection.y = this._jumpSpeed;//0;
                break;    
        }

        ///////////CROSS LAUNCH/////////////////

        if(this.launches() && !this._lanzamiento){
            this._lanzamiento = true;
            this.cross.setDirection(this._rush);
        }
        if(this._lanzamiento)
            if(this.cross.move(this._rush))
                this._lanzamiento = false;

        ////////////////////////////////////////

        ////////////MOVEMENT PLAYER////////////
        this.movement(moveDirection,50,
            this.backgroundLayer.layer.widthInPixels*this.backgroundLayer.scale.x - 10);
        
        this.enemies.forEach(function (aux){
            aux.move(10,300);
        });


        this.checkPlayerDmg(collisionWithEnemyBird);

        this.checkPlayerDmg(collisionWithEnemy);
        //console.log(this._playerState);
    },
    
    
    canJump: function(collisionWithTilemap){
        return this.isStanding() && collisionWithTilemap; //|| this._jamping; //ESTO PUEDE SERVIR PARA ALGO
    },
    
    onPlayerFell: function(){
        //TODO 6 Carga de 'gameOver';
        this.game.state.start('gameOver');
    },
    
    checkPlayerDmg: function(collisionWithEnemy){
        if(this.game.physics.arcade.collide(this._rush, this.death) || collisionWithEnemy){
            this._lanzamiento = false;
            this.onPlayerFell();
        }

    },
        
    isStanding: function(){
        return this._rush.body.blocked.down || this._rush.body.touching.down;
    },
        
    isJumping: function(collisionWithTilemap){
        return this.canJump(collisionWithTilemap) && 
            this.game.input.keyboard.isDown(Phaser.Keyboard.UP);
    },

    launches:function(){
        return this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
    },
        
    GetMovement: function(){
        var movement = Direction.NONE
        //Move Right
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            movement = Direction.RIGHT;
        }
        //Move Left
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            movement = Direction.LEFT;
        }
        return movement;
    },

    GetInput:function(){
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC))
            this.pause();
    },

    //CONFIGURE THE SCENE
    configure: function(){

        this.game.world.setBounds(0, 0, 2400, 160);
        //this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#a920ff';
        this.game.physics.arcade.enable(this._rush,this._enemy2);
        
        this._rush.body.bounce.y = 0;
        //Creo que deberíamos quitar la gravedad y controlarlo nosotros
        this._rush.body.gravity.y = /*20000*/ 1;
        this._rush.body.gravity.x = 0;
        //Este creo que no es necesario
        this._rush.body.velocity.x = 0;
        this.game.camera.follow(this._rush);
    },

    //MOVE PLAYER
    movement: function(point, xMin, xMax){
        this._rush.body.velocity = point;// * this.game.time.elapseTime;
        
        if((this._rush.x < xMin && point.x < 0)|| (this._rush.x > xMax && point.x > 0))
            this._rush.body.velocity.x = 0;

    },
    
    //DESTRUYE LOS RECURSOS
    destroy: function(){
        this.tilemap.destroy();
        this.tiles.destroy();
        this.game.world.setBounds(0,0,800,600);
    },
    pause: function(){
        this.game.paused = true;

    }, 
    unpause: function (event){
        // Only act if paused
        if(this.game.paused){
                // Unpause the game
                this.game.paused = false;
        }
    }

};

module.exports = PlayScene;

},{}]},{},[2]);
