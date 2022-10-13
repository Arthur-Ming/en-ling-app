import styles from '../sprint-game.module.scss';

type Props = {
  totalGamePoints: number;
  audio: string;
};

const SprintGameHeader = ({ totalGamePoints, audio }: Props) => {
  return (
    <div className={styles.header}>
      <p className={styles.result_text}>Ваш результат:</p>
      <p className={styles.result_score}>{totalGamePoints}</p>
    </div>
  );
};

export default SprintGameHeader;
