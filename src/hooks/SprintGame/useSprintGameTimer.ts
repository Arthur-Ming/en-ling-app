import { useCallback, useEffect, useMemo, useState } from 'react';

const useSprintGameTimer = (loaded: boolean) => {
  const [isPause, setIsPause] = useState(true);
  const [isTimeOver, setIsTimeOver] = useState(false);
  useEffect(() => {
    loaded ? setIsPause(false) : setIsPause(true);
  }, [loaded]);

  const onTimeOver = useCallback(() => setIsTimeOver(true), []);

  return {
    isPause,
    isTimeOver,
    onTimeOver,
  };
};

export default useSprintGameTimer;
