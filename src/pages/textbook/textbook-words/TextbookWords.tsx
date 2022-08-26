import { ITextbookWord } from '../../../interfaces';
import TextbookWord from '../textbook-word';
import styles from './textbook-words.module.scss';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/store';
import {
  textbookLoadingSelector,
  textbookLoadedSelector,
  textbookWordsSelector,
} from '../../../redux/selectors';
import { getWords } from '../../../redux/actions';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import Loader from '../../../components/Loader';

interface StateProps {
  isWordsloading: boolean;
  isWordsloaded: boolean;
  words: ITextbookWord[];
}

interface DispatchProps {
  getWords: (page: number, group: number) => void;
}

type TProps = StateProps & DispatchProps;

const TextbookWords = ({ words, isWordsloading, isWordsloaded, getWords }: TProps) => {
  const { page, group } = useParams();

  useEffect(() => {
    if (!isWordsloading && !isWordsloaded) getWords(Number(page) - 1, Number(group) - 1);
  }, [isWordsloading, isWordsloaded, getWords, page, group]);

  if (isWordsloading) return <Loader />;
  if (!isWordsloaded) return <div>Not Fou</div>;

  return (
    <div className={styles.root}>
      {words.map((word) => (
        <TextbookWord key={word.id} word={word} />
      ))}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isWordsloading: textbookLoadingSelector(state),
  isWordsloaded: textbookLoadedSelector(state),
  words: textbookWordsSelector(state),
});

const mapDispatchToProps = {
  getWords,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextbookWords);
