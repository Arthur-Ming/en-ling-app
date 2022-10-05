import classNames from 'classnames';
import { audioConnector, IAudioConnector } from '../audioConnector';
import styles from '../textbook-word.module.scss';

interface StateProps {
  isCurrentAudioPath: boolean;
}

interface OwnProps extends IAudioConnector {
  wordText: string;
  transcription: string;
  wordTranslate: string;
}

type Props = OwnProps & StateProps;

const TextbookWordHeader = ({
  wordText,
  transcription,
  wordTranslate,
  isCurrentAudioPath,
}: Props) => (
  <div>
    <h3
      className={classNames(styles.title, {
        [styles.active]: isCurrentAudioPath,
      })}
    >{`${wordText} - ${transcription} - ${wordTranslate}`}</h3>
  </div>
);

export default audioConnector(TextbookWordHeader);
