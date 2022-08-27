import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  textbookGroupSelector,
  textbookLoadedSelector,
  textbookPageSelector,
} from '../redux/selectors';

const useTextbookPageParams = () => {
  const defaultPage = useSelector(textbookPageSelector);
  const defaultGroup = useSelector(textbookGroupSelector);
  const loaded = useSelector(textbookLoadedSelector);

  const savedPage = localStorage.getItem('page');
  const savedGroup = localStorage.getItem('group');

  useEffect(() => {
    const syncTextbookParamsToStorage = () => {
      localStorage.setItem('page', String(defaultPage));
      localStorage.setItem('group', String(defaultGroup));
    };

    syncTextbookParamsToStorage();
  }, [defaultGroup, defaultPage]);

  if (loaded) return { page: defaultPage, group: defaultGroup };

  if (savedPage && savedGroup) return { page: Number(savedPage), group: Number(savedGroup) };

  return { page: defaultPage, group: defaultGroup };
};

export default useTextbookPageParams;
