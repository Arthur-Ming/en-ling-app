import { useEffect, useState } from 'react';
import { PAGE_COUNT } from '../../constants';
import { createShuffledArr } from '../../utils/arrayHelpers';

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
