import { useEffect, useState } from 'react';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Modal from '../../../../components/Modal';
import { ITextbookWord } from '../../../../interfaces';
import { userWordsByIdSelector } from '../../../../redux/selectors/userWords';
import { RootState } from '../../../../redux/store';
import WordContent from '../../Word/WordContent';
import styles from './index.module.scss';

const UserWord = () => {
  const navigate = useNavigate();
  const { wordId = '' } = useParams();
  const word: ITextbookWord | undefined = useSelector((state: RootState) =>
    userWordsByIdSelector(state, { wordId })
  );
  const [savedWord, setSavedWord] = useState<ITextbookWord | undefined>(undefined);
  useEffect(() => {
    word && setSavedWord(word);
  }, [word]);
  /*  const word: ITextbookWord | undefined = data && data.words.find(({ id }) => id === wordId); */
  const onCloseClick = () => {
    navigate(`/textbook/user-words`);
  };

  return (
    <Modal handleClickOutside={onCloseClick}>
      <div className={styles.wrapper}>
        <div className={styles.close} onClick={onCloseClick}>
          <CloseIcon className={styles['close-icon']} />
        </div>
        <WordContent word={savedWord} />
      </div>
    </Modal>
  );
};

export default UserWord;
