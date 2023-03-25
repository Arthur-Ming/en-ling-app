import { IWord } from '../../../interfaces';
import styles from './index.module.scss';
import WordTicket from './WordTicket';

type Props = {
  words: IWord[];
};

const WordTickets = ({ words }: Props) => (
  <div className={styles.root}>
    {words.map((word) => (
      <WordTicket key={word.id} word={word} />
    ))}
  </div>
);

export default WordTickets;
