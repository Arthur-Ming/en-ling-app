import Modal from '../../../components/Modal';
import { ISprintResult } from '../../../interfaces';
import SprintGameResult from '../sprint-game/sprint-game-result/SprintGameResult';
import styles from './index.module.scss';
import { IoMdClose as CloseIcon } from 'react-icons/io';

type Props = {
  results: ISprintResult[];
  onClose: () => void;
  onPlay: () => void;
};

const SprintResultModal = ({ results, onClose, onPlay }: Props) => {
  return (
    <Modal>
      <div className={styles.wrapper}>
        <div>
          <button onClick={onPlay}>fbdn</button>
          <div className={styles.close} onClick={onClose}>
            <CloseIcon className={styles['close-icon']} />
          </div>
        </div>
        <SprintGameResult results={results} />
      </div>
    </Modal>
  );
};

export default SprintResultModal;
