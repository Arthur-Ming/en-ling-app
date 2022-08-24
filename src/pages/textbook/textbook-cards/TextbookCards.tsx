import { ITextbookCard } from '../../../interfaces';
import TextbookCard from '../textbook-card';
import styles from './textbook-cards.module.scss';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/store';
import {
  textbookLoadingSelector,
  textbookLoadedSelector,
  textbookListSelector,
} from '../../../redux/selectors';
import { getWords } from '../../../redux/actions';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import Loader from '../../../components/Loader';

interface StateProps {
  isWordsloading: boolean;
  isWordsloaded: boolean;
  cards: ITextbookCard[];
}

interface DispatchProps {
  getWords: (page: number, group: number) => void;
}

type TProps = StateProps & DispatchProps;

const TextbookCards = ({ cards, isWordsloading, isWordsloaded, getWords }: TProps) => {
  const { page, group } = useParams();

  useEffect(() => {
    if (!isWordsloading && !isWordsloaded) getWords(Number(page) - 1, Number(group) - 1);
  }, [isWordsloading, isWordsloaded, getWords, page, group]);

  if (isWordsloading) return <Loader />;
  if (!isWordsloaded) return <div>Not Fou</div>;

  return (
    <div className={styles.root}>
      {cards.map((card) => (
        <TextbookCard key={card.id} card={card} />
      ))}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isWordsloading: textbookLoadingSelector(state),
  isWordsloaded: textbookLoadedSelector(state),
  cards: textbookListSelector(state),
});

const mapDispatchToProps = {
  getWords,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextbookCards);
