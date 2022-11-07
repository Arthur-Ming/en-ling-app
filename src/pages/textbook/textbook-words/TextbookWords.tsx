import { ITextbookWord } from '../../../interfaces';
import TextbookWord from '../textbook-word';
import styles from './textbook-words.module.scss';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/store';
import {
  textbookLoadingSelector,
  textbookLoadedSelector,
  textbookWordsSelector,
} from '../../../redux/selectors/textbook';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import Loader from '../../../components/loader';
import { getWords } from '../../../redux/actions/textbook';
import TextbookWordControlButtons from './textbook-word-control-buttons';
import { getUsersWords } from '../../../redux/actions/userWords';

type StateProps = {
  loading: boolean;
  loaded: boolean;
  words: ITextbookWord[];
};

type DispatchProps = {
  getWords: (page: number, group: number) => void;
  getUsersWords: () => void;
};

type Props = StateProps & DispatchProps;

const TextbookWords = ({ words, loading, getWords, getUsersWords }: Props) => {
  const { page, group } = useParams();

  useEffect(() => {
    getWords(Number(page), Number(group));
    getUsersWords();
  }, [getWords, page, group, getUsersWords]);

  if (loading) return <Loader />;

  return (
    <div className={styles.root}>
      {words.map((word) => (
        <TextbookWord key={word.id} word={word}>
          <TextbookWordControlButtons wordId={word.id} />
        </TextbookWord>
      ))}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  loading: textbookLoadingSelector(state),
  loaded: textbookLoadedSelector(state),
  words: textbookWordsSelector(state),
});

const mapDispatchToProps = {
  getWords,
  getUsersWords,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextbookWords);
