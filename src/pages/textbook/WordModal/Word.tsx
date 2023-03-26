import Modal from '../../../components/Modal';
import styles from './index.module.scss';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import WordContent from './WordContent';
import { IWord } from '../../../interfaces';

type Props = {
  onClose: () => void;
  word?: IWord;
};

const Word = ({ word, onClose }: Props) => (
  <Modal handleClickOutside={onClose}>
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={onClose}>
        <CloseIcon className={styles['close-icon']} />
      </div>
      <WordContent word={word} />
    </div>
  </Modal>
);

export default Word;
