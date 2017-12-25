import Phaser from 'phaser';
import TextButton from '../extensions/textbutton';

// The Menu state of the game
export default class MenuState extends Phaser.State {
  constructor() {
		super();
    this.speed = 10;
    this.bg1Speed = 30;
    this.bg;
    this.bg1;
	}

  preload() {
    this.game.load.image('bgSpace','./assets/images/farback.jpg')
    this.game.load.image('bgSpace1','./assets/images/starfield.png')
  }
  create() {
    this.bg = this.game.add.tileSprite(0,0,1920,1080,'bgSpace');
    this.bg1 = this.game.add.tileSprite(0,0,1920,1024,'bgSpace1');
    this.bg.autoScroll(-this.speed,0);
    this.bg1.autoScroll(-this.bg1Speed,0);

    let centerX = this.game.world.centerX;
    let centerY = this.game.world.centerY;

    const style = {
      font: '74px "Roboto"',
      fill: '#fff',
      align: 'center'
    };
    this.title = this.game.add.text((centerX - 250), centerY - 50,'Are you ready?',style);

    this.music = this.game.add.audio('menuMusic');

    this.start = new TextButton({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY + 70,
      asset: 'button',
      overFrame: 1,
      outFrame: 0,
      downFrame: 3,
      upFrame: 1,
      label: 'Start',
      style: {
          font: '16px Roboto',
          fill: 'white',
          align: 'center'
      }
    });

    this.btnOverSound = this.add.sound('jumpMusic');
    this.btnOutSound = this.add.sound('jumpMusic');
    this.btnDownSound = this.add.sound('jumpMusic');

    this.start.setOverSound(this.btnOverSound);
    this.start.setOutSound(this.btnOutSound);
    this.start.setDownSound(this.btnDownSound);

    this.start.onInputUp.add(()=>{
      this.music.stop();
      this.state.start('main'); // Switch to main game state
    });

    this.menuPanel = this.add.group();
    this.menuPanel.add(this.title);
    this.menuPanel.add(this.start);

    this.music.loopFull();

    if(this.game.lives < 0){ //if player died for showing score
      const style = {
        font: '44px "Roboto"',
        fill: '#fff',
        align: 'center'
      };
      this.scoreText = this.game.add.text((centerX - 270), centerY - 100, 'Game Over. Yor Score Is: ' + this.game.lastScore,style);
    }
  }
}
