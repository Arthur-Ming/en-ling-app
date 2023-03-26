import TextbookPagesPagination from '../TextbookPagesPagination';
import styles from './index.module.scss';

const TextbookFooter = () => (
  <div className={styles.root}>
    <TextbookPagesPagination />{' '}
  </div>
);

export default TextbookFooter;
