import { useCallback, useEffect, useMemo, useState } from 'react';
import { PAGE_COUNT } from '../../constants';
import { createShuffledArr } from '../../utils/arrayHelpers';

const shuffledPagesArr = createShuffledArr([0, 29]);
console.log(shuffledPagesArr);
const useSprintGameRandomPage = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [randomPage, setRandomPage] = useState<null | number>(null);
  const [pagesOver, setPagesOver] = useState<boolean>(false);

  useEffect(() => {
    if (!pagesOver) {
      const page = shuffledPagesArr[currentPageIndex];
      setRandomPage(page);
    }
  }, [currentPageIndex, pagesOver]);

  useEffect(() => {
    if (currentPageIndex === shuffledPagesArr.length) {
      setPagesOver(true);
    }
  }, [currentPageIndex]);

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
