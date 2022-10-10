import styles from '../sprint-game.module.scss';

interface Props {
  score: number;
  audio: string;
}

const SprintGameHeader = ({ score, audio }: Props) => {
  return (
    <div className={styles.header}>
      <p className={styles.result_text}>Ваш результат:</p>
      <p className={styles.result_score}>{score}</p>
    </div>
  );
};

export default SprintGameHeader;
