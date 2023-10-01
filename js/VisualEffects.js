class VisualEffects {
  #flashLength;
  constructor() {
    this.#flashLength = 80;
  }
  get flashLength() {
    return this.#flashLength;
  }

  hitFeedback(domLetter) {
    domLetter.style.backgroundColor = 'blue';
    setTimeout(() => {
      domLetter.style.backgroundColor = 'transparent';
    }, this.#flashLength);
  }

  missFeedback(boardGameBorder) {
    boardGameBorder.style.borderBottom = '2px solid red';
    setTimeout(() => {
      boardGameBorder.style.borderBottom = 'none';
    }, this.#flashLength);
  }
}

const vfx = new VisualEffects();

export default vfx;
