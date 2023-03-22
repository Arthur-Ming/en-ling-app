import AudioButton from '../../../components/audio-button';
import { ITextbookWord } from '../../../interfaces';
import { apiRoutes } from '../../../utils/apiRoutes';
import styles from './index.module.scss';
import { ReactComponent as LabelIcon } from './label.svg';
import { AiFillFire } from 'react-icons/ai';
import WordTicketAudio from './WordTicketAudio';
import WordChosen from './WordChosen';
import { useNavigate } from 'react-router';

//AiFillFire

type Props = {
  word: ITextbookWord;
};

const WordTicket = ({ word }: Props) => {
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
  const navigate = useNavigate();

  return (
    <div className={styles.box} onClick={() => navigate(wordId)}>
      <div className={styles.info}>
        <div className={styles.image}>
          <img src={apiRoutes.files(image)} alt={wordText} />
        </div>
        <h3 className={styles.title}>{`${wordText} - ${transcription} - ${wordTranslate}`}</h3>
      </div>

      <div className={styles.buttons}>
        <WordChosen word={word} />
        <WordTicketAudio wordId={wordId} audio={audio} />
      </div>
      <LabelIcon className={styles.label} />
    </div>
  );
};

export default WordTicket;
