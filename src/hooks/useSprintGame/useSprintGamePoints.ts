import { useEffect, useState } from 'react';

type DefaultPoints = 0;
type PointsForCorrectAnswer = 10 | 20;
type PointsForWrongAnswer = -10 | -20;
type AllPoints = DefaultPoints | PointsForCorrectAnswer | PointsForWrongAnswer;

const useSprintGamePoints = (isCorrectAnswer: null | boolean) => {
  const [allPoints, setAllPoints] = useState<AllPoints[]>([]);
  const [currentPoints, setCurrentPoints] = useState<AllPoints | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [numberOfContinuousCorrectAnswers, setNumberOfContinuousCorrectAnswers] = useState(0);
  const [numberOfContinuousWrongAnswers, setNumberOfContinuousWrongAnswers] = useState(0);

  useEffect(() => {
    if (isCorrectAnswer !== null) {
      isCorrectAnswer
        ? setNumberOfContinuousCorrectAnswers((prevNum) => prevNum + 1)
        : setNumberOfContinuousWrongAnswers((prevNum) => prevNum + 1);
    }
  }, [isCorrectAnswer]);

  useEffect(() => {
    if (numberOfContinuousCorrectAnswers !== 0) {
      setCurrentPoints(numberOfContinuousCorrectAnswers === 2 ? 20 : 10);
      setNumberOfContinuousWrongAnswers(0);
    }
  }, [numberOfContinuousCorrectAnswers]);

  useEffect(() => {
    if (numberOfContinuousWrongAnswers !== 0) {
      setCurrentPoints(numberOfContinuousWrongAnswers === 2 ? -20 : -10);
      setNumberOfContinuousCorrectAnswers(0);
    }
  }, [numberOfContinuousWrongAnswers]);

  useEffect(() => {
    if (currentPoints !== null) {
      setAllPoints((prevPoints) => [...prevPoints, currentPoints]);
      setCurrentPoints(null);
    }
  }, [currentPoints]);

  useEffect(() => {
    if (allPoints.length) {
      setTotalPoints((prevPoints) => prevPoints + allPoints[allPoints.length - 1]);
    }
  }, [allPoints]);

  useEffect(() => {
    if (numberOfContinuousCorrectAnswers === 2) {
      setNumberOfContinuousCorrectAnswers(0);
    }
  }, [numberOfContinuousCorrectAnswers]);

  useEffect(() => {
    if (numberOfContinuousWrongAnswers === 2) {
      setNumberOfContinuousWrongAnswers(0);
    }
  }, [numberOfContinuousWrongAnswers]);

  return {
    gamePoints: {
      current: allPoints.length && allPoints[allPoints.length - 1],
      total: totalPoints,
    },
  };
};

export default useSprintGamePoints;
