import { Route, Routes, useParams } from 'react-router';
import Loader from '../../../components/loader';
import { useLoadWordsQuery } from '../../../redux/api/words';
import Word from '../Word';
import WordTicket from '../WordTicket';
import styles from './index.module.scss';

const TextbookWords = () => {
  const { page, group, wordId } = useParams();
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
    <>
      <div className={styles.words_box}>
        {words && words.map((word) => <WordTicket key={word.id} word={word} />)}
      </div>
      <Routes>{wordId && <Route path={`:wordId`} element={<Word />} />}</Routes>
    </>
  );
};

export default TextbookWords;
