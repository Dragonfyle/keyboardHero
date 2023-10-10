class VisualEffects {
  #flashLengths;
  #colors;
  #missLineWidth;
  #GAME_BOARD;
  #DEFAULT_BORDER;
  constructor() {
    this.#GAME_BOARD = document.querySelector('.game-board');

    this.#DEFAULT_BORDER = this.#GAME_BOARD.style.borderBottom;
    this.#flashLengths = {
      HIT: 200,
      MISS: 90,
    };
    this.#colors = {
      HIT: '#DECDF5',
      MISS: '#E5446D',
    };
    this.#missLineWidth = '4px';
  }
  get flashLengths() {
    return this.#flashLengths;
  }

  hitFeedback(domLetter) {
    domLetter.style.backgroundColor = this.#colors.HIT;
    setTimeout(() => {
      domLetter.style.backgroundColor = 'transparent';
    }, this.#flashLengths.HIT);
  }

  missFeedback(boardGameBorder) {
    boardGameBorder.style.borderBottom = `${this.#missLineWidth} solid ${
      this.#colors.MISS
    }`;
    setTimeout(() => {
      boardGameBorder.style.borderBottom = this.#DEFAULT_BORDER;
    }, this.#flashLengths.MISS);
  }
}

const vfx = new VisualEffects();

export default vfx;
