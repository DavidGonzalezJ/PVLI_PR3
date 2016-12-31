'use strict';

//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3}
var Direction = {'LEFT':0, 'RIGHT':1, 'NONE':3}
//Constructoras de enemigos y objetos
function CelestialCross(character, sprite, game){
    this._sprite = game.add.sprite(character.x, character.y,sprite);
    this._sprite.scale.setTo(0.1,0.1);
    this._sprite.anchor.setTo(0.5, 0.5);
    //hago invisible el sprite
    //this._sprite.visible = false;
    this.character = character;
    game.physics.arcade.enable(this._sprite);
    this.speed = 350;
    this.maxDist = 200;
    this.vuelta = false;
    this.initialPosX = -150; //Igualación fuera de límites
    this.launched = false;
    this.puntoFinal = -150;
    this._sprite.kill();
    this.dir = 'NULL';
    this.limit = false;
}
CelestialCross.prototype.setDirection = function(character){
    if (character.scale.x > 0){
        this._sprite.body.velocity.x = this.speed + character.body.velocity.x;
        this.puntoFinal = character.x + this.maxDist;
        this.dir = 'DERECHA';
    }
    else{
        this._sprite.body.velocity.x = -this.speed + character.body.velocity.x;
        this.puntoFinal = character.x - this.maxDist;
        this.dir = 'IZQUIERDA';
    }
}
CelestialCross.prototype.move = function(character){
    this._sprite.revive();
    if(this.launched === false){
        this._sprite.x = character.x;
        this._sprite.y = character.y-10;
        this.launched = true;
    }
    if(this.dir === 'DERECHA'){
        if(this._sprite.x >= this.puntoFinal) this.vuelta = true;
        if(this.vuelta && !this.limit) {
            this._sprite.body.velocity.x *= -1;
            this.limit = true;
        }
    }
    else if(this.dir === 'IZQUIERDA'){
        if(this._sprite.x <= this.puntoFinal) this.vuelta = true;
        if(this.vuelta && !this.limit) {
            this._sprite.body.velocity.x *= -1;
            this.limit = true;
        }
    }
    if(this.vuelta && this._sprite.x >= character.x-10 && this._sprite.x <= character.x+10){
        this._sprite.kill();
        this.vuelta = false;
        this.initialPosX = -150; 
        this.launched = false;
        this.limit = false;
        return true;
    }
    this._sprite.y = character.y;
    this._sprite.angle += 20;
    return false;
}


function Enemy(x, y, sprite, game){
    this._sprite = game.add.sprite( x, y, sprite);
    //Posición inicial necesaria para el movimiento
    this.initialPos = this._sprite.x;
    this.speed = 150;
    //Escalado guarro para las pruebas
    this._sprite.scale.setTo(0.1,0.1);
    game.physics.arcade.enable(this._sprite);
    this._sprite.body.velocity.x = -this.speed;
    this._sprite.body.gravity.y = 30;
}
Enemy.prototype.move = function(min,max){

    if(this._sprite.x === this.initialPos - min){ //&& this._sprite.x < this.initialPos + max)
        this._sprite.body.velocity.x = this.speed;
        if(this._sprite.scale.x > 0)
            this._sprite.scale.x *= -1; 
    }
    else if(this._sprite.x === this.initialPos + max){
        this._sprite.body.velocity.x = -this.speed;
        if(this._sprite.scale.x < 0)
            this._sprite.scale.x *= -1; 
    }

}
//var enemies;
//Scena de juego.
var PlayScene = {
    _rush: {}, //player
    _enemy2:{},
    _speed: /*300*/250, //velocidad del player
    _jumpSpeed: /*600*/ 400, //velocidad de salto
    _jumpHight: 150, //altura máxima del salto.
    _playerState: PlayerState.STOP, //estado del player
    _direction: Direction.NONE,  //dirección inicial del player. NONE es ninguna dirección.
    _lanzamiento: false,//controla el lanzamiento de la cruz
    //Método constructor...
    create: function () {
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
      this.enemy2 = new Enemy(100,275,'enemy',this.game);
  },
    
    //IS called one per frame.
    update: function () {
        var moveDirection = new Phaser.Point(0, 0);
        var collisionWithTilemap = this.game.physics.arcade.collide(this._rush, this.groundLayer);
        var enemyStanding = this.game.physics.arcade.collide(this.enemy2._sprite, this.groundLayer);
        var collisionWithEnemy = this.game.physics.arcade.collide(this._rush, this.enemy2._sprite);
        var movement = this.GetMovement();
        //transitions
        switch(this._playerState)
        {
            case PlayerState.STOP://CREO QUE LE VENDRIA BIEN TENER LOS IF ELSE DE ABAJO
          /*   if(this.isJumping(collisionWithTilemap)){
                    this._playerState = PlayerState.JUMP;
                    this._initialJumpHeight = this._rush.y;
                    this._rush.animations.play('jump');
                }
                else{
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        this._rush.animations.play('run');
                    }
                }    
                break;*/
            case PlayerState.RUN:
                if(this.isJumping(collisionWithTilemap)){
                    this._playerState = PlayerState.JUMP;
                    this._initialJumpHeight = this._rush.y;
                    this._rush.animations.play('jump');
                }
                /*else if(this._initialJumpHeight < this._rush.y)
                    this._playerState = PlayerState.FALLING;*/
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
        //States
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
        //Lanzamiento de la cruz
        if(this.launches() && !this._lanzamiento){
            this._lanzamiento = true;
            this.cross.setDirection(this._rush);
        }
        if(this._lanzamiento)
            if(this.cross.move(this._rush))
                this._lanzamiento = false;
        //movement
        this.movement(moveDirection,50,
                      this.backgroundLayer.layer.widthInPixels*this.backgroundLayer.scale.x - 10);
        this.enemy2.move(10,300);
        //this._lanzamiento = this.launches();
        
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
        if(this.game.physics.arcade.collide(this._rush, this.death) || collisionWithEnemy)
            this.onPlayerFell();
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
    //configure the scene
    configure: function(){
        //Start the Arcade Physics systems
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
    //move the player
    movement: function(point, xMin, xMax){
        this._rush.body.velocity = point;// * this.game.time.elapseTime;
        
        if((this._rush.x < xMin && point.x < 0)|| (this._rush.x > xMax && point.x > 0))
            this._rush.body.velocity.x = 0;

    },
    
    //TODO 9 destruir los recursos tilemap, tiles y logo.
    destroy: function(){
        this.tilemap.destroy();
        this.tiles.destroy();
        this.game.world.setBounds(0,0,800,600);
    }

};

module.exports = PlayScene;
