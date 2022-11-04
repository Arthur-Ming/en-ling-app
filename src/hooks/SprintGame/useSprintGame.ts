import { useEffect, useState } from 'react';
import useSprintGameRandomPage from './useSprintGameRandomPage';
import useSprintGamePoints from './useSprintGamePoints';
import useSprintGameQuery from './useSprintGameQuery';
import useSprintGameStep from './useSprintGameStep';
import useSprintGameAnswerHandler from './useSprintGameAnswerHandler';

const useSprintGame = (level: number) => {
  const [shouldGetNextStep, setShouldGetNextStep] = useState<boolean>(false);
  const [shouldGetNextRandomPage, setShouldGetNextRandomPage] = useState<boolean>(false);
  const { randomPage, pagesOver } = useSprintGameRandomPage(shouldGetNextRandomPage);
  const { wordsLoading, wordsLoaded, error, words } = useSprintGameQuery(randomPage, level);
  const { sprintStep, stepsOver } = useSprintGameStep(words, shouldGetNextStep);
  const { isCorrectAnswerSelected, didAnswer, handlers, answers } =
    useSprintGameAnswerHandler(sprintStep);
  const { gamePoints, numberOfContinuousAnswers } = useSprintGamePoints(isCorrectAnswerSelected);

  useEffect(() => setShouldGetNextStep(didAnswer), [didAnswer]);
  useEffect(() => setShouldGetNextRandomPage(stepsOver), [stepsOver]);

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
