import { ITextbookCard } from '../../../interfaces';
import styles from './textbook-card.module.scss';

interface IProps {
  card: ITextbookCard;
}

const BASE = 'https://react-learnwords-example.herokuapp.com/';

const TextbookCard = ({ card }: IProps) => {
  const {
    word,
    image,
    transcription,
    wordTranslate,
    textMeaning,
    textMeaningTranslate,
    textExample,
    textExampleTranslate,
  } = card;
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={`${BASE}${image}`} alt={word} />

      <div className={styles.content}>
        <div className={styles.header}>
          <h4>{word}</h4>
          <span>-</span>
          <h4>{transcription}</h4>
          <span>-</span>
          <h4>{wordTranslate}</h4>
        </div>
        <div className={styles.body}>
          <div>
            <h5 dangerouslySetInnerHTML={{ __html: textMeaning }}></h5>
            <h5>{textMeaningTranslate}</h5>
          </div>
          <div>
            <h5 dangerouslySetInnerHTML={{ __html: textExample }}></h5>
            <h5>{textExampleTranslate}</h5>
          </div>
        </div>
        <div className={styles.buttons}>
          <button>button</button>
        </div>
      </div>
    </div>
  );
};

export default TextbookCard;
