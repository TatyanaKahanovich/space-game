import Phaser from 'phaser';

import Player from '../models/player';
import Enemy from '../models/enemy';

// The main state of the game
export default class MainState extends Phaser.State {
  constructor(game) {
		super(game);
    this.game = game;
    this.width = window.innerWidth;
    this.height = 570;
    this.lastBullet = 0;
    this.lastEnemy = 0;
    this.lastTick = 0;
    this.speed = 120;
    this.bg1Speed = 30;
    this.bg2Speed =40;
    this.bg3Speed =50;
    this.enemySpeed = 150;
    this.holeSpeed = 150;
    this.barrelSpeed = 200;
    this.bulletSpeed = 300;
	}

create() {
    this.game.lives = 3;
    this.game.score = 0;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.bg = this.game.add.tileSprite(0,0,1920,1080,'bgSpace');
    this.bg.autoScroll(-this.bg1Speed,0);

    this.bg1 = this.game.add.tileSprite(0,0,1600,800,'bgSpace1');
    this.bg1.autoScroll(-this.bg2Speed,0);

    this.bg2 = this.game.add.tileSprite(0,0,1600,701,'bgSpace1');
    this.bg2.autoScroll(-this.bg3Speed,0);

    this.player = new Player({
      game: this.game,
      x: 0,
      y: this.game.world.centerY,
      leaves: 3,
      asset: 'ship',
      frame: 20,
      speed: 120
    });
    this.game.stage.addChild(this.player);

    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(10,'bullet');
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);

    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    this.game.stage.addChild(this.enemies);

    this.holes = this.game.add.group();
    this.holes.enableBody = true;
    this.holes.physicsBodyType = Phaser.Physics.ARCADE;
    this.game.stage.addChild(this.enemies);

    this.barrels = this.game.add.group();
    this.barrels.enableBody = true;
    this.barrels.physicsBodyType = Phaser.Physics.ARCADE;

    this.explosions = this.game.add.group();
    this.explosions.enableBody = true;
    this.explosions.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosions.createMultiple(30,'explosion');
    this.explosions.setAll('anchor.x', 0.5);
    this.explosions.setAll('anchor.y', 0.5);
    this.explosions.forEach( function(explosion) {
      explosion.animations.add('explosion');
    });

    const style = { font: '28px "Comic Sans MS Regular"', fill: '#b735b2', align: 'left'};
    this.scoreText = this.game.add.text(15, 15, 'Score : ' + this.game.score,style);
    this.livesText = this.game.add.text(this.width - 130, (15), 'Lives : ' + this.game.lives,style);

    this.music = this.game.add.audio('spaceMusic');
    this.music.loopFull();

