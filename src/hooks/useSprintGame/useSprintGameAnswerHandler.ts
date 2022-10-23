import { useEffect, useMemo, useState } from 'react';
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
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
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
      setIsAnswered(false);
    }
  }, [sprintStep]);

  useEffect(() => {
    if (isCorrectAnswerSelected !== null) {
      setIsAnswered(true);
    }
  }, [isCorrectAnswerSelected]);

  useEffect(() => {
    if (isAnswered) {
      setIsCorrectAnswerSelected(null);
    }
  }, [isAnswered]);

  useEffect(() => {
    if (isCorrectAnswerSelected !== null && sprintStep !== null) {
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        getSprintGameAnswerFromStep(sprintStep, isCorrectAnswerSelected),
      ]);
    }
  }, [isCorrectAnswerSelected, sprintStep]);

  const onTrueClick = useMemo(() => () => setIsTrueClick(true), []);
  const onFalseClick = useMemo(() => () => setIsTrueClick(false), []);

  return {
    isCorrectAnswerSelected,
    isAnswered,
    handlers: {
      onTrueClick,
      onFalseClick,
    },
    answers,
  };
};

export default useSprintGameAnswerHandler;
