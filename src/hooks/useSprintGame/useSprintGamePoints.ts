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
      setCurrentPoints(numberOfContinuousCorrectAnswers === 3 ? 20 : 10);
      numberOfContinuousCorrectAnswers === 4 && setNumberOfContinuousCorrectAnswers(1);
      setNumberOfContinuousWrongAnswers(0);
    }
  }, [numberOfContinuousCorrectAnswers]);

  useEffect(() => {
    if (numberOfContinuousWrongAnswers !== 0) {
      setCurrentPoints(numberOfContinuousWrongAnswers === 3 ? -20 : -10);
      numberOfContinuousWrongAnswers === 4 && setNumberOfContinuousWrongAnswers(1);
      setNumberOfContinuousCorrectAnswers(0);
    }
  }, [numberOfContinuousWrongAnswers]);

  useEffect(() => {
    if (currentPoints !== null) {
      setPoints((prevPoints) => [...prevPoints, currentPoints]);
      setCurrentPoints(null);
    }
  }, [currentPoints]);

  /*  useEffect(() => {
    if (numberOfContinuousCorrectAnswers > 3) {
      setNumberOfContinuousCorrectAnswers(0);
    }
  }, [numberOfContinuousCorrectAnswers]); */

  /*  useEffect(() => {
    if (numberOfContinuousWrongAnswers > 3) {
      setNumberOfContinuousWrongAnswers(0);
    }
  }, [numberOfContinuousWrongAnswers]);
 */
  return {
    gamePoints: points,
    numberOfContinuousAnswers: {
      wrong: numberOfContinuousWrongAnswers,
      correct: numberOfContinuousCorrectAnswers,
    },
  };
};

export default useSprintGamePoints;
