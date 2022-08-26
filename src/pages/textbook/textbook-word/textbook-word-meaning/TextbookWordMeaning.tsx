import classNames from 'classnames';
import { connect } from 'react-redux';
import { currentAudioPathSelector } from '../../../../redux/selectors';
import { RootState } from '../../../../redux/store';
import styles from '../textbook-word.module.scss';

interface OwnProps {
  textMeaning: string;
  textMeaningTranslate: string;
  audio: string;
}

interface StateProps {
  isCurrentAudioPath: boolean;
}

type TProps = OwnProps & StateProps;

const TextbookWordMeaning = ({ textMeaning, textMeaningTranslate, isCurrentAudioPath }: TProps) => {
  return (
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
};

const mapStateToProps = (state: RootState, { audio }: OwnProps) => ({
  isCurrentAudioPath: currentAudioPathSelector(state) === audio,
});

export default connect(mapStateToProps)(TextbookWordMeaning);
