import classNames from 'classnames';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { GROUP_COUNT } from '../../../redux/constants';

import { textbookLoadingSelector } from '../../../redux/selectors';
import { RootState } from '../../../redux/store';
import clientRoutes from '../../../utils/clientRoutes';
import styles from './textbook-groups-pagination.module.scss';

const textbookGroups = Array.from(Array(GROUP_COUNT), (_, index) => index + 1);

interface StateProps {
  isWordsloading: boolean;
}

type TProps = StateProps;

const TextbookGroupsPagination = ({ isWordsloading }: TProps) => {
  const { page, group: currentGroup } = useParams();
  const navigate = useNavigate();
  const handleGroupClick = (group: number) => {
    navigate(clientRoutes.textbookWords.relative(page, group));
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
          disabled={isWordsloading}
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
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isWordsloading: textbookLoadingSelector(state),
});

export default connect(mapStateToProps)(TextbookGroupsPagination);
