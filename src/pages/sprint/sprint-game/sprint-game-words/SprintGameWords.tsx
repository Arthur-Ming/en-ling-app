import styles from '../sprint-game.module.scss';

interface Props {
  word: string;
  mockWordTranslate: string;
}

const SprintGameWords = ({ word, mockWordTranslate }: Props) => {
  return (
    <>
      <p className={styles.word}>{word}</p>
      <p className={styles.translate}>{mockWordTranslate}</p>
    </>
  );
};

export default SprintGameWords;
