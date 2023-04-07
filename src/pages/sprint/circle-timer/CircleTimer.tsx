import classNames from 'classnames';
import { memo, useEffect, useState } from 'react';
import styles from './circle-timer.module.scss';
import Timer from './Timer';

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

const CircleTimer = ({ pause, onTimeOver, duration = 5 }: Props) => {
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

  useEffect(
    () => () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    },
    [intervalId]
  );

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
    <Timer pause={pause} strokeDasharray={strokeDasharray} circleColor={circleColor} time={time} />
  );
};

export default memo(CircleTimer);
