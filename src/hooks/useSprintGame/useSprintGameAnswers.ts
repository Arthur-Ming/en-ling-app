import { useEffect, useState } from 'react';
import { SprintGameStep, SprintGameAnswer } from '../../interfaces';

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

const useSprintGameAnswers = (isCorrectAnswer: null | boolean, step: null | SprintGameStep) => {
  const [answers, setAnswers] = useState<SprintGameAnswer[]>([]);

  useEffect(() => {
    if (isCorrectAnswer !== null && step !== null) {
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        getSprintGameAnswerFromStep(step, isCorrectAnswer),
      ]);
    }
  }, [isCorrectAnswer, step]);

  return {
    answers,
  };
};
export default useSprintGameAnswers;
