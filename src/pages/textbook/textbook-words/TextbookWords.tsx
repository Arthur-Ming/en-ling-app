import TextbookWord from '../textbook-word';
import styles from '../textbook.module.scss';
import { useParams } from 'react-router';
import Loader from '../../../components/loader';
import TextbookWordControl from './textbook-word-control';
import { useLoadWordsQuery } from '../../../redux/api';

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
      {words &&
        words.map((word) => (
          <TextbookWord key={word.id} word={word}>
            <TextbookWordControl wordId={word.id} />
          </TextbookWord>
        ))}
    </div>
  );
};

export default TextbookWords;
