import ReactPaginate from 'react-paginate';
import styles from './textbook-pagination.module.scss';
import { ReactComponent as ArrowPrev } from './arrow-prev.svg';
import { ReactComponent as ArrowNext } from './arrow-next.svg';
import { connect } from 'react-redux';

import { pageChange } from '../../../redux/actions';
import { useNavigate, useParams } from 'react-router';
import { textbookLoadingSelector } from '../../../redux/selectors';
import { RootState } from '../../../redux/store';
import classNames from 'classnames';

interface StateProps {
  isWordsloading: boolean;
}

interface DispatchProps {
  onPageChange: () => void;
}

type TProps = DispatchProps & StateProps;

const TextbookPagesPagination = ({ onPageChange, isWordsloading }: TProps) => {
  const { page: currentPage, group } = useParams();
  const navigate = useNavigate();
  const handlePageClick = ({ selected }: { selected: number }) => {
    navigate(`${selected + 1}/${Number(group)}`);
    onPageChange();
  };

  return (
    <div
      className={classNames(styles.root, {
        [styles.loading]: isWordsloading,
      })}
    >
      <ReactPaginate
        nextLabel={<ArrowNext className={styles.arrow} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        forcePage={Number(currentPage) - 1}
        pageCount={20}
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
});

const mapDispatchToProps = {
  onPageChange: pageChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextbookPagesPagination);
