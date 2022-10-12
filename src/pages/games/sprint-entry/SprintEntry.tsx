import classNames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import useTextbookPageParams from '../../../hooks/useTextbookPageParams';
import { GROUP_COUNT } from '../../../constants';
import styles from '../games.module.scss';

const groups = Array.from(Array(GROUP_COUNT), (_, index) => index + 1);

const SprintEntry = () => {
  const { group } = useTextbookPageParams();
  const [currentGroup, setCurrentGroup] = useState(group);
  const navigate = useNavigate();

  const onButtonClick = () => navigate(`sprint/${currentGroup}`);

  return (
    <div className={styles.item}>
      <h4 className={styles.title}>Спринт</h4>
      <h5 className={styles.subtitle}>Попробуйте перевести как можно больше слов за 60 секунд</h5>
      <div className={styles.groups}>
        {groups.map((group) => (
          <button
            className={classNames(styles.group, {
              [styles.group_active]: group === currentGroup,
            })}
            key={group}
            onClick={() => setCurrentGroup(group)}
          >
            {group}
          </button>
        ))}
      </div>
      <button className={styles.button} onClick={onButtonClick}>
        <span>Начать</span>
      </button>
    </div>
  );
};

export default SprintEntry;
