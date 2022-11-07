import { connect } from 'react-redux';
import { addUsersWord, deleteUsersWord, getUsersWords } from '../../../../redux/actions/userWords';
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

type DispatchProps = {
  deleteUsersWord: () => void;
};

type Props = OwnProps & DispatchProps;

const TextbookHardWordsControl = ({ deleteUsersWord }: Props) => (
  <div className={styles.word_control_box}>
    <button className={styles.word_control_button} onClick={deleteUsersWord}>
      Удалить
    </button>
    {/*   <button className={styles.word_control_button} onClick={addEaseUsersWord}>
      Изученное
    </button> */}
  </div>
);

const mapStateToProps = (state: RootState, { wordId }: OwnProps) => ({
  isAuth: userIsAuthSelector(state),
  isWordHard: userWordsDifficultySelector(state, wordId) === 'hard',
  isWordEasy: userWordsDifficultySelector(state, wordId) === 'easy',
});

const mapDispatchToProps = (dispatch: AppDispatch, props: OwnProps) => ({
  deleteUsersWord: () => dispatch(deleteUsersWord(props.wordId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TextbookHardWordsControl);
