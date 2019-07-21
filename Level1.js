class Level1 extends Phaser.Scene{
    constructor(){
        super({ key: "Level1"})
    }
    preload(){
        this.load.image('bg-cave', './Assets/back_cave.png');
        this.load.spritesheet('jug','./Assets/jug.png', {frameWidth: 63, frameHeight: 45});
        this.load.image('platform', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/Codey+Tundra/platform.png');
        this.load.spritesheet('concus','./Assets/concus.png',{frameWidth: 63/3, frameHeight: 34/3});
    }

    create(){
        // gameState.active = true
        // gameState.bg1 = this.add.image(0, 0, 'bg-cave').setOrigin(0,0).setDisplaySize(800,600);
        gameState.platforms = this.physics.add.staticGroup();
        gameState.platforms.create(110,300,'platform');
        gameState.platforms.create(360,300,'platform');
        gameState.player = this.physics.add.sprite(225, 110,'jug');
        gameState.player.setBounce(0.2)
        
        this.createAnimations();
        // this.bulGen();
        this.physics.add.collider(gameState.player, gameState.platforms);
        
        gameState.player.setCollideWorldBounds(true);
        gameState.cursors = this.input.keyboard.createCursorKeys();
        // const bulGen = ()=>{
        //     gameState.bullet = this.physics.add.sprite(100,200,'concus');
        //     gameState.bullet.setPosition(gameState.player.x,gameState.player.y)
        //     this.physics.add.collider(gameState.bullet, gameState.platforms);
        //     // gameState.bullet.visible = false;
            
        //     // this.physics.add.collider(gameState.player, gameState.bullet);
        // }
    
        // const bulGenLoop = this.time.addEvent({
        //   delay: 100,
        //   callback: this.bulGen,
        //   callbackScope: this,
        //   loop: false,
        // });
    }

    update() {  
          if (gameState.cursors.right.isDown) 
          {
            gameState.player.flipX = false;
            gameState.player.setVelocityX(gameState.speed);
            gameState.player.anims.play('walk', true);
          } 
          else if (gameState.cursors.left.isDown) 
          {
            gameState.player.flipX = true;
            gameState.player.setVelocityX(-gameState.speed);
            gameState.player.anims.play('walk', true);
          } 
          else if (gameState.cursors.shift.isDown)
          {
            if(gameState.player.flipX === true){
              gameState.player.setVelocityX(0);
              this.bulGen();
              // this.bulGenLoop;
              gameState.player.anims.play('fire', true);
              // gameState.bullet.visible = true;
              gameState.bullet.anims.play('bullet', true);
              gameState.bullet.setVelocityX(-300);
            }
            else{
              gameState.player.setVelocityX(0);
              this.bulGen();
              // this.bulGenLoop;
              gameState.player.anims.play('fire', true);
              // gameState.bullet.visible = true;
              gameState.bullet.setVelocityX(300);
              gameState.bullet.anims.play('bullet', true);
            }
          }
          // else if (gameState.cursors.space.isDown)
          // {
          //   gameState.player.setVelocityY(-100); 
          // }
          else 
          {
            gameState.player.setVelocityX(0);
            gameState.player.anims.play('idle', true);
          }
      }

      bulGen(){
        gameState.bullet = this.physics.add.sprite(100,200,'concus').setPosition(gameState.player.x,gameState.player.y);
        gameState.bullet.visible = false;
        this.physics.add.collider(gameState.bullet, gameState.platforms);
        // this.time.addEvent({
        //   delay: 100,
        //   callback: bulGen,
        //   callbackScope: this,
        //   loop: false,
        // });
      }
      


    createAnimations() {
        this.anims.create({
          key: 'walk',
          frames: this.anims.generateFrameNumbers('jug', { start: 13, end: 23 }),
          frameRate: 10,
          repeat: -1
        });
        this.anims.create({
          key: 'idle',
          frames: this.anims.generateFrameNumbers('jug', { start: 8, end: 10 }),
          frameRate: 10,
          repeat: -1
        });
        this.anims.create({
          key: 'jump',
          frames: this.anims.generateFrameNumbers('jug', { start: 2, end: 3 }),
          frameRate: 10,
          repeat: -1
        })
        this.anims.create({
            key: 'fire',
            frames: this.anims.generateFrameNumbers('jug', { start: 1, end: 10 }),
            frameRate: 10,
            repeat: -1
          })
        this.anims.create({
          key: 'bullet',
          frames: this.anims.generateFrameNumbers('concus', { start: 0, end: 5 }),
          frameRate: 1,
          repeat: -1
        })
      }

}

