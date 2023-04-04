import { memo } from 'react';
import { AnswerType } from '../../../../interfaces';
import styles from '../index.module.scss';

interface Props {
  onAnswerButtonClick: (answerType: AnswerType) => void;
  disabled: boolean;
}

const SprintGameButtons = ({ onAnswerButtonClick, disabled }: Props) => {
  return (
    <div className={styles.footer}>
      <button
        className={styles.button}
        onClick={() => onAnswerButtonClick(AnswerType.wrong)}
        disabled={disabled}
      >
        Неверно
      </button>
      <button
        className={styles.button}
        onClick={() => onAnswerButtonClick(AnswerType.correct)}
        disabled={disabled}
      >
        Верно
      </button>
    </div>
  );
};

export default memo(SprintGameButtons);
