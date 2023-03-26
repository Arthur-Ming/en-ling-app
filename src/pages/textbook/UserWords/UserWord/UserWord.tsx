import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { IWord } from '../../../../interfaces';
import { wordAudioStop } from '../../../../redux/actions/audio';
import { userWordsByIdSelector } from '../../../../redux/selectors/userWords';
import { AppDispatch, RootState } from '../../../../redux/store';
import WordModal from '../../WordModal';

const UserWord = () => {
  const navigate = useNavigate();
  const { wordId = '' } = useParams();
  const word: IWord | undefined = useSelector((state: RootState) =>
    userWordsByIdSelector(state, { wordId })
  );
  const [savedWord, setSavedWord] = useState<IWord | undefined>(undefined);
  useEffect(() => {
    word && setSavedWord(word);
  }, [word]);
  const dispatch: AppDispatch = useDispatch();
  const onCloseClick = () => {
    navigate(`/textbook/user-words`);
    dispatch(wordAudioStop());
  };

  return <WordModal word={savedWord} onClose={onCloseClick} />;
};

export default UserWord;
