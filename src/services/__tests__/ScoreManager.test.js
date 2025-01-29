import ScoreManager from '../ScoreManager';

describe('ScoreManager', () => {
  let scoreManager;
  
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    scoreManager = new ScoreManager();
  });

  describe('updateScore', () => {
    it('should update recent score', async () => {
      await scoreManager.updateScore(100);
      expect(scoreManager.getRecentScore()).toBe(100);
    });

    it('should update highest score when new score is higher', async () => {
      await scoreManager.updateScore(100);
      await scoreManager.updateScore(200);
      expect(scoreManager.getHighestScore()).toBe(200);
    });

    it('should not update highest score when new score is lower', async () => {
      await scoreManager.updateScore(200);
      await scoreManager.updateScore(100);
      expect(scoreManager.getHighestScore()).toBe(200);
    });
  });

  describe('getRecentScore', () => {
    it('should return 0 when no score exists', () => {
      expect(scoreManager.getRecentScore()).toBe(0);
    });

    it('should return the most recent score', async () => {
      await scoreManager.updateScore(100);
      expect(scoreManager.getRecentScore()).toBe(100);
    });
  });

  describe('getHighestScore', () => {
    it('should return 0 when no score exists', () => {
      expect(scoreManager.getHighestScore()).toBe(0);
    });

    it('should return the highest score achieved', async () => {
      await scoreManager.updateScore(100);
      await scoreManager.updateScore(200);
      await scoreManager.updateScore(150);
      expect(scoreManager.getHighestScore()).toBe(200);
    });
  });
});