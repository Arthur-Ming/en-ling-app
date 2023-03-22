import classNames from 'classnames';
import { audioConnector } from '../../../../../utils/audioConnector';
import styles from '../index.module.scss';

type StateProps = {
  isCurrentAudioPath: boolean;
};

type OwnProps = {
  textMeaning: string;
  textMeaningTranslate: string;
  audio: string;
};

type Props = StateProps & OwnProps;

const WordMeaning = ({ textMeaning, textMeaningTranslate, isCurrentAudioPath }: Props) => {
  return (
    <div>
      <h4
        className={classNames([styles.title], {
          [styles.active]: isCurrentAudioPath,
        })}
        dangerouslySetInnerHTML={{ __html: textMeaning }}
      ></h4>
      <h4 className={styles.text}>{textMeaningTranslate}</h4>
    </div>
  );
};

export default audioConnector(WordMeaning);
