import { ReactComponent as AudioIcon } from './audio.svg';
import { ReactComponent as MuteIcon } from './mute.svg';
import styles from './audio-button.module.scss';
import { connect } from 'react-redux';
import { audioStart, audioStop } from '../../../../redux/actions';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../../redux/store';
import { currentAudioWordIdSelector } from '../../../../redux/selectors';
import classNames from 'classnames';

interface OwnProps {
  audio: string;
  audioMeaning: string;
  audioExample: string;
  id: string;
}

interface StateProps {
  isCurrentAudio: boolean;
}

interface DispatchProps {
  onAudioStart: () => void;
  onAudioStop: () => void;
}

type TProps = OwnProps & DispatchProps & StateProps;

const AudioButton = ({ onAudioStart, onAudioStop, isCurrentAudio }: TProps) => {
  return isCurrentAudio ? (
    <button className={styles.button} onClick={onAudioStop}>
      <MuteIcon className={styles.mute} />
    </button>
  ) : (
    <button className={styles.button} onClick={onAudioStart}>
      <AudioIcon className={styles.icon} />
    </button>
  );
};

const mapStateToProps = (state: RootState, { id }: OwnProps) => ({
  isCurrentAudio: currentAudioWordIdSelector(state) === id,
});

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
  { audio, audioMeaning, audioExample, id }: OwnProps
) => ({
  onAudioStart: () => dispatch(audioStart(audio, audioMeaning, audioExample, id)),
  onAudioStop: () => dispatch(audioStop()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AudioButton);
