import { useEffect } from 'react';
import { GROUP_SHIFT } from '../constants';
import { apiRoutes } from '../utils/apiRoutes';
import useQuery from './useQuery';

const useSprintGameQuery = (page: null | number, level: number) => {
  const { loading: wordsLoading, loaded: wordsLoaded, queryFn, data: words } = useQuery();

  useEffect(() => {
    console.log(page);
    if (page !== null) {
      queryFn(apiRoutes.words(page, level - GROUP_SHIFT));
    }
  }, [page, level, queryFn]);

  useEffect(() => {
    console.log(words);
  }, [words]);

  return {
    wordsLoading,
    wordsLoaded,
    words,
  };
};

export default useSprintGameQuery;
