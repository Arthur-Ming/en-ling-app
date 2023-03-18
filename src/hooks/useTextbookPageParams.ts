import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const useTextbookPageParams = () => {
  const defaultPage = 1;
  const defaultGroup = 1;

  const { page = null, group = null } = useParams();

  if (page && group) return { page: Number(page), group: Number(group) };

  const savedPage = localStorage.getItem('page');
  const savedGroup = localStorage.getItem('group');

  if (savedPage && savedGroup) {
    return { page: Number(savedPage), group: Number(savedGroup) };
  }

  return { page: defaultPage, group: defaultGroup };
};

export default useTextbookPageParams;
