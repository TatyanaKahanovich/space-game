export default class Player extends Phaser.Sprite {

  constructor({ game, x, y, asset, frame, speed }) {
    super(game, x, y, asset, frame, speed);
    this.game = game;
    this.frame = frame;
    this.speed = speed;
    this.animations.add('move');
    this.animations.play('move',20,true);
    this.game.physics.arcade.enable(this);

    this.lastTick = 0;
  }

  update() {
    this.body.velocity.setTo(0, 0);
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.A) && this.x > 0){
      this.body.velocity.x = -2 * this.speed;
    }
    else if(this.game.input.keyboard.isDown(Phaser.Keyboard.D) && this.x < (this.game.width - this.width)){
      this.body.velocity.x = this.speed;
    }
    else if(this.game.input.keyboard.isDown(Phaser.Keyboard.W) && this.y > 0){
      this.body.velocity.y = -this.speed;
    }
    else if(this.game.input.keyboard.isDown(Phaser.Keyboard.S) && this.y < (this.game.height-this.height)){
      this.body.velocity.y = +this.speed;
    }

    const currentTime = this.game.time.now;
    if(currentTime - this.lastTick > 10000 && this.game.score > 100){
      if(this.game.speed < 500){
        this.speed *= 1.1;
        this.lastTick = currentTime;
      }
    }
  }
}

