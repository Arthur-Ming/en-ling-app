import classNames from 'classnames';
import { useMatch, useNavigate, useParams } from 'react-router';
import { GROUP_COUNT } from '../../../constants';
import clientRoutes from '../../../utils/clientRoutes';
import styles from './textbook-groups-pagination.module.scss';

const textbookGroups = Array.from(Array(GROUP_COUNT), (_, index) => index + 1);

const TextbookGroupsPagination = () => {
  const { page = 1, group: currentGroup } = useParams(); // fix: page from localStor
  const navigate = useNavigate();
  const isHardWords = useMatch('textbook/hard-words');
  const handleGroupClick = (group: number) => {
    navigate(clientRoutes.textbook.words.relative(page, group));
  };

  const handleHardWords = () => {
    navigate('user-words');
  };

  return (
    <div className={styles.box}>
      {textbookGroups.map((group) => (
        <button
          className={classNames(styles.button, {
            [styles.active]: Number(currentGroup) === group,
          })}
          onClick={() => handleGroupClick(group)}
          key={group}
        >
          <svg
            className={classNames(styles.icon, styles[`level-${group}`])}
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"
            ></path>
          </svg>
          <span className={styles.text}>{`Глава ${group}`}</span>
        </button>
      ))}

      <button
        className={classNames(styles.button, {
          [styles.active]: isHardWords,
        })}
        onClick={() => handleHardWords()}
      >
        <span className={styles.text}>{`Сложные слова`}</span>
      </button>
    </div>
  );
};

export default TextbookGroupsPagination;
