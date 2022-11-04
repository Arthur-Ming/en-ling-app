import classNames from 'classnames';
import React, { memo } from 'react';
import styles from '../../sprint.module.scss';

const dotsArr = Array.from(Array(3), (_, index) => ({
  dotId: index + 1,
}));

type Props = {
  numberOfContinuousCorrectAnswers: number;
  numberOfContinuousWrongAnswers: number;
};

const SprintGameDotsOfAnswers = ({
  numberOfContinuousCorrectAnswers,
  numberOfContinuousWrongAnswers,
}: Props) => {
  return (
    <div className={styles.dots}>
      {dotsArr.map(({ dotId }) => (
        <div
          key={dotId}
          className={classNames([styles.dot], {
            [styles.dot_true]: dotId <= numberOfContinuousCorrectAnswers,
            [styles.dot_false]: dotId <= numberOfContinuousWrongAnswers,
          })}
        ></div>
      ))}
    </div>
  );
};

export default memo(SprintGameDotsOfAnswers);
