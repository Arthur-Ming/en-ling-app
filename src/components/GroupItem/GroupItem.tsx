import classNames from 'classnames';
import styles from './index.module.scss';
import { ReactComponent as LabelIcon } from './label.svg';

type Props = {
  group: number;
  selectedGroup: number;
  onSelect: (group: number) => void;
};

const GroupItem = ({ group, selectedGroup, onSelect }: Props) => {
  return (
    <button
      className={classNames(styles.button, {
        [styles.active]: selectedGroup === group,
      })}
      onClick={() => onSelect(group)}
      key={group}
    >
      <LabelIcon className={classNames(styles.label, styles[`level-${group}`])} />
      <span className={styles.text}>{`Глава ${group}`}</span>
    </button>
  );
};

export default GroupItem;
