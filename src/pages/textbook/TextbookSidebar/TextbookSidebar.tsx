import TextbookGroupsPagination from '../textbook-groups-pagination';
import styles from './index.module.scss';

const TextbookSidebar = () => (
  <aside className={styles.root}>
    <TextbookGroupsPagination />
  </aside>
);

export default TextbookSidebar;
