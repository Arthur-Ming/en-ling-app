import { ITextbookCard } from '../../../interfaces';
import TextbookCard from '../textbook-card';
import styles from './textbook-cards.module.scss';

interface IProps {
  cards: ITextbookCard[];
}

const TextbookCards = ({ cards }: IProps) => {
  return (
    <div className={styles.root}>
      {cards.map((card) => (
        <TextbookCard key={card.id} card={card} />
      ))}
    </div>
  );
};

export default TextbookCards;
