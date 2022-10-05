import classNames from 'classnames';
import { audioConnector, IAudioConnector } from '../audioConnector';
import styles from '../textbook-word.module.scss';

interface OwnProps extends IAudioConnector {
  textExample: string;
  textExampleTranslate: string;
}

interface StateProps {
  isCurrentAudioPath: boolean;
}

type Props = OwnProps & StateProps;

const TextbookWordExample = ({ textExample, textExampleTranslate, isCurrentAudioPath }: Props) => (
  <div>
    <h4
      className={classNames(styles.text, {
        [styles.active]: isCurrentAudioPath,
      })}
      dangerouslySetInnerHTML={{ __html: textExample }}
    ></h4>
    <h4 className={styles.text}>{textExampleTranslate}</h4>
  </div>
);

export default audioConnector(TextbookWordExample);
