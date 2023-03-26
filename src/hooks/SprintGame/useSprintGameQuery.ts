import { GROUP_SHIFT } from '../../constants';
import { useLoadWordsQuery } from '../../redux/api/words';
import { apiRoutes } from '../../utils/apiRoutes';
import useFetch from '../useFetch';

const useSprintGameQuery = (page: null | number, level: number) => {
  /* const path = page === null ? null : apiRoutes.words(page, level - GROUP_SHIFT);
  const { loading: wordsLoading, loaded: wordsLoaded, error, data: words } = useFetch(path); */

  const {
    isLoading,
    isFetching,
    data: words,
    isSuccess,
    error,
  } = useLoadWordsQuery({
    page: Number(page),
    group: Number(level) - 1,
  });

  return {
    wordsLoading: isLoading,
    wordsLoaded: isSuccess,
    error,
    words,
  };
};

export default useSprintGameQuery;
