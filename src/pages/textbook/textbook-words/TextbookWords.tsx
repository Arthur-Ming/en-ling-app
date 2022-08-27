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

import { useEffect } from 'react';
import { useParams } from 'react-router';
import Loader from '../../../components/Loader';
import { getWords } from '../../../redux/actions/words';

interface StateProps {
  loading: boolean;
  loaded: boolean;
  words: ITextbookWord[];
}

interface DispatchProps {
  getWords: (page: number, group: number) => void;
}

type TProps = StateProps & DispatchProps;

const TextbookWords = ({ words, loading, getWords }: TProps) => {
  const { page, group } = useParams();

  useEffect(() => {
    getWords(Number(page) - 1, Number(group) - 1);
  }, [getWords, page, group]);

  if (loading) return <Loader />;

  return (
    <div className={styles.root}>
      {words.map((word) => (
        <TextbookWord key={word.id} word={word} />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(TextbookWords);
