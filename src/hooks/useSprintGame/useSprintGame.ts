import { useEffect, useMemo, useState } from 'react';
import useSprintGameAnswers from './useSprintGameAnswers';
import useSprintGameRandomPage from './useSprintGameRandomPage';
import useSprintGamePoints from './useSprintGamePoints';
import useSprintGameQuery from './useSprintGameQuery';
import useSprintGameStep from './useSprintGameStep';

const useSprintGame = (level: number) => {
  const [isTrueClick, setIsTrueClick] = useState<null | boolean>(null);
  const [isCorrectAnswerSelected, setIsCorrectAnswerSelected] = useState<null | boolean>(null);
  const { randomPage, setNextRandomPage, pagesOver } = useSprintGameRandomPage();
  const { wordsLoading, words } = useSprintGameQuery(randomPage, level);
  const { sprintStep, getNextStep, stepsOver } = useSprintGameStep(words);
  const { gamePoints } = useSprintGamePoints(isCorrectAnswerSelected);
  const { answers } = useSprintGameAnswers(isCorrectAnswerSelected, sprintStep);

  useEffect(() => {
    if (isTrueClick !== null && sprintStep !== null) {
      isTrueClick
        ? setIsCorrectAnswerSelected(sprintStep.isTrue)
        : setIsCorrectAnswerSelected(!sprintStep.isTrue);
      setIsTrueClick(null);
    }
  }, [isTrueClick, sprintStep]);

  useEffect(() => {
    if (isCorrectAnswerSelected !== null) {
      getNextStep();
      setIsCorrectAnswerSelected(null);
    }
  }, [getNextStep, isCorrectAnswerSelected]);

  useEffect(() => {
    if (stepsOver) {
      setNextRandomPage();
    }
  }, [setNextRandomPage, stepsOver]);

  const onTrueClick = useMemo(() => () => setIsTrueClick(true), []);
  const onFalseClick = useMemo(() => () => setIsTrueClick(false), []);

  return {
    sprintStep,
    wordsLoading,
    onTrueClick,
    onFalseClick,
    pagesOver,
    gamePoints,
    answers,
  };
};
export default useSprintGame;
