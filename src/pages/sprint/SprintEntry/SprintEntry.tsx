import classNames from 'classnames';
import { GROUP_COUNT } from '../../../constants';
import styles from './index.module.scss';
import PageRange from '../../../components/PageRange';
import GroupPicker from '../../../components/GroupPicker/GroupPicker';
import { ReactComponent as LabelIcon } from './label.svg';

const groups = Array.from(Array(GROUP_COUNT), (_, index) => index + 1);

type Props = {
  selectedGroup: number;
  pageRange: number[];
  onPlay: () => void;
  setSelectedGroup: (group: number) => void;
  setPageRange: (range: number[]) => void;
};

const SprintEntry = ({
  onPlay,
  selectedGroup,
  setSelectedGroup,
  pageRange,
  setPageRange,
}: Props) => (
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
        <button className={styles.button} onClick={onPlay}>
          <span>Начать</span>
        </button>
      </div>
    </div>
  </main>
);

export default SprintEntry;
