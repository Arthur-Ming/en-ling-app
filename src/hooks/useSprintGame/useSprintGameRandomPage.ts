import { useEffect, useState } from 'react';
import { PAGE_COUNT } from '../../constants';

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

const useSprintGameRandomPage = (shouldGetNextRandomPage: boolean) => {
  const [shuffledPagesArr, setShuffledPagesArr] = useState<null | number[]>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [randomPage, setRandomPage] = useState<null | number>(null);
  const [pagesOver, setPagesOver] = useState<boolean>(false);

  useEffect(() => {
    setShuffledPagesArr(createShuffledArr(PAGE_COUNT));
  }, []);

  useEffect(() => {
    if (shouldGetNextRandomPage) {
      setCurrentPageIndex((prevPageIndex) => prevPageIndex + 1);
    }
  }, [shouldGetNextRandomPage]);

  useEffect(() => {
    if (shuffledPagesArr && !pagesOver) {
      const page = shuffledPagesArr[currentPageIndex];
      page !== undefined && setRandomPage(page);
    }
  }, [currentPageIndex, shuffledPagesArr, pagesOver]);

  useEffect(() => {
    if (shuffledPagesArr && currentPageIndex === shuffledPagesArr.length) {
      setPagesOver(true);
    }
  }, [currentPageIndex, shuffledPagesArr]);

  useEffect(() => {
    if (pagesOver) {
      setShuffledPagesArr(null);
      setRandomPage(null);
      setCurrentPageIndex(0);
    }
  }, [pagesOver]);

  return {
    randomPage,
    pagesOver,
  };
};

export default useSprintGameRandomPage;
