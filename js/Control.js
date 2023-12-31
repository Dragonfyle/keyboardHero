import BackgroundPlayer from './AudioPlayer.js';
import Emitter from './Emitter.js';
import GameConfig from './Config.js';
// eslint-disable-next-line no-unused-vars
import UserInput from './Input.js';
import Calc from './Calc.js';
import { DataOrganizer } from './Organizer.js';
import DifficultySlider from './Slider.js';
import GameStatus from './Status.js';
import Letter from './Letter.js';

class Control {
  #letterIdCount = 0;
  #isRunning = false;
  #isPaused = false;
  #coundownInterval;
  constructor() {
    window.addEventListener('audioready', () => this.#initializeEvents());
  }

  get isRunning() {
    return this.#isRunning;
  }

  #initializeEvents() {
    window.addEventListener('keydown', (e) => {
      this.#gameStart(e);
    });
    window.addEventListener('gameend', () => this.wrapUp());
  }

  #gameStart(e) {
    if (this.#isRunning || e.keyCode !== 32) {
      return;
    }
    DifficultySlider.reveal(false, 40);
    this.#isRunning = true;
    GameConfig.difficultySet(
      DifficultySlider.draggablePos,
      DifficultySlider.draggablePosReversed
    );
    this.#resetStats();
    this.#letterGenerator();
    this.#countdownAndReset();
    BackgroundPlayer.backgroundSong.play();
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
    Emitter.gameStart();

    this.#coundownInterval = setInterval(() => {
      if (document.hasFocus()) {
        if (this.#isPaused) {
          Emitter.gameResume();
          this.#isPaused = false;
        }
        GameStatus.updateTimeLeft();
      } else {
        Emitter.gamePause();
        this.#isPaused = true;
      }
      if (GameStatus.timeLeft <= 0) {
        clearInterval(this.#coundownInterval);

        Emitter.gameEnd();
      }
    }, 1000);
  }

  async wrapUp() {
    await this.#emptyActiveLetters();

    this.#isRunning = false;

    DifficultySlider.reveal(true, 100);
    DataOrganizer.divideIntoColorGroups(GameStatus.sortedStats);
    Emitter.statsReady();
    Emitter.gameWrapedUp();
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
