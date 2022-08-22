import TextbookPagination from '../textbook-pagination';
import styles from './textbook-footer.module.scss';

const TextbookFooter = () => {
  return (
    <div className={styles.root}>
      <TextbookPagination />
    </div>
  );
};

export default TextbookFooter;
