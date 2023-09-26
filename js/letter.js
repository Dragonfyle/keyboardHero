import { Organizer } from './Organizer.js';
import GameStatus from './Status.js';
import GameConfig from './Config.js';
import Input from './Input.js';
const UserInput = new Input();

export default class Letter {
  #alphabetLetter;
  #keyCode;
  letterCurrentPosition;
  #actionThreshold;
  #borders;
  #TRACKING_INTERVAL;
  #INITIAL_OFFSET;
  constructor(idCount) {
    this.id = idCount;
    this.#alphabetLetter;
    this.#keyCode;
    this.div;
    this.#INITIAL_OFFSET = -50;
    this.letterCurrentPosition;
    this.#TRACKING_INTERVAL = 20;

    this.gameBoard = document.querySelector('.game-board');
    this.#actionThreshold = document.querySelector(
      '.game-board__action-threshold'
    );

    this.#borders = {
      top: 'top',
      bottom: 'bottom',
    };

    UserInput.addEventListener('letterHit', (e) =>
      this.#selfDectruct(e.detail)
    );

    this.#initializeRandomLetter();
    this.#createAndAddDomElements();
    this.#letterPositionUpdate(GameConfig.fallStep, 20);
    this.#waitForThresholds();
  }

  get keyCode() {
    return this.#keyCode;
  }

  #getValidKeyCode() {
    const MIN_KEY_CODE = 65;
    const MAX_KEY_CODE = 90;
    const numberOfKeys = MAX_KEY_CODE - MIN_KEY_CODE + 1;

    function getRandomKeyCode() {
      return Math.floor(Math.random() * numberOfKeys) + MIN_KEY_CODE;
    }

    let validKeyCode = getRandomKeyCode();

    while (validKeyCode === GameStatus.previousKeyCode) {
      validKeyCode = getRandomKeyCode();
    }

    GameStatus.previousKeyCode = validKeyCode;

    return validKeyCode;
  }

  #assignKeyCode() {
    this.#keyCode = this.#getValidKeyCode();
  }

  #assignAlphabetLetter() {
    this.#alphabetLetter = String.fromCharCode(this.#keyCode).toLowerCase();
  }

  #initializeRandomLetter() {
    this.#assignKeyCode();
    this.#assignAlphabetLetter();
  }

  #createElement(element) {
    return document.createElement(element);
  }

  #createTextNode(text) {
    return document.createTextNode(text);
  }

  #appendChild(parentSelector, element) {
    parentSelector.appendChild(element);
  }

  #assignIdToElement(element) {
    element.setAttribute('id', this.id);
  }

  #assignClass(element) {
    element.classList.add('letter', `letter--${this.#alphabetLetter}`);
  }

  #setInitialOffset(position) {
    this.letterCurrentPosition = position;
  }

  #readBorderPosition(element, side) {
    return element.getBoundingClientRect()[side];
  }

  #createAndAddDomElements() {
    const div = this.#createElement('div');
    this.#assignIdToElement(div);
    this.#assignClass(div);
    this.#setInitialOffset(this.#INITIAL_OFFSET);
    const text = this.#createTextNode(this.#alphabetLetter);
    this.#appendChild(div, text);
    this.#appendChild(this.gameBoard, div);

    this.div = div;
  }

  #letterWithinActionRange() {
    GameStatus.addToExpected(this);
  }

  #letterMissed() {
    GameStatus.removeFromExpected(this.id);

    if (!GameStatus.isPresent(this.#keyCode)) {
      GameStatus.createStatsEntry(this.#keyCode);
    }

    GameStatus.updateAllStats('miss', this.#keyCode);
    Organizer.sortStats();
  }

  #reachThreshold(element, threshold, border, reverse = false) {
    let border1;
    let border2;

    if (reverse) {
      border1 = border.top;
      border2 = border.bottom;
    } else {
      border1 = border.bottom;
      border2 = border.top;
    }

    return new Promise((resolve) => {
      const relativePositionTracker = setInterval(() => {
        if (
          this.#readBorderPosition(element, border1) >=
          this.#readBorderPosition(threshold, border2)
        ) {
          clearInterval(relativePositionTracker);

          if (threshold === this.#actionThreshold) {
            if (reverse) {
              resolve(this.#letterMissed());
            } else {
              resolve(this.#letterWithinActionRange());
            }
          } else {
            resolve(this.#selfDectruct(this.id));
          }
        }
      }, this.#TRACKING_INTERVAL);
    });
  }

  async #waitForThresholds() {
    await this.#reachThreshold(
      this.div,
      this.#actionThreshold,
      this.#borders,
      false
    );
    await this.#reachThreshold(
      this.div,
      this.#actionThreshold,
      this.#borders,
      true
    );
    await this.#reachThreshold(this.div, this.gameBoard, this.#borders, false);
  }

  #letterPositionUpdate(fallStep, delay) {
    setTimeout(() => {
      if (document.hasFocus()) {
        this.letterCurrentPosition += fallStep;
        this.#letterPositionUpdate(fallStep, delay);
      } else {
        this.#letterPositionUpdate(fallStep, delay);
      }
    }, delay);
  }

  #selfDectruct(letterId) {
    if (letterId === this.id) {
      GameStatus.removeFromActive(this.id);
      // GameStatus.isExpected(this.keyCode) &&
      GameStatus.removeFromExpected(this.id);
      this.gameBoard.removeChild(this.div);
    }
  }
}
