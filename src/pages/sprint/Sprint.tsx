import classNames from 'classnames';
import { useState } from 'react';
import useTextbookPageParams from '../../hooks/useTextbookPageParams';
import { GROUP_COUNT } from '../../constants';
import styles from './index.module.scss';
import PageRange from '../../components/PageRange';
import GroupPicker from '../../components/GroupPicker/GroupPicker';
import { ReactComponent as LabelIcon } from './label.svg';
import SprintGame from './sprint-game/SprintGame';

const groups = Array.from(Array(GROUP_COUNT), (_, index) => index + 1);

const Sprint = () => {
  const { group, page } = useTextbookPageParams();
  const [selectedGroup, setSelectedGroup] = useState(group);
  const [pageRange, setPageRange] = useState([1, page]);
  const [isGame, setIsGame] = useState(false);

  if (isGame) return <SprintGame group={selectedGroup} pageRange={pageRange} />;

  const onButtonClick = () => {
    setIsGame(true);
  };

  return (
    <main className={styles.root}>
      <div className={styles.box}>
        <h4 className={styles.title}>Спринт</h4>
        <h5 className={styles.subtitle}>Попробуйте перевести как можно больше слов за 60 секунд</h5>
        <div>
          <p>Выберите главу:</p>
          <GroupPicker groups={groups} selectedGroup={selectedGroup} onSelect={setSelectedGroup} />
        </div>

        <div className={styles.pages}>
          <p>Выберите диапазон страниц:</p>
          <PageRange values={pageRange} setValues={setPageRange} />
        </div>
        <div className={styles.text}>
          <p>
            группа {selectedGroup}
            <LabelIcon className={classNames(styles.label, styles[`level-${selectedGroup}`])} />
          </p>
          <p>cтраницы {`${pageRange[0]} - ${pageRange[1]}`}</p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={onButtonClick}>
            <span>Начать</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Sprint;
