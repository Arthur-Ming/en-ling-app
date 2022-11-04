import { useCallback, useEffect, useMemo, useState } from 'react';
import { SprintGameAnswer, SprintGameStep } from '../../interfaces';

const getSprintGameAnswerFromStep = (
  { id, word, wordTranslate, audio }: SprintGameStep,
  isCorrectAnswer: boolean
): SprintGameAnswer => ({
  id,
  word,
  wordTranslate,
  audio,
  isCorrectAnswer,
});

const useSprintGameAnswerHandler = (sprintStep: SprintGameStep | null) => {
  const [isTrueClick, setIsTrueClick] = useState<null | boolean>(null);
  const [didAnswer, setDidAnswer] = useState<boolean>(false);
  const [isCorrectAnswerSelected, setIsCorrectAnswerSelected] = useState<null | boolean>(null);
  const [answers, setAnswers] = useState<SprintGameAnswer[]>([]);

  useEffect(() => {
    if (isTrueClick !== null && sprintStep !== null) {
      isTrueClick
        ? setIsCorrectAnswerSelected(sprintStep.isTrue)
        : setIsCorrectAnswerSelected(!sprintStep.isTrue);
      setIsTrueClick(null);
    }
  }, [isTrueClick, sprintStep]);

  useEffect(() => {
    if (sprintStep !== null) {
      setDidAnswer(false);
    }
  }, [sprintStep]);

  useEffect(() => {
    if (isCorrectAnswerSelected !== null) {
      setDidAnswer(true);
    }
  }, [isCorrectAnswerSelected]);

  useEffect(() => {
    if (didAnswer) {
      setIsCorrectAnswerSelected(null);
    }
  }, [didAnswer]);

  useEffect(() => {
    if (isCorrectAnswerSelected !== null && sprintStep !== null) {
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        getSprintGameAnswerFromStep(sprintStep, isCorrectAnswerSelected),
      ]);
    }
  }, [isCorrectAnswerSelected, sprintStep]);

  const handlers = useMemo(
    () => ({
      onTrueClick: () => setIsTrueClick(true),
      onFalseClick: () => setIsTrueClick(false),
    }),
    []
  );

  return {
    isCorrectAnswerSelected,
    didAnswer,
    handlers,
    answers,
  };
};

export default useSprintGameAnswerHandler;
