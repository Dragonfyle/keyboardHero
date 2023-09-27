import InitialValues from './InitialValues.js';
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
  constructor(gameLength = GameConfig.GAME_LENGTH) {
    this.gameBoard = document.querySelector('.game-board');
    this.#gameLength = gameLength;
    this.#timeLeft = this.#gameLength;
    this.#previousCharCode = undefined;

    this.#activeLetters = [];
    this.#expectedLetters = [];

    this.#statsTotal = {
      hit: InitialValues.totalStats.HIT,
      miss: InitialValues.totalStats.MISS,
      accuracy: InitialValues.totalStats.ACCURACY,
    };
    this.#statsByLetter = {};
    this.#sortedStats = [];
  }

  isPresent(keyCode) {
    return keyCode in this.#statsByLetter;
  }

  isValidEntry(statName) {
    return statName === 'hit' || statName === 'miss';
  }

  createStatsEntry(keyCode) {
    this.#statsByLetter[keyCode] = {
      hit: InitialValues.statsByLetter.HIT,
      miss: InitialValues.statsByLetter.MISS,
      accuracy: InitialValues.statsByLetter.ACCURACY,
    };
  }

  resetTime() {
    this.#timeLeft = this.#gameLength;
  }

  resetAllStats() {
    this.#statsTotal = {
      hit: InitialValues.totalStats.HIT,
      miss: InitialValues.totalStats.MISS,
      accuracy: InitialValues.totalStats.ACCURACY,
    };
    this.#statsByLetter = {};
    this.#sortedStats = [];
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

  incorporateNewEntry(statName, keyCode) {
    if (!this.isPresent(keyCode)) {
      this.createStatsEntry(keyCode);
    }

    this.updateLetterHitMiss(statName, keyCode);

    const letterObject = this.statsByLetter[keyCode];
    const newAccuracy = Calc.calculateAccuracy(letterObject);
    this.updateLetterAccuracy(newAccuracy, keyCode);

    const newTotalStats = Calc.calculateTotalStats(this.statsByLetter);
    this.statsTotalUpdate(newTotalStats);
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

  set addToActive(letter) {
    this.#activeLetters.push(letter);
  }

  removeFromActive(id) {
    const letterIndex = this.#activeLetters.findIndex(
      (letter) => letter.id === id
    );
    if (letterIndex !== -1) {
      this.#activeLetters.splice(letterIndex, 1);
    }
  }

  get expectedLetters() {
    return this.#expectedLetters;
  }

  addToExpected(letter) {
    this.#expectedLetters.push(letter);
  }

  removeFromExpected(id) {
    const letterIndex = this.#expectedLetters.findIndex(
      (letter) => letter.id === id
    );
    if (letterIndex !== -1) {
      this.#expectedLetters.splice(letterIndex, 1);
    }
  }
}

const GameStatus = new Status();

export default GameStatus;
