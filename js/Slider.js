class Slider {
  #slider;
  #handle;
  #isActive;
  #isDraggable;
  #sliderRange;
  #sliderDimensions;
  constructor() {
    this.#slider = document.querySelector('.difficulty-slider');
    this.#handle = document.querySelector('.difficulty-slider__handle');

    this.#sliderDimensions = {
      height: this.#slider.offsetHeight,
      offsetTop: this.#slider.offsetTop,
      TOP_LIMIT: 1,
      bottomLimit: this.#slider.offsetHeight,
    };

    this.#sliderRange = {
      MIN_VALUE: 1,
      MAX_VALUE: 100,
    };

    this.#isActive = true;
    this.#isDraggable = false;

    this.#initStyles()
    this.#initEventListeners();
  }
  #initEventListeners() {
    this.#handle.addEventListener('mousedown', (e) => this.#PressMouseBtn(e));
    document.addEventListener('mouseup', () => this.#releaseMouseBtn());
    window.addEventListener('mousemove', (e) => this.#reactToDrag(e));
  }

  #initStyles() {
    this.#slider.style.zIndex = '9999';
  }

  #PressMouseBtn(e) {
    e.preventDefault();
    if (this.#isActive) {
      this.#setDraggable(true);
    }
  }

  #releaseMouseBtn() {
    this.#setDraggable(false);
  }

  #setDraggable(boolean) {
    this.#isDraggable = boolean;
  }

  reveal(boolean, opacity) {
    this.#isActive = boolean;
    this.#setOpacity(opacity);
  }

  #setOpacity(opacity) {
    this.#slider.style.opacity = `${opacity}%`;
    this.#handle.style.opacity = `${opacity}%`;
  }

  #getOffset(clientY, { offsetTop, TOP_LIMIT, bottomLimit }) {
    const mouseOffset = clientY - offsetTop;

    //the values are reversed due to offset being calculated from the top to bottom
    if (mouseOffset < TOP_LIMIT) {
      return TOP_LIMIT;
    } else if (mouseOffset > bottomLimit) {
      return bottomLimit;
    } else {
      return mouseOffset;
    }
  }

  #moveHandle(offset) {
    this.#handle.style.top = `${offset}px`;
  }

  #reactToDrag(e) {
    if (this.#isDraggable) {
      const offset = this.#getOffset(e.clientY, this.#sliderDimensions);
      this.#moveHandle(offset);
    }
  }

  #calculateHandlePosition({ height }) {
    const offsetPercent = Math.round((this.#handle.offsetTop / height) * 100);
    return offsetPercent;
  }

  #reversePosition(handlePosition, { MIN_VALUE, MAX_VALUE }) {
    return MAX_VALUE - handlePosition + MIN_VALUE;
  }

  get handlePosition() {
    return this.#calculateHandlePosition(this.#sliderDimensions);
  }

  get handlePositionReversed() {
    return this.#reversePosition(this.handlePosition, this.#sliderRange);
  }

  get sliderRange() {
    return this.#sliderRange;
  }
}

const DifficultySlider = new Slider();

export default DifficultySlider;
