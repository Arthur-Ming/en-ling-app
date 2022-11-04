import { useEffect, useState } from 'react';
import { SprintGamePoints } from '../../interfaces';

const useSprintGamePointsSum = (gamePoints: SprintGamePoints[]) => {
  const [gamePointsSum, setGamePointsSum] = useState(0);

  useEffect(() => {
    if (gamePoints.length) {
      setGamePointsSum((s) => s + gamePoints[gamePoints.length - 1]);
    }
  }, [gamePoints]);

  return gamePointsSum;
};

export default useSprintGamePointsSum;
