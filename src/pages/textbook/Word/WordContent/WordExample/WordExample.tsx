import classNames from 'classnames';
import { audioConnector } from '../../../../../utils/audioConnector';
import styles from '../index.module.scss';

type StateProps = {
  isCurrentAudioPath: boolean;
};

type OwnProps = {
  textExample: string;
  textExampleTranslate: string;
  audio: string;
};

type Props = StateProps & OwnProps;

const WordExample = ({ textExample, textExampleTranslate, isCurrentAudioPath }: Props) => {
  return (
    <div>
      <h4
        className={classNames([styles.title], {
          [styles.active]: isCurrentAudioPath,
        })}
        dangerouslySetInnerHTML={{ __html: textExample }}
      ></h4>
      <h4 className={styles.text}>{textExampleTranslate}</h4>
    </div>
  );
};

export default audioConnector(WordExample);
