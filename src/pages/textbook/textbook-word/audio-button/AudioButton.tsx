import { ReactComponent as AudioIcon } from './audio.svg';
import { ReactComponent as MuteIcon } from './mute.svg';
import styles from './audio-button.module.scss';
import { connect } from 'react-redux';
import { audioStart, audioStop } from '../../../../redux/actions/audio';
import { AppDispatch, RootState } from '../../../../redux/store';
import { currentAudioWordIdSelector } from '../../../../redux/selectors/audio';

interface OwnProps {
  id: string;
}

interface StateProps {
  isCurrentAudio: boolean;
}

interface DispatchProps {
  onAudioStart: () => void;
  onAudioStop: () => void;
}

type Props = OwnProps & DispatchProps & StateProps;

const AudioButton = ({ onAudioStart, onAudioStop, isCurrentAudio }: Props) => {
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

const mapDispatchToProps = (dispatch: AppDispatch, { id }: OwnProps) => ({
  onAudioStart: () => dispatch(audioStart(id)),
  onAudioStop: () => dispatch(audioStop()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AudioButton);
