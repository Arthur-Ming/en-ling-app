import classNames from 'classnames';
import { audioConnector, IAudioConnector } from '../audioConnector';
import styles from '../textbook-word.module.scss';

interface OwnProps extends IAudioConnector {
  textMeaning: string;
  textMeaningTranslate: string;
}

interface StateProps {
  isCurrentAudioPath: boolean;
}

type Props = OwnProps & StateProps;

const TextbookWordMeaning = ({ textMeaning, textMeaningTranslate, isCurrentAudioPath }: Props) => (
  <div>
    <h4
      className={classNames(styles.text, {
        [styles.active]: isCurrentAudioPath,
      })}
      dangerouslySetInnerHTML={{ __html: textMeaning }}
    ></h4>
    <h4 className={styles.text}>{textMeaningTranslate}</h4>
  </div>
);

export default audioConnector(TextbookWordMeaning);
