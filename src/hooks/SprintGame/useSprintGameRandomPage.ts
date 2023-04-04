import { useCallback, useEffect, useState } from 'react';
import { createShuffledArr } from '../../utils/arrayHelpers';

const shuffledPagesArr = createShuffledArr([0, 20]);

const useSprintGameRandomPage = (pageRange: number[]) => {
  const [shuffledPagesArr, setShuffledPagesArr] = useState<number[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [randomPage, setRandomPage] = useState<null | number>(null);
  const [pagesOver, setPagesOver] = useState<boolean>(false);

  useEffect(() => {
    setShuffledPagesArr(createShuffledArr(pageRange));
  }, [pageRange]);

  useEffect(() => {
    if (!pagesOver && shuffledPagesArr.length) {
      console.log(shuffledPagesArr);
      const page = shuffledPagesArr[currentPageIndex];
      setRandomPage(page);
    }
  }, [currentPageIndex, pagesOver, shuffledPagesArr]);

  useEffect(() => {
    if (shuffledPagesArr.length && currentPageIndex === shuffledPagesArr.length) {
      setPagesOver(true);
    }
  }, [currentPageIndex, shuffledPagesArr.length]);

  useEffect(() => {
    if (pagesOver) {
      setRandomPage(null);
      setCurrentPageIndex(0);
    }
  }, [pagesOver]);

  const getNextRandomPage = useCallback(() => {
    setCurrentPageIndex((prevPageIndex) => prevPageIndex + 1);
  }, []);

  return {
    randomPage,
    pagesOver,
    getNextRandomPage,
  };
};

export default useSprintGameRandomPage;
