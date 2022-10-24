class AudioPlayer {
  private player: HTMLAudioElement | null = null;

  play = (path: string) => {
    this.stop();
    return new Promise((resolve, reject) => {
      this.player = new Audio(path);
      this.player.addEventListener('error', () => {
        this.player = null;
        reject(new Error(`Ошибка загрузки файла ${path}`));
      });
      this.player.addEventListener('canplay', () => {
        this.player && this.player.play();
      });
      this.player.addEventListener('ended', () => {
        this.player = null;
        resolve('end');
      });
    });
  };

  stop = () => {
    this.player && this.player.pause();
    this.player = null;
  };
}

const audioPlayer = new AudioPlayer();

export default audioPlayer;
