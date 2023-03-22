import { ITextbookWord } from '../../../../interfaces';
import { apiRoutes } from '../../../../utils/apiRoutes';
import WordChosen from '../../WordTicket/WordChosen';
import styles from './index.module.scss';
import WordAudio from './WordAudio';
import WordExample from './WordExample';
import WordMeaning from './WordMeaning';
import WordTranslate from './WordTranslate';

type Props = {
  word?: ITextbookWord;
};

const WordContent = ({ word }: Props) => {
  if (!word) return <div>No content</div>;
  const {
    id: wordId,
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
    <div>
      <div className={styles.image}>
        <img src={apiRoutes.files(image)} alt={wordText} />
      </div>
      <WordTranslate
        wordText={wordText}
        transcription={transcription}
        wordTranslate={wordTranslate}
        audio={audio}
      />
      <WordMeaning
        textMeaning={textMeaning}
        textMeaningTranslate={textMeaningTranslate}
        audio={audioMeaning}
      />
      <WordExample
        textExample={textExample}
        textExampleTranslate={textExampleTranslate}
        audio={audioExample}
      />
      <div>
        <WordAudio
          wordId={wordId}
          audio={audio}
          audioMeaning={audioMeaning}
          audioExample={audioExample}
        />
        <WordChosen word={word} />
      </div>
    </div>
  );
};

export default WordContent;
