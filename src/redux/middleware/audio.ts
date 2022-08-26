import { Middleware } from 'redux';
import { AUDIO, FAILURE, START, STOP } from '../constants';

let player: HTMLAudioElement | null = null;

const audio: Middleware<Record<string, unknown>> = () => (next) => async (action) => {
  if (!action.type.startsWith(AUDIO)) return next(action);

  const { type, ...rest } = action;

  switch (type) {
    case AUDIO: {
      const { audioWord, audioMeaning, audioExample, wordId } = action;

      if (player) {
        next({ ...rest, type: type + STOP });
        player.pause();
      }

      player = new Audio(`https://react-learnwords-example.herokuapp.com/${audioWord}`);

      player.addEventListener('error', (error) => {
        player = null;
        next({ ...rest, error, type: type + FAILURE });
      });

      player.addEventListener('canplay', () => {
        player && player.play();
      });
      player.addEventListener('play', () => {
        next({
          ...rest,
          currentAudio: {
            path: audioWord,
            wordId,
          },
          type: type + START,
        });
      });

      player.addEventListener('ended', () => {
        player = new Audio(`https://react-learnwords-example.herokuapp.com/${audioMeaning}`);

        player.addEventListener('error', (error) => {
          player = null;
          next({ ...rest, error, type: type + FAILURE });
        });

        player.addEventListener('canplay', () => {
          player && player.play();
        });
        player.addEventListener('play', () => {
          next({
            ...rest,
            currentAudio: {
              path: audioMeaning,
              wordId,
            },
            type: type + START,
          });
        });

        player.addEventListener('ended', () => {
          player = new Audio(`https://react-learnwords-example.herokuapp.com/${audioExample}`);

          player.addEventListener('error', (error) => {
            player = null;
            next({ ...rest, error, type: type + FAILURE });
          });

          player.addEventListener('canplay', () => {
            player && player.play();
          });
          player.addEventListener('play', () => {
            next({
              ...rest,
              currentAudio: {
                path: audioExample,
                wordId,
              },
              type: type + START,
            });
          });

          player.addEventListener('ended', () => {
            player = null;
            next({ ...rest, type: type + STOP });
          });
        });
      });
      return next({ type, ...rest });
    }

    case AUDIO + STOP: {
      player && player.pause();
      player = null;
      return next(action);
    }
    default:
      return next(action);
  }
};

export default audio;
