import { memo } from 'react';
import styles from '../sprint-game.module.scss';

interface Props {
  onTrueClick: () => void;
  onFalseClick: () => void;
  disabled: boolean;
}

const SprintGameButtons = ({ onTrueClick, onFalseClick, disabled }: Props) => (
  <div className={styles.footer}>
    <button className={styles.button} onClick={onFalseClick} disabled={disabled}>
      Неверно
    </button>
    <button className={styles.button} onClick={onTrueClick} disabled={disabled}>
      Верно
    </button>
  </div>
);

export default memo(SprintGameButtons);
