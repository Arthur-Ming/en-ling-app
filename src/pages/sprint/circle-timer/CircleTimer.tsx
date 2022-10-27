import classNames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './circle-timer.module.scss';

const CIRCLE_RADIUS = 45;
const FULL_DASH_ARRAY = CIRCLE_RADIUS * 2 * Math.PI;

const COLOR_CODES = {
  info: {
    color: 'green',
  },
  warning: {
    color: 'orange',
    threshold: (duration: number) => duration / 2,
  },
  alert: {
    color: 'red',
    threshold: (duration: number) => duration / 4,
  },
};

function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  let seconds: number | string = time % 60;

  if (Number(seconds) < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

function calculateTimeFraction(duration: number, timeLeft: number) {
  const rawTimeFraction = timeLeft / duration;
  return rawTimeFraction - (1 / duration) * (1 - rawTimeFraction);
}

function getCircleDasharray(duration: number, timeLeft: number) {
  return `${(calculateTimeFraction(duration, timeLeft) * FULL_DASH_ARRAY).toFixed(
    0
  )} ${FULL_DASH_ARRAY}`;
}

function getRemainingPathColor(timeLeft: number, duration: number) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold(duration)) {
    return alert.color;
  }
  if (timeLeft <= warning.threshold(duration)) {
    return warning.color;
  }
  return info.color;
}

interface Props {
  pause: boolean;
  onTimeOver: () => void;
  duration?: number;
}

const CircleTimer = ({ pause, onTimeOver, duration = 30 }: Props) => {
  const [timePassed, setTimePassed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [time, setTime] = useState(formatTime(timeLeft));
  const [strokeDasharray, setStrokeDasharray] = useState(FULL_DASH_ARRAY.toString());
  const [circleColor, setCircleColor] = useState(COLOR_CODES.info.color);
  const [isTimeOver, setTimeOver] = useState(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  useEffect(() => {
    if (!pause) {
      setIntervalId(
        window.setInterval(() => {
          setTimePassed((s) => s + 1);
        }, 1000)
      );
    }
  }, [pause]);

  useEffect(() => {
    if (pause && intervalId !== null) {
      window.clearInterval(intervalId);
    }
  }, [intervalId, pause]);

  useEffect(() => {
    if (timePassed >= duration) {
      setTimeOver(true);
    }
  }, [duration, timePassed]);

  useEffect(() => {
    const left = duration - timePassed;
    if (left >= 0) setTimeLeft(left);
  }, [duration, timePassed]);

  useEffect(() => {
    setStrokeDasharray(getCircleDasharray(duration, timeLeft));
    setCircleColor(getRemainingPathColor(timeLeft, duration));
    setTime(formatTime(timeLeft));
  }, [duration, timeLeft]);

  useEffect(() => {
    if (isTimeOver) {
      onTimeOver();
      intervalId !== null && window.clearInterval(intervalId);
    }
  }, [isTimeOver, onTimeOver, intervalId]);

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

export default CircleTimer;
