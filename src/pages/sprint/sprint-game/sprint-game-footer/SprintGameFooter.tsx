import styles from '../sprint-game.module.scss';

interface Props {
  onTrueClick: () => void;
  onFalseClick: () => void;
}

const SprintGameFooter = ({ onTrueClick, onFalseClick }: Props) => (
  <div className={styles.footer}>
    <button className={styles.button} onClick={onFalseClick}>
      Неверно
    </button>
    <button className={styles.button} onClick={onTrueClick}>
      Верно
    </button>
  </div>
);

export default SprintGameFooter;
