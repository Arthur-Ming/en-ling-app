import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { SprintGamePoints as SprintGamePointsType } from '../../../../interfaces';
import styles from '../sprint-game.module.scss';

type Props = {
  gamePoints: SprintGamePointsType[];
};

let id: number | null = null;

const pointsArr = Array.from(Array(5), (_, index) => ({
  id: index + 1,
}));

const SprintGamePoints = ({ gamePoints }: Props) => {
  const [isPointsHide, setIsPointsHide] = useState(false);
  const [point, setPoint] = useState<SprintGamePointsType>(0);

  useEffect(() => {
    setIsPointsHide(false);
    id !== null && clearTimeout(id);
    id = window.setTimeout(() => setIsPointsHide(true), 10000);
  }, [gamePoints]);

  useEffect(() => {
    if (gamePoints.length) setPoint(gamePoints[gamePoints.length - 1]);
  }, [gamePoints]);

  return (
    <div className={styles.points_list}>
      {pointsArr.map(({ id }) => {
        const point = gamePoints[gamePoints.length - id];
        return (
          point && (
            <div
              key={id}
              className={classNames([styles.points], {
                [styles.points_hide]: isPointsHide,
                [styles.points_true]: point > 0,
                [styles.points_false]: point < 0,
                [styles.points_f]: id === 1,
              })}
            >
              {point > 0 && <span className={styles.points_l}>+</span>}
              {point < 0 && <span className={styles.points_l}>-</span>}
              {<span>{Math.abs(point)}</span>}
            </div>
          )
        );
      })}
    </div>
  );
};

export default SprintGamePoints;
