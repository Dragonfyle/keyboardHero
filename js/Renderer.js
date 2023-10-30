import Calc from './Calc.js';
import GameConfig from './Config.js';
import { Organizer } from './Organizer.js';
import { DataOrganizer } from './Organizer.js';
import GameStatus from './Status.js';
import GameControl from './Control.js';

class Renderer {
  #gameBoardOverlay;
  #startMsgContainer;
  #hitDisplay;
  #miss_display;
  #timeLeftDisplay;
  #accuracyDisplay;
  #statsVertical;
  #keyMap;
  #keys;
  #rendererLoop;
  #displayOptions;
  #statNames;
  #divOver;
  #previousTime;
  constructor() {
    this.#gameBoardOverlay = document.querySelector('.game-board__overlay');
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
    this.#displayOptions = {
      BLOCK: 'block',
      FLEX: 'flex',
      NONE: 'none',
    };

    this.#statNames = {
      HIT: 'hit',
      MISS: 'miss',
      ACCURACY: 'accuracy',
    };

    this.#previousTime = performance.now();

    this.#displayDivOver();
    window.addEventListener('audioready', () => this.#init());
  }

  #displayDivOver() {
    this.#gameBoardOverlay.style.display = 'block';
  }

  #removeDivOver() {
    this.#gameBoardOverlay.style.display = 'none';
  }

  #init() {
    this.#removeDivOver();
    this.#displayStartMessage();
    this.#addTransparentDiv();
    window.addEventListener('gamestart', () => this.#startGame());
    window.addEventListener('statsready', () => this.#renderHitMap());
  }

  #addTransparentDiv() {
    const div = document.createElement('div');
    const styles = {
      position: 'fixed',
      left: 0,
      right: 0,
      height: '100%',
      width: '100%',
      userSelect: 'none',
      zIndex: '9998',
    };
    Object.assign(div.style, styles);

    document.body.insertBefore(div, document.body.firstChild);
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
      this.#setDisplay(this.#startMsgContainer, this.#displayOptions.BLOCK);
    }
  }

  #removeStartMessage() {
    if (!this.#isVisible(this.#startMsgContainer)) {
      return;
    }
    this.#setDisplay(this.#startMsgContainer, this.#displayOptions.NONE);
  }

  #resetKeyColors() {
    this.#keys.forEach((key) => {
      key.style.backgroundColor = GameConfig.KEY_COLOR;
      key.style.border = '';
    });
  }

  #setDisplay(element, display) {
    element.style.display = display;
  }

  #clearLetterStatsDisplay() {
    this.#statsVertical.textContent = '';
  }

  #displayStat(element, statName) {
    const formattedStat = Organizer.formatTotalStat(statName);
    element.textContent = formattedStat;
  }

  #resetColors() {
    this.#resetKeyColors();
    DataOrganizer.resetColorGroups();
  }

  #startGame() {
    this.#setDisplay(this.#keyMap, this.#displayOptions.NONE);
    this.#resetColors();
    this.#removeStartMessage();
    this.#rendererLoop = window.requestAnimationFrame((time) =>
      this.#renderImage(time)
    );
  }

  #renderImage(time) {
    const timePassed = time - this.#previousTime;
    if (!GameControl.isRunning) {
      this.#stopRenderer();
      return;
    }
    if (timePassed > 15) {
      this.#previousTime = time;
      this.#renderTimer();
      this.#renderActiveLetters();
      this.#renderStats();
      this.#rendererLoop = window.requestAnimationFrame((time) =>
        this.#renderImage(time)
      );
    } else {
      this.#rendererLoop = window.requestAnimationFrame((time) =>
        this.#renderImage(time)
      );
    }
  }

  #renderActiveLetters() {
    GameStatus.activeLetters.forEach((letter) => {
      letter.div.style.transform = `translateY(${letter.letterCurrentPosition}px)`;
    });
  }

  #renderTimer() {
    this.#timeLeftDisplay.textContent = Organizer.formatTime();
  }

  #renderTotalStats() {
    this.#displayStat(this.#hitDisplay, this.#statNames.HIT);
    this.#displayStat(this.#miss_display, this.#statNames.MISS);
    this.#displayStat(this.#accuracyDisplay, this.#statNames.ACCURACY);
  }

  #renderLetterStats() {
    this.#clearLetterStatsDisplay();
    for (const keyCode of GameStatus.sortedStats) {
      const newP = document.createElement('p');
      const letter = Calc.convertKeyCodeToLetter(keyCode);
      newP.textContent = Organizer.formatLetterStat(letter, keyCode);
      this.#statsVertical.appendChild(newP);
    }
  }

  #renderHitMap() {
    const colorMap = DataOrganizer.colorMap;
    this.#keys.forEach((key) => {
      const colorGroup = Object.values(colorMap).find(({ keyCodes }) =>
        keyCodes.includes(key.dataset.keycode)
      );
      key.style.backgroundColor = colorGroup?.color;
      key.style.border = 'none';
    });

    this.#setDisplay(this.#keyMap, this.#displayOptions.FLEX);
  }

  #renderStats() {
    this.#renderTotalStats();
    this.#renderLetterStats();
  }
}

new Renderer();
