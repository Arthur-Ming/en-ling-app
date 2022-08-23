import classNames from 'classnames';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { pageChange } from '../../../redux/actions';
import styles from './textbook-groups-pagination.module.scss';

const textbookSidebarItem = [1, 2, 3, 4, 5, 6];

interface DispatchProps {
  onGroupChange: () => void;
}

type TProps = DispatchProps;

const TextbookGroupsPagination = ({ onGroupChange }: TProps) => {
  const { page, group: currentGroup } = useParams();
  const navigate = useNavigate();
  const handleGroupClick = (item: number) => {
    navigate(`${Number(page)}/${Number(item)}`);
    onGroupChange();
  };

  return (
    <div className={styles.box}>
      {textbookSidebarItem.map((item) => (
        <button
          className={classNames(styles.button, {
            [styles.active]: Number(currentGroup) === item,
          })}
          onClick={() => handleGroupClick(item)}
          key={item}
        >
          <svg
            className={classNames(styles.icon, styles[`level-${item}`])}
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"
            ></path>
          </svg>
          <span className={styles.text}>{`Глава ${item}`}</span>
        </button>
      ))}
    </div>
  );
};

const mapDispatchToProps = {
  onGroupChange: pageChange,
};

export default connect(null, mapDispatchToProps)(TextbookGroupsPagination);
