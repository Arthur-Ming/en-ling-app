import { apiRoutes } from '../../utils/apiRoutes';
import { AppDispatch, RootState } from '../store';

import audioPlayer from '../../utils/audioPlayer';
import { audioFailure, audioStart, audioStop } from '../reducer/audio';

export const wordAudioPlay = (wordId: string, audio: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(audioStart({ path: audio, wordId }));
    await audioPlayer.play(apiRoutes.files(audio));
  } catch (error) {
    dispatch(audioFailure({ error: String(error) }));
  } finally {
    dispatch(audioStop());
  }
};

export const wordFullAudioPlay =
  ({
    wordId,
    audio,
    audioMeaning,
    audioExample,
  }: {
    wordId: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(audioStart({ path: audio, wordId }));
      await audioPlayer.play(apiRoutes.files(audio));

      dispatch(audioStart({ path: audioMeaning, wordId }));
      await audioPlayer.play(apiRoutes.files(audioMeaning));

      dispatch(audioStart({ path: audioExample, wordId }));
      await audioPlayer.play(apiRoutes.files(audioExample));
    } catch (error) {
      dispatch(audioFailure({ error: String(error) }));
    } finally {
      dispatch(audioStop());
    }
  };

export const wordAudioStop = () => (dispatch: AppDispatch) => {
  audioPlayer.stop();
  dispatch(audioStop());
};
