import TextbookPagesPagination from '../textbook-pages-pagination';
import styles from './textbook-header.module.scss';

const TextbookHeader = () => (
  <div className={styles.root}>
    <h2>Textbook</h2>
    <TextbookPagesPagination />
  </div>
);

export default TextbookHeader;
