import { useEffect, useState } from 'react';
import fetchJson from '../utils/fetch-json';

const useFetch = (path: string | null, options?: RequestInit) => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<null | unknown>(null);
  const [data, setData] = useState(null);
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
  const [abort, setAbort] = useState<any>();

  useEffect(() => {
    const queryFn = async (path: string, options?: RequestInit) => {
      setLoaded(false);
      setData(null);
      setError(null);
      setLoading(true);

      try {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setAbort(() => () => abortController.abort());
        const data = await fetchJson(path, { ...options, signal });
        setData(data);
        setLoaded(true);
      } catch (err: unknown) {
        console.log(err);
        setData(null);
        setLoaded(false);
        setError(err);
      }
      setLoading(false);
    };

    if (path !== null) {
      console.log('Fetch');
      queryFn(path, options);
    }
  }, [options, path]);

  useEffect(() => {
    return () => {
      abort && abort();
    };
  }, [abort]);

  return {
    loading,
    loaded,
    error,
    data,
  };
};

export default useFetch;
