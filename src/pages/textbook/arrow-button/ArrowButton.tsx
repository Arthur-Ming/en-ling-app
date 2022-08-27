import { ReactComponent as ArrowPrevIcon } from './arrow-prev.svg';
import { ReactComponent as ArrowNextIcon } from './arrow-next.svg';
import styles from './arrow-button.module.scss';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router';
import { connect } from 'react-redux';
import { pageChange } from '../../../redux/actions/words';
import { RootState } from '../../../redux/store';
import { textbookLoadingSelector } from '../../../redux/selectors';

interface StateProps {
  isWordsloading: boolean;
}

interface DispatchProps {
  onPageChange: () => void;
}

interface OwnProps {
  prev?: boolean;
}

type TProps = OwnProps & DispatchProps & StateProps;

const ArrowButton = ({ prev, onPageChange, isWordsloading }: TProps) => {
  const { page = null, group = null } = useParams();
  const navigate = useNavigate();

  const onNextClick = () => {
    if (page !== null && group !== null) {
      navigate(`${Number(page) + 1}/${Number(group)}`);
      onPageChange();
    }
  };

  const onPrevClick = () => {
    if (page !== null && group !== null) {
      navigate(`${Number(page) - 1}/${Number(group)}`);
      onPageChange();
    }
  };
  return (
    <div className={styles.root}>
      {prev ? (
        <button
          className={styles.wrap}
          onClick={onPrevClick}
          disabled={Number(page) === 1 || isWordsloading}
        >
          <ArrowPrevIcon className={classNames(styles.arrow, styles.prev)} />
        </button>
      ) : (
        <button
          className={styles.wrap}
          onClick={onNextClick}
          disabled={Number(page) === 20 || isWordsloading}
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

const mapDispatchToProps = {
  onPageChange: pageChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArrowButton);
