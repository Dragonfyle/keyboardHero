import EventEmitter from './Emitter.js';
// eslint-disable-next-line no-unused-vars
import Input from './Input.js';
import Calc from './Calc.js';
import { DataOrganizer } from './Organizer.js';
import DifficultySlider from './Slider.js';
import GameConfig from './Config.js';
import GameStatus from './Status.js';
import Letter from './letter.js';

class Control {
  #letterIdCount = 0;
  #isRunning = false;
  #coundownInterval;
  constructor() {
    window.addEventListener('keydown', (e) => {
      this.#gameStart(e);
    });
    window.addEventListener('gameEnd', () => this.wrapUp());
  }

  get isRunning() {
    return this.#isRunning;
  }

  #gameStart(e) {
    if (this.#isRunning || e.keyCode !== 32) {
      return;
    }
    DifficultySlider.setActive(false, 40);
    this.#isRunning = true;
    GameConfig.difficultySet(
      DifficultySlider.handlePosition,
      DifficultySlider.handlePositionReversed
    );
    this.#resetStats();
    this.#letterGenerator();
    this.#countdownAndReset();
  }

  #updateIdCount() {
    this.#letterIdCount++;
  }

  #emptyActiveLetters() {
    return new Promise((resolve) => {
      const checker = setInterval(() => {
        if (!GameStatus.activeLetters.length) {
          clearInterval(checker);
          resolve();
        }
      }, 20);
    });
  }

  createElement(element) {
    return document.createElement(element);
  }

  #resetStats() {
    GameStatus.resetAllStats();
    GameStatus.resetTime();
  }

  #countdownAndReset() {
    EventEmitter.gameStart();

    this.#coundownInterval = setInterval(() => {
      if (document.hasFocus()) {
        GameStatus.updateTimeLeft();
      }
      if (GameStatus.timeLeft <= 0) {
        clearInterval(this.#coundownInterval);

        EventEmitter.gameEnd();
      }
    }, 1000);
  }

  async wrapUp() {
    await this.#emptyActiveLetters();

    this.#isRunning = false;
    DifficultySlider.setActive(true, 100);

    DataOrganizer.divideIntoColorGroups(GameStatus.sortedStats);

    EventEmitter.statsReady();
  }

  #letterGenerator() {
    setTimeout(() => {
      if (GameStatus.timeLeft <= 0) {
        return;
      }
      if (document.hasFocus()) {
        this.#createNewLetter();
        this.#letterGenerator();
      } else {
        this.#letterGenerator();
      }
    }, Calc.getRandomDelay(GameConfig.speedParameters));
  }

  #createNewLetter() {
    this.#updateIdCount();
    GameStatus.addToActive = new Letter(this.#letterIdCount);
  }
}

const GameControl = new Control();

export default GameControl;
