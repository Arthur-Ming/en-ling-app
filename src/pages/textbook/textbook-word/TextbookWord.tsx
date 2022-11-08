import { ITextbookWord } from '../../../interfaces';
import TextbookWordAudioButton from './textbook-word-audio-button';
import TextbookWordExample from './textbook-word-example';
import TextbookWordHeader from './textbook-word-header';
import TextbookWordMeaning from './textbook-word-meaning';
import { ReactComponent as LabelIcon } from './label.svg';
import styles from './textbook-word.module.scss';
import classNames from 'classnames';
import { apiRoutes } from '../../../utils/apiRoutes';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/reducer';
import { userWordsDifficultySelector } from '../../../redux/selectors/userWords';

type OwnProps = {
  word: ITextbookWord;
  children?: JSX.Element;
};

type StateProps = {
  isWordHard: boolean;
  isWordEasy: boolean;
};

type Props = OwnProps & StateProps;

const TextbookWord = ({ word, children, isWordHard, isWordEasy }: Props) => {
  const {
    id,
    word: wordText,
    image,
    transcription,
    wordTranslate,
    textMeaning,
    textMeaningTranslate,
    textExample,
    textExampleTranslate,
    audio,
    audioMeaning,
    audioExample,
    group,
  } = word;

  return (
    <div
      className={classNames(styles.root, {
        [styles.easy]: isWordEasy,
        [styles.hard]: isWordHard,
      })}
    >
      <img className={styles.icon} src={apiRoutes.files(image)} alt={wordText} />
      <div className={styles.content}>
        <TextbookWordHeader
          wordText={wordText}
          transcription={transcription}
          wordTranslate={wordTranslate}
          audio={audio}
        />
        <div className={styles.body}>
          <TextbookWordMeaning
            textMeaning={textMeaning}
            textMeaningTranslate={textMeaningTranslate}
            audio={audioMeaning}
          />
          <TextbookWordExample
            textExample={textExample}
            textExampleTranslate={textExampleTranslate}
            audio={audioExample}
          />
        </div>
        <div className={styles.buttons}>
          {children}
          <TextbookWordAudioButton id={id} />
        </div>
      </div>
      <LabelIcon className={classNames(styles.label, styles[`level-${group + 1}`])} />
    </div>
  );
};

const mapStateToProps = (state: RootState, { word }: OwnProps) => ({
  isWordHard: userWordsDifficultySelector(state, word.id) === 'hard',
  isWordEasy: userWordsDifficultySelector(state, word.id) === 'easy',
});

export default connect(mapStateToProps)(TextbookWord);
