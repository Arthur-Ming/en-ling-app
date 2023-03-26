import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnswerType, SprintGameAnswer, SprintGameStep } from '../../interfaces';

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
  const [didAnswer, setDidAnswer] = useState<AnswerType>(AnswerType.idle);
  const [answers, setAnswers] = useState<SprintGameAnswer[]>([]);

  useEffect(() => {
    if (didAnswer !== AnswerType.idle && sprintStep !== null) {
      const isCorrectAnswer =
        didAnswer === AnswerType.correct ? sprintStep.isTrue : !sprintStep.isTrue;

      setAnswers((prevAnswers) => [
        ...prevAnswers,
        getSprintGameAnswerFromStep(sprintStep, isCorrectAnswer),
      ]);

      setDidAnswer(AnswerType.idle);
    }
  }, [didAnswer, sprintStep]);

  const handlers = useMemo(
    () => ({
      onTrueClick: () => setDidAnswer(AnswerType.correct),
      onFalseClick: () => setDidAnswer(AnswerType.wrong),
    }),
    []
  );

  return {
    didAnswer,
    handlers,
    answers,
  };
};

export default useSprintGameAnswerHandler;
