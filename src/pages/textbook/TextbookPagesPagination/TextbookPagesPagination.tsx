import ReactPaginate from 'react-paginate';
import styles from './index.module.scss';
import { ReactComponent as ArrowPrev } from './arrow-prev.svg';
import { ReactComponent as ArrowNext } from './arrow-next.svg';
import { connect } from 'react-redux';
import { useMatch, useNavigate, useParams } from 'react-router';
import {
  textbookGroupSelector,
  textbookLoadingSelector,
  textbookPageSelector,
} from '../../../redux/selectors/textbook';
import { RootState } from '../../../redux/store';
import classNames from 'classnames';
import { PAGE_COUNT, PAGE_SHIFT } from '../../../constants';
import clientRoutes from '../../../utils/clientRoutes';
import { useLoadWordsQueryState } from '../../../redux/api';

type StateProps = {
  isWordsloading: boolean;
  defaultPage: number;
  defaultGroup: number;
};

type Props = StateProps;

const TextbookPagesPagination = ({ isWordsloading, defaultPage, defaultGroup }: Props) => {
  const { page: currentPage = defaultPage, group = defaultGroup } = useParams();

  const { isFetching } = useLoadWordsQueryState({
    page: Number(currentPage) - 1,
    group: Number(group) - 1,
  });

  console.log(isFetching);

  const isHardWords = useMatch('textbook/hard-words');
  const navigate = useNavigate();
  const handlePageClick = ({ selected }: { selected: number }) => {
    navigate(clientRoutes.textbook.words.relative(selected + PAGE_SHIFT, group));
  };

  return (
    <div
      className={classNames(styles.root, {
        [styles.loading]: isFetching,
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

const mapStateToProps = (state: RootState) => ({
  isWordsloading: textbookLoadingSelector(state),
  defaultPage: textbookPageSelector(state),
  defaultGroup: textbookGroupSelector(state),
});

export default connect(mapStateToProps)(TextbookPagesPagination);
