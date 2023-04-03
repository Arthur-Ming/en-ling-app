import classNames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import useTextbookPageParams from '../../../hooks/useTextbookPageParams';
import { GROUP_COUNT } from '../../../constants';
import styles from './index.module.scss';
import React from 'react';
import PageRange from '../../../components/PageRange';
import GroupPicker from '../../../components/GroupPicker/GroupPicker';
import { ReactComponent as LabelIcon } from './label.svg';

const groups = Array.from(Array(GROUP_COUNT), (_, index) => index + 1);

const SprintEntry = () => {
  const { group, page } = useTextbookPageParams();
  const [selectedGroup, setSelectedGroup] = useState(group);
  const [pageRange, setPageRange] = useState([1, page]);
  const navigate = useNavigate();

  const onButtonClick = () => navigate(`sprint/${selectedGroup}`);

  return (
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
      <button className={styles.button} onClick={onButtonClick}>
        <span>Начать</span>
      </button>
    </div>
  );
};

export default SprintEntry;
