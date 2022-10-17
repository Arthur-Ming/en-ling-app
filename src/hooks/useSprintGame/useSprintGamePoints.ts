import { useEffect, useState } from 'react';
import { SprintGamePoints } from '../../interfaces';

const useSprintGamePoints = (isCorrectAnswer: null | boolean) => {
  const [points, setPoints] = useState<SprintGamePoints[]>([]);
  const [currentPoints, setCurrentPoints] = useState<SprintGamePoints | null>(null);
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
      setPoints((prevPoints) => [...prevPoints, currentPoints]);
      setCurrentPoints(null);
    }
  }, [currentPoints]);

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
    gamePoints: points,
  };
};

export default useSprintGamePoints;
