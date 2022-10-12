import { AUDIO, FAILURE, START, STOP } from '../action-types';
import { apiRoutes } from '../../utils/apiRoutes';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IAudioAction } from '../../interfaces';
import {
  wordAudioByIdSelector,
  wordExampleAudioByIdSelector,
  wordMeaningAudioByIdSelector,
} from '../selectors/textbook';

let player: HTMLAudioElement | null = null;

export const audioStart =
  (wordId: string) => (dispatch: Dispatch<IAudioAction>, getState: () => RootState) => {
    if (player) {
      dispatch({ type: AUDIO + STOP });
      player.pause();
    }
    const state = getState();
    const audio = wordAudioByIdSelector(state, wordId);
    const audioMeaning = wordMeaningAudioByIdSelector(state, wordId);
    const audioExample = wordExampleAudioByIdSelector(state, wordId);

    player = new Audio(apiRoutes.files(audio));

    player.addEventListener('error', (error) => {
      player = null;
      dispatch({ error: error.type, type: AUDIO + FAILURE });
    });

    player.addEventListener('canplay', () => {
      player && player.play();
    });

    player.addEventListener('play', () => {
      dispatch({ path: audio, wordId, type: AUDIO + START });
    });

    player.addEventListener('ended', () => {
      player = new Audio(apiRoutes.files(audioMeaning));

      player.addEventListener('error', (error) => {
        player = null;
        dispatch({ error, type: AUDIO + FAILURE });
      });

      player.addEventListener('canplay', () => {
        player && player.play();
      });
      player.addEventListener('play', () => {
        dispatch({ path: audioMeaning, wordId, type: AUDIO + START });
      });

      player.addEventListener('ended', () => {
        player = new Audio(apiRoutes.files(audioExample));

        player.addEventListener('error', (error) => {
          player = null;
          dispatch({ error, type: AUDIO + FAILURE });
        });

        player.addEventListener('canplay', () => {
          player && player.play();
        });
        player.addEventListener('play', () => {
          dispatch({ path: audioExample, wordId, type: AUDIO + START });
        });

        player.addEventListener('ended', () => {
          player = null;
          dispatch({ type: AUDIO + STOP });
        });
      });
    });
  };

export const audioStop = () => (dispatch: Dispatch<AnyAction>) => {
  player && player.pause();
  player = null;
  dispatch({ type: AUDIO + STOP });
};
