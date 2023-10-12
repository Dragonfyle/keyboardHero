class Player {
  #backgroundSong;
  constructor() {
    this.#backgroundSong = new Audio('./audio/Universe is a wave.mp3');
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
}

const BackgroundPlayer = new Player();

export default BackgroundPlayer;
