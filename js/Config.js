import Calc from './Calc.js';
import DifficultySlider from './Slider.js';

class Config {
  #speedParameters;
  #delayConfig;
  constructor() {
    this.#speedParameters = {
      delaySpread: null,
      minDelay: null,
      fallStep: null,
      delayFactor: null,
      MULTIPLIER: 0.4,
    };

    this.#delayConfig = {
      minDelay: {
        MIN_VALUE: 150,
        MULTIPLIER: 15,
      },
      delaySpread: {
        MIN_VALUE: 250,
        MULTIPLIER: 22,
      },
    };

    this.COLOR_MAP = {
      TOP1: '#0CCE6B',
      TOP2: '#566E3D',
      TOP3: '#6C4B51',
      TOP4: '#EF2D56',
    };
  }
  get fallStep() {
    return this.#speedParameters.fallStep;
  }

  get speedParameters() {
    return this.#speedParameters;
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

    this.#speedParameters[delayParameter] = generateValidDelay();
  }

  #assignFallStep(handlePositionReversed, { MIN_VALUE, MAX_VALUE }) {
    const offsetParameters = {
      sliderMinOffset: MIN_VALUE,
      sliderMaxOffset: MAX_VALUE,
      TARGET_MIN_OFFSET: 1,
      TARGET_MAX_OFFSET: 6,
    };
    const newFallStep = Calc.rescaletOffsetRange(
      handlePositionReversed,
      offsetParameters
    );
    this.#speedParameters.fallStep = newFallStep;
  }

  #assignDelayFactor({ fallStep, MULTIPLIER }) {
    this.#speedParameters.delayFactor = fallStep * MULTIPLIER;
  }

  difficultySet(handlePosition, handlePositionReversed) {
    this.#assignDelay(handlePosition, this.#delayConfig, 'minDelay');
    this.#assignDelay(handlePosition, this.#delayConfig, 'delaySpread');
    this.#assignFallStep(handlePositionReversed, DifficultySlider.sliderRange);
    this.#assignDelayFactor(this.#speedParameters);
  }
}

const GameConfig = new Config();

export default GameConfig;
