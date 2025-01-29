import Phaser from 'phaser';
import WebFontLoader from 'webfontloader';
import { COLORS_ARRAY } from '../config/colors';
import ScoreManager from '../services/ScoreManager';
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.score = 0;
    this.currentTimer = 10000;
    this.initialTimer = 10000;
    this.timerDecrement = 500;
    this.minTimer = 1500;
    this.scorePerClick = 5;
    this.colors = COLORS_ARRAY;
    this.targetColors = [];
    this.circles = [];
    this.elapsedTime = 0;
    this.scoreManager = new ScoreManager();
    this.errorHandlingEnabled = true;
  }

  handleError(error) {
    console.error('Game Error:', error);
    if (this.errorHandlingEnabled) {
      this.scene.pause();
      const centerX = this.cameras.main.centerX;
      const centerY = this.cameras.main.centerY;
      
      // Display error message to user
      this.add.text(centerX, centerY, 'Oops! Something went wrong.\nTry refreshing the page.', {
        fontSize: '24px',
        fontFamily: 'Exo2-ExtraBold',
        color: '#000000',
        align: 'center'
      }).setOrigin(0.5);

      // Add retry button
      const retryButton = this.add.text(centerX, centerY + 80, 'Retry', {
        fontSize: '32px',
        fontFamily: 'Exo2-ExtraBold',
        color: '#000000',
        backgroundColor: '#ffffff',
        padding: { x: 40, y: 20 }
      }).setOrigin(0.5);

      retryButton.setInteractive({ useHandCursor: true });
      retryButton.on('pointerdown', () => {
        this.scene.restart();
      });
    }
  }

  preload() {
    return new Promise((resolve) => {
      WebFontLoader.load({
        custom: {
          families: ['Exo2-ExtraBold']
        },
        active: resolve,
        inactive: () => {
          console.warn('Font loading failed, using fallback font');
          resolve();
        }
      });
    }).catch(error => this.handleError(error));
  }

  async create() {
    try {
      await this.preload();
      this.currentTimer = 10000;
      this.initialTimer = 10000;
      
      this.add.text(20, 80, 'COLORS', {
        fontSize: '42px',
        fontFamily: 'Exo2-ExtraBold',
        color: '#000000'
      }).setOrigin(0, 0.5);

      this.scoreText = this.add.text(370, 80, '0', {
        fontSize: '42px',
        fontFamily: 'Exo2-ExtraBold',
        color: '#000000'
      }).setOrigin(1, 0.5);

      this.timerBar = this.add.rectangle(370, 120, 350, 20, 0x000000);
      this.timerBar.setOrigin(1, 0);

      this.generateTargetColors();
      this.createTargetColorsDisplay();
      this.createCirclesGrid();
      this.startTimer();
    } catch (error) {
      this.handleError(error);
    }
  }

  createTargetColorsDisplay() {
    try {
      const barWidth = 175;
      this.targetColors.forEach((color, index) => {
        this.add.rectangle(20 + (index * barWidth), 20, barWidth, 20, color)
          .setOrigin(0, 0);
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  createCirclesGrid() {
    try {
      const circleRadius = 28;
      const ringThickness = 12;
      const spacing = 75;
      const startX = 45;
      const startY = 200;

      for (let row = 0; row < 6; row++) {
        this.circles[row] = [];
        for (let col = 0; col < 5; col++) {
          const x = startX + (col * spacing);
          const y = startY + (row * spacing);
          const color = this.colors[Phaser.Math.Between(0, this.colors.length - 1)];
          
          const ring = this.add.circle(x, y, circleRadius, color);
          const innerCircle = this.add.circle(x, y, circleRadius - ringThickness, 0xf5f5f5);
          
          ring.setInteractive();
          ring.on('pointerdown', () => this.handleCircleClick(row, col));
          
          this.circles[row][col] = ring;
        }
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  handleCircleClick(row, col) {
    try {
      const clickedColor = this.circles[row][col].fillColor;
      
      if (this.targetColors.includes(clickedColor)) {
        this.score += this.scorePerClick;
        this.scoreText.setText(this.score.toString());

        const newClickedColor = this.colors[Phaser.Math.Between(0, this.colors.length - 1)];
        this.circles[row][col].setFillStyle(newClickedColor);

        const rowToUpdate = row >= 6 ? 1 : (row + 2) % 6;
        this.replaceRowColors(rowToUpdate);

        this.initialTimer = Math.max(this.minTimer, this.initialTimer - this.timerDecrement);
        
        this.currentTimer = this.initialTimer;
        this.elapsedTime = 0;
        this.timerBar.width = 350;
      } else {
        this.gameOver();
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  async gameOver() {
    try {
      if (this.timerEvent) {
        this.timerEvent.remove();
      }
      this.scene.pause();
      await this.scoreManager.updateScore(this.score);
      this.scene.start('GameOverScene');
    } catch (error) {
      this.handleError(error);
    }
  }

  replaceRowColors(row) {
    try {
      const newColors = [];
      for (let col = 0; col < 5; col++) {
        const newColor = this.colors[Phaser.Math.Between(0, this.colors.length - 1)];
        newColors.push(newColor);
      }

      if (!newColors.some(color => this.targetColors.includes(color))) {
        const randomCol = Phaser.Math.Between(0, 4);
        const randomTargetColor = this.targetColors[Phaser.Math.Between(0, this.targetColors.length - 1)];
        newColors[randomCol] = randomTargetColor;
      }

      for (let col = 0; col < 5; col++) {
        this.circles[row][col].setFillStyle(newColors[col]);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  startTimer() {
    try {
      this.timerEvent = this.time.addEvent({
        delay: 100,
        callback: this.updateTimer,
        callbackScope: this,
        loop: true
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  updateTimer() {
    try {
      this.elapsedTime += 100;
      const progress = 350 * (1 - (this.elapsedTime / this.currentTimer));
      
      if (progress <= 0) {
        this.gameOver();
        return;
      }
      this.timerBar.width = progress;
    } catch (error) {
      this.handleError(error);
    }
  }



  generateTargetColors() {
    try {
      this.targetColors = [];
      
      while (this.targetColors.length < 2) {
        const randomColor = this.colors[Phaser.Math.Between(0, this.colors.length - 1)];
        if (!this.targetColors.includes(randomColor)) {
          this.targetColors.push(randomColor);
        }
      }
    } catch (error) {
      this.handleError(error);
    }
  }
}