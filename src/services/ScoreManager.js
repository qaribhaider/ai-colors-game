export default class ScoreManager {
  constructor() {
    this.STORAGE_KEY_HIGHEST = 'colors_game_highest_score';
    this.STORAGE_KEY_RECENT = 'colors_game_recent_score';
    this.loadScores();
  }

  loadScores() {
    try {
      this.highestScore = parseInt(localStorage.getItem(this.STORAGE_KEY_HIGHEST)) || 0;
      this.recentScore = parseInt(localStorage.getItem(this.STORAGE_KEY_RECENT)) || 0;
    } catch (error) {
      console.error('Error loading scores:', error);
      this.highestScore = 0;
      this.recentScore = 0;
    }
  }

  updateScore(score) {
    this.recentScore = score;
    if (score > this.highestScore) {
      this.highestScore = score;
      localStorage.setItem(this.STORAGE_KEY_HIGHEST, score.toString());
    }
    localStorage.setItem(this.STORAGE_KEY_RECENT, score.toString());
  }

  getHighestScore() {
    return this.highestScore;
  }

  getRecentScore() {
    return this.recentScore;
  }
}