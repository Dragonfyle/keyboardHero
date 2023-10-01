export default class Emitter {
  static letterHit(letterId) {
    dispatchEvent(
      new CustomEvent('letterHit', {
        detail: letterId,
      })
    );
  }

  static gameStart() {
    dispatchEvent(new Event('gameStart'));
  }

  static gameEnd() {
    dispatchEvent(new Event('gameEnd'));
  }

  static statsReady() {
    dispatchEvent(new CustomEvent('statsReady'));
  }
}

// const EventEmitter = new Emitter();

// export default EventEmitter;
