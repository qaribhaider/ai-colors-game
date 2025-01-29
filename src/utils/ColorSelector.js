export default class ColorSelector {
  constructor(colors) {
    this.colors = colors;
  }

  getRandomColors(count) {
    const selectedColors = [];
    while (selectedColors.length < count) {
      const randomIndex = Math.floor(Math.random() * this.colors.length);
      const randomColor = this.colors[randomIndex];
      if (!selectedColors.includes(randomColor)) {
        selectedColors.push(randomColor);
      }
    }
    return selectedColors;
  }
}