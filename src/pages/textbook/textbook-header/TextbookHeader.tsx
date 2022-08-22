import TextbookPagination from '../textbook-pagination';
import styles from './textbook-header.module.scss';

const TextbookHeader = () => {
  return (
    <div className={styles.root}>
      <h2>Textbook</h2>
      <TextbookPagination />
    </div>
  );
};

export default TextbookHeader;
