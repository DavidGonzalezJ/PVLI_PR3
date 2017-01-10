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
var pauseScene = require('./pause_scene');
var victoryScene = require('./victory_scene');

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


/////////////////////CARGA DE RECURSOS////////////////////////

    this.game.load.tilemap('tilemap', 'images/map.json', null, Phaser.Tilemap.TILED_JSON);//
    this.game.load.image('tiles','images/simples_pimples.png');//
    //Carga del enemigo
    this.game.load.image('enemy', 'images/enemy.png');
    this.game.load.image('lava','images/lava.png');

    //Carga de la cruz
    this.game.load.image('cross', 'images/cross.png');
    this.game.load.atlas('rush', 'images/rush_spritesheet.png', 'images/rush_spritesheet.json', 
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.game.load.image('God', 'images/god.png');
    this.game.load.image('muffin','images/muffin.png');
    this.game.load.image('buttonNew','images/buttonNew.png');
    this.game.load.image('Teresa','images/teresa1.png');
    
    //MENU
    this.game.load.image('menu', 'images/menu.png');

    //Escucha el evento onLoadComplete con el método loadComplete que el state 'play'
    this.load.onLoadComplete.add(this.loadComplete, this);
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
  game.state.add('pause', pauseScene);
  game.state.add('victory', victoryScene);


//TODO 1.3 iniciar el state 'boot'. 
  game.state.start('boot');
    
};

},{"./gameover_scene.js":1,"./menu_scene":3,"./pause_scene":4,"./play_scene.js":5,"./victory_scene":6}],3:[function(require,module,exports){
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
var pauseScene = {
    create: function () {
        console.log("Paused");
        var button = this.game.add.button(400, 300,
            'button',this.actionOnClick, this, 2, 1, 0);

        button.anchor.set(0.5);

        var goText = this.game.add.text(400, 100, "Paused");

        var text = this.game.add.text(0, 0, "Continue Playing");
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
        this.game.state.resume('play');
    },

    //Callback del otro botón (punto 8)
    click2: function(){
        //this.game.state.start('preloader');
        this.game.state.start('menu');
    }
};

module.exports = pauseScene;
},{}],5:[function(require,module,exports){
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
function God(x, y, sprite, game){
    Phaser.Sprite.call(this, game, x,y,sprite);
    game.add.existing(this);
    game.physics.arcade.enable(this);
}
God.prototype = Object.create(Phaser.Sprite.prototype);
God.prototype.constructor = God;
God.prototype.checkWin = function(game,Teresa){
    game.physics.arcade.overlap(Teresa, this, function (obj1, obj2) {
        game.state.start('victory');
    });
}
////////////////////////MUFFIN///////////////////////////////
function EcstasyMuffin(game, x, y){
    Phaser.Sprite.call(this, game, x, y ,'muffin');
    game.add.existing(this);
    this.scale.setTo(0.2,0.2);
    game.physics.arcade.enable(this);
}
EcstasyMuffin.prototype = Object.create(Phaser.Sprite.prototype);
EcstasyMuffin.prototype.constructor = EcstasyMuffin;
EcstasyMuffin.prototype.checkTeresa = function(game,Teresa){
    var tolo = false;
    game.physics.arcade.overlap(Teresa, this, function (obj1, obj2){
        obj2.destroy();
        tolo = true;
    });
    return tolo;
}

////////////////////////TERESA///////////////////////////////
function Teresa (game, x, y){
    Phaser.Sprite.call(this, game, x,y,'Teresa');
    game.add.existing(this);

    //Variables del player
    this._speed = 250, //velocidad del player
    this._jumpSpeed = 400, //velocidad de salto
    this._jumpHight = 0, //Tiempo de salto.
    this._playerState = PlayerState.STOP, //estado del player
    this._direction = Direction.NONE,  //dirección inicial del player. NONE es ninguna dirección.
    this._lanzamiento = false,//controla el lanzamiento de la cruz
    this.firstjump =true;
    /////Estado ecstasy
    this.ecstasy = false;
/*
    //Añade las animaciones
    this.animations.add('run',
        Phaser.Animation.generateFrameNames('rush_run',1,5,'',2),10,true);
    this.animations.add('stop',
        Phaser.Animation.generateFrameNames('rush_idle',1,1,'',2),0,false);
    this.animations.add('jump',
        Phaser.Animation.generateFrameNames('rush_jump',2,2,'',2),0,false);*/
}

Teresa.prototype = Object.create(Phaser.Sprite.prototype);
Teresa.prototype.constructor = Teresa;
Teresa.prototype.transitionFrames = function(collisionWithTilemap,movement, game){
    switch(this._playerState)
        {
            case PlayerState.STOP:
            case PlayerState.RUN:
                this.firstjump = true;
                if(this.isJumping(collisionWithTilemap, game)){
                    this._playerState = PlayerState.JUMP;
                    this._initialJumpHeight = this.y;
                    //this.animations.play('run');
                }
                else{
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                       // this.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        //this.animations.play('stop');
                    }
                }    
                break;
                
            case PlayerState.JUMP:
                
                if(this.firstjump){
                    this._jumpHight = game.time.now+500;
                    this.firstjump = false;
                }
                var currentJumpHeight = this.y - this._initialJumpHeight;

                this._playerState = (game.time.now < this._jumpHight && !this.body.touching.down && !this.body.touching.up)
                    ? PlayerState.JUMP : PlayerState.FALLING;
                break;
                
            case PlayerState.FALLING:
                if(this.isStanding()){
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                       // this.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                       // this.animations.play('stop');
                    }
                }
                break;     
        }
        if(this._playerState !== PlayerState.JUMP && !this.isStanding())
            this._playerState = PlayerState.FALLING;
}
Teresa.prototype.statesManag = function(movement,moveDirection){
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
                if(this.scale.x < 0)
                    this.scale.x *= -1;
            }
            else if(movement === Direction.LEFT){
                moveDirection.x = -this._speed;
                if(this.scale.x > 0)
                    this.scale.x *= -1; 
            }
            if(this._playerState === PlayerState.JUMP)
                moveDirection.y = -this._jumpSpeed;
            else if(this._playerState === PlayerState.FALLING)
                moveDirection.y = this._jumpSpeed;//0;
            break;    
    };
}
Teresa.prototype.isStanding = function(){
    return this.body.blocked.down || this.body.touching.down;
}
        
