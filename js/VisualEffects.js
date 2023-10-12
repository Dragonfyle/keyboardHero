class VisualEffects {
  #flashLengths;
  #colors;
  #missLineWidth;
  #GAME_BOARD;
  #DEFAULT_BORDER;
  constructor() {
    this.#GAME_BOARD = document.querySelector('.game-board');
    this.#DEFAULT_BORDER = '2px solid rgb(18, 255, 142)';

    this.#flashLengths = {
      HIT: 200,
      MISS: 90,
    };
    this.#colors = {
      HIT: 'rgb(30, 30, 30)',
      MISS: 'rbg(229, 68, 109)',
    };
    this.#missLineWidth = '4px';
  }

  get flashLengths() {
    return this.#flashLengths;
  }

  #fadeOut(domLetter) {
    domLetter.classList.add('transition');
  }

  hitFeedback(domLetter) {
    domLetter.style.backgroundColor = this.#colors.HIT;
    domLetter.style.border = this.#DEFAULT_BORDER;
    this.#fadeOut(domLetter);
    // setTimeout(() => {
    // domLetter.style.backgroundColor = 'transparent';
    // domLetter.style.border = 'none';
    // }, this.#flashLengths.HIT);
  }

  missFeedback() {
    this.#GAME_BOARD.style.borderBottom = `${this.#missLineWidth} solid ${
      this.#colors.MISS
    }`;
    setTimeout(() => {
      this.#GAME_BOARD.style.borderBottom = this.#DEFAULT_BORDER;
    }, this.#flashLengths.MISS);
  }
}

const vfx = new VisualEffects();

export default vfx;
