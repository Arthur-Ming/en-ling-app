import { useEffect } from 'react';
import useSprintGameAnswers from './useSprintGameAnswers';
import useSprintGameRandomPage from './useSprintGameRandomPage';
import useSprintGamePoints from './useSprintGamePoints';
import useSprintGameQuery from './useSprintGameQuery';
import useSprintGameStep from './useSprintGameStep';
import useSprintGameAnswerHandler from './useSprintGameAnswerHandler';

const useSprintGame = (level: number) => {
  const { randomPage, setNextRandomPage, pagesOver } = useSprintGameRandomPage();
  const { loading, loaded, error, words } = useSprintGameQuery(randomPage, level);
  const { sprintStep, getNextStep, stepsOver } = useSprintGameStep(words);
  const { isCorrectAnswerSelected, onTrueClick, onFalseClick } =
    useSprintGameAnswerHandler(sprintStep);
  const { gamePoints } = useSprintGamePoints(isCorrectAnswerSelected);
  const { answers } = useSprintGameAnswers(isCorrectAnswerSelected, sprintStep);

  useEffect(() => {
    if (isCorrectAnswerSelected !== null) {
      getNextStep();
    }
  }, [getNextStep, isCorrectAnswerSelected]);

  useEffect(() => {
    if (stepsOver) {
      setNextRandomPage();
    }
  }, [setNextRandomPage, stepsOver]);

  return {
    sprintStep,
    requestState: {
      loading,
      loaded,
      error,
    },
    handlers: {
      onTrueClick,
      onFalseClick,
    },
    pagesOver,
    gamePoints,
    answers,
  };
};
export default useSprintGame;
