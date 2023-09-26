class InitValues {
  constructor() {
    this.GAME_LENGTH = 20;

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

    this.COLOR_MAP = {
      TOP1: '#0CCE6B',
      TOP2: '#566E3D',
      TOP3: '#6C4B51',
      TOP4: '#EF2D56',
    };
  }
}

const InitialValues = new InitValues();
export default InitialValues;
