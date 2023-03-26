import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { SprintGameAnswer, SprintGamePoints } from '../../../../interfaces';
import GameResultSection from './game-result-section';
import SprintGameResultItem from './sprint-game-result-item';
import styles from './sprint-game-result.module.scss';

type Props = {
  answers: SprintGameAnswer[];
  points: SprintGamePoints[];
};

const SprintGameResult = ({ answers, points }: Props) => {
  const [trueAnswers, setTrueAnswers] = useState<SprintGameAnswer[]>([]);
  const [falseAnswers, setFalseAnswers] = useState<SprintGameAnswer[]>([]);
  const [pointsSum, setPointsSum] = useState<number>(0);
  console.log(answers);
  console.log(points);
  useEffect(() => {
    if (answers.length) {
      setTrueAnswers(answers.filter(({ isCorrectAnswer }) => isCorrectAnswer));
      setFalseAnswers(answers.filter(({ isCorrectAnswer }) => !isCorrectAnswer));
    }
  }, [answers]);

  useEffect(() => {
    if (points.length) {
      setPointsSum(points.reduce((sum: number, point: SprintGamePoints) => sum + point, 0));
    }
  }, [points]);

  return (
    <main>
      <div className={styles.box}>
        <h4 className={styles.title}>
          Результаты{' '}
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
    </main>
  );
};

export default SprintGameResult;
