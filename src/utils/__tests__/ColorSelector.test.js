import ColorSelector from '../ColorSelector';
import { COLORS_ARRAY } from '../../config/colors';

describe('ColorSelector', () => {
  let colorSelector;

  beforeEach(() => {
    colorSelector = new ColorSelector(COLORS_ARRAY);
  });

  describe('getRandomColors', () => {
    it('should return the requested number of colors', () => {
      const colors = colorSelector.getRandomColors(2);
      expect(colors).toHaveLength(2);
    });

    it('should return colors from the COLORS_ARRAY', () => {
      const colors = colorSelector.getRandomColors(2);
      colors.forEach(color => {
        expect(COLORS_ARRAY).toContain(color);
      });
    });

    it('should return unique colors', () => {
      const colors = colorSelector.getRandomColors(2);
      const uniqueColors = new Set(colors);
      expect(uniqueColors.size).toBe(colors.length);
    });

    it('should handle requesting all available colors', () => {
      const colors = colorSelector.getRandomColors(COLORS_ARRAY.length);
      expect(colors).toHaveLength(COLORS_ARRAY.length);
      expect(new Set(colors).size).toBe(COLORS_ARRAY.length);
    });
  });
});