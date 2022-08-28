import TextbookGroupsPagination from '../textbook-groups-pagination';
import styles from './textbook-sidebar.module.scss';

const TextbookSidebar = () => (
  <aside className={styles.root}>
    <TextbookGroupsPagination />
  </aside>
);

export default TextbookSidebar;
