import { useEffect } from 'react';
import { GROUP_SHIFT } from '../../constants';
import { apiRoutes } from '../../utils/apiRoutes';
import useQuery from '../useQuery';

const useSprintGameQuery = (page: null | number, level: number) => {
  const { loading, loaded, error, queryFn, data: words } = useQuery();

  useEffect(() => {
    if (page !== null) {
      queryFn(apiRoutes.words(page, level - GROUP_SHIFT));
    }
  }, [page, level, queryFn]);

  return {
    requestState: {
      loading,
      loaded,
      error,
    },
    words,
  };
};

export default useSprintGameQuery;
