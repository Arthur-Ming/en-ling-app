import { useParams } from 'react-router';
import { ITextbookWord } from '../../../interfaces';
import AudioButton from './audio-button';
import TextbookWordExample from './textbook-word-example';
import TextbookWordHeader from './textbook-word-header';
import TextbookWordMeaning from './textbook-word-meaning';

import { ReactComponent as LabelIcon } from './label.svg';

import styles from './textbook-word.module.scss';
import classNames from 'classnames';
import { apiRoutes } from '../../../utils/apiRoutes';

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
      <img className={styles.icon} src={apiRoutes.img.absolute(image)} alt={wordText} />
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
          <div>
            <button>button</button>
            <button>button</button>
          </div>
          <AudioButton
            audio={audio}
            audioMeaning={audioMeaning}
            audioExample={audioExample}
            id={id}
          />
        </div>
      </div>
      <LabelIcon className={classNames(styles.label, styles[`level-${group}`])} />
    </div>
  );
};

export default TextbookWord;
