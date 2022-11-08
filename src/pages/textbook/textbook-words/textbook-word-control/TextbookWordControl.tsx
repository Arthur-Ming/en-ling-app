import { connect } from 'react-redux';
import { setUsersWord } from '../../../../redux/actions/userWords';
import { RootState } from '../../../../redux/reducer';
import { userIsAuthSelector } from '../../../../redux/selectors/user';
import {
  userWordsByIdSelector,
  userWordsDifficultySelector,
  userWordsUpdatingSelector,
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
  isUpdating: boolean;
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
  isUpdating,
}: Props) => {
  return (
    <div className={styles.word_control_box}>
      <button
        className={styles.word_control_button}
        onClick={addHardUsersWord}
        disabled={!isAuth || isWordHard || isUpdating}
      >
        Сложное
      </button>
      <button
        className={styles.word_control_button}
        onClick={addEaseUsersWord}
        disabled={!isAuth || isWordEasy || isUpdating}
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
  isUpdating: userWordsUpdatingSelector(state, wordId),
});

const mapDispatchToProps = (dispatch: AppDispatch, props: OwnProps) => ({
  addHardUsersWord: () => dispatch(setUsersWord(props.wordId, 'hard')),
  addEaseUsersWord: () => dispatch(setUsersWord(props.wordId, 'easy')),
});

export default connect(mapStateToProps, mapDispatchToProps)(TextbookWordControlButtons);
