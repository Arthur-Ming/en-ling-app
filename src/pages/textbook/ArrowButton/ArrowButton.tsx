import { ReactComponent as ArrowPrevIcon } from './arrow-prev.svg';
import { ReactComponent as ArrowNextIcon } from './arrow-next.svg';
import styles from './index.module.scss';
import classNames from 'classnames';
import { useMatch, useNavigate, useParams } from 'react-router';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/store';

import { DEFAULT_PAGE, PAGE_COUNT, PAGE_SHIFT } from '../../../constants';
import clientRoutes from '../../../utils/clientRoutes';

type StateProps = {
  isWordsloading: boolean;
};

type OwnProps = {
  prev?: boolean;
};

type Props = OwnProps & StateProps;

const ArrowButton = ({ prev, isWordsloading }: Props) => {
  const { page = null, group = null } = useParams();
  const navigate = useNavigate();
  const isHardWords = useMatch('textbook/user-words');
  const onNextClick = () => {
    if (page !== null && group !== null) {
      navigate(clientRoutes.textbook.words.relative(Number(page) + PAGE_SHIFT, group));
    }
  };

  const onPrevClick = () => {
    if (page !== null && group !== null) {
      navigate(clientRoutes.textbook.words.relative(Number(page) - PAGE_SHIFT, group));
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
          <ArrowPrevIcon
            className={classNames(styles.arrow, styles.prev, {
              [styles.hidden]: isHardWords,
            })}
          />
        </button>
      ) : (
        <button
          className={styles.wrap}
          onClick={onNextClick}
          disabled={Number(page) === PAGE_COUNT || isWordsloading}
        >
          <ArrowNextIcon
            className={classNames(styles.arrow, styles.next, {
              [styles.hidden]: isHardWords,
            })}
          />
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isWordsloading: false,
});

export default connect(mapStateToProps)(ArrowButton);
