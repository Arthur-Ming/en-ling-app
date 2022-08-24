import { useSelector } from 'react-redux';
import { textbookGroupSelector, textbookPageSelector } from '../redux/selectors';

const useTextbookPageParams = () => {
  const defaultPage = useSelector(textbookPageSelector);
  const defaultGroup = useSelector(textbookGroupSelector);

  return { page: defaultPage, group: defaultGroup };
};

export default useTextbookPageParams;
