import classNames from 'classnames';
import { useEffect, useState } from 'react';
import styles from '../sprint-game.module.scss';

type Props = {
  gamePoints: 0 | 10 | 20 | -10 | -20;
  total: number;
};

let id: number | null = null;

const SprintGamePoints = ({ gamePoints, total }: Props) => {
  const [isPointsHide, setIsPointsHide] = useState(false);

  useEffect(() => {
    setIsPointsHide(false);
    id !== null && clearTimeout(id);
    id = window.setTimeout(() => setIsPointsHide(true), 1000);
  }, [total]);

  return (
    /*  <Toaster position="top-right" /> */
    <div
      className={classNames([styles.points], {
        [styles.points_hide]: isPointsHide,
        [styles.points_true]: gamePoints > 0,
        [styles.points_false]: gamePoints < 0,
      })}
    >
      {gamePoints > 0 && <span>+</span>}
      {gamePoints < 0 && <span>-</span>}
      {gamePoints !== 0 && <span>{Math.abs(gamePoints)}</span>}
    </div>
  );
};

export default SprintGamePoints;
