import { connect } from 'react-redux';
import {
  addUsersWord,
  deleteUsersWord,
  getUsersWords,
  setUsersWord,
} from '../../../../redux/actions/userWords';
import { RootState } from '../../../../redux/reducer';
import { userIsAuthSelector } from '../../../../redux/selectors/user';
import {
  userWordsByIdSelector,
  userWordsDifficultySelector,
} from '../../../../redux/selectors/userWords';
import { AppDispatch } from '../../../../redux/store';
import styles from '../../textbook.module.scss';

type OwnProps = {
  wordId: string;
};

type StateProps = {
  isAuth: boolean;
  isWordHard: boolean;
  isWordEasy: boolean;
};

type DispatchProps = {
  addHardUsersWord: () => void;
  addEaseUsersWord: () => void;
};

type Props = OwnProps & StateProps & DispatchProps;

const TextbookWordControlButtons = ({
  addHardUsersWord,
  addEaseUsersWord,
  isAuth,
  isWordHard,
  isWordEasy,
}: Props) => {
  return (
    <div className={styles.word_control_box}>
      <button
        className={styles.word_control_button}
        onClick={addHardUsersWord}
        disabled={!isAuth || isWordHard}
      >
        Сложное
      </button>
      <button
        className={styles.word_control_button}
        onClick={addEaseUsersWord}
        disabled={!isAuth || isWordEasy}
      >
        Изученное
      </button>
    </div>
  );
};

const mapStateToProps = (state: RootState, { wordId }: OwnProps) => ({
  isAuth: userIsAuthSelector(state),
  isWordHard: userWordsDifficultySelector(state, wordId) === 'hard',
  isWordEasy: userWordsDifficultySelector(state, wordId) === 'easy',
});

const mapDispatchToProps = (dispatch: AppDispatch, props: OwnProps) => ({
  // addHardUsersWord: () => dispatch(addUsersWord(props.wordId, 'hard')),
  addHardUsersWord: () => dispatch(setUsersWord(props.wordId, 'hard')),
  addEaseUsersWord: () => dispatch(setUsersWord(props.wordId, 'easy')),
});

export default connect(mapStateToProps, mapDispatchToProps)(TextbookWordControlButtons);
