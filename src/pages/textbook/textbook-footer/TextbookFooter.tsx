import TextbookPagesPagination from '../textbook-pages-pagination';
import styles from './textbook-footer.module.scss';

const TextbookFooter = () => {
  return (
    <div className={styles.root}>
      <TextbookPagesPagination />
    </div>
  );
};

export default TextbookFooter;
