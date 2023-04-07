import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { ISprintResult, SprintGameAnswer } from '../../../../interfaces';
import GameResultSection from './game-result-section';
import styles from './index.module.scss';

type Props = {
  results: ISprintResult[];
};

const SprintGameResult = ({ results }: Props) => {
  const [trueAnswers, setTrueAnswers] = useState<SprintGameAnswer[]>([]);
  const [falseAnswers, setFalseAnswers] = useState<SprintGameAnswer[]>([]);
  const [pointsSum, setPointsSum] = useState<number>(0);

  useEffect(() => {
    if (results.length) {
      setTrueAnswers(results.filter(({ isCorrectAnswer }) => isCorrectAnswer));
      setFalseAnswers(results.filter(({ isCorrectAnswer }) => !isCorrectAnswer));
      setPointsSum(results.reduce((sum: number, result) => sum + result.points, 0));
    }
  }, [results]);

  return (
    <div className={styles.box}>
      <h4 className={styles.title}>
        Результаты
        <span
          className={classNames(styles.points_sum, {
            [styles.points_sum_p]: pointsSum > 0,
            [styles.points_sum_n]: pointsSum < 0,
          })}
        >
          {pointsSum}
        </span>
      </h4>
      <div className={styles.sections}>
        <GameResultSection filtredAnswers={falseAnswers} isTrueAnswers={false} />
        <GameResultSection filtredAnswers={trueAnswers} isTrueAnswers={true} />
      </div>
    </div>
  );
};

export default SprintGameResult;
