import Calc from './Calc.js';
import DifficultySlider from './Slider.js';
import InitialValues from './InitialValues.js';

class Config {
  #InitialValues;
  constructor(InitialValues) {
    this.#InitialValues = InitialValues;
  }
  get KEY_COLOR() {
    return this.#InitialValues.KEY_COLOR;
  }

  get statNames() {
    return this.#InitialValues.statNames;
  }

  get fallStep() {
    return this.#InitialValues.speedParameters.fallStep;
  }

  get speedParameters() {
    return this.#InitialValues.speedParameters;
  }

  get GAME_LENGTH() {
    return this.#InitialValues.GAME_LENGTH;
  }

  #assignDelay(handlePosition, delayConfig, delayParameter) {
    const parameter = delayConfig[delayParameter];

    function generateValidDelay() {
      if (handlePosition * parameter.MULTIPLIER > parameter.MIN_VALUE) {
        return handlePosition * parameter.MULTIPLIER;
      } else {
        return parameter.MIN_VALUE;
      }
    }

    this.#InitialValues.speedParameters[delayParameter] = generateValidDelay();
  }

  #assignFallStep(draggablePosReversed, { MIN_VALUE, MAX_VALUE }) {
    const offsetParameters = {
      sliderMinOffset: MIN_VALUE,
      sliderMaxOffset: MAX_VALUE,
      TARGET_MIN_OFFSET: 1,
      TARGET_MAX_OFFSET: 6,
    };
    const newFallStep = Calc.rescaletOffsetRange(
      draggablePosReversed,
      offsetParameters
    );
    this.#InitialValues.speedParameters.fallStep = newFallStep;
  }

  #assignDelayFactor({ fallStep, MULTIPLIER }) {
    this.#InitialValues.speedParameters.delayFactor = fallStep * MULTIPLIER;
  }

  difficultySet(handlePosition, draggablePosReversed) {
    this.#assignDelay(
      handlePosition,
      this.#InitialValues.delayConfig,
      'minDelay'
    );
    this.#assignDelay(
      handlePosition,
      this.#InitialValues.delayConfig,
      'delaySpread'
    );
    this.#assignFallStep(draggablePosReversed, DifficultySlider.sliderRange);
    this.#assignDelayFactor(this.#InitialValues.speedParameters);
  }
}

const GameConfig = new Config(InitialValues);

export default GameConfig;
