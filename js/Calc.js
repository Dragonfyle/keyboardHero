export default class Calc {
  static convertKeyCodeToLetter(keyCode) {
    return String.fromCharCode(keyCode[0]).toLowerCase();
  }

  static rescaletOffsetRange(
    number,
    { sliderMinOffset, sliderMaxOffset, TARGET_MIN_OFFSET, TARGET_MAX_OFFSET }
  ) {
    const proportion =
      (number - sliderMinOffset) / (sliderMaxOffset - sliderMinOffset);
    const scaledNumber =
      TARGET_MIN_OFFSET + proportion * (TARGET_MAX_OFFSET - TARGET_MIN_OFFSET);
    return scaledNumber;
  }

  static getRandomDelay({ delaySpread, minDelay, delayFactor }) {
    const MAX_DELAY = 2500;
    const newDelay =
      (Math.floor(Math.random() * delaySpread) + minDelay) / delayFactor;

    return newDelay <= MAX_DELAY ? newDelay : MAX_DELAY;
  }

  static calculateAccuracy({ hit, miss }) {
    return Math.floor((hit / (hit + miss)) * 100);
  }

  static calculateTotalStats(statsByLetter) {
    const statsTotal = {
      hit: 0,
      miss: 0,
      accuracy: 0,
    };

    for (let letter in statsByLetter) {
      const letterStats = statsByLetter[letter];
      statsTotal.hit += letterStats.hit;
      statsTotal.miss += letterStats.miss;
    }

    statsTotal.accuracy = Calc.calculateAccuracy(statsTotal);
    return statsTotal;
  }
}
