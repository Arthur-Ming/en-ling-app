import { useEffect, useMemo, useState } from 'react';
import api from '../utils/api';

const useQuery = () => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [path, setPath] = useState<null | string>(null);

  const queryFn = useMemo(
    () => (path: string) => {
      setLoaded(false);
      setPath(path);
    },
    []
  );

  useEffect(() => {
    if (!path) return;
    if (loaded) return;
    const fn = async () => {
      setLoading(true);
      setData(null);
      const data = await api.get(path);
      setData(data);
      setLoading(false);
      setLoaded(true);
    };
    fn();
  }, [loaded, path]);

  return {
    loading,
    loaded,
    error,
    data,
    queryFn,
  };
};

export default useQuery;
