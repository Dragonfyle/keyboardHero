import GameStatus from './Status.js';

export default class Organizer {
  static sortStatsByLetter() {
    const letterStats = Object.entries(GameStatus.statsByLetter);
    const sortedStats = letterStats.sort((a, b) => {
      return b[1].accuracy - a[1].accuracy;
    });
    return sortedStats;
  }

  static divideIntoColors(sortedLetterStats) {
    const colorMap = GameStatus.colorMap;

    for (let letter of sortedLetterStats) {
      let group;
      const keyCode = letter[0];
      const accuracy = letter[1].accuracy;

      (function decideColor() {
        if (accuracy >= 80) {
          group = 'top1';
        } else if (accuracy >= 65 && accuracy < 80) {
          group = 'top2';
        } else if (accuracy >= 50 && accuracy < 65) {
          group = 'top3';
        } else {
          group = 'top4';
        }
      })(letter);

      colorMap[group].keyCodes.push(keyCode);
    }
  }

  static formatTime() {
    const timeLeft = GameStatus.timeLeft;
    const MINUTE = 60;
    const seconds = timeLeft % MINUTE;
    const SINGLE_DIGIT = 9;
    const timeFormat = {};

    function add0() {
      return `0${seconds}`;
    }

    if (timeLeft < MINUTE) {
      timeFormat.minutes = '0';
      timeFormat.seconds = timeLeft > SINGLE_DIGIT ? timeLeft : add0();
    } else {
      timeFormat.minutes = Math.floor(timeLeft / MINUTE);
      timeFormat.seconds = seconds > SINGLE_DIGIT ? seconds : add0();
    }

    return `${timeFormat.minutes} : ${timeFormat.seconds}`;
  }

  static formatTotalStat(statName) {
    const totalStats = GameStatus.statsTotal;
    const SUBSTITUTE = '---';
    if (statName !== 'accuracy') {
      return `${statName} : ${totalStats[statName]}`;
    } else {
      if (totalStats.hit === 0 && totalStats.miss === 0) {
        return `${statName} : ${SUBSTITUTE}`;
      } else {
        return `${statName} : ${totalStats[statName]}%`;
      }
    }
  }

  static formatLetterStat(letter, keyCode) {
    return `${letter}:  ${keyCode[1].accuracy}%`;
  }

  static sortStats() {
    const sortedStats = Organizer.sortStatsByLetter();
    GameStatus.updateSortedStats(sortedStats);
  }
}
