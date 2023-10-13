class Player {
  #BCG_SONG;
  #DL_PROGRESS;
  constructor() {
    this.#DL_PROGRESS = document.querySelector('#download');
    this.#BCG_SONG = new Audio('./audio/Universe is a wave.mp3');
    this.#ShowDlProgress();

    window.addEventListener('gamestart', () => this.#BCG_SONG.play());
    window.addEventListener('gamepause', () => this.#BCG_SONG.pause());
    window.addEventListener('gameresume', () => this.#BCG_SONG.play());
    window.addEventListener('wrapup', () => this.#handleGameEnd());
  }
  get backgroundSong() {
    return this.#BCG_SONG;
  }

  #handleGameEnd() {
    this.#BCG_SONG.pause();
    this.#resetSong();
  }

  #resetSong() {
    this.#BCG_SONG.currentTime = 0;
  }

  #ShowDlProgress() {
    const MULTIPLIER = 100;
    const REFRESH_FREQ = 50;

    const notActualDl = setInterval(() => {
      this.#DL_PROGRESS.value +=
        (this.#DL_PROGRESS.max - this.#DL_PROGRESS.value) / MULTIPLIER;
    }, REFRESH_FREQ);
    this.#BCG_SONG.oncanplaythrough = () => {
      this.#DL_PROGRESS.value = 100;
      clearInterval(notActualDl);
    };
  }
}

const BackgroundPlayer = new Player();

export default BackgroundPlayer;
