import { connect } from 'react-redux';
import { Route, Routes } from 'react-router';
import { IWord } from '../../../interfaces';
import { userWordsListSelector } from '../../../redux/selectors/userWords';
import { RootState } from '../../../redux/store';
import WordTickets from '../WordTickets';
import UserWord from './UserWord/UserWord';

type StateProps = {
  userWords: IWord[];
};

type Props = StateProps;

const UserWords = ({ userWords }: Props) => {
  return (
    <>
      <WordTickets words={userWords} />
      <Routes>{<Route path={`:wordId`} element={<UserWord />} />}</Routes>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  userWords: userWordsListSelector(state),
});

export default connect(mapStateToProps)(UserWords);
