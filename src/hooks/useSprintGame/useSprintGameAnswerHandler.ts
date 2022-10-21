import { useEffect, useMemo, useState } from 'react';
import { SprintGameStep } from '../../interfaces';

const useSprintGameAnswerHandler = (sprintStep: SprintGameStep | null) => {
  const [isTrueClick, setIsTrueClick] = useState<null | boolean>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrectAnswerSelected, setIsCorrectAnswerSelected] = useState<null | boolean>(null);

  useEffect(() => {
    if (isTrueClick !== null && sprintStep !== null) {
      isTrueClick
        ? setIsCorrectAnswerSelected(sprintStep.isTrue)
        : setIsCorrectAnswerSelected(!sprintStep.isTrue);
      setIsAnswered(true);
      setIsTrueClick(null);
    }
  }, [isTrueClick, sprintStep]);

  useEffect(() => {
    if (sprintStep !== null) {
      setIsCorrectAnswerSelected(null);
      setIsAnswered(false);
    }
  }, [sprintStep]);

  const onTrueClick = useMemo(() => () => setIsTrueClick(true), []);
  const onFalseClick = useMemo(() => () => setIsTrueClick(false), []);

  return {
    isCorrectAnswerSelected,
    isAnswered,
    handlers: {
      onTrueClick,
      onFalseClick,
    },
  };
};

export default useSprintGameAnswerHandler;
