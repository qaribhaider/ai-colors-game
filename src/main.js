import Phaser from 'phaser';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';
import GameOverScene from './scenes/GameOverScene';
import PreGameScene from './scenes/PreGameScene';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#f5f5f5',
  pixelArt: false,
  antialias: true,
  roundPixels: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 384, // Standard mobile width
    height: 824 // Standard mobile height
  },
  // scene: [TitleScene, PreGameScene, GameScene, GameOverScene]
  scene: [GameOverScene, GameScene, TitleScene, PreGameScene]
};

const game = new Phaser.Game(config);

// Expose game instance for testing
if (window) {
  window.game = game;
}