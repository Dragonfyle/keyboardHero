import { Organizer } from './Organizer.js';
import GameStatus from './Status.js';

export default class Input extends EventTarget {
  #areDown;
  constructor() {
    super();
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

  #findPressedKey(pressedKeyCode) {
    return this.#areDown.findIndex((keyCode) => keyCode === pressedKeyCode);
  }

  #isDown(pressedKeyCode) {
    console.log(this.#areDown.includes(pressedKeyCode));
    return this.#areDown.includes(pressedKeyCode);
  }

  #saveKeyDown(pressedKeyCode) {
    console.log(this.#areDown);
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
      this.dispatchEvent(new CustomEvent('letterHit', { detail: letterId }));

      GameStatus.updateAllStats('hit', keyCode);
      Organizer.sortStats();
    }
  }

  #keyUpEvent(e) {
    const keyCode = this.#readKeyCode(e);
    this.#areDown.splice(this.#findPressedKey(keyCode), 1);
  }
}
