class InitValues {
  constructor() {
    this.GAME_LENGTH = 80;

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

    this.KEY_COLOR = 'rgba(180, 180, 180)';

    this.COLOR_MAP = {
      TOP1: 'rgb(18, 255, 143)',
      TOP2: 'rgb(200, 220, 164)',
      TOP3: 'rgb(255, 200, 164)',
      TOP4: 'rgb(255, 130, 130)',
    };
  }
}

const InitialValues = new InitValues();
export default InitialValues;
