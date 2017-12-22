export default class Enemy extends Phaser.Sprite {

  constructor({ game, x, y, asset, speed, frame }) {
    super(game, x, y, asset, speed, frame);
    this.game = game;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.asset = asset;
    this.frame = frame;

    this.lastBullet = 0;
    this.lastEnemy = 0;
    this.lastTick = 0;

    this.animations.add('spinning', [0, 1, 2, 3, 4, 5], 20, true);
    this.play('spinning');
  }

  update() {
    this.body.velocity.x = -this.speed;
    this.outOfBoundsKill = true;
    this.checkWorldBounds = true;
  }
}

