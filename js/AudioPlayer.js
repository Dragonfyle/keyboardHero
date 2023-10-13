class Player {
  #backgroundSong;
  #dlProgress;
  constructor() {
    this.#dlProgress = document.querySelector('#download');
    this.#backgroundSong = new Audio('./audio/Universe is a wave.mp3');
    this.#ShowDlProgress();
    window.addEventListener('gamestart', () => this.#backgroundSong.play());
    window.addEventListener('gamepause', () => this.#backgroundSong.pause());
    window.addEventListener('gameresume', () => this.#backgroundSong.play());
    window.addEventListener('wrapup', () => this.#handleGameEnd());
  }
  get backgroundSong() {
    return this.#backgroundSong;
  }

  #handleGameEnd() {
    this.#backgroundSong.pause();
    this.#resetSong();
  }

  #resetSong() {
    this.#backgroundSong.currentTime = 0;
  }

  #ShowDlProgress() {
    this.#backgroundSong.onprogress = (e) => {
      if (e.total > 0) {
        console.log(e);
        const loaded = e.loaded;
        const total = e.total;
        const percent = (loaded / total) * 100;
        this.#dlProgress.value = percent;
      }
    };
  }
}

const BackgroundPlayer = new Player();

export default BackgroundPlayer;
