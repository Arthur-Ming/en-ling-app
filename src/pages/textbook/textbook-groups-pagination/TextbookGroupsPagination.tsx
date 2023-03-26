import classNames from 'classnames';
import { useMatch, useNavigate, useParams } from 'react-router';
import { GROUP_COUNT } from '../../../constants';
import clientRoutes from '../../../utils/clientRoutes';
import styles from './index.module.scss';
import { ReactComponent as LabelIcon } from './label.svg';

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
          <LabelIcon className={classNames(styles.label, styles[`level-${group}`])} />
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
