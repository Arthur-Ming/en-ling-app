import { useEffect, useMemo, useState } from 'react';
import { SprintGameStep } from '../../interfaces';

const useSprintGameAnswerHandler = (sprintStep: SprintGameStep | null) => {
  const [isTrueClick, setIsTrueClick] = useState<null | boolean>(null);
  const [isCorrectAnswerSelected, setIsCorrectAnswerSelected] = useState<null | boolean>(null);

  useEffect(() => {
    if (isTrueClick !== null && sprintStep !== null) {
      isTrueClick
        ? setIsCorrectAnswerSelected(sprintStep.isTrue)
        : setIsCorrectAnswerSelected(!sprintStep.isTrue);
      setIsTrueClick(null);
    }
  }, [isTrueClick, sprintStep]);

  useEffect(() => {
    if (sprintStep !== null && isCorrectAnswerSelected !== null) {
      setIsCorrectAnswerSelected(null);
    }
  }, [sprintStep, isCorrectAnswerSelected]);

  const onTrueClick = useMemo(() => () => setIsTrueClick(true), []);
  const onFalseClick = useMemo(() => () => setIsTrueClick(false), []);

  return {
    isCorrectAnswerSelected,
    onTrueClick,
    onFalseClick,
  };
};

export default useSprintGameAnswerHandler;
