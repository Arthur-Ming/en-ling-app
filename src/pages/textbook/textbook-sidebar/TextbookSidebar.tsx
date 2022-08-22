import classNames from 'classnames';
import styles from './textbook-sidebar.module.scss';

const textbookSidebarItem = [1, 2, 3, 4, 5, 6];

const TextbookSidebar = () => {
  return (
    <aside className={styles.root}>
      <div className={styles.box}>
        {textbookSidebarItem.map((item) => (
          <button className={classNames(styles.button, styles[`level-${item}`])} key={item}>
            <svg className={styles.icon} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"
              ></path>
            </svg>
            <span className={styles.text}>{`Глава ${item}`}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default TextbookSidebar;
