import Phaser from 'phaser';

// The first (boot) state of the game
export default class BootState extends Phaser.State {
  preload() {
        this.game.stage.backgroundColor = '#000';
        this.load.image('loaderBg', 'img/loader-bg.png'); //preload images for preloader
        this.load.image('loaderBar', 'img/loader-bar.png');
  }
  create() {
    this.game.state.start('preloader'); // Initialize and start `preloader` state
  }
}