Teresa.prototype.isJumping = function(collisionWithTilemap,game){
    return this.canJump(collisionWithTilemap) && 
        game.input.keyboard.isDown(Phaser.Keyboard.UP);
}
Teresa.prototype.canJump = function(collisionWithTilemap){
    return this.isStanding() && collisionWithTilemap; //|| this._jamping; //ESTO PUEDE SERVIR PARA ALGO
}

Teresa.prototype.onPlayerFell = function(game){
    //TODO 6 Carga de 'gameOver';
    game.state.start('gameOver');
}

Teresa.prototype.checkPlayerDmg = function(collisionWithEnemy, game){
    if(game.physics.arcade.collide(this, this.death) || collisionWithEnemy){
        this._lanzamiento = false;
        this.onPlayerFell(game);
        this._playerState = PlayerState.STOP;
    }
}
//MOVE PLAYER
Teresa.prototype.movement = function(point, xMin, xMax){
    this.body.velocity = point;// * this.game.time.elapseTime;
    if((this.x < xMin && point.x < 0)|| (this.x > xMax && point.x > 0))
        this.body.velocity.x = 0;

}
Teresa.prototype.ecstasyExplosion = function(enemies){
    var self = this;
    if (this.ecstasy === true){
        enemies.forEach(function (aux){
            //Lo podemos hacer circular, que mola más
            if (aux.x < self.x + 300 && aux.y < self.y + 300)
                aux.kill();
        });
        this.ecstasy =false;//ecstasy = false;
    }
}

///////////////////////ENEMIGO//////////////////////////////
function Enemy(x, y, sprite, game, dist){
    Phaser.Sprite.call(this, game, x,y,sprite);
    game.add.existing(this);


    //Posición inicial necesaria para el movimiento
    this.initialPos = this.x;
    this.speed = 150;
    //Escalado guarro para las pruebas
    this.scale.setTo(0.1,0.1);
    game.physics.arcade.enable(this);
    this.body.velocity.x = -this.speed;
    this.body.gravity.y = 30;
    this.body.collideWorldBounds = true;

    var time = 4000;
    this.EnemyTween= game.add.tween(this).to({
        x:x + dist
    }, 2000,Phaser.Linear,true, 1,100,true);
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;
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
    Phaser.Sprite.call(this, game, x, y, 'enemy');
    this.anchor.setTo(0.5);
    this.name = 'EnemyBird_'+index.toString();

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
    this.body.collideWorldBounds = true;
    this.body.allowGravity =false;

    this.scale.setTo(0.1,0.1);
    var time = 4000;
    this.birdTween= game.add.tween(this).to({
        x:this.x + 120
    }, time*0.9,Phaser.Easing.Sinusoidal.InOut, true, 1,100,true);
}
EnemyBird.prototype = Object.create(Phaser.Sprite.prototype);
EnemyBird.prototype.constructor = EnemyBird;
EnemyBird.prototype.collisionCross = function(game,cross){
    game.physics.arcade.overlap(cross, this, function (obj1, obj2) {
        obj2.kill();
        obj1.kill();
    });
}

