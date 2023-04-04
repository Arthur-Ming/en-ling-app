import { useEffect } from 'react';
import useSprintGameRandomPage from './useSprintGameRandomPage';
import useSprintGamePoints from './useSprintGamePoints';
import useSprintGameQuery from './useSprintGameQuery';
import useSprintGameStep from './useSprintGameStep';
import useSprintGameAnswerHandler from './useSprintGameAnswerHandler';
import { AnswerType } from '../../interfaces';

const useSprintGame = (level: number, pageRange: number[]) => {
  const { randomPage, pagesOver, getNextRandomPage } = useSprintGameRandomPage(pageRange);
  const { wordsLoading, wordsLoaded, wordsLoadingError, words } = useSprintGameQuery(
    randomPage,
    level
  );
  const { sprintStep, stepsOver, getNextStep } = useSprintGameStep(words);
  const { didAnswer, onAnswerButtonClick, answers } = useSprintGameAnswerHandler(sprintStep);
  const { gamePoints, numberOfContinuousAnswers } = useSprintGamePoints(answers);

  useEffect(() => {
    if (didAnswer !== AnswerType.idle) {
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
    wordsLoadingError,
    onAnswerButtonClick,
    pagesOver,
    gamePoints,
    numberOfContinuousAnswers,
    answers,
  };
};
export default useSprintGame;
