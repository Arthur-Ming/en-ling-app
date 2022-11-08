import { connect } from 'react-redux';
import { deleteUsersWord, updateUsersWord } from '../../../../redux/actions/userWords';
import { RootState } from '../../../../redux/reducer';
import { userWordsUpdatingSelector } from '../../../../redux/selectors/userWords';
import { AppDispatch } from '../../../../redux/store';
import styles from '../../textbook.module.scss';

type OwnProps = {
  wordId: string;
};

type StateProps = {
  isUpdating: boolean;
};

type DispatchProps = {
  deleteUsersWord: () => void;
  updateUsersWord: () => void;
};

type Props = OwnProps & DispatchProps & StateProps;

const TextbookHardWordsControl = ({ deleteUsersWord, updateUsersWord, isUpdating }: Props) => (
  <div className={styles.word_control_box}>
    <button className={styles.word_control_button} onClick={deleteUsersWord} disabled={isUpdating}>
      Удалить
    </button>
    <button className={styles.word_control_button} onClick={updateUsersWord} disabled={isUpdating}>
      Изученное
    </button>
  </div>
);

const mapStateToProps = (state: RootState, { wordId }: OwnProps) => ({
  isUpdating: userWordsUpdatingSelector(state, wordId),
});

const mapDispatchToProps = (dispatch: AppDispatch, props: OwnProps) => ({
  deleteUsersWord: () => dispatch(deleteUsersWord(props.wordId)),
  updateUsersWord: () => dispatch(updateUsersWord(props.wordId, 'easy')),
});

export default connect(mapStateToProps, mapDispatchToProps)(TextbookHardWordsControl);
