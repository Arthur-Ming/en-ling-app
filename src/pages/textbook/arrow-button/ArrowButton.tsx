import { ReactComponent as ArrowPrevIcon } from './arrow-prev.svg';
import { ReactComponent as ArrowNextIcon } from './arrow-next.svg';
import styles from './arrow-button.module.scss';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router';
import { connect } from 'react-redux';

import { RootState } from '../../../redux/store';
import { textbookLoadingSelector } from '../../../redux/selectors';
import { DEFAULT_PAGE, PAGE_COUNT, PAGE_SHIFT } from '../../../redux/constants';
import clientRoutes from '../../../utils/clientRoutes';

interface StateProps {
  isWordsloading: boolean;
}

interface OwnProps {
  prev?: boolean;
}

type TProps = OwnProps & StateProps;

const ArrowButton = ({ prev, isWordsloading }: TProps) => {
  const { page = null, group = null } = useParams();
  const navigate = useNavigate();

  const onNextClick = () => {
    if (page !== null && group !== null) {
      navigate(clientRoutes.textbookWords.relative(Number(page) + PAGE_SHIFT, group));
    }
  };

  const onPrevClick = () => {
    if (page !== null && group !== null) {
      navigate(clientRoutes.textbookWords.relative(Number(page) - PAGE_SHIFT, group));
    }
  };
  return (
    <div className={styles.root}>
      {prev ? (
        <button
          className={styles.wrap}
          onClick={onPrevClick}
          disabled={Number(page) === DEFAULT_PAGE || isWordsloading}
        >
          <ArrowPrevIcon className={classNames(styles.arrow, styles.prev)} />
        </button>
      ) : (
        <button
          className={styles.wrap}
          onClick={onNextClick}
          disabled={Number(page) === PAGE_COUNT || isWordsloading}
        >
          <ArrowNextIcon className={classNames(styles.arrow, styles.next)} />
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isWordsloading: textbookLoadingSelector(state),
});

export default connect(mapStateToProps)(ArrowButton);
