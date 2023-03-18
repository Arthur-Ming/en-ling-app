import { AUDIO, FAILURE, START, STOP } from '../action-types';
import { apiRoutes } from '../../utils/apiRoutes';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IAudioAction } from '../../interfaces';

import audioPlayer from '../../utils/audioPlayer';
import { userWordsByIdSelector } from '../selectors/userWords';

export const wordAudioStart =
  (wordId: string, audio: string) => async (dispatch: Dispatch<IAudioAction>) => {
    try {
      dispatch({ path: audio, wordId, type: AUDIO + START });
      await audioPlayer.play(apiRoutes.files(audio));
    } catch (error) {
      dispatch({ error: String(error), type: AUDIO + FAILURE });
    } finally {
      dispatch({ type: AUDIO + STOP });
    }
  };
/* 
export const textbookWordFullAudioStart =
  (wordId: string) => async (dispatch: Dispatch<IAudioAction>, getState: () => RootState) => {
    const state = getState();
    console.log('!!!');
    const word = textbookWordByIdSelector(state, wordId) || userWordsByIdSelector(state, wordId);
    if (!word) return;
    const { audio, audioMeaning, audioExample } = word;

    try {
      dispatch({ path: audio, wordId, type: AUDIO + START });
      await audioPlayer.play(apiRoutes.files(audio));

      dispatch({ path: audioMeaning, wordId, type: AUDIO + START });
      await audioPlayer.play(apiRoutes.files(audioMeaning));

      dispatch({ path: audioExample, wordId, type: AUDIO + START });
      await audioPlayer.play(apiRoutes.files(audioExample));
    } catch (error) {
      dispatch({ error: String(error), type: AUDIO + FAILURE });
    } finally {
      dispatch({ type: AUDIO + STOP });
    }
  }; */

export const audioStop = () => (dispatch: Dispatch<AnyAction>) => {
  audioPlayer.stop();
  dispatch({ type: AUDIO + STOP });
};
