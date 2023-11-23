class InitValues {
  constructor() {
    this.GAME_LENGTH = 75;

    this.statNames = {
      HIT: 'hit',
      MISS: 'miss',
      ACCURACY: 'accuracy',
    };

    this.totalStats = {
      HIT: 0,
      MISS: 0,
      ACCURACY: 0,
    };

    this.statsByLetter = {
      HIT: 0,
      MISS: 0,
      ACCURACY: 0,
    };

    this.speedParameters = {
      delaySpread: null,
      minDelay: null,
      fallStep: null,
      delayFactor: null,
      MULTIPLIER: 0.4,
    };

    this.delayConfig = {
      minDelay: {
        MIN_VALUE: 150,
        MULTIPLIER: 15,
      },
      delaySpread: {
        MIN_VALUE: 250,
        MULTIPLIER: 22,
      },
    };

    this.DESTRUCTION_DELAY = 2000;

    this.KEY_COLOR = 'rgba(185, 185, 185)';

    this.COLOR_MAP = {
      TOP1: 'rgb(16, 255, 143)',
      TOP2: 'rgb(198, 220, 164)',
      TOP3: 'rgb(253, 200, 164)',
      TOP4: 'rgb(253, 130, 130)',
    };
  }
}

const InitialValues = new InitValues();
export default InitialValues;
