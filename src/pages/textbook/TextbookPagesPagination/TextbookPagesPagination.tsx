import ReactPaginate from 'react-paginate';
import styles from './index.module.scss';
import { ReactComponent as ArrowPrev } from './arrow-prev.svg';
import { ReactComponent as ArrowNext } from './arrow-next.svg';
import { useMatch, useNavigate, useParams } from 'react-router';
import classNames from 'classnames';
import { PAGE_COUNT, PAGE_SHIFT } from '../../../constants';
import clientRoutes from '../../../utils/clientRoutes';
import { useLoadWordsQueryState } from '../../../redux/api/words';

const TextbookPagesPagination = () => {
  const { page: currentPage = 1, group = 1 } = useParams();

  /* const { isFetching } = useLoadWordsQueryState({
    page: Number(currentPage) - 1,
    group: Number(group) - 1,
  }); */

  const isHardWords = useMatch('textbook/user-words');
  const navigate = useNavigate();
  const handlePageClick = ({ selected }: { selected: number }) => {
    navigate(clientRoutes.textbook.words.relative(selected + PAGE_SHIFT, group));
  };

  return (
    <div
      className={classNames(styles.root, {
        [styles.loading]: false,
        [styles.hidden]: isHardWords,
      })}
    >
      <ReactPaginate
        nextLabel={<ArrowNext className={styles.arrow} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        forcePage={Number(currentPage) - PAGE_SHIFT}
        pageCount={PAGE_COUNT}
        previousLabel={<ArrowPrev className={styles.arrow} />}
        disableInitialCallback={true}
        pageClassName={styles.item}
        pageLinkClassName={styles.link}
        previousClassName={styles.previous}
        previousLinkClassName={styles.link}
        nextClassName={styles.next}
        nextLinkClassName={styles.link}
        breakLabel="..."
        breakClassName={styles.item}
        breakLinkClassName={styles.link}
        containerClassName={styles.list}
        activeClassName={styles.active}
        disabledClassName={styles.disabled}
      />
    </div>
  );
};

export default TextbookPagesPagination;
