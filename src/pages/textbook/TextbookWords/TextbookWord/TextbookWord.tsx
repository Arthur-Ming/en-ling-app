import { useNavigate, useParams } from 'react-router';
import { IWord } from '../../../../interfaces';
import { useLoadWordsQueryState } from '../../../../redux/api/words';
import Word from '../../Word';

const TextbookWord = () => {
  const navigate = useNavigate();
  const { page, group, wordId } = useParams();
  const { data } = useLoadWordsQueryState({
    page: Number(page) - 1,
    group: Number(group) - 1,
  });

  const word: IWord | undefined = data && data.find(({ id }) => id === wordId);
  const onCloseClick = () => {
    navigate(`/textbook/${page}/${group}`);
  };

  return <Word word={word} onClose={onCloseClick} />;
};

export default TextbookWord;
