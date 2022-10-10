import styles from '../sprint-game.module.scss';

interface Props {
  word: string;
  wordTranslate: string;
}

const SprintGameBody = ({ word, wordTranslate }: Props) => {
  return (
    <div className={styles.body}>
      <p className={styles.word}>{word}</p>
      <p className={styles.translate}>{wordTranslate}</p>
    </div>
  );
};

export default SprintGameBody;