    this.blasterMusic = this.game.add.audio('blasterMusic');
    this.explosionMusic = this.game.add.audio('explosionMusic');
    this.barrelMusic = this.game.add.audio('barrelMusic');
    this.jumpMusic = this.game.add.audio('jumpMusic');
  }
  update() {
    const currentTime = this.game.time.now;

    if(this.game.input.keyboard.isDown(Phaser.Keyboard.S)){
      if(currentTime - this.lastBullet > 300){
        this.fireBullet();
        this.lastBullet = currentTime;
      }
    }

    if(currentTime - this.lastEnemy > 1000){
      this.generateEnemy({
        game: this.game,
        x: this.game.width,
        y: (Math.floor(Math.random()*(this.height-30))),
        asset: 'enemyship1',
        speed: 150,
        frame: 20
      });

      this.generateHole({
        game: this.game,
        x: this.game.width,
        y: (Math.floor(Math.random()*(this.height-30))),
        asset: 'hole',
        speed: 150,
        frame: 20
      });
      this.lastEnemy = currentTime;

      if(this.game.score > 150){
        this.generateEnemy({
          game: this.game,
          x: this.game.width,
          y: (Math.floor(Math.random()*(this.height-30))),
          asset: 'enemyship2',
          speed: 150,
          frame: 20
        });
      }

      if(this.game.score > 250){
        this.generateEnemy({
          game: this.game,
          x: this.game.width,
          y: (Math.floor(Math.random()*(this.height-30))),
          asset: 'enemyship3',
          speed: 150,
          frame: 20
        });
      }

      if(this.game.score > 350){
        this.generateEnemy({
          game: this.game,
          x: this.game.width,
          y: (Math.floor(Math.random()*(this.height-30))),
          asset: 'enemyship4',
          speed: 150,
          frame: 20
        });
      }

      if(this.game.score > 350){
        this.generateEnemy({
          game: this.game,
          x: this.game.width,
          y: (Math.floor(Math.random()*(this.height-30))),
          asset: 'enemyship5',
          speed: 150,
          frame: 20
        });
      }
    }

    if(currentTime - this.lastTick > 10000 && this.score > 100){
      if(this.speed < 500){
        this.speed *= 1.05;
        this.enemySpeed *= 1.05;
        this.holeSpeed *= 1.05;
        this.bulletSpeed *= 1.05;
        this.barrelSpeed *= 1.1;
        this.bg.autoScroll(-this.bg1Speed, 0);
        this.bg1.autoScroll(-this.bg2Speed, 0);
        this.bg2.autoScroll(-this.bg3Speed, 0);
        this.lastTick = currentTime;
      }
    }

    this.game.physics.arcade.overlap(this.enemies, this.player, this.enemyHitPlayer, null, this);
    this.game.physics.arcade.overlap(this.player, this.bullets, this.bulletHitPlayer, null, this);
    this.game.physics.arcade.overlap(this.holes, this.player, this.playerHitHole,null, this);
    this.game.physics.arcade.overlap(this.enemies, this.bullets, this.enemyHitBullet, null, this);
    this.game.physics.arcade.overlap(this.player, this.barrels, this.playerHitBarrel, null, this);
    this.game.physics.arcade.overlap(this.bullets, this.barrels, this.bulletHitBarrel, null, this);
  }

  fireBullet(currentTime) {
    let bullet = this.bullets.getFirstExists(false);
    if(bullet){
      bullet.reset(this.player.x+this.player.width,this.player.y+this.player.height/2);
      bullet.body.velocity.x = this.bulletSpeed;
    }
    this.blasterMusic.play();
  }

  generateEnemy(data) {
    let enemy = this.enemies.getFirstExists(false);
    let barrel = this.barrels.getFirstExists(false);
    if (enemy) {
      enemy.reset(data);

    } else {
      enemy = new Enemy(data);
      this.enemies.add(enemy);
    }

    if(barrel){
      barrel.reset(this.width,Math.floor(Math.random()*(this.height-40)),'barrel');
    }
    else {
      barrel = this.barrels.create(this.width,Math.floor(Math.random()*(this.height-40)), 'barrel');
    }

    barrel.body.velocity.x = -this.barrelSpeed;
    barrel.outOfBoundsKill = true;
    barrel.checkWorldBounds = true;
    barrel.animations.add('move');
    barrel.animations.play('move', 6, true);
  }

  generateHole(data) {
    let hole = this.holes.getFirstExists(false);
    if (hole) {
      hole.reset(data);

    } else {
      hole = new Enemy(data);
      this.holes.add(hole);
    }
  }

  hitExplosion(enemy) {
    let explosion = this.explosions.getFirstExists(false);
    explosion.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
    explosion.body.velocity.y = enemy.body.velocity.y;
    explosion.alpha = 0.7;
    explosion.play('explosion', 30, false, true);
    this.explosionMusic.play();
  }

  enemyHitPlayer(player, enemy) {
    this.hitExplosion(enemy);
    enemy.kill();
    this.subLife(player);
  }

  bulletHitPlayer(player, bullet) {
    this.hitExplosion(bullet);
    this.subLife(player);
  }

  enemyHitBullet(bullet, enemy) {
    this.hitExplosion(enemy);
    enemy.kill();
    bullet.kill();
    this.addScore();
  }

  playerHitBarrel(player, barrel) {
    barrel.kill();
    this.addScore();
    this.barrelMusic.play();
  }

  playerHitHole(player, hole) {
    let rand = 1 + Math.floor(Math.random()*(this.holes.children.length-1));
    let newPosition = this.holes.children[rand].position;
    this.player.position.x = newPosition.x + 40;
    this.player.position.y = newPosition.y;
    this.jumpMusic.play();
  }

  bulletHitBarrel(bullet, barrel) {
    this.hitExplosion(barrel);
    barrel.kill();
    bullet.kill();
  }

  checkIsAlive(player) {
    if(this.game.lives < 0){
      this.music.stop();
      player.kill();
      this.enemies.callAll('kill');
      this.game.state.start('menu');
    }
  }

  addScore() {
    this.game.score += 10;
    this.game.lastScore = this.game.score;
    this.scoreText.setText('Score : '+ this.game.score);
  }

  subLife(player) {
    this.game.lives -= 1;
    this.game.lastLives  = this.lives;
    this.livesText.setText('Lives : '+ this.game.lives);
    this.checkIsAlive(player);
  }
}
