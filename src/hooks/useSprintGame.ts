import { useEffect, useState } from 'react';
import { GROUP_SHIFT, PAGE_SHIFT } from '../redux/constants';
import { apiRoutes } from '../utils/apiRoutes';
import useQuery from './useQuery';

function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const createArr = (num: number) => Array.from(Array(num), (_, index) => index + 1);
type CreateShuffledArr<T> = (num: number) => T[];

const createShuffledArr: CreateShuffledArr<number> = (num: number) => {
  const arr = createArr(num);
  shuffle<number>(arr);
  return arr;
};

function getRandomInt(min = 0, max = 30) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntWithoutCurrent(current: number, min = 0, max = 30) {
  let randomInt = getRandomInt(min, max);

  while (randomInt === current) {
    randomInt = getRandomInt(min, max);
  }

  return randomInt;
}

interface IStep {
  word: string;
  translate: string;
  isTrue: boolean;
}

const useSprintGame = (level: number) => {
  const [shuffledPagesArr, setShuffledPagesArr] = useState<null | number[]>(null);
  const [shuffledWordsArr, setShuffledWordsArr] = useState<null | number[]>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [sprintStep, setSprintStep] = useState<null | IStep>(null);

  useEffect(() => {
    setShuffledPagesArr(createShuffledArr(30));
    setShuffledWordsArr(createShuffledArr(20));
  }, []);

  const { loading: wordsLoading, loaded: wordsLoaded, queryFn, data: words } = useQuery();

  useEffect(() => {
    if (shuffledPagesArr) {
      const currentPage = shuffledPagesArr[currentPageIndex];
      queryFn(apiRoutes.words(currentPage - PAGE_SHIFT, level - GROUP_SHIFT));
    }
  }, [currentPageIndex, level, queryFn, shuffledPagesArr]);

  useEffect(() => {
    if (wordsLoaded && shuffledWordsArr && words) {
      const isTrue = Boolean(getRandomInt(0, 2));
      const index = shuffledWordsArr[currentWordIndex];
      const { word, wordTranslate } = words[index];

      let translate = wordTranslate;
      if (!isTrue) {
        const randomIndex = getRandomIntWithoutCurrent(index, 0, 20);
        const { wordTranslate: fakeWordTranslate } = words[randomIndex];
        translate = fakeWordTranslate;
      }

      setSprintStep({
        word,
        translate,
        isTrue,
      });
    }
  }, [currentWordIndex, wordsLoaded, shuffledWordsArr, words]);

  const onTrueClick = () => {
    if (sprintStep) {
      sprintStep.isTrue ? console.log('true') : console.log('false');
    }
    getNextStep();
  };
  const onFalseClick = () => {
    if (sprintStep) {
      !sprintStep.isTrue ? console.log('true') : console.log('false');
    }
    getNextStep();
  };

  const getNextStep = () => {
    if (currentWordIndex === 5) {
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
    setSprintStep,
    onFalseClick,
    onTrueClick,
  };
};

export default useSprintGame;
