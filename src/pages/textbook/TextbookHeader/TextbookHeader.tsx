import TextbookPagesPagination from '../TextbookPagesPagination';
import styles from './index.module.scss';

const TextbookHeader = () => (
  <div className={styles.root}>
    <h2>Textbook</h2>
    <TextbookPagesPagination />
  </div>
);

export default TextbookHeader;
