import { RootState } from '../store';
import { IAudioState } from '../reducer/audio';
import { selector, Selector } from '.';

const audioSelector: Selector<IAudioState> = (state, field) => selector(state, 'audio')[field];

export const currentAudioWordIdSelector = (state: RootState) => audioSelector(state, 'wordId');

export const currentAudioPathSelector = (state: RootState) => audioSelector(state, 'path');
