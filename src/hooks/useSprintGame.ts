import { useEffect, useState } from 'react';
import useSprintGameAnswers from './useSprintGameAnswers';
import useSprintGameRandomPage from './useSprintGameRandomPage';
import useSprintGamePoints from './useSprintGamePoints';
import useSprintGameQuery from './useSprintGameQuery';
import useSprintGameStep from './useSprintGameStep';

const useSprintGame = (level: number) => {
  const { randomPage, getNextRandomPage, pagesOver } = useSprintGameRandomPage();
  const { wordsLoading, words } = useSprintGameQuery(randomPage, level);
  const { sprintStep, getNextStep, stepsOver } = useSprintGameStep(words);
  const { gamePoints, setGamePointsByAnswer } = useSprintGamePoints();

  useEffect(() => {
    if (stepsOver) {
      getNextRandomPage();
    }
  }, [getNextRandomPage, stepsOver]);

  const onTrueClick = () => {
    if (sprintStep) {
      setGamePointsByAnswer(sprintStep.isTrue);
      getNextStep();
    }
  };
  const onFalseClick = () => {
    if (sprintStep) {
      setGamePointsByAnswer(!sprintStep.isTrue);
      getNextStep();
    }
  };

  return {
    sprintStep,
    wordsLoading,
    onTrueClick,
    onFalseClick,
    pagesOver,
    gamePoints,
  };
};
export default useSprintGame;
