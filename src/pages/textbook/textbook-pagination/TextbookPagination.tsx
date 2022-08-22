import ReactPaginate from 'react-paginate';
import styles from './textbook-pagination.module.scss';

const Pagination = () => {
  const handlePageClick = ({ selected }: { selected: number }) => {
    console.log(selected);
  };

  return (
    <div className={styles.root}>
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        initialPage={0}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={20}
        previousLabel="<"
        disableInitialCallback={true}
        pageClassName={styles.item}
        pageLinkClassName={styles.link}
        previousClassName={styles.item}
        previousLinkClassName={styles.link}
        nextClassName={styles.item}
        nextLinkClassName={styles.link}
        breakLabel="..."
        breakClassName={styles.item}
        breakLinkClassName={styles.link}
        containerClassName={styles.list}
        activeClassName={styles.active}
        /* renderOnZeroPageCount={null} */
      />
    </div>
  );
};

export default Pagination;
