import classNames from 'classnames';
import React, { memo } from 'react';
import { SprintGamePoints as SprintGamePointsType } from '../../../../interfaces';
import styles from '../../sprint.module.scss';

type Props = {
  gamePoints: SprintGamePointsType[];
};

const pointsArr = Array.from(Array(5), (_, index) => ({
  id: index + 1,
}));

const SprintGamePoints = ({ gamePoints }: Props) => {
  return (
    <div className={styles.points_list}>
      {pointsArr.map(({ id }) => {
        if (gamePoints.length < id) return <div key={id}></div>;
        const point = gamePoints[gamePoints.length - id];
        return (
          <div
            key={id}
            className={classNames([styles.points], {
              [styles.points_true]: point > 0,
              [styles.points_false]: point < 0,
              [styles.points_active]: id === 1,
            })}
          >
            {point > 0 && <span className={styles.points_sign}>+</span>}
            {point < 0 && <span className={styles.points_sign}>-</span>}
            {<span>{Math.abs(point)}</span>}
          </div>
        );
      })}
    </div>
  );
};

export default memo(SprintGamePoints);