////////////////TRIGGER DEL SUELO DEL INFIERNO//////////
function HellTrigger(game, y){
    Phaser.Sprite.call(this, game, 1200, y, 'muffin');
    this.anchor.setTo(0.5);
    //this.scale.setTo(0.5);
    game.add.existing(this);
    game.physics.arcade.enable(this);
    this.renderable = false;
}
HellTrigger.prototype = Object.create(Phaser.Sprite.prototype);
HellTrigger.prototype.constructor = HellTrigger;
HellTrigger.prototype.checkColision = function(game,Teresa){
    var col = false;
    game.physics.arcade.overlap(Teresa, this, function (obj1, obj2) {
        obj2.kill();
        col = true;
    });
    return col;
}

////////////////SUELO DEL INFIERNO//////////////////////
function HellFloor(game,y, god){
    Phaser.Sprite.call(this, game, game.world.centerX, y, 'lava');
    game.add.existing(this);
    game.physics.arcade.enable(this);
    //this.anchor.setTo(0.5);
    this.scale.setTo(1,1);

    var time = 4000;
    this.HellFloorTween= game.add.tween(this).to({
        y:god
    }, 60000,Phaser.Linear,true, 1,100,false);
}
HellFloor.prototype = Object.create(Phaser.Sprite.prototype);
HellFloor.prototype.constructor = HellFloor;
HellFloor.prototype.checkTeresa = function(game,Teresa){
    game.physics.arcade.overlap(Teresa, this, function (obj1, obj2) {
        game.state.start('gameOver');
    });
}

