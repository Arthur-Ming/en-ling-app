import { useEffect, useState } from 'react';
import useSprintGameAnswers from './useSprintGameAnswers';
import useSprintGameRandomPage from './useSprintGameRandomPage';
import useSprintGamePoints from './useSprintGamePoints';
import useSprintGameQuery from './useSprintGameQuery';
import useSprintGameStep from './useSprintGameStep';
import useSprintGameAnswerHandler from './useSprintGameAnswerHandler';

const useSprintGame = (level: number) => {
  const [shouldGetNextStep, setShouldGetNextStep] = useState<boolean>(false);
  const [shouldGetNextRandomPage, setShouldGetNextRandomPage] = useState<boolean>(false);
  const { randomPage, pagesOver } = useSprintGameRandomPage(shouldGetNextRandomPage);
  const { requestState, words } = useSprintGameQuery(randomPage, level);
  const { sprintStep, stepsOver } = useSprintGameStep(words, shouldGetNextStep);
  const { isCorrectAnswerSelected, isAnswered, handlers } = useSprintGameAnswerHandler(sprintStep);
  const { gamePoints, numberOfContinuousAnswers } = useSprintGamePoints(isCorrectAnswerSelected);
  const { answers } = useSprintGameAnswers(isCorrectAnswerSelected, sprintStep);

  useEffect(() => setShouldGetNextStep(isAnswered), [isAnswered]);
  useEffect(() => setShouldGetNextRandomPage(stepsOver), [stepsOver]);
  console.log(sprintStep);
  return {
    sprintStep,
    requestState,
    handlers,
    pagesOver,
    gamePoints,
    numberOfContinuousAnswers,
    answers,
  };
};
export default useSprintGame;
