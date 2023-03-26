import { useEffect, useState } from 'react';
import useSprintGameRandomPage from './useSprintGameRandomPage';
import useSprintGamePoints from './useSprintGamePoints';
import useSprintGameQuery from './useSprintGameQuery';
import useSprintGameStep from './useSprintGameStep';
import useSprintGameAnswerHandler from './useSprintGameAnswerHandler';

const useSprintGame = (level: number) => {
  const { randomPage, pagesOver, getNextRandomPage } = useSprintGameRandomPage();
  const { wordsLoading, wordsLoaded, error, words } = useSprintGameQuery(randomPage, level);
  const { sprintStep, stepsOver, getNextStep } = useSprintGameStep(words);
  const { isCorrectAnswerSelected, didAnswer, handlers, answers } =
    useSprintGameAnswerHandler(sprintStep);
  const { gamePoints, numberOfContinuousAnswers } = useSprintGamePoints(isCorrectAnswerSelected);

  useEffect(() => {
    if (didAnswer) {
      getNextStep();
    }
  }, [didAnswer, getNextStep]);

  useEffect(() => {
    if (stepsOver) {
      getNextRandomPage();
    }
  }, [getNextRandomPage, stepsOver]);

  return {
    sprintStep,
    wordsLoading,
    wordsLoaded,
    error,
    handlers,
    pagesOver,
    gamePoints,
    numberOfContinuousAnswers,
    answers,
  };
};
export default useSprintGame;