/////////BOTON 
function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function actionOnClick () {
    background.visible =! background.visible;
}
/////////////////PLAY SCENE///////////////////////
var PlayScene = {
    _Teresa: {}, //player
    _enemy2:{},
    enemies:{},
    menu:{},
    pausestate: false,
    god:{},
    hellFloor:{},
    FloorIsHere:false,

    create: function () {

        ///PAUSA
        var Esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        Esc.onDown.add(this.unpause, this);

        var button = this.game.add.button(this.game.world.centerX, 400, 'enemy', actionOnClick, this, 2, 1, 0);

        button.onInputOver.add(over, this);
        button.onInputOut.add(out, this);
        button.onInputUp.add(up, this);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        var tile = 48;//Para situar enemigos y muffins

        //Map
        this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('patrones','tiles');
        //Creacion de las LAYERS
        this.backgroundLayer = this.map.createLayer('BackgroundLayer');
        this.groundLayer = this.map.createLayer('GroundLayer');

        //Plano de MUERTE
        this.death = this.map.createLayer('Death');

        //Colisiones con el plano de muerte y con el plano de muerte y con suelo.
        this.map.setCollisionBetween(1, 5000, true, 'Death');
        this.map.setCollisionBetween(1, 5000, true, 'GroundLayer');
        this.death.visible = false;
          
        //Cambia la escala a x3.
        this.groundLayer.setScale(3,3);
        this.backgroundLayer.setScale(3,3);
        this.death.setScale(3,3);
         
        this.groundLayer.resizeWorld(); //resize world and adjust to the screen
          
        //nombre de la animación, frames, framerate, isloop

        //Creamos al player con un sprite por defecto.
        this._Teresa = new Teresa (this.game, 100, 2928);

        //Posteriormente haremos que cambie el fondo si se ha comido la magdalena
        //this._Muffin1 = new EcstasyMuffin(this.game, 42*tile, 2928);
        this._Muffin = new EcstasyMuffin(this.game, 44*tile+20, 1670);
        //this._Muffin3 = new EcstasyMuffin(this.game, 37*tile, 800);

        //Creo la cruz de Santa Teresa
        this.cross = new CelestialCross(this._Teresa,'cross',this.game);

        ///Dios
        this.god = new God(1620, 200, 'God',this.game);
        this.god.scale.setTo(0.25);

        //Trigger del HellFloor
        this.hellFloorTrigger = new HellTrigger(this.game,2880,this.god.y);
  
        //Introduzco a los enemigos
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        
        //Introduzco los enemigos voladores
        this.enemies.add(new EnemyBird(0, this.game, 16*tile, 2840));//
        this.enemies.add(new EnemyBird(0, this.game, 27*tile, 2840));// Primer demonio castillo
        this.enemies.add(new EnemyBird(0, this.game, 31*tile, 2150));// Piso 2 izquierda
        this.enemies.add(new EnemyBird(0, this.game, 36*tile, 2340));// 2
        this.enemies.add(new EnemyBird(0, this.game, 38*tile, 1680));// 2
        this.enemies.add(new EnemyBird(0, this.game, 34*tile, 1680));// Piso 3
        this.enemies.add(new EnemyBird(0, this.game, 27*tile, 1300));// 3
        this.enemies.add(new EnemyBird(0, this.game, 41*tile, 900));// 3
        this.enemies.add(new EnemyBird(0, this.game, 35*tile, 800));
        this.enemies.add(new EnemyBird(0, this.game, 30*tile, 700));// 
        //Introduzco a los enemigos terrestres
        this.enemies.add(new Enemy(6*tile, 2928, 'enemy', this.game,200));
        this.enemies.add(new Enemy(11*tile, 2928, 'enemy', this.game,150));
        this.enemies.add(new Enemy(14*tile, 2928, 'enemy', this.game,180));
        this.enemies.add(new Enemy(20*tile, 2928, 'enemy', this.game,50));
        this.enemies.add(new Enemy(24*tile, 2928, 'enemy', this.game,100));
        this.enemies.add(new Enemy(28*tile, 2928, 'enemy', this.game,150));
        this.enemies.add(new Enemy(34*tile, 2928, 'enemy', this.game,50));
        //this.enemies.add(new Enemy(6*tile, 2928, 'enemy', this.game,60));
        this.enemies.add(new Enemy(42*tile, 2300, 'enemy', this.game,120));
        this.enemies.add(new Enemy(29*tile, 2000, 'enemy', this.game,80));
        this.enemies.add(new Enemy(30*tile, 2300, 'enemy', this.game,80));//Piso 1 plataforma 3
        this.enemies.add(new Enemy(36*tile, 1950, 'enemy', this.game,200));
        this.enemies.add(new Enemy(40*tile, 1950, 'enemy', this.game,150));
        this.enemies.add(new Enemy(31*tile, 1800, 'enemy', this.game,180));
        this.enemies.add(new Enemy(35*tile, 1800, 'enemy', this.game,150));//
        this.enemies.add(new Enemy(28*tile, 1200, 'enemy', this.game,60));//
        this.enemies.add(new Enemy(34*tile, 850, 'enemy', this.game,60));//
        this.enemies.add(new Enemy(40*tile, 800, 'enemy', this.game,60));//
        this.enemies.add(new Enemy(43*tile, 700, 'enemy', this.game,150));//
        this.enemies.add(new Enemy(26*tile, 700, 'enemy', this.game,200));//
        this.enemies.add(new Enemy(28*tile, 700, 'enemy', this.game,100));//

        this.configure();
    },

    //IS called one per frame.
    update: function () {
        this.GetInput();
        
        var moveDirection = new Phaser.Point(0, 0);
        var collisionWithTilemap = this.game.physics.arcade.collide(this._Teresa, this.groundLayer);
        var enemyStanding = this.game.physics.arcade.collide(this.enemies, this.groundLayer);
        var collisionWithEnemy = this.game.physics.arcade.collide(this._Teresa, this.enemies);
        //var collisionWithTRigger = this.game.physics.arcade.collide(this._Teresa, this.hellFloorTrigger);
        ///NO UTILIZADO AUN
        //var collisionWithEnemyBird = this.game.physics.arcade.collide(this._Teresa, enemy1);
        
       

        var movement = this.GetMovement();

        this._Teresa.transitionFrames(collisionWithTilemap, movement, this.game);
        this._Teresa.statesManag(movement,moveDirection);
        var launch; 


        ///////////CROSS LAUNCH/////////////////
        if(this.launches() && !this._Teresa._lanzamiento){
            this._Teresa._lanzamiento = true;
            this.cross.setDirection(this._Teresa);
        }
        if(this._Teresa._lanzamiento && this.cross.move(this._Teresa))
            this._Teresa._lanzamiento = false;
        
        ///////////SI SE LANZA SE MIRA SI COLISIONA CON ENEMIGOS
        if(this._Teresa._lanzamiento){        
            this.enemies.forEach( function(enemy) {
                enemy.collisionCross(this.game, this.cross);
            },this);
        }

        ////////////////////////////////////////
        if(this._Muffin.checkTeresa(this.game,this._Teresa)){
            this._Teresa.ecstasy = true;
        }

        ////////////MOVEMENT PLAYER////////////
        this._Teresa.movement(moveDirection,50,
            this.backgroundLayer.layer.widthInPixels*this.backgroundLayer.scale.x - 10);

        ////////COLISION/////

        this._Muffin.checkTeresa(this.game,this._Teresa);
        this._Teresa.checkPlayerDmg(collisionWithEnemy,this.game);
        this.god.checkWin(this.game,this._Teresa);
        if (this.hellFloorTrigger.checkColision(this.game, this._Teresa)){
            this.hellFloor = new HellFloor(this.game,3200, this.god.y);
            this.FloorIsHere = true;
        }
        if(this.FloorIsHere)
            this.hellFloor.checkTeresa(this.game, this._Teresa);
        
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

        else if(this.game.input.keyboard.isDown(Phaser.Keyboard.E) && this._Teresa.ecstasy){
            this._Teresa.ecstasyExplosion(this.enemies);

        }

    },

    //CONFIGURE THE SCENE
    configure: function(){

        this.game.world.setBounds(0, 0, 2300, 3020);
        //this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#a920ff';
        this.game.physics.arcade.enable(this._Teresa,this._enemy2);
        
        this._Teresa.body.bounce.y = 0;
        //Creo que deberíamos quitar la gravedad y controlarlo nosotros
        this._Teresa.body.gravity.y = 250;
        this._Teresa.body.gravity.x = 0;
        //Este creo que no es necesario
        this._Teresa.body.velocity.x = 0;
        this._Teresa.scale.setTo(1.5,1);

        this.game.camera.follow(this._Teresa);
    },
    //DESTRUYE LOS RECURSOS
    destroy: function(){
        this.tilemap.destroy();
        this.tiles.destroy();
        this.game.world.setBounds(0,0,800,600);
    },

    pause: function(){
        this.menu = new menu(this.game);
        
        //this.game.StateManager.add('juegocomenzado', this, false);
       // this.game.StateManager.add('pause', pauseScene, true);
        this.game.paused = true;


        //this.game.state.start('pause');

    },

    unpause: function (event){
        // Only act if paused
        if(this.game.paused){
            // Unpause the game
            this.game.paused = false;
            this.menu.destroy();
        }
    }

};

