import { useParams } from 'react-router';
import { DEFAULT_GROUP, DEFAULT_PAGE } from '../constants';

const useTextbookPageParams = () => {
  const { page = null, group = null } = useParams();

  if (page && group) return { page: Number(page), group: Number(group) };

  const savedPage = localStorage.getItem('page');
  const savedGroup = localStorage.getItem('group');

  if (savedPage && savedGroup) {
    return { page: Number(savedPage), group: Number(savedGroup) };
  }

  return { page: DEFAULT_PAGE, group: DEFAULT_GROUP };
};

export default useTextbookPageParams;
