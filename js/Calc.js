export default class Calc {
  static convertKeyCodeToLetter(keyCode) {
    return String.fromCharCode(keyCode[0]).toLowerCase();
  }

  static rescaletOffsetRange(
    draggablePosReversed,
    { sliderMinOffset, sliderMaxOffset, TARGET_MIN_OFFSET, TARGET_MAX_OFFSET }
  ) {
    const proportion =
      (draggablePosReversed - sliderMinOffset) /
      (sliderMaxOffset - sliderMinOffset);
    const scaledNumber =
      TARGET_MIN_OFFSET + proportion * (TARGET_MAX_OFFSET - TARGET_MIN_OFFSET);
    return scaledNumber;
  }

  static getRandomDelay({ delaySpread, minDelay, delayFactor }) {
    const MAX_DELAY = 2500;
    const newDelay =
      (Math.floor(Math.random() * delaySpread) + minDelay) / delayFactor;

    return Math.min(newDelay, MAX_DELAY);
  }

  static calculateAccuracy({ hit, miss }) {
    return Math.floor((hit / (hit + miss)) * 100);
  }

  static calculateTotalStats(statsByLetter) {
    const statsTotal = {
      hit: null,
      miss: null,
      accuracy: null,
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
