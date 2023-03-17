import AudioButton from '../../../components/audio-button';
import { ITextbookWord } from '../../../interfaces';
import { apiRoutes } from '../../../utils/apiRoutes';
import styles from './index.module.scss';
import { ReactComponent as LabelIcon } from './label.svg';
import { AiFillFire } from 'react-icons/ai';
import WordTicketAudio from './WordTicketAudio';
//AiFillFire

type Props = {
  word: ITextbookWord;
};

const WordTicket = ({ word }: Props) => {
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
  console.log(audio);
  return (
    <div className={styles.box}>
      <div className={styles.info}>
        <div className={styles.image}>
          <img src={apiRoutes.files(image)} alt={wordText} />
        </div>
        <h3 className={styles.title}>{`${wordText} - ${transcription} - ${wordTranslate}`}</h3>
      </div>

      <div className={styles.buttons}>
        <AiFillFire className={styles.icon} />
        <WordTicketAudio id={id} audio={audio} />
      </div>
      <LabelIcon className={styles.label} />
    </div>
  );
};

export default WordTicket;
