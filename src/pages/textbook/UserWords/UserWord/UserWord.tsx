import { useEffect, useState } from 'react';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { IWord } from '../../../../interfaces';
import { userWordsByIdSelector } from '../../../../redux/selectors/userWords';
import { RootState } from '../../../../redux/store';
import Word from '../../Word';

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

  const onCloseClick = () => {
    navigate(`/textbook/user-words`);
  };

  return <Word word={savedWord} onClose={onCloseClick} />;
};

export default UserWord;
