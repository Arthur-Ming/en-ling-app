import styles from '../index.module.scss';

type Props = {
  wordText: string;
  transcription: string;
  wordTranslate: string;
  audio: string;
};

const WordTranslate = ({ wordText, transcription, wordTranslate }: Props) => {
  return <h3 className={styles.title}>{`${wordText} - ${transcription} - ${wordTranslate}`}</h3>;
};

export default WordTranslate;