function menu(game){

    //////CREO EL MENU
    /*this.button = game.add.button(game.camera.x + 400, game.camera.y + 300,
        'button', actionOnClick, this, 2, 1, 0);*/
    this.button = game.add.sprite(game.camera.x + 400, game.camera.y + 300, 'buttonNew');
    //Para poder pulsarse en pausa
    this.button.inputEnabled = true;
    game.input.onDown.add(actionOnClick, this);
    //this.button.events.onInputUp.add(actionOnClick, this);
    //this.button.onInputOver.add(actionOnClick,this);

    this.button.anchor.set(0.5);
    this.goText = game.add.text(game.camera.x + 400, game.camera.y + 150, "GameOver");
    this.text = game.add.text(0, 0, "Continue");
    this.text.anchor.set(0.5);
    this.goText.anchor.set(0.5);
    this.button.addChild(this.text);
    
    //TODO 8 crear un boton con el texto 'Return Main Menu' que nos devuelva al menu del juego.
    /*this.button2 = game.add.button(game.camera.x + 400, game.camera.y + 400, 
        'button',this.click2, this, 2, 1, 0);*/
    this.button2 = game.add.sprite(game.camera.x + 400, game.camera.y + 500, 'buttonNew');
    this.button2.anchor.set(0.5);
    this.text2 = game.add.text(0, 0, "Return Menu");
    this.text2.anchor.set(0.5);
    this.button2.addChild(this.text2);

    function actionOnClick(event){
        if(this.button.getBounds().contains(event.x,event.y)){
            game.paused = false;
            this.destroy();
        }
        else if(this.button2.getBounds().contains(event.x,event.y)){
            game.paused = false;
            game.state.start('menu');
        }
    }
}
menu.prototype.destroy = function(){
    this.button.kill();
    this.goText.destroy();
    this.text.destroy();
    this.button2.kill();
    this.text2.destroy();
}



module.exports = PlayScene;

},{}],6:[function(require,module,exports){
var victoryScene = {
    create: function () {
        console.log("Victory");
        var button = this.game.add.button(400, 300,
            'button',this.actionOnClick, this, 2, 1, 0);

        button.anchor.set(0.5);

        var goText = this.game.add.text(400, 100, "Victory");

        var text = this.game.add.text(0, 0, "Restart");
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

module.exports = victoryScene;
},{}]},{},[2]);
