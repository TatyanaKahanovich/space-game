import Phaser from 'phaser';

// The state for loading core resources for the game
export default class PreloaderState extends Phaser.State {
  preload() {
    console.debug('Assets loading started');

    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    this.loaderBg.anchor.setTo(0.5);
    this.loaderBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.loaderBar);

    this.game.add.text(this.world.centerX - 70, this.world.centerY - 100, 'Game is loading...', {
      font: '16px Arial',
      fill: '#fff'
    });

    this.game.load.image('bullet', './assets/images/bullet.png');
    this.game.load.image('bgSpace', './assets/images/farback.jpg');
    this.game.load.image('bgSpace1', './assets/images/starfield.png');
    this.game.load.image('bgSpace2', './assets/images/starfield1.png');
    this.game.load.spritesheet('button', './assets/images/button1.png', 152, 30);
    this.game.load.spritesheet('ship', './assets/images/ship.png', 64, 29);
    this.game.load.spritesheet('enemyship1', './assets/images/enemy.png', 40, 30);
    this.game.load.spritesheet('enemyship2', './assets/images/enemy1.png', 40, 30);
    this.game.load.spritesheet('enemyship3', './assets/images/enemy2.png', 40, 30);
    this.game.load.spritesheet('enemyship4', './assets/images/enemy3.png', 40, 30);
    this.game.load.spritesheet('enemyship5', './assets/images/enemy4.png', 40, 30);
    this.game.load.spritesheet('hole', './assets/images/hole.png', 40, 40);
    this.game.load.spritesheet('barrel', './assets/images/barrel.png', 25, 40);
    this.game.load.spritesheet('explosion', './assets/images/explode.png', 128, 128);

    this.game.load.audio('spaceMusic', './assets/audio/space.mp3');
    this.game.load.audio('blasterMusic', './assets/audio/blaster.mp3');
    this.game.load.audio('explosionMusic', './assets/audio/explosion.mp3');
    this.game.load.audio('barrelMusic', './assets/audio/barrelSound.mp3');
    this.game.load.audio('jumpMusic', './assets/audio/jump.mp3');
    this.game.load.audio('menuMusic', './assets/audio/menu.mp3'); //load all images, sprites and music
  }

  create() {
    console.debug('Assets loading completed');
    this.game.state.start('menu'); // Switch to menu state
  }
}
