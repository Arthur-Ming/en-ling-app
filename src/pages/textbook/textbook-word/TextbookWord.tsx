import classNames from 'classnames';

import { useParams } from 'react-router';
import { ITextbookWord } from '../../../interfaces';

import AudioButton from './audio-button';
import TextbookWordHeader from './textbook-word-header';
import TextbookWordMeaning from './textbook-word-meaning';

import styles from './textbook-word.module.scss';

interface OwnProps {
  word: ITextbookWord;
}

type TProps = OwnProps;

const BASE = 'https://react-learnwords-example.herokuapp.com/';

const TextbookWord = ({ word }: TProps) => {
  const { group } = useParams();
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
  } = word;

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={`${BASE}${image}`} alt={wordText} />
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
          <div>
            <h5 dangerouslySetInnerHTML={{ __html: textExample }}></h5>
            <h5>{textExampleTranslate}</h5>
          </div>
        </div>
        <div className={styles.buttons}>
          <button>button</button>
        </div>
      </div>
      <svg
        className={classNames(styles.label, styles[`level-${group}`])}
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"
        ></path>
      </svg>
      <AudioButton audio={audio} audioMeaning={audioMeaning} audioExample={audioExample} id={id} />
    </div>
  );
};

export default TextbookWord;
