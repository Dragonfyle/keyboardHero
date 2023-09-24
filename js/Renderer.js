import Calc from './Calc.js';
import Organizer from './Organizer.js';
import GameStatus from './Status.js';
import GameControl from './control.js';

class Renderer {
  #startMsgContainer;
  #hitDisplay;
  #miss_display;
  #timeLeftDisplay;
  #accuracyDisplay;
  #statsVertical;
  #keyMap;
  #keys;
  #rendererLoop;
  constructor() {
    this.#startMsgContainer = document.querySelector(
      '.game-board__start-message'
    );
    this.#timeLeftDisplay = document.querySelector('.stats__time-left>p');
    this.#hitDisplay = document.querySelector('.stats__hits>p');
    this.#miss_display = document.querySelector('.stats__misses>p');
    this.#accuracyDisplay = document.querySelector('.stats__accuracy>p');
    this.#statsVertical = document.querySelector('.stats--vertical');
    this.#keyMap = document.querySelector('.hit-map');
    this.#keys = document.querySelectorAll('[data-letter]');
    this.#rendererLoop = undefined;

    this.#displayStartMessage();
    GameControl.addEventListener('gameStart', () => this.#startRenderer());
    GameControl.addEventListener('statsReady', () => this.#renderHitMap());
  }

  #stopRenderer() {
    window.cancelAnimationFrame(this.#rendererLoop);
    this.#displayStartMessage();
    this.#renderHitMap();
  }

  #isVisible(element) {
    return element.style.display === 'block';
  }

  #displayStartMessage() {
    if (this.#isVisible(this.#startMsgContainer)) {
      return;
    }
    if (!GameStatus.activeLetters.length) {
      this.#startMsgContainer.style.display = 'block';
    }
  }

  #removeStartMessage() {
    if (!this.#isVisible(this.#startMsgContainer)) {
      return;
    }
    this.#startMsgContainer.style.display = 'none';
  }

  #resetKeyColors() {
    this.#keys.forEach((key) => {
      key.style.backgroundColor = 'rgba(180, 180, 180)';
    });
  }

  #setDisplayProp(element, display) {
    element.style.display = `${display}`;
  }

  #clearLetterStatsDisplay() {
    this.#statsVertical.textContent = '';
  }

  #displayStat(statName, domElement) {
    const formattedStat = Organizer.formatTotalStat(statName);
    domElement.textContent = formattedStat;
  }

  #startRenderer() {
    this.#setDisplayProp(this.#keyMap, 'none');
    this.#resetKeyColors();
    this.#removeStartMessage();
    this.#rendererLoop = window.requestAnimationFrame(
      this.#renderImage.bind(this)
    );
  }

  #renderImage() {
    if (GameControl.isRunning) {
      this.#renderTimer();
      this.#renderActiveLetters();
      this.#renderStats();
      this.#rendererLoop = window.requestAnimationFrame(
        this.#renderImage.bind(this)
      );
    } else {
      this.#stopRenderer();
    }
  }
  #createElement(element) {
    return document.createElement(element);
  }

  #renderActiveLetters() {
    GameStatus.activeLetters.forEach((letter) => {
      letter.div.style.transform = `translateY(${letter.letterCurrentPosition}%)`;
    });
  }

  #renderTimer() {
    this.#timeLeftDisplay.textContent = Organizer.formatTime();
  }

  #renderTotalStats() {
    this.#displayStat('hit', this.#hitDisplay);
    this.#displayStat('miss', this.#miss_display);
    this.#displayStat('accuracy', this.#accuracyDisplay);
  }

  #renderLetterStats() {
    this.#clearLetterStatsDisplay();
    for (const keyCode of GameStatus.sortedStats) {
      const newP = this.#createElement('p');
      const letter = Calc.convertKeyCodeToLetter(keyCode);
      newP.textContent = Organizer.formatLetterStat(letter, keyCode);
      this.#statsVertical.appendChild(newP);
    }
  }

  #renderHitMap() {
    const COLOR_MAP = {
      TOP1: '0CCE6B',
      TOP2: '566E3D',
      TOP3: '6C4B51',
      TOP4: 'EF2D56',
    };

    for (let color in GameStatus.colorGroups) {
      for (let letter of GameStatus.colorGroups[color]) {
        this.#keys.forEach((key) => {
          if (
            key.dataset.letter === String.fromCharCode(letter).toLowerCase()
          ) {
            key.style.backgroundColor = `#${COLOR_MAP[color]}`;
          }
        });
      }
    }
    this.#setDisplayProp(this.#keyMap, 'flex');
  }

  #renderStats() {
    this.#renderTotalStats();
    this.#renderLetterStats();
  }
}

// eslint-disable-next-line no-unused-vars
const ImageRenderer = new Renderer();
