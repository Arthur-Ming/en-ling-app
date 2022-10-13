import { useEffect, useState } from 'react';
import { GROUP_SHIFT } from '../constants';
import { apiRoutes } from '../utils/apiRoutes';
import useQuery from './useQuery';
import useSprintGameAnswers from './useSprintGameAnswers';
import useSprintGamePoints from './useSprintGamePoints';
import useSprintGameRandom from './useSprintGameRandom';
import useSprintGameStep from './useSprintGameStep';

const useSprintGame = (level: number) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const { shuffledPagesArr, shuffledWordsArr } = useSprintGameRandom();
  const { sprintStep, setStepOfSprintGameByWords } = useSprintGameStep();
  const { gamePoints, setGamePointsByAnswer } = useSprintGamePoints();
  const { loading: wordsLoading, loaded: wordsLoaded, queryFn, data: words } = useQuery();
  const { addAnswer, answers } = useSprintGameAnswers();

  useEffect(() => {
    if (shuffledPagesArr) {
      const currentPage = shuffledPagesArr[currentPageIndex];
      queryFn(apiRoutes.words(currentPage, level - GROUP_SHIFT));
    }
  }, [currentPageIndex, level, queryFn, shuffledPagesArr]);

  useEffect(() => {
    if (wordsLoaded && shuffledWordsArr && words) {
      const wordIndex = shuffledWordsArr[currentWordIndex];
      setStepOfSprintGameByWords(wordIndex, words);
    }
  }, [currentWordIndex, wordsLoaded, shuffledWordsArr, words, setStepOfSprintGameByWords]);

  const onTrueClick = () => {
    if (sprintStep && shuffledWordsArr && words) {
      setGamePointsByAnswer(sprintStep.isTrue);
      const wordIndex = shuffledWordsArr[currentWordIndex];
      addAnswer(sprintStep.isTrue, words[wordIndex]);
    }
    getNextStep();
  };
  const onFalseClick = () => {
    if (sprintStep && shuffledWordsArr && words) {
      setGamePointsByAnswer(!sprintStep.isTrue);
      const wordIndex = shuffledWordsArr[currentWordIndex];
      addAnswer(!sprintStep.isTrue, words[wordIndex]);
    }
    getNextStep();
  };

  const getNextStep = () => {
    if (currentWordIndex === 10) {
      setCurrentPageIndex((s) => s + 1);
      setCurrentWordIndex(0);
      return;
    }
    setCurrentWordIndex((s) => s + 1);
  };

  return {
    wordsLoading,
    wordsLoaded,
    sprintStep,
    onFalseClick,
    onTrueClick,
    gamePoints,
    answers,
  };
};
export default useSprintGame;
