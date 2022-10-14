import { useMemo, useState } from 'react';

interface IPoints {
  current: 0 | 10 | 20 | -10 | -20;
  total: number;
}

const useSprintGamePoints = () => {
  const [gamePoints, setGamePoints] = useState<IPoints>({
    current: 0,
    total: 0,
  });
  //use sprint game points
  //const [numberOfContinuousTrueAnswers, setNumberOfContinuousTrueAnswers] = useState(0);

  const setGamePointsByAnswer = useMemo(
    () => (isAnswerTrue: boolean) => {
      const currentPoints = isAnswerTrue ? 10 : -10;

      setGamePoints((prevPoints) => ({
        current: currentPoints,
        total: prevPoints.total + currentPoints,
      }));
    },
    []
  );

  return {
    gamePoints,
    setGamePointsByAnswer,
  };
};

export default useSprintGamePoints;
