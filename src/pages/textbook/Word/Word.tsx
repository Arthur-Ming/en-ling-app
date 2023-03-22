import { useNavigate, useParams } from 'react-router';
import Modal from '../../../components/Modal';
import styles from './index.module.scss';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import WordContent from './WordContent';
import { useLoadWordsQueryState } from '../../../redux/api/words';
import { ITextbookWord } from '../../../interfaces';

const Word = () => {
  const navigate = useNavigate();
  const { page, group, wordId } = useParams();
  const { data } = useLoadWordsQueryState({
    page: Number(page) - 1,
    group: Number(group) - 1,
  });

  const word: ITextbookWord | undefined = data && data.find(({ id }) => id === wordId);
  const onCloseClick = () => {
    navigate(`/textbook/${page}/${group}`);
  };

  return (
    <Modal handleClickOutside={onCloseClick}>
      <div className={styles.wrapper}>
        <div className={styles.close} onClick={onCloseClick}>
          <CloseIcon className={styles['close-icon']} />
        </div>
        <WordContent word={word} />
      </div>
    </Modal>
  );
};

export default Word;
