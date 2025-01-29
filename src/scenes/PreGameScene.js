import Phaser from 'phaser';
import WebFontLoader from 'webfontloader';
import { COLORS_ARRAY } from '../config/colors';
import ColorSelector from '../utils/ColorSelector';
export default class PreGameScene extends Phaser.Scene {
  constructor() {
    super('PreGameScene');
    this.colorSelector = new ColorSelector(COLORS_ARRAY);
    this.colors = COLORS_ARRAY;
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

    // Add tutorial title
    this.add.text(centerX, centerY - 220, 'HOW TO PLAY', {
      fontSize: '42px',
      fontFamily: 'Exo2-ExtraBold',
      color: '#000000'
    }).setOrigin(0.5);

    // Add instruction text
    this.add.text(centerX, centerY - 140, 'Match the colors shown at the top \n of the screen with circles \n in the grid to score points!', {
      fontSize: '18px',
      fontFamily: 'Tahoma',
      color: '#000000',
      align: 'center'
    }).setOrigin(0.5);

    // Display example target colors
    const barWidth = 175;
    const targetColors = this.getRandomColors(2);
    targetColors.forEach((color, index) => {
      this.add.rectangle(
        centerX - (barWidth/2) + (index * barWidth),
        centerY - 40,
        barWidth - 10,
        20,
        color
      ).setOrigin(0.5);
    });

    // Add example circles
    const circleY = centerY + 60;
    const spacing = 70;
    const startX = centerX - (spacing * 2);
    
    for (let i = 0; i < 5; i++) {
      const x = startX + (i * spacing);
      const circleRadius = 28;
      const ringThickness = 12;
      
      // Create outer circle (ring)
      this.add.circle(x, circleY, circleRadius, this.colors[i]);
      // Create inner circle (light center)
      this.add.circle(x, circleY, circleRadius - ringThickness, 0xf5f5f5);
    }

    // Add start button
    const startButton = this.add.text(centerX, centerY + 160, 'START', {
      fontSize: '32px',
      fontFamily: 'Exo2-ExtraBold',
      color: '#000000',
      backgroundColor: '#ffffff',
      padding: { x: 40, y: 20 }
    }).setOrigin(0.5);

    // Make button interactive
    startButton.setInteractive({ useHandCursor: true });
    
    // Add hover effect
    startButton.on('pointerover', () => {
      startButton.setStyle({ color: '#ffffff', backgroundColor: '#000000' });
    });
    
    startButton.on('pointerout', () => {
      startButton.setStyle({ color: '#000000', backgroundColor: '#ffffff' });
    });

    // Handle click
    startButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }

  getRandomColors(count) {
    return this.colorSelector.getRandomColors(count);
  }
}