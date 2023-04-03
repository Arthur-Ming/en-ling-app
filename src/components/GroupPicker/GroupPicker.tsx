import classNames from 'classnames';
import styles from './index.module.scss';
import GroupItem from '../GroupItem/GroupItem';

type Props = {
  groups: number[];
  selectedGroup: number;
  onSelect: (group: number) => void;
};

const GroupPicker = ({ groups, selectedGroup, onSelect }: Props) => {
  return (
    <div className={styles.groups}>
      {groups.map((group) => (
        <GroupItem key={group} group={group} selectedGroup={selectedGroup} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default GroupPicker;
