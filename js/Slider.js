class Slider {
  #slider;
  #draggable;
  #isActive;
  #isDraggable;
  #sliderRange;
  #sliderDimensions;
  #draggableOffsetTop;
  #KEY_STEP;
  #DRAGGABLE_INIT_POS;
  constructor() {
    this.#slider = document.querySelector('.difficulty-slider');
    this.#draggable = document.querySelector('.difficulty-slider__draggable');

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
    this.#draggableOffsetTop = null;
    this.#KEY_STEP = 5;
    this.#DRAGGABLE_INIT_POS = 300;

    this.#initStyles();
    this.#initEventListeners();
  }
  #initEventListeners() {
    this.#draggable.addEventListener('mousedown', (e) =>
      this.#PressMouseBtn(e)
    );
    window.addEventListener('mouseup', () => this.#releaseMouseBtn());
    window.addEventListener('mousemove', (e) => this.#reactToDrag(e));
    window.addEventListener('keydown', (e) => this.#reactToKeys(e));
  }

  #initStyles() {
    this.#slider.style.zIndex = '9999';
    this.#setInitialPosition();
  }

  #setInitialPosition() {
    this.#draggable.style.top = `${this.#DRAGGABLE_INIT_POS}px`;
    this.#draggableOffsetTop = this.#DRAGGABLE_INIT_POS;
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
    this.#draggable.style.opacity = `${opacity}%`;
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

  #moveDraggable(offset) {
    this.#draggable.style.top = `${offset}px`;
    this.#draggableOffsetTop = offset;
  }

  #reactToDrag(e) {
    if (this.#isDraggable) {
      const offset = this.#getOffset(e.clientY, this.#sliderDimensions);
      this.#moveDraggable(offset);
    }
  }

  #reactToKeys(e) {
    if (this.#isActive) {
      if (e.keyCode === 40) {
        this.#draggable.style.top = `${
          this.#draggableOffsetTop + this.#KEY_STEP
        }px`;
        this.#draggableOffsetTop = this.#draggableOffsetTop + this.#KEY_STEP;
      } else if (e.keyCode === 38) {
        this.#draggable.style.top = `${
          this.#draggableOffsetTop - this.#KEY_STEP
        }px`;
        this.#draggableOffsetTop = this.#draggableOffsetTop - this.#KEY_STEP;
      }
    }
  }

  #calculateDraggablePos({ height }) {
    const offsetPercent = Math.round(
      (this.#draggable.offsetTop / height) * 100
    );
    return offsetPercent;
  }

  #reversePosition(draggablePosition, { MIN_VALUE, MAX_VALUE }) {
    return MAX_VALUE - draggablePosition + MIN_VALUE;
  }

  get draggablePos() {
    return this.#calculateDraggablePos(this.#sliderDimensions);
  }

  get draggablePosReversed() {
    return this.#reversePosition(this.draggablePos, this.#sliderRange);
  }

  get sliderRange() {
    return this.#sliderRange;
  }
}

const DifficultySlider = new Slider();

export default DifficultySlider;
