import Phaser from 'phaser';
import WebFontLoader from 'webfontloader';
import ScoreManager from '../services/ScoreManager';
export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
    this.scoreManager = new ScoreManager();
  }

  preload() {
    return new Promise((resolve) => {
      WebFontLoader.load({
        custom: {
          families: ['Exo2-ExtraBold']
        },
        active: resolve
      });
    });
  }

  async create() {
    await this.preload();
    
    // Reload scores from storage
    this.scoreManager = new ScoreManager();
    
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Game Over text
    this.add.text(centerX, centerY - 120, 'GAME OVER', {
      fontSize: '48px',
      fontFamily: 'Exo2-ExtraBold',
      color: '#000000',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);

    // Recent Score
    this.add.text(centerX, centerY - 20, `Score: ${this.scoreManager.getRecentScore()}`, {
      fontSize: '32px',
      fontFamily: 'Exo2-ExtraBold',
      color: '#000000'
    }).setOrigin(0.5);

    // Highest Score
    this.add.text(centerX, centerY + 40, `Best: ${this.scoreManager.getHighestScore()}`, {
      fontSize: '32px',
      fontFamily: 'Exo2-ExtraBold',
      color: '#000000'
    }).setOrigin(0.5);

    // Play Again button
    const playAgainButton = this.add.text(centerX, centerY + 120, 'PLAY AGAIN', {
      fontSize: '32px',
      fontFamily: 'Exo2-ExtraBold',
      color: '#000000',
      backgroundColor: '#ffffff',
      padding: { x: 40, y: 20 },
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);

    // Make button interactive
    playAgainButton.setInteractive({ useHandCursor: true });
    
    // Add hover effect
    playAgainButton.on('pointerover', () => {
      playAgainButton.setStyle({ color: '#ffffff', backgroundColor: '#000000' });
    });
    
    playAgainButton.on('pointerout', () => {
      playAgainButton.setStyle({ color: '#000000', backgroundColor: '#ffffff' });
    });

    // Handle click
    playAgainButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}