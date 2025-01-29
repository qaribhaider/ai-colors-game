import Phaser from 'phaser';
import WebFontLoader from 'webfontloader';
import { COLORS_ARRAY } from '../config/colors';
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
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
    
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Create game logo
    const color = '#' + COLORS_ARRAY[Phaser.Math.Between(0, COLORS_ARRAY.length - 1)].toString(16).padStart(6, '0');
    this.add.text(centerX, centerY - 80, 'COLORS', {
      fontSize: '64px',
      fontFamily: 'Exo2-ExtraBold',
      color: color,
      stroke: '#000000',
      strokeThickness: 5
    }).setOrigin(0.5);

    // Add tagline
    this.add.text(centerX, centerY, 'Fast, Fun, Addictive Game', {
      fontSize: '24px',
      fontFamily: 'Exo2-ExtraBold',
      color: '#000000'
    }).setOrigin(0.5);

    // Add play button
    const playButton = this.add.text(centerX, centerY + 100, 'PLAY', {
      fontSize: '32px',
      fontFamily: 'Exo2-ExtraBold',
      color: '#000000',
      backgroundColor: '#ffffff',
      padding: { x: 40, y: 20 },
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);

    // Make button interactive
    playButton.setInteractive({ useHandCursor: true });
    
    // Add hover effect
    playButton.on('pointerover', () => {
      playButton.setStyle({ color: '#ffffff', backgroundColor: '#000000' });
    });
    
    playButton.on('pointerout', () => {
      playButton.setStyle({ color: '#000000', backgroundColor: '#ffffff' });
    });

    // Handle click
    playButton.on('pointerdown', () => {
      this.scene.start('PreGameScene');
    });
  }
}