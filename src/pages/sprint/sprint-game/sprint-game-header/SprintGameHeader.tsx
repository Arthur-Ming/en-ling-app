import styles from '../sprint-game.module.scss';
import { SprintGamePoints as SprintGamePointsType } from '../../../../interfaces';
import useSprintGamePointsSum from '../../../../hooks/useSprintGame/useSprintGamePointsSum';

type Props = {
  gamePoints: SprintGamePointsType[];
  audio: string;
};

const SprintGameHeader = ({ gamePoints, audio }: Props) => {
  const gamePointsSum = useSprintGamePointsSum(gamePoints);
  return (
    <div className={styles.header}>
      <p className={styles.result_text}>Ваш результат:</p>
      <p className={styles.result_score}>{gamePointsSum}</p>
    </div>
  );
};
export default SprintGameHeader;
