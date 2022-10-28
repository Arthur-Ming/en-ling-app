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
        setLoaded(true);
      } catch (err: unknown) {
        setData(null);
        setLoaded(false);
        setError(err);
      }
      setLoading(false);
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
