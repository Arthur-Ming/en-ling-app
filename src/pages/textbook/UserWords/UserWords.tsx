import { connect } from 'react-redux';
import { Route, Routes, useParams } from 'react-router';
import { ITextbookWord } from '../../../interfaces';
import { userWordsListSelector } from '../../../redux/selectors/userWords';
import { RootState } from '../../../redux/store';
import Word from '../Word';
import WordTicket from '../WordTicket';
import styles from './index.module.scss';
import UserWord from './UserWord/UserWord';

type StateProps = {
  userWords: ITextbookWord[];
};

type Props = StateProps;

const UserWords = ({ userWords }: Props) => {
  const { page, group, wordId } = useParams();
  return (
    <>
      <div className={styles.words_box}>
        {userWords.map((word) => (
          <WordTicket key={word.id} word={word} />
        ))}
      </div>
      <Routes>{wordId && <Route path={`:wordId`} element={<UserWord />} />}</Routes>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  userWords: userWordsListSelector(state),
});

export default connect(mapStateToProps)(UserWords);
