import styles from '../textbook.module.scss';
import { useParams } from 'react-router';
import Loader from '../../../components/loader';
import { useLoadWordsQuery } from '../../../redux/api';
import WordTicket from '../WordTicket';

const TextbookWords = () => {
  const { page, group } = useParams();
  const {
    isLoading,
    isFetching,
    data: words,
  } = useLoadWordsQuery({
    page: Number(page) - 1,
    group: Number(group) - 1,
  });

  if (isLoading || isFetching) return <Loader />;

  return (
    <div className={styles.words_box}>
      {words && words.map((word) => <WordTicket key={word.id} word={word} />)}
    </div>
  );
};

export default TextbookWords;
