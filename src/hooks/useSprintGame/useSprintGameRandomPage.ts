import { useEffect, useMemo, useState } from 'react';

function shuffle<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const createArr = (num: number): number[] => Array.from(Array(num), (_, index) => index);

function createShuffledArr(num: number): number[] {
  const arr = createArr(num);
  shuffle<number>(arr);
  return arr;
}

const useSprintGameRandomPage = () => {
  const [shuffledPagesArr, setShuffledPagesArr] = useState<null | number[]>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [randomPage, setRandomPage] = useState<null | number>(null);
  const [pagesOver, setPagesOver] = useState<boolean>(false);

  useEffect(() => {
    setShuffledPagesArr(createShuffledArr(30));
  }, []);

  useEffect(() => {
    if (shuffledPagesArr && !pagesOver) {
      setRandomPage(shuffledPagesArr[currentPageIndex]);
    }
  }, [currentPageIndex, shuffledPagesArr, pagesOver]);

  useEffect(() => {
    if (pagesOver) {
      setShuffledPagesArr(null);
      setRandomPage(null);
    }
  }, [pagesOver]);

  const setNextRandomPage = useMemo(
    () => () => {
      setCurrentPageIndex((prevPageIndex) => {
        if (prevPageIndex === 1) {
          setPagesOver(true);
          return 0;
        }
        return prevPageIndex + 1;
      });
    },
    []
  );

  return {
    randomPage,
    setNextRandomPage,
    pagesOver,
  };
};

export default useSprintGameRandomPage;
