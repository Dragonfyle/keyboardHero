export default class Emitter {
  static letterHit(letterId) {
    dispatchEvent(
      new CustomEvent('letterHit', {
        detail: letterId,
      })
    );
  }

  static gameStart() {
    dispatchEvent(new Event('gamestart'));
  }

  static gameEnd() {
    dispatchEvent(new Event('gameend'));
  }

  static gamePause() {
    dispatchEvent(new CustomEvent('gamepause'));
  }

  static gameWrapedUp() {
    dispatchEvent(new CustomEvent('wrapup'));
  }

  static gameResume() {
    dispatchEvent(new CustomEvent('gameresume'));
  }

  static statsReady() {
    dispatchEvent(new CustomEvent('statsready'));
  }

  static audioReady() {
    dispatchEvent(new CustomEvent('audioready'));
  }
}
