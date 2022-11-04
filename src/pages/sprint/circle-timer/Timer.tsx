import classNames from 'classnames';
import { memo } from 'react';
import styles from './circle-timer.module.scss';

const CIRCLE_RADIUS = 45;

type Props = {
  pause: boolean;
  strokeDasharray: string;
  circleColor: string;
  time: string;
};

const Timer = ({ pause, strokeDasharray, circleColor, time }: Props) => {
  return (
    <div
      className={classNames(styles.timer, {
        [styles.timer_pause]: pause,
      })}
    >
      <svg className={styles.timer_svg} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g className={styles.timer_circle}>
          <circle className={styles.timer_path_elapsed} cx="50" cy="50" r={CIRCLE_RADIUS}></circle>
          <path
            strokeDasharray={strokeDasharray}
            className={classNames(styles.timer_path_remaining, styles[circleColor])}
            d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
          ></path>
        </g>
      </svg>
      <span className={styles.timer_label}>{time}</span>
    </div>
  );
};
export default memo(Timer);
