class Emitter {
  letterHit(letterId) {
    dispatchEvent(
      new CustomEvent('letterHit', {
        detail: letterId,
      })
    );
  }

  gameStart() {
    dispatchEvent(new Event('gameStart'));
  }

  gameEnd() {
    dispatchEvent(new Event('gameEnd'));
  }

  statsReady() {
    dispatchEvent(new CustomEvent('statsReady'));
  }
}

const EventEmitter = new Emitter();

export default EventEmitter;
