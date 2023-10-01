import Emitter from './Emitter.js';
import GameConfig from './Config.js';
import { Organizer } from './Organizer.js';
import GameStatus from './Status.js';

class Input {
  #areDown;
  constructor() {
    this.#initEvents();
  }

  #initEvents() {
    this.#areDown = [];
    window.addEventListener('keydown', (e) => {
      this.#keyDownEvent(e);
    });
    window.addEventListener('keyup', (e) => {
      this.#keyUpEvent(e);
    });
  }

  #determineIndex(pressedKeyCode) {
    return this.#areDown.findIndex((keyCode) => keyCode === pressedKeyCode);
  }

  #isDown(pressedKeyCode) {
    return this.#areDown.includes(pressedKeyCode);
  }

  #saveKeyDown(pressedKeyCode) {
    this.#areDown.push(pressedKeyCode);
  }

  #readKeyCode(e) {
    return e.keyCode;
  }

  #keyDownEvent(e) {
    const keyCode = this.#readKeyCode(e);

    if (this.#isDown(keyCode)) {
      return;
    }
    this.#saveKeyDown(keyCode);

    if (GameStatus.isExpected(keyCode)) {
      const letterId = GameStatus.getExpectedId(keyCode);
      Emitter.letterHit(letterId);

      GameStatus.incorporateNewEntry(GameConfig.statNames.HIT, keyCode);
      Organizer.sortStats();
    }
  }

  #keyUpEvent(e) {
    const keyCode = this.#readKeyCode(e);
    this.#areDown.splice(this.#determineIndex(keyCode), 1);
  }
}

const UserInput = new Input();

export default UserInput;
