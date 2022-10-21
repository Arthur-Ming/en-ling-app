import classNames from 'classnames';
import styles from '../sprint-game.module.scss';

const dotsArr = Array.from(Array(3), (_, index) => ({
  dotId: index + 1,
}));

type Props = {
  numberOfContinuousAnswers: {
    correct: number;
    wrong: number;
  };
};

console.log(dotsArr);

const SprintGameInd = ({ numberOfContinuousAnswers }: Props) => {
  console.log(numberOfContinuousAnswers);
  return (
    <div className={styles.dots}>
      {dotsArr.map(({ dotId }) => (
        <div
          key={dotId}
          className={classNames([styles.dot], {
            [styles.dot_true]: dotId <= numberOfContinuousAnswers.correct,
            [styles.dot_false]: dotId <= numberOfContinuousAnswers.wrong,
          })}
        ></div>
      ))}
    </div>
  );
};

export default SprintGameInd;
