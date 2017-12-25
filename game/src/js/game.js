import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState        from './states/boot.state';
import PreloaderState   from './states/preloader.state';
import MenuState        from './states/menu.state';
import MainState        from './states/main.state';

class Game extends Phaser.Game {

	constructor() {
		super(window.innerWidth, 550, Phaser.AUTO, 'play');

    this.state.add('boot', BootState, false); // Add `boot` state into game
    this.state.add('preloader', PreloaderState, false); // Add `preloader` state into game
    this.state.add('menu', MenuState, false); // Add `menu` state into game
    this.state.add('main', MainState, false); // Add `main` state into game

    this.state.start('boot'); // Initialize and start `boot` state
  }
}

new Game(); // Initialize the application. It will automatically inject <canvas /> into <body />


window.onkeydown = function(e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault(); // cancel default events for Shift button
  }
};
