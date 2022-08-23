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
  isBoardsloading: boolean;
  isBoardsloaded: boolean;
  cards: ITextbookCard[];
}

interface DispatchProps {
  getWords: (page: number, group: number) => void;
}

type TProps = StateProps & DispatchProps;

const TextbookCards = ({ cards, isBoardsloading, isBoardsloaded, getWords }: TProps) => {
  const { page, group } = useParams();

  useEffect(() => {
    if (!isBoardsloading && !isBoardsloaded) getWords(Number(page) - 1, Number(group) - 1);
  }, [isBoardsloading, isBoardsloaded, getWords, page, group]);

  if (isBoardsloading) return <Loader />;
  if (!isBoardsloaded) return <div>Not Fou</div>;

  return (
    <div className={styles.root}>
      {cards.map((card) => (
        <TextbookCard key={card.id} card={card} />
      ))}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isBoardsloading: textbookLoadingSelector(state),
  isBoardsloaded: textbookLoadedSelector(state),
  cards: textbookListSelector(state),
});

const mapDispatchToProps = {
  getWords,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextbookCards);
