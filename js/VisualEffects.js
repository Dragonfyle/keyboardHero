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
      MISS: 80,
    };
    this.#colors = {
      HIT: 'rgb(30, 30, 30)',
      MISS: 'rgb(229, 68, 109)',
    };
    this.#missLineWidth = '3px';
  }

  get flashLengths() {
    return this.#flashLengths;
  }

  #fadeOut(domLetter) {
    domLetter.classList.add('fadeOut');
  }

  hitFeedback(domLetter) {
    domLetter.style.backgroundColor = this.#colors.HIT;
    domLetter.style.border = this.#DEFAULT_BORDER;
    this.#fadeOut(domLetter);
  }

  missFeedback() {
    this.#GAME_BOARD.style.borderBottom = `${this.#missLineWidth} solid ${
      this.#colors.MISS
    }`;
    console.log(this.#GAME_BOARD.style);
    setTimeout(() => {
      this.#GAME_BOARD.style.borderBottom = this.#DEFAULT_BORDER;
    }, this.#flashLengths.MISS);
  }
}

const vfx = new VisualEffects();

export default vfx;
