import { connect } from 'react-redux';
import { currentAudioPathSelector } from '../redux/selectors/audio';
import { RootState } from '../redux/store';

export interface IAudioConnector {
  audio: string;
}

const mapStateToProps = (state: RootState, { audio }: IAudioConnector) => ({
  isCurrentAudioPath: currentAudioPathSelector(state) === audio,
});

export const audioConnector = connect(mapStateToProps);
