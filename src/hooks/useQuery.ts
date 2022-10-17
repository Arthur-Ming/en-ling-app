import { useMemo, useState } from 'react';
import api from '../utils/api';

const useQuery = () => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<null | unknown>(null);
  const [data, setData] = useState(null);

  const queryFn = useMemo(
    () => async (path: string) => {
      setLoaded(false);
      setLoading(true);
      setData(null);
      setError(null);
      try {
        const data = await api.get(path);
        setData(data);
        setLoading(false);
        setLoaded(true);
      } catch (err: unknown) {
        setData(null);
        setLoading(false);
        setLoaded(false);
        setError(err);
      }
    },
    []
  );

  return {
    loading,
    loaded,
    error,
    data,
    queryFn,
  };
};

export default useQuery;
