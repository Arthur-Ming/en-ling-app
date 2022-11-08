import { useEffect } from 'react';
import { connect } from 'react-redux';
import { IPaginatedResult, ITextbookWord } from '../../../interfaces';
import { RootState } from '../../../redux/reducer';
import {
  userHardWordsArrSelector,
  userWordsArrSelector,
  userWordsLoadedSelector,
  userWordsLoadingSelector,
} from '../../../redux/selectors/userWords';
import TextbookWord from '../textbook-word';
import TextbookHardWordsControl from './textbook-hard-words-control';
import styles from '../textbook.module.scss';
import Loader from '../../../components/loader';

type StateProps = {
  loading: boolean;
  loaded: boolean;
  words: ITextbookWord[];
};

type Props = StateProps;

const TextbookHardWords = ({ words, loading }: Props) => {
  if (loading) return <Loader />;
  return (
    <div className={styles.words_box}>
      {words.map((word) => (
        <TextbookWord key={word.id} word={word}>
          <TextbookHardWordsControl wordId={word.id} />
        </TextbookWord>
      ))}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  loading: userWordsLoadingSelector(state),
  loaded: userWordsLoadedSelector(state),
  words: userHardWordsArrSelector(state),
});

export default connect(mapStateToProps)(TextbookHardWords);
