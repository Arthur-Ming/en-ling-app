import { GROUP_SHIFT } from '../../constants';
import { apiRoutes } from '../../utils/apiRoutes';
import useFetch from '../useFetch';

const useSprintGameQuery = (page: null | number, level: number) => {
  const path = page === null ? null : apiRoutes.words(page, level - GROUP_SHIFT);
  const { loading: wordsLoading, loaded: wordsLoaded, error, data: words } = useFetch(path);

  return {
    wordsLoading,
    wordsLoaded,
    error,
    words,
  };
};

export default useSprintGameQuery;
