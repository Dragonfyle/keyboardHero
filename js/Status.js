import Calc from './Calc.js';
import GameConfig from './Config.js';

class Status {
  #activeLetters;
  #expectedLetters;
  #gameLength;
  #timeLeft;
  #previousCharCode;
  #statsTotal;
  #statsByLetter;
  #sortedStats;
  #colorGroups;
  constructor(gameLength = 60) {
    this.gameBoard = document.querySelector('.game-board');
    this.#gameLength = gameLength;
    this.#timeLeft = this.#gameLength;
    this.#previousCharCode = undefined;

    this.#activeLetters = [];
    this.#expectedLetters = [];

    this.#statsTotal = {
      hit: 0,
      miss: 0,
      accuracy: 0,
    };
    this.#statsByLetter = {};
    this.#sortedStats = [];
    // this.#colorGroups = {};
    this.colorMap = {
      top1: { color: GameConfig.COLOR_MAP.TOP1, keyCodes: [] },
      top2: { color: GameConfig.COLOR_MAP.TOP2, keyCodes: [] },
      top3: { color: GameConfig.COLOR_MAP.TOP3, keyCodes: [] },
      top4: { color: GameConfig.COLOR_MAP.TOP4, keyCodes: [] },
    };
  }

  isPresent(keyCode) {
    return keyCode in this.#statsByLetter;
  }

  isValidEntry(statName) {
    return statName === 'hit' || statName === 'miss' ? true : false;
  }

  createStatsEntry(keyCode) {
    this.#statsByLetter[keyCode] = {
      hit: 0,
      miss: 0,
      accuracy: 0,
    };
  }

  resetTime() {
    this.#timeLeft = this.#gameLength;
  }

  resetAllStats() {
    this.#statsTotal = {
      hit: 0,
      miss: 0,
      accuracy: 0,
    };
    this.#statsByLetter = {};
    this.#sortedStats = [];
    Object.entries(this.colorMap).forEach((group) => (group[1].keyCodes = []));
  }

  updateTimeLeft() {
    --this.#timeLeft;
  }

  isExpected(keyCode) {
    return this.#expectedLetters.find((letter) => letter.keyCode === keyCode)
      ? true
      : false;
  }

  getExpectedId(keyCode) {
    const letter = this.#expectedLetters.find(
      (letter) => letter.keyCode === keyCode
    );
    return letter?.id;
  }

  updateLetterHitMiss(statName, keyCode) {
    if (!this.isValidEntry(statName)) {
      return;
    }
    this.#statsByLetter[keyCode][statName] += 1;
  }

  statsTotalUpdate({ hit, miss, accuracy }) {
    this.#statsTotal.hit = hit;
    this.#statsTotal.miss = miss;
    this.#statsTotal.accuracy = accuracy;
  }

  updateSortedStats(sortedStatsByLetter) {
    this.#sortedStats = sortedStatsByLetter;
  }

  updateLetterAccuracy(newAccuracy, keyCode) {
    this.#statsByLetter[keyCode].accuracy = newAccuracy;
  }

  updateAllStats(statName, keyCode) {
    if (!this.isPresent(keyCode)) {
      this.createStatsEntry(keyCode);
    }

    this.updateLetterHitMiss(statName, keyCode);

    const letterInStatsObject = this.statsByLetter[keyCode];
    const newAccuracy = Calc.calculateAccuracy(letterInStatsObject);
    this.updateLetterAccuracy(newAccuracy, keyCode);

    const newTotalStats = Calc.calculateTotalStats(this.statsByLetter);
    this.statsTotalUpdate(newTotalStats);
  }

  dividedStatsUpdate(ColorGroups) {
    this.#colorGroups = ColorGroups;
  }

  get timeLeft() {
    return this.#timeLeft;
  }

  get activeLetters() {
    return this.#activeLetters;
  }

  get statsTotal() {
    return this.#statsTotal;
  }

  get statsByLetter() {
    return this.#statsByLetter;
  }

  get sortedStats() {
    return this.#sortedStats;
  }

  get colorGroups() {
    return this.#colorGroups;
  }

  set addToActive(letter) {
    this.#activeLetters.push(letter);
  }

  removeFromActive(id) {
    this.#activeLetters.splice(
      this.#activeLetters.findIndex((letter) => letter.id === id),
      1
    );
  }

  addToExpected(letter) {
    this.#expectedLetters.push(letter);
  }

  removeFromExpected(id) {
    this.#expectedLetters.splice(
      this.#expectedLetters.findIndex((letter) => letter.id === id),
      1
    );
  }
}

const GameStatus = new Status();

export default GameStatus;
