import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { IWord } from '../../../../interfaces';
import { wordAudioStop } from '../../../../redux/actions/audio';
import { useLoadWordsQueryState } from '../../../../redux/api/words';
import { AppDispatch } from '../../../../redux/store';
import WordModal from '../../WordModal';

const TextbookWord = () => {
  const navigate = useNavigate();
  const { page, group, wordId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { data } = useLoadWordsQueryState({
    page: Number(page) - 1,
    group: Number(group) - 1,
  });

  const word: IWord | undefined = data && data.find(({ id }) => id === wordId);
  const onCloseClick = () => {
    navigate(`/textbook/${page}/${group}`);
    dispatch(wordAudioStop());
  };

  return <WordModal word={word} onClose={onCloseClick} />;
};

export default TextbookWord;
