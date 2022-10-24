import { ReactComponent as AudioIcon } from '../../svg/audio.svg';
import { ReactComponent as MuteIcon } from '../../svg/mute.svg';
import styles from './audio-button.module.scss';

type Props = {
  isCurrentAudio: boolean;
  onAudioStart?: () => void;
  onAudioStop?: () => void;
  audioClass?: string;
  muteClass?: string;
  buttonClass?: string;
};

const AudioButton = ({
  onAudioStart,
  onAudioStop,
  isCurrentAudio,
  audioClass = styles.icon,
  muteClass = styles.mute,
  buttonClass = styles.button,
}: Props) => {
  return isCurrentAudio ? (
    <button className={buttonClass} onClick={onAudioStop}>
      <MuteIcon className={muteClass} />
    </button>
  ) : (
    <button className={buttonClass} onClick={onAudioStart}>
      <AudioIcon className={audioClass} />
    </button>
  );
};

export default AudioButton;
